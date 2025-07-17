# Configuración de custodia360 para Producción 🚀

## 📋 Guía Completa de Configuración para Producción

### 1. **Configuración de Stripe (REQUERIDO)**

#### Paso 1: Crear cuenta de Stripe
1. Ve a [https://stripe.com](https://stripe.com)
2. Regístrate o inicia sesión
3. **IMPORTANTE**: Completa la verificación de identidad de tu empresa
4. Activa tu cuenta para pagos reales (puede tomar 1-2 días hábiles)

#### Paso 2: Obtener claves de producción
1. En el dashboard de Stripe, ve a **Developers → API keys**
2. **Activa "Live mode"** (toggle en la esquina superior derecha)
3. Copia las siguientes claves **LIVE**:
   - **Live Publishable key** (pk_live_...)
   - **Live Secret key** (sk_live_...)

#### Paso 3: Configurar webhooks para producción
1. En Stripe Dashboard (modo LIVE), ve a **Developers → Webhooks**
2. Crea un nuevo endpoint: `https://custodia360.es/api/webhooks/stripe`
3. Selecciona estos eventos críticos:
   - `payment_intent.succeeded` ✅
   - `payment_intent.payment_failed` ❌
   - `invoice.payment_succeeded` ✅ (segundo pago)
   - `invoice.payment_failed` ❌ (segundo pago)
   - `invoice.upcoming` 📋 (recordatorios)
   - `customer.subscription.created` 📅
4. Copia el **Webhook signing secret** (whsec_...)

### 2. **Configuración de Emails con Resend (REQUERIDO)**

#### Paso 1: Crear cuenta en Resend
1. Ve a [https://resend.com](https://resend.com)
2. Regístrate con tu email corporativo
3. Verifica tu cuenta

#### Paso 2: Configurar dominio
1. En Resend Dashboard, ve a **Domains**
2. Añade tu dominio: `custodia360.es`
3. Configura los registros DNS:
   ```
   TXT record: _resend.custodia360.es = "resend-verify-xxxxx"
   MX record: custodia360.es = "feedback-smtp.resend.com" (priority 10)
   ```
4. Verifica el dominio (puede tomar hasta 24h)

#### Paso 3: Obtener API key
1. Ve a **API Keys** en Resend
2. Crea una nueva API key para producción
3. Copia la clave (re_...)

### 3. **Variables de Entorno de Producción**

Crea un archivo `.env.local` (o configura en tu hosting):

```bash
# === STRIPE CONFIGURACIÓN LIVE ===
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51234567890abcdef...
STRIPE_SECRET_KEY=sk_live_51234567890abcdef...
STRIPE_WEBHOOK_SECRET=whsec_1234567890abcdef...

# === APP CONFIGURATION ===
NEXT_PUBLIC_APP_URL=https://custodia360.es

# === EMAIL CONFIGURATION (RESEND) ===
RESEND_API_KEY=re_1234567890abcdef...
FROM_EMAIL=noreply@custodia360.es
SUPPORT_EMAIL=soporte@custodia360.es
SALES_EMAIL=ventas@custodia360.es

# === COMPANY INFORMATION ===
COMPANY_NAME=custodia360
COMPANY_ADDRESS=Barcelona, España
COMPANY_PHONE=+34 678 771 198

# === FEATURE FLAGS ===
ENABLE_EMAIL_NOTIFICATIONS=true
ENABLE_WEBHOOK_LOGGING=true
ENABLE_ANALYTICS=true
```

### 4. **Configuración de Dominio y DNS**

#### Registros DNS requeridos:
```bash
# Dominio principal
A record: custodia360.es → [IP_DE_TU_SERVIDOR]
CNAME: www.custodia360.es → custodia360.es

# Para emails (Resend)
TXT: _resend.custodia360.es → "resend-verify-xxxxx"
MX: custodia360.es → feedback-smtp.resend.com (prioridad 10)

# SSL Certificate (Let's Encrypt)
# Se configura automáticamente en Netlify/Vercel
```

### 5. **Deploy y Hosting**

#### Opción A: Netlify (Recomendado)
```bash
# 1. Build de producción
bun run build

# 2. Deploy automático
# Conecta el repo de GitHub a Netlify
# Configura las variables de entorno en Netlify UI
# URL: https://app.netlify.com/sites/[tu-site]/settings/deploys#environment-variables
```

#### Opción B: Vercel
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel --prod

# 3. Configurar variables de entorno en Vercel Dashboard
```

### 6. **Testing de Producción**

#### Test de pagos reales (modo Live):
⚠️ **ADVERTENCIA**: Usarás tarjetas reales y se cobrarán importes reales

```bash
# Tarjetas de prueba para Live mode:
# NO EXISTEN - Solo tarjetas reales funcionan

# Para testing seguro:
# 1. Usa una tarjeta propia con límite bajo
# 2. Haz un pago pequeño (18,44€)
# 3. Verifica que llegan todos los emails
# 4. Reembolsa desde Stripe Dashboard
```

#### Test de emails:
1. ✅ Email de confirmación al cliente
2. ✅ Notificación al equipo de ventas
3. ✅ Email de bienvenida (con delay)
4. ✅ Recordatorio de segundo pago

### 7. **Monitorización y Logs**

#### Stripe Dashboard:
- **Payments**: Monitoriza todos los pagos
- **Customers**: Gestión de clientes
- **Subscriptions**: Seguimiento de segundos pagos
- **Webhooks**: Logs de eventos

#### Logs de aplicación:
```bash
# Activar logs detallados
ENABLE_WEBHOOK_LOGGING=true

# Monitorizar logs en producción
# Netlify: Functions logs
# Vercel: Function logs
```

## 🔧 **Funcionalidades en Producción**

### ✅ Sistema de Pagos Completo
- **Pagos únicos**: Primer pago (50% + IVA)
- **Suscripciones**: Segundo pago automático (6 meses)
- **Gestión de fallos**: Reintentos automáticos
- **Reembolsos**: Desde Stripe Dashboard

### ✅ Sistema de Emails Automatizado
- **Confirmación inmediata**: Cliente recibe confirmación al instante
- **Notificación de equipo**: Ventas notificado para comenzar implementación
- **Email de bienvenida**: Con próximos pasos (delay de 1 hora)
- **Recordatorios de pago**: Para segundos pagos fallidos

### ✅ Kit de Comunicación Premium
- **Personalización completa**: Colores, logo, materiales
- **Diferenciador competitivo**: +49€ de valor añadido
- **Entrega 3-5 días**: Después de implementación LOPIVI

### ✅ Gestión de Clientes
- **Metadata completa**: Toda la info del cliente en Stripe
- **Seguimiento automatizado**: Estados y progreso
- **Soporte integrado**: Emails directos al equipo

## 🚀 **Checklist de Lanzamiento**

### Pre-lanzamiento:
- [ ] ✅ Cuenta Stripe activada con verificación completa
- [ ] ✅ Claves live de Stripe configuradas
- [ ] ✅ Webhooks configurados y funcionando
- [ ] ✅ Dominio custodia360.es configurado
- [ ] ✅ Resend configurado con dominio verificado
- [ ] ✅ Variables de entorno de producción configuradas
- [ ] ✅ SSL certificate activo
- [ ] ✅ Test de pago real completado exitosamente
- [ ] ✅ Test de emails funcionando
- [ ] ✅ Dashboard de monitorización configurado

### Post-lanzamiento:
- [ ] ✅ Monitorizar logs de pagos
- [ ] ✅ Verificar entrega de emails
- [ ] ✅ Seguimiento de webhooks de Stripe
- [ ] ✅ Analytics de conversión activo
- [ ] ✅ Soporte al cliente operativo
- [ ] ✅ Proceso de implementación LOPIVI documentado

## 📊 **KPIs a Monitorizar**

### Conversión:
- **Tasa de conversión**: Visitantes → Pagos
- **Valor del ticket promedio**: Con/sin kit comunicación
- **Tiempo en completar pago**: Optimización del funnel
- **Abandono por paso**: Mejorar UX

### Pagos:
- **Pagos exitosos**: Primeros y segundos pagos
- **Fallos de pago**: Identificar patrones
- **Reembolsos**: Motivos y frecuencia
- **Chargeback rate**: < 1% objetivo

### Emails:
- **Tasa de entrega**: > 99% objetivo
- **Open rate**: > 80% objetivo
- **Click-through rate**: Engagement con emails
- **Spam complaints**: < 0.1% objetivo

## 🎯 **Resultado Final**

Una vez configurado todo:

✅ **custodia360 estará completamente operativo** con:
- 💳 Pagos reales procesados por Stripe
- 📧 Emails automatizados profesionales
- 🔄 Gestión automática de suscripciones
- 📊 Monitorización completa de métricas
- 🛡️ Seguridad enterprise level
- 📱 UX optimizada para conversión máxima

**¡Una máquina de conversión completamente automatizada lista para generar contratos reales!** 🚀

---

## 🆘 **Soporte Técnico**

Si necesitas ayuda con la configuración:
- 📧 **Soporte técnico**: dev@custodia360.es
- 📞 **Teléfono**: +34 678 771 198
- 🕒 **Horario**: Lunes a Viernes 9:00 - 18:00
