import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  sendClientConfirmationEmail,
  sendTeamNotificationEmail,
  sendSecondPaymentReminderEmail,
  EntityData,
  ResponsibleData,
  PlanData,
  PaymentData,
  KitData
} from '@/lib/email';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-06-30.basil',
    })
  : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

// Extender el tipo Invoice para incluir subscription
interface StripeInvoiceWithSubscription extends Stripe.Invoice {
  subscription?: string | Stripe.Subscription;
}

export async function POST(request: NextRequest) {
  // Verificar que Stripe esté configurado
  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { error: 'Stripe webhook no está configurado' },
      { status: 500 }
    );
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('💰 Primer pago exitoso:', paymentIntent.id);

        // Iniciar proceso de implementación LOPIVI
        await handleFirstPaymentSuccess(paymentIntent);
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        console.log('❌ Pago fallido:', failedPayment.id);

        // Notificar al equipo y al cliente
        await handlePaymentFailure(failedPayment);
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as StripeInvoiceWithSubscription;
        console.log('💰 Segundo pago exitoso (suscripción):', invoice.id);

        // Manejar segundo pago exitoso
        await handleSecondPaymentSuccess(invoice);
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as StripeInvoiceWithSubscription;
        console.log('❌ Segundo pago fallido:', failedInvoice.id);

        // Enviar recordatorio de pago
        await handleSecondPaymentFailure(failedInvoice);
        break;

      case 'customer.subscription.created':
        const subscription = event.data.object as Stripe.Subscription;
        console.log('📅 Suscripción creada para segundo pago:', subscription.id);
        break;

      case 'invoice.upcoming':
        const upcomingInvoice = event.data.object as StripeInvoiceWithSubscription;
        console.log('📋 Factura próxima (recordatorio):', upcomingInvoice.id);

        // Enviar recordatorio de próximo pago
        await handleUpcomingPayment(upcomingInvoice);
        break;

      default:
        console.log(`Evento no manejado: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    );
  }
}

async function handleFirstPaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  // Obtener los datos del metadata
  const metadata = paymentIntent.metadata;

  console.log('Iniciando implementación LOPIVI para:', metadata);

  // Preparar datos de la entidad desde metadata
  const entityData: EntityData = {
    nombreEntidad: metadata.entityName || '',
    tipoEntidad: metadata.entityType || '',
    nif: metadata.nif || '',
    email: metadata.entityEmail || '',
    telefono: metadata.entityPhone || ''
  };

  const responsibleData: ResponsibleData = {
    nombreResponsable: metadata.responsibleName || '',
    cargoResponsable: metadata.responsibleRole || '',
    emailResponsable: metadata.responsibleEmail || ''
  };

  const planData: PlanData = {
    id: metadata.planId || '',
    title: metadata.planTitle || '',
    price: parseFloat(metadata.planPrice || '0'),
    menores: metadata.planMenores || ''
  };

  const paymentData: PaymentData = {
    paymentIntentId: paymentIntent.id,
    amount: paymentIntent.amount / 100,
    currency: paymentIntent.currency,
    paymentDate: new Date().toISOString()
  };

  const kitData: KitData = {
    included: metadata.kitComunicacion === 'true'
  };

  // Log de webhook con detalles
  if (process.env.ENABLE_WEBHOOK_LOGGING === 'true') {
    console.log('🔔 WEBHOOK - Primer pago exitoso:', {
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount / 100,
      entityName: metadata.entityName,
      planTitle: metadata.planTitle,
      kitIncluded: metadata.kitComunicacion === 'true'
    });
  }

  // Enviar emails si están habilitados
  if (process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true') {
    try {
      // El email de confirmación ya se envió en confirm-payment
      // Aquí podemos enviar emails adicionales o recordatorios

      console.log('✅ Webhook procesado - primer pago exitoso');
    } catch (emailError) {
      console.error('❌ Error enviando emails desde webhook:', emailError);
    }
  }

  // Aquí puedes agregar:
  // - Crear usuario en dashboard
  // - Iniciar flujo de implementación automático
  // - Notificar sistemas internos
  // - Crear tareas para el equipo
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  console.log('Manejando pago fallido para:', paymentIntent.metadata.entityName);

  // Log de fallo de pago
  if (process.env.ENABLE_WEBHOOK_LOGGING === 'true') {
    console.log('❌ WEBHOOK - Pago fallido:', {
      paymentIntentId: paymentIntent.id,
      entityName: paymentIntent.metadata.entityName,
      amount: paymentIntent.amount / 100,
      lastPaymentError: paymentIntent.last_payment_error?.message
    });
  }

  // Aquí puedes agregar:
  // - Notificar al equipo de ventas
  // - Enviar email al cliente con instrucciones
  // - Crear tarea de seguimiento
  // - Retry automático del pago
}

async function handleSecondPaymentSuccess(invoice: StripeInvoiceWithSubscription) {
  console.log('Segundo pago exitoso, continuando servicios...');

  // Log de segundo pago exitoso
  if (process.env.ENABLE_WEBHOOK_LOGGING === 'true') {
    console.log('✅ WEBHOOK - Segundo pago exitoso:', {
      invoiceId: invoice.id,
      subscriptionId: typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id,
      amount: (invoice.amount_paid || 0) / 100,
      customerEmail: invoice.customer_email
    });
  }

  // Aquí puedes agregar:
  // - Renovar servicios por otros 6 meses
  // - Enviar email de confirmación del segundo pago
  // - Actualizar estado del cliente en dashboard
  // - Generar nuevo período de facturación
}

async function handleSecondPaymentFailure(invoice: StripeInvoiceWithSubscription) {
  console.log('Segundo pago fallido, enviando recordatorios...');

  // Log de fallo de segundo pago
  if (process.env.ENABLE_WEBHOOK_LOGGING === 'true') {
    console.log('❌ WEBHOOK - Segundo pago fallido:', {
      invoiceId: invoice.id,
      subscriptionId: typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id,
      amount: (invoice.amount_due || 0) / 100,
      customerEmail: invoice.customer_email,
      attemptCount: invoice.attempt_count
    });
  }

  if (process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true') {
    try {
      // Obtener datos del cliente desde Stripe
      if (stripe && invoice.customer && typeof invoice.customer === 'string') {
        const customer = await stripe.customers.retrieve(invoice.customer) as Stripe.Customer;

        // Preparar datos para el recordatorio
        const entityData: EntityData = {
          nombreEntidad: customer.metadata.entityName || customer.name || '',
          tipoEntidad: customer.metadata.entityType || '',
          nif: customer.metadata.nif || '',
          email: customer.email || invoice.customer_email || '',
          telefono: customer.phone || ''
        };

        const responsibleData: ResponsibleData = {
          nombreResponsable: customer.metadata.responsibleName || '',
          cargoResponsable: customer.metadata.responsibleRole || '',
          emailResponsable: customer.metadata.responsibleEmail || customer.email || ''
        };

        const planData: PlanData = {
          id: customer.metadata.planId || '',
          title: customer.metadata.planTitle || '',
          price: parseFloat(customer.metadata.planPrice || '0'),
          menores: customer.metadata.planMenores || ''
        };

        // Enviar recordatorio de pago
        await sendSecondPaymentReminderEmail(
          entityData,
          responsibleData,
          planData,
          (invoice.amount_due || 0) / 100
        );

        console.log('✅ Recordatorio de segundo pago enviado');
      }
    } catch (error) {
      console.error('❌ Error enviando recordatorio de pago:', error);
    }
  }

  // Aquí puedes agregar:
  // - Crear tarea de seguimiento manual
  // - Notificar al equipo comercial
  // - Suspender servicios después de X intentos fallidos
  // - Programar retry del pago
}

async function handleUpcomingPayment(invoice: StripeInvoiceWithSubscription) {
  console.log('Próximo pago programado, enviando recordatorio anticipado...');

  // Log de pago próximo
  if (process.env.ENABLE_WEBHOOK_LOGGING === 'true') {
    console.log('📋 WEBHOOK - Próximo pago:', {
      invoiceId: invoice.id,
      subscriptionId: typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id,
      amount: (invoice.amount_due || 0) / 100,
      dueDate: new Date((invoice.due_date || 0) * 1000).toISOString(),
      customerEmail: invoice.customer_email
    });
  }

  // Aquí puedes agregar:
  // - Enviar recordatorio amigable 7 días antes
  // - Verificar que la tarjeta sigue válida
  // - Ofrecer actualizar método de pago
  // - Mostrar valor recibido durante el período
}
