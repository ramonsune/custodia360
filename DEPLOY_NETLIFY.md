# 🚀 Deploy custodia360.es en Netlify - Guía Completa

## ✅ **CONFIGURACIÓN COMPLETA PARA custodia360.es**

### **Paso 1: Preparar el Proyecto para Deploy (2 minutos)**

```bash
# 1. Crear build de producción
cd custodia360
bun run build

# 2. Verificar que todo funciona
bun run start  # Probar la build en local
```

### **Paso 2: Conectar a Netlify (3 minutos)**

#### **Opción A: Deploy directo desde GitHub (Recomendado)**
1. Ve a [https://app.netlify.com](https://app.netlify.com)
2. Haz login con tu cuenta
3. Click en **"New site from Git"**
4. Conecta tu cuenta de GitHub
5. Selecciona el repositorio de custodia360
6. Configuración de build:
   ```
   Build command: bun run build
   Publish directory: .next
   Node version: 18
   ```
7. Click **"Deploy site"**

#### **Opción B: Deploy manual**
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login en Netlify
netlify login

# Deploy manual
netlify deploy --prod --dir=.next
```

### **Paso 3: Configurar Dominio custodia360.es (5 minutos)**

#### **En Netlify Dashboard:**
1. Ve a tu site en Netlify
2. Click en **"Domain settings"**
3. Click en **"Add custom domain"**
4. Escribe: `custodia360.es`
5. Click **"Verify"** y **"Add domain"**
6. Netlify te dará los DNS records que necesitas

#### **En tu Proveedor de Dominio (donde tienes custodia360.es):**
Configura estos registros DNS:

```bash
# Registros DNS OBLIGATORIOS:

# Para el dominio principal
Type: A
Name: @
Value: 75.2.60.5

# Para www
Type: CNAME
Name: www
Value: custodia360.netlify.app

# Para subdominio (opcional)
Type: CNAME
Name: *
Value: custodia360.netlify.app
```

**⚠️ IMPORTANTE:** Los DNS pueden tomar 1-24 horas en propagarse completamente.

### **Paso 4: Configurar Variables de Entorno en Netlify (3 minutos)**

#### **En Netlify Dashboard:**
1. Ve a **Site settings → Environment variables**
2. Click **"Add variable"** para cada una:

```bash
# Variables OBLIGATORIAS para producción:

# Stripe Live Keys (cuando las tengas)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend Email (cuando lo configures)
RESEND_API_KEY=re_...
FROM_EMAIL=noreply@custodia360.es
SUPPORT_EMAIL=soporte@custodia360.es
SALES_EMAIL=ventas@custodia360.es

# App Configuration
NEXT_PUBLIC_APP_URL=https://custodia360.es

# Feature Flags
ENABLE_EMAIL_NOTIFICATIONS=true
ENABLE_WEBHOOK_LOGGING=true
ENABLE_ANALYTICS=true

# Company Info
COMPANY_NAME=custodia360
COMPANY_ADDRESS=Barcelona, España
COMPANY_PHONE=+34 678 771 198
```

### **Paso 5: Configurar SSL Certificate (Automático)**

Netlify configurará automáticamente:
- ✅ **SSL Certificate** (Let's Encrypt)
- ✅ **HTTPS redirect** automático
- ✅ **CDN global** para velocidad máxima

### **Paso 6: Verificar que Todo Funciona**

#### **Tests desde tu móvil:**
1. **Abre tu navegador móvil**
2. **Ve a:** `https://custodia360.es`
3. **Ve a:** `https://www.custodia360.es`
4. **Prueba todas las páginas:**
   - ✅ Homepage con dropdown "Contratar Ahora"
   - ✅ /servicios
   - ✅ /planes
   - ✅ /demo (simulador interactivo)
5. **Prueba el formulario Stripe** (modo test por ahora)

#### **Tests de funcionalidad:**
- ✅ **Navegación móvil** perfecta
- ✅ **Dropdown contratar** visible
- ✅ **Formulario Stripe** funcionando
- ✅ **Responsive design** en todos los dispositivos
- ✅ **Velocidad de carga** ultra rápida

## 🔧 **CONFIGURACIÓN DE DEPLOY AUTOMÁTICO**

### **Deploy Automático con Git:**
Una vez configurado, cada vez que hagas `git push`:
1. **Netlify detecta** el cambio automáticamente
2. **Ejecuta build** (`bun run build`)
3. **Deploy automático** a custodia360.es
4. **🎉 Web actualizada** en 2-3 minutos

### **Deploy desde Same.new:**
```bash
# Cuando modifiques algo desde Same.new:
git add .
git commit -m "Actualización desde Same"
git push origin main

# Netlify se actualiza automáticamente
```

## 📱 **VERIFICACIÓN MÓVIL COMPLETA**

### **Tu web en móvil tendrá:**
- ✅ **URL profesional**: custodia360.es
- ✅ **Menú hamburguesa** perfecto
- ✅ **Botones táctiles** optimizados
- ✅ **Formulario Stripe** móvil-friendly
- ✅ **Velocidad ultra-rápida**
- ✅ **SSL certificate** (candado verde)

### **Tests móviles específicos:**
1. **Navegación táctil** fluida
2. **Dropdown "Contratar"** funcional en móvil
3. **Demo interactivo** touch-friendly
4. **Formulario pago** optimizado móvil
5. **Todos los enlaces** funcionando

## 🎯 **MONITORIZACIÓN Y ANALYTICS**

### **Netlify te dará:**
- 📊 **Analytics de tráfico** gratis
- 🚀 **Core Web Vitals** optimizadas
- 🌍 **CDN global** para velocidad
- 🔒 **HTTPS automático** siempre
- 📱 **Responsive perfecto** todos los dispositivos

### **Deploy Logs:**
- ✅ Ver todos los deploys en tiempo real
- ✅ Logs detallados de build
- ✅ Preview de cada deploy antes de hacer live
- ✅ Rollback instantáneo si hay problemas

## ✅ **CHECKLIST FINAL DE DEPLOY**

### **Pre-Deploy:**
- [ ] ✅ Build local funciona (`bun run build`)
- [ ] ✅ Código sin errores TypeScript
- [ ] ✅ Variables de entorno preparadas
- [ ] ✅ Dominio custodia360.es disponible

### **Deploy:**
- [ ] ✅ Site conectado a GitHub/deploy manual
- [ ] ✅ Build settings configurados
- [ ] ✅ Variables de entorno añadidas
- [ ] ✅ Dominio personalizado configurado
- [ ] ✅ DNS records configurados

### **Post-Deploy:**
- [ ] ✅ https://custodia360.es carga correctamente
- [ ] ✅ https://www.custodia360.es funciona
- [ ] ✅ SSL certificate activo (candado verde)
- [ ] ✅ Móvil responsive perfecto
- [ ] ✅ Todos los enlaces funcionan
- [ ] ✅ Stripe form se abre correctamente
- [ ] ✅ Deploy automático configurado

## 🎉 **RESULTADO FINAL**

### **Una vez configurado tendrás:**
- 🌐 **www.custodia360.es** funcionando perfectamente
- 📱 **Móvil optimizado** al 100%
- 🚀 **Deploy automático** con cada cambio
- 🔒 **HTTPS seguro** automático
- ⚡ **CDN global** ultra-rápido
- 📊 **Analytics incluidos** gratis

### **¿Puedes seguir modificando desde Same.new?**
**¡SÍ, AL 100%!**

- ✅ **Editas aquí en Same.new** como siempre
- ✅ **Haces commit y push**
- ✅ **Netlify se actualiza automáticamente**
- ✅ **custodia360.es se actualiza** en 2-3 minutos
- ✅ **Ves cambios desde tu móvil** al instante

**¡Tu web estará funcionando en custodia360.es en menos de 15 minutos!** 🚀

---

## 🆘 **¿Necesitas Ayuda?**

Si tienes algún problema:
1. **Comparte pantallazos** de Netlify dashboard
2. **Dime qué DNS provider** usas para custodia360.es
3. **Te ayudo paso a paso** a configurarlo
4. **Verificamos juntos** que todo funcione en móvil

**¡Vamos a poner custodia360.es online ahora mismo!** 💪
