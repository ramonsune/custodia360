import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = 'eur', planData, entityData, responsibleData, kitComunicacion, kitDetails } = body;

    // Validar datos requeridos
    if (!amount || !planData || !entityData) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    // Crear customer en Stripe
    const customer = await stripe.customers.create({
      email: entityData.email,
      name: entityData.nombreEntidad,
      phone: entityData.telefono,
      metadata: {
        entityName: entityData.nombreEntidad,
        entityType: entityData.tipoEntidad,
        nif: entityData.nif,
        responsibleName: responsibleData.nombreResponsable,
        responsibleRole: responsibleData.cargoResponsable,
        responsibleEmail: responsibleData.emailResponsable,
        planId: planData.id,
        planTitle: planData.title,
        planPrice: planData.price.toString(),
        planMenores: planData.menores,
        kitComunicacion: kitComunicacion ? 'true' : 'false'
      }
    });

    // Crear Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convertir a centavos
      currency: currency,
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        entityName: entityData.nombreEntidad,
        entityType: entityData.tipoEntidad,
        nif: entityData.nif,
        entityEmail: entityData.email,
        entityPhone: entityData.telefono,
        responsibleName: responsibleData.nombreResponsable,
        responsibleRole: responsibleData.cargoResponsable,
        responsibleEmail: responsibleData.emailResponsable,
        planId: planData.id,
        planTitle: planData.title,
        planPrice: planData.price.toString(),
        planMenores: planData.menores,
        kitComunicacion: kitComunicacion ? 'true' : 'false',
        ...(kitDetails && {
          kitColorPrimario: kitDetails.colorPrimario,
          kitLogoPersonalizado: kitDetails.logoPersonalizado ? 'true' : 'false',
          kitMaterialesPersonalizados: kitDetails.materialesPersonalizados ? 'true' : 'false'
        })
      }
    });

    // Programar segundo pago (suscripción para 6 meses después)
    const subscriptionSchedule = await stripe.subscriptionSchedules.create({
      customer: customer.id,
      start_date: Math.floor(Date.now() / 1000) + (6 * 30 * 24 * 60 * 60), // 6 meses
      end_behavior: 'cancel',
      phases: [
        {
          items: [
            {
              price_data: {
                currency: 'eur',
                product_data: {
                  name: `custodia360 - Segundo Pago - ${planData.title}`,
                  description: `Continuidad del servicio LOPIVI para ${entityData.nombreEntidad}`,
                },
                unit_amount: Math.round(amount * 100),
                recurring: {
                  interval: 'month',
                  interval_count: 6,
                },
              },
              quantity: 1,
            },
          ],
          iterations: 1,
        },
      ],
    });

    console.log('Payment Intent creado:', {
      id: paymentIntent.id,
      customer: customer.id,
      amount: amount,
      entityName: entityData.nombreEntidad,
      planTitle: planData.title
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      customerId: customer.id,
      subscriptionScheduleId: subscriptionSchedule.id
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
