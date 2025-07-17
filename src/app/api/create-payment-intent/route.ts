import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// NETLIFY FORCE UPDATE: custodia360.es production ready
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-06-30.basil',
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    // Verificar que Stripe esté configurado
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe no está configurado' },
        { status: 500 }
      );
    }

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

    // Programar segundo pago (simplificado para producción)
    // Nota: El segundo pago se configurará via webhook cuando sea necesario
    const subscriptionMetadata = {
      secondPaymentAmount: amount.toString(),
      secondPaymentDate: new Date(Date.now() + (6 * 30 * 24 * 60 * 60 * 1000)).toISOString(),
      entityName: entityData.nombreEntidad,
      planTitle: planData.title
    };

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
      secondPaymentScheduled: subscriptionMetadata
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
