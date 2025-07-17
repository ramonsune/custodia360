import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EntityData {
  nombreEntidad: string;
  tipoEntidad: string;
  nif: string;
  email: string;
  telefono: string;
  direccion?: string;
  ciudad?: string;
}

export interface ResponsibleData {
  nombreResponsable: string;
  cargoResponsable: string;
  emailResponsable: string;
  telefonoResponsable?: string;
}

export interface PlanData {
  id: string;
  title: string;
  price: number;
  menores: string;
}

export interface PaymentData {
  paymentIntentId: string;
  amount: number;
  currency: string;
  paymentDate: string;
}

export interface KitData {
  included: boolean;
  colorPrimario?: string;
  logoPersonalizado?: boolean;
  materialesPersonalizados?: boolean;
}

// Email de confirmación para el cliente
export async function sendClientConfirmationEmail(
  entityData: EntityData,
  responsibleData: ResponsibleData,
  planData: PlanData,
  paymentData: PaymentData,
  kitData: KitData
) {
  const { data, error } = await resend.emails.send({
    from: process.env.FROM_EMAIL || 'noreply@custodia360.es',
    to: [entityData.email],
    cc: responsibleData.emailResponsable !== entityData.email ? [responsibleData.emailResponsable] : [],
    subject: `✅ Confirmación de Contrato - custodia360 Plan ${planData.title}`,
    html: generateClientConfirmationHTML(entityData, responsibleData, planData, paymentData, kitData),
  });

  if (error) {
    console.error('Error sending client confirmation email:', error);
    throw new Error(`Error sending email: ${error.message}`);
  }

  return data;
}

// Email de notificación para el equipo de custodia360
export async function sendTeamNotificationEmail(
  entityData: EntityData,
  responsibleData: ResponsibleData,
  planData: PlanData,
  paymentData: PaymentData,
  kitData: KitData
) {
  const { data, error } = await resend.emails.send({
    from: process.env.FROM_EMAIL || 'noreply@custodia360.es',
    to: [process.env.SALES_EMAIL || 'ventas@custodia360.es'],
    subject: `🚀 NUEVO CONTRATO - ${entityData.nombreEntidad} - Plan ${planData.title}`,
    html: generateTeamNotificationHTML(entityData, responsibleData, planData, paymentData, kitData),
  });

  if (error) {
    console.error('Error sending team notification email:', error);
    throw new Error(`Error sending team notification: ${error.message}`);
  }

  return data;
}

// Email de recordatorio para el segundo pago
export async function sendSecondPaymentReminderEmail(
  entityData: EntityData,
  responsibleData: ResponsibleData,
  planData: PlanData,
  amount: number
) {
  const { data, error } = await resend.emails.send({
    from: process.env.FROM_EMAIL || 'noreply@custodia360.es',
    to: [entityData.email],
    cc: responsibleData.emailResponsable !== entityData.email ? [responsibleData.emailResponsable] : [],
    subject: `💳 Recordatorio: Segundo Pago custodia360 - ${entityData.nombreEntidad}`,
    html: generateSecondPaymentReminderHTML(entityData, responsibleData, planData, amount),
  });

  if (error) {
    console.error('Error sending second payment reminder:', error);
    throw new Error(`Error sending payment reminder: ${error.message}`);
  }

  return data;
}

// Email de bienvenida con próximos pasos
export async function sendWelcomeEmail(
  entityData: EntityData,
  responsibleData: ResponsibleData,
  planData: PlanData
) {
  const { data, error } = await resend.emails.send({
    from: process.env.FROM_EMAIL || 'noreply@custodia360.es',
    to: [responsibleData.emailResponsable],
    subject: `🎯 Próximos Pasos - Implementación LOPIVI ${entityData.nombreEntidad}`,
    html: generateWelcomeHTML(entityData, responsibleData, planData),
  });

  if (error) {
    console.error('Error sending welcome email:', error);
    throw new Error(`Error sending welcome email: ${error.message}`);
  }

  return data;
}

