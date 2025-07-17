import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  sendClientConfirmationEmail,
  sendTeamNotificationEmail,
  sendWelcomeEmail,
  EntityData,
  ResponsibleData,
  PlanData,
  PaymentData,
  KitData
} from '@/lib/email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentIntentId, entityData, responsibleData, planData, kitComunicacion } = body;

    // Verificar el payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Preparar datos para los emails
      const entityInfo: EntityData = {
        nombreEntidad: entityData.nombreEntidad,
        tipoEntidad: entityData.tipoEntidad,
        nif: entityData.nif,
        email: entityData.email,
        telefono: entityData.telefono,
        direccion: entityData.direccion,
        ciudad: entityData.ciudad
      };

      const responsibleInfo: ResponsibleData = {
        nombreResponsable: responsibleData.nombreResponsable,
        cargoResponsable: responsibleData.cargoResponsable,
        emailResponsable: responsibleData.emailResponsable,
        telefonoResponsable: responsibleData.telefonoResponsable
      };

      const planInfo: PlanData = {
        id: planData.id,
        title: planData.title,
        price: planData.price,
        menores: planData.menores
      };

      const paymentInfo: PaymentData = {
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        paymentDate: new Date().toISOString()
      };

      const kitInfo: KitData = {
        included: kitComunicacion || false,
        colorPrimario: body.kitDetails?.colorPrimario,
        logoPersonalizado: body.kitDetails?.logoPersonalizado,
        materialesPersonalizados: body.kitDetails?.materialesPersonalizados
      };

      // Enviar emails solo si está habilitado
      const emailsEnabled = process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true';

      if (emailsEnabled) {
        try {
          // Enviar email de confirmación al cliente
          console.log('Enviando email de confirmación al cliente...');
          await sendClientConfirmationEmail(entityInfo, responsibleInfo, planInfo, paymentInfo, kitInfo);
          console.log('✅ Email de confirmación enviado al cliente');

          // Enviar notificación al equipo
          console.log('Enviando notificación al equipo...');
          await sendTeamNotificationEmail(entityInfo, responsibleInfo, planInfo, paymentInfo, kitInfo);
          console.log('✅ Notificación enviada al equipo');

          // Enviar email de bienvenida al responsable (con delay de 1 hora)
          setTimeout(async () => {
            try {
              console.log('Enviando email de bienvenida...');
              await sendWelcomeEmail(entityInfo, responsibleInfo, planInfo);
              console.log('✅ Email de bienvenida enviado');
            } catch (welcomeError) {
              console.error('❌ Error enviando email de bienvenida:', welcomeError);
            }
          }, 60000); // 1 minuto de delay (en producción sería 1 hora)

        } catch (emailError) {
          console.error('❌ Error enviando emails:', emailError);
          // No fallar la operación por errores de email
        }
      } else {
        console.log('📧 Emails deshabilitados en configuración');
      }

      // Log del pago exitoso
      console.log('💰 Pago exitoso procesado:', {
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        customer: paymentIntent.customer,
        entityName: entityData.nombreEntidad,
        planTitle: planData.title,
        kitComunicacion: kitComunicacion || false,
        emailsSent: emailsEnabled
      });

      // Aquí puedes agregar más lógica:
      // - Crear registro en base de datos
      // - Iniciar proceso de implementación LOPIVI
      // - Notificar sistemas internos
      // - Crear dashboard del cliente
      // - Programar tareas automatizadas

      return NextResponse.json({
        success: true,
        message: 'Pago procesado exitosamente',
        paymentIntent: {
          id: paymentIntent.id,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          status: paymentIntent.status
        },
        emailsSent: emailsEnabled,
        nextSteps: [
          'Emails de confirmación enviados',
          'Implementación LOPIVI iniciada',
          'Dashboard en preparación',
          'Equipo notificado'
        ]
      });
    } else {
      return NextResponse.json(
        { error: 'El pago no fue procesado correctamente' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Error confirming payment:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