// Template HTML para confirmación del cliente
function generateClientConfirmationHTML(
  entityData: EntityData,
  responsibleData: ResponsibleData,
  planData: PlanData,
  paymentData: PaymentData,
  kitData: KitData
) {
  const secondPaymentAmount = paymentData.amount;
  const secondPaymentDate = new Date();
  secondPaymentDate.setMonth(secondPaymentDate.getMonth() + 6);

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Contrato - custodia360</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #ea580c, #dc2626); color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; }
        .success-box { background: #10b981; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px; }
        .info-box { background: #f3f4f6; border-left: 4px solid #ea580c; padding: 20px; margin: 20px 0; }
        .plan-details { background: #fef3c7; border: 2px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { background: #374151; color: white; padding: 20px; text-align: center; }
        .btn { display: inline-block; background: #ea580c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; }
        .highlight { color: #ea580c; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🛡️ custodia360</h1>
            <h2>¡Confirmación de Contrato!</h2>
        </div>

        <div class="content">
            <div class="success-box">
                <h2>✅ ¡Pago Procesado Exitosamente!</h2>
                <p>Tu implementación LOPIVI comenzará en las próximas <strong>24 horas</strong></p>
            </div>

            <h3>📋 Detalles del Contrato</h3>
            <div class="plan-details">
                <h4>Plan Contratado: ${planData.title}</h4>
                <p><strong>Entidad:</strong> ${entityData.nombreEntidad}</p>
                <p><strong>Tipo:</strong> ${entityData.tipoEntidad}</p>
                <p><strong>NIF/CIF:</strong> ${entityData.nif}</p>
                <p><strong>Responsable:</strong> ${responsibleData.nombreResponsable} (${responsibleData.cargoResponsable})</p>
                <p><strong>Kit de Comunicación:</strong> ${kitData.included ? '✅ Incluido (+49€)' : '❌ No incluido'}</p>
            </div>

            <h3>💰 Información de Pago</h3>
            <div class="info-box">
                <p><strong>Primer Pago (Hoy):</strong> <span class="highlight">${paymentData.amount.toFixed(2)}€</span></p>
                <p><strong>Segundo Pago:</strong> ${secondPaymentAmount.toFixed(2)}€ el <span class="highlight">${secondPaymentDate.toLocaleDateString('es-ES')}</span></p>
                <p><strong>ID de Transacción:</strong> ${paymentData.paymentIntentId}</p>
                <p><strong>Estado:</strong> ✅ Completado</p>
            </div>

            <h3>🚀 Próximos Pasos</h3>
            <div class="info-box">
                <ol>
                    <li><strong>En 2-4 horas:</strong> Recibirás un email con el acceso a tu dashboard</li>
                    <li><strong>En 24 horas:</strong> Tu implementación LOPIVI estará completa</li>
                    <li><strong>En 2-3 días:</strong> Tendrás todos los certificados listos</li>
                    ${kitData.included ? '<li><strong>En 3-5 días:</strong> Recibirás tu kit de comunicación personalizado</li>' : ''}
                </ol>
            </div>

            <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/demo" class="btn">🖥️ Ver Dashboard Demo</a>
            </div>

            <h3>📞 Contacto</h3>
            <div class="info-box">
                <p><strong>Soporte Técnico:</strong> ${process.env.SUPPORT_EMAIL || 'soporte@custodia360.es'}</p>
                <p><strong>Teléfono:</strong> ${process.env.COMPANY_PHONE || '678 771 198'}</p>
                <p><strong>Horario:</strong> Lunes a Viernes 9:00 - 18:00</p>
            </div>
        </div>

        <div class="footer">
            <p><strong>${process.env.COMPANY_NAME || 'custodia360'}</strong></p>
            <p>${process.env.COMPANY_ADDRESS || 'Barcelona, España'}</p>
            <p>Primera empresa automatizada especializada en cumplimiento LOPIVI</p>
        </div>
    </div>
</body>
</html>`;
}

// Template HTML para notificación del equipo
function generateTeamNotificationHTML(
  entityData: EntityData,
  responsibleData: ResponsibleData,
  planData: PlanData,
  paymentData: PaymentData,
  kitData: KitData
) {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nuevo Contrato - custodia360</title>
    <style>
        body { font-family: monospace; line-height: 1.4; background: #1f2937; color: #f9fafb; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; background: #111827; padding: 20px; border-radius: 8px; }
        .header { color: #10b981; font-size: 18px; font-weight: bold; margin-bottom: 20px; }
        .section { margin: 15px 0; padding: 10px; background: #374151; border-radius: 4px; }
        .highlight { color: #fbbf24; }
        .success { color: #10b981; }
        .urgent { color: #ef4444; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">🚀 NUEVO CONTRATO CUSTODIA360</div>

        <div class="section">
            <div class="urgent">⚡ IMPLEMENTACIÓN REQUERIDA EN 24H</div>
        </div>

        <div class="section">
            <strong class="highlight">📊 RESUMEN DE VENTA</strong><br>
            Plan: ${planData.title}<br>
            Precio: €${paymentData.amount.toFixed(2)} (primer pago)<br>
            Kit Comunicación: ${kitData.included ? '✅ SÍ (+49€)' : '❌ NO'}<br>
            Payment ID: ${paymentData.paymentIntentId}<br>
            Fecha: ${paymentData.paymentDate}
        </div>

        <div class="section">
            <strong class="highlight">🏢 DATOS ENTIDAD</strong><br>
            Nombre: ${entityData.nombreEntidad}<br>
            Tipo: ${entityData.tipoEntidad}<br>
            NIF/CIF: ${entityData.nif}<br>
            Email: ${entityData.email}<br>
            Teléfono: ${entityData.telefono}<br>
            ${entityData.direccion ? `Dirección: ${entityData.direccion}` : ''}<br>
            ${entityData.ciudad ? `Ciudad: ${entityData.ciudad}` : ''}
        </div>

        <div class="section">
            <strong class="highlight">👤 RESPONSABLE/DELEGADO</strong><br>
            Nombre: ${responsibleData.nombreResponsable}<br>
            Cargo: ${responsibleData.cargoResponsable}<br>
            Email: ${responsibleData.emailResponsable}<br>
            ${responsibleData.telefonoResponsable ? `Teléfono: ${responsibleData.telefonoResponsable}` : ''}
        </div>

        ${kitData.included ? `
        <div class="section">
            <strong class="highlight">📦 KIT COMUNICACIÓN</strong><br>
            Color Primario: ${kitData.colorPrimario || 'No especificado'}<br>
            Logo Personalizado: ${kitData.logoPersonalizado ? '✅ SÍ' : '❌ NO'}<br>
            Materiales Personalizados: ${kitData.materialesPersonalizados ? '✅ SÍ' : '❌ NO'}
        </div>` : ''}

        <div class="section">
            <strong class="urgent">🎯 ACCIONES REQUERIDAS</strong><br>
            ☐ Crear acceso dashboard para cliente<br>
            ☐ Iniciar verificación de personal<br>
            ☐ Asignar delegado de protección<br>
            ☐ Preparar protocolos específicos<br>
            ${kitData.included ? '☐ Iniciar diseño kit personalizado<br>' : ''}
            ☐ Programar recordatorio segundo pago (6 meses)
        </div>

        <div class="section">
            <strong class="success">💳 FACTURACIÓN</strong><br>
            Primer Pago: €${paymentData.amount.toFixed(2)} - <span class="success">COMPLETADO</span><br>
            Segundo Pago: €${paymentData.amount.toFixed(2)} - <span class="highlight">PROGRAMADO (6 meses)</span>
        </div>
    </div>
</body>
</html>`;
}

// Template HTML para recordatorio de segundo pago
function generateSecondPaymentReminderHTML(
  entityData: EntityData,
  responsibleData: ResponsibleData,
  planData: PlanData,
  amount: number
) {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Recordatorio Segundo Pago - custodia360</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #3b82f6, #1e40af); color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; }
        .payment-box { background: #dbeafe; border: 2px solid #3b82f6; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
        .info-box { background: #f3f4f6; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; }
        .footer { background: #374151; color: white; padding: 20px; text-align: center; }
        .btn { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; }
        .highlight { color: #3b82f6; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🛡️ custodia360</h1>
            <h2>Recordatorio de Pago</h2>
        </div>

        <div class="content">
            <h3>Hola ${responsibleData.nombreResponsable},</h3>

            <p>Esperamos que estés satisfecho/a con el servicio de custodia360 para <strong>${entityData.nombreEntidad}</strong>.</p>

            <div class="payment-box">
                <h3>💳 Segundo Pago Programado</h3>
                <p>Plan: <strong>${planData.title}</strong></p>
                <p>Importe: <span class="highlight">${amount.toFixed(2)}€</span></p>
                <p>El cargo se realizará automáticamente en los próximos días</p>
            </div>

            <div class="info-box">
                <h4>✅ Durante estos 6 meses has disfrutado de:</h4>
                <ul>
                    <li>✅ Cumplimiento LOPIVI completo y actualizado</li>
                    <li>✅ Dashboard de gestión siempre accesible</li>
                    <li>✅ Soporte técnico incluido</li>
                    <li>✅ Mantenimiento automático</li>
                    <li>✅ Actualizaciones normativas</li>
                </ul>
            </div>

            <div class="info-box">
                <h4>🚀 Los próximos 6 meses incluyen:</h4>
                <ul>
                    <li>🔄 Continuidad del servicio sin interrupciones</li>
                    <li>📧 Soporte técnico prioritario</li>
                    <li>📊 Nuevas funcionalidades del dashboard</li>
                    <li>⚖️ Actualizaciones normativas automáticas</li>
                </ul>
            </div>

            <h3>📞 ¿Tienes alguna pregunta?</h3>
            <div class="info-box">
                <p><strong>Soporte:</strong> ${process.env.SUPPORT_EMAIL || 'soporte@custodia360.es'}</p>
                <p><strong>Teléfono:</strong> ${process.env.COMPANY_PHONE || '678 771 198'}</p>
            </div>
        </div>

        <div class="footer">
            <p><strong>${process.env.COMPANY_NAME || 'custodia360'}</strong></p>
            <p>Protegiendo entidades desde 2024</p>
        </div>
    </div>
</body>
</html>`;
}

// Template HTML para email de bienvenida
function generateWelcomeHTML(
  entityData: EntityData,
  responsibleData: ResponsibleData,
  planData: PlanData
) {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Bienvenido a custodia360</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; }
        .welcome-box { background: #ecfdf5; border: 2px solid #10b981; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
        .steps-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .footer { background: #374151; color: white; padding: 20px; text-align: center; }
        .btn { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; }
        .highlight { color: #10b981; font-weight: bold; }
        .step { margin: 15px 0; padding: 15px; background: white; border-left: 4px solid #10b981; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 ¡Bienvenido a custodia360!</h1>
            <h2>Tu implementación LOPIVI ha comenzado</h2>
        </div>

        <div class="content">
            <div class="welcome-box">
                <h2>¡Hola ${responsibleData.nombreResponsable}!</h2>
                <p>Tu entidad <strong>${entityData.nombreEntidad}</strong> está ahora en proceso de implementación LOPIVI.</p>
                <p>En menos de <span class="highlight">24 horas</span> estarás completamente protegido.</p>
            </div>

            <h3>📋 Lo que está sucediendo ahora:</h3>
            <div class="steps-box">
                <div class="step">
                    <strong>🔍 Paso 1: Análisis de tu entidad</strong><br>
                    Estamos creando tu perfil específico basado en tu tipo de entidad y número de menores.
                </div>
                <div class="step">
                    <strong>👥 Paso 2: Preparación de personal</strong><br>
                    Configurando el sistema de verificación y formación para tu equipo.
                </div>
                <div class="step">
                    <strong>🛡️ Paso 3: Asignación de delegado</strong><br>
                    Preparando la formación especializada para ${responsibleData.nombreResponsable}.
                </div>
                <div class="step">
                    <strong>📄 Paso 4: Generación de protocolos</strong><br>
                    Creando la documentación específica para ${entityData.tipoEntidad}.
                </div>
                <div class="step">
                    <strong>✅ Paso 5: Activación completa</strong><br>
                    En 24h recibirás tu acceso completo al dashboard y certificados.
                </div>
            </div>

            <h3>📧 Próximas comunicaciones:</h3>
            <div class="steps-box">
                <p>📧 <strong>En 2-4 horas:</strong> Acceso a tu dashboard personal</p>
                <p>📧 <strong>En 12 horas:</strong> Instrucciones para tu equipo</p>
                <p>📧 <strong>En 24 horas:</strong> Certificados y documentación completa</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/demo" class="btn">🖥️ Ver Cómo Funcionará tu Dashboard</a>
            </div>

            <h3>❓ ¿Tienes preguntas?</h3>
            <div class="steps-box">
                <p>Nuestro equipo está aquí para ayudarte:</p>
                <p><strong>📧 Email:</strong> ${process.env.SUPPORT_EMAIL || 'soporte@custodia360.es'}</p>
                <p><strong>📞 Teléfono:</strong> ${process.env.COMPANY_PHONE || '678 771 198'}</p>
                <p><strong>⏰ Horario:</strong> Lunes a Viernes 9:00 - 18:00</p>
            </div>
        </div>

        <div class="footer">
            <p><strong>Gracias por confiar en custodia360</strong></p>
            <p>Tu entidad estará protegida en menos de 24 horas</p>
        </div>
    </div>
</body>
</html>`;
}
