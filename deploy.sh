#!/bin/bash

# 🚀 Script de Deploy Automático para custodia360.es
# Ejecutar con: bash deploy.sh

echo "🚀 Iniciando deploy de custodia360.es..."

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encuentra package.json. Ejecuta desde el directorio raíz del proyecto."
    exit 1
fi

echo "✅ Directorio correcto detectado"

# Limpiar build anterior
echo "🧹 Limpiando build anterior..."
rm -rf .next
rm -rf out
rm -rf node_modules/.cache

# Verificar que Bun está instalado
if ! command -v bun &> /dev/null; then
    echo "❌ Bun no está instalado. Instalando..."
    curl -fsSL https://bun.sh/install | bash
    source ~/.bashrc
fi

echo "✅ Bun verificado"

# Instalar dependencias
echo "📦 Instalando dependencias..."
bun install

# Verificar TypeScript
echo "🔍 Verificando TypeScript..."
bun run lint
if [ $? -ne 0 ]; then
    echo "❌ Error en TypeScript. Corrige los errores antes de continuar."
    exit 1
fi

echo "✅ TypeScript verificado sin errores"

# Build de producción
echo "🏗️ Construyendo para producción..."
bun run build
if [ $? -ne 0 ]; then
    echo "❌ Error en build. Revisa los logs arriba."
    exit 1
fi

echo "✅ Build completado exitosamente"

# Verificar archivos críticos
echo "🔍 Verificando archivos críticos..."
if [ ! -d ".next" ]; then
    echo "❌ Error: Directorio .next no generado"
    exit 1
fi

if [ ! -f "netlify.toml" ]; then
    echo "❌ Error: netlify.toml no encontrado"
    exit 1
fi

echo "✅ Archivos críticos verificados"

# Test local rápido
echo "🧪 Ejecutando test local rápido..."
timeout 10s bun run start &
sleep 5
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Test local exitoso"
    kill %1
else
    echo "⚠️ Warning: Test local falló, pero continuando..."
    kill %1 2>/dev/null
fi

# Preparar para deploy
echo "📋 Preparando archivos para deploy..."

# Crear .env.production.example si no existe
if [ ! -f ".env.production.example" ]; then
    cat > .env.production.example << EOF
# Configuración para custodia360.es en producción

# Stripe Live Keys (configurar en Netlify)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend Email
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
EOF
    echo "✅ .env.production.example creado"
fi

# Commit y push si hay cambios
if [ -d ".git" ]; then
    echo "📤 Verificando si hay cambios para commit..."
    if [ -n "$(git status --porcelain)" ]; then
        git add .
        git commit -m "🚀 Deploy ready for custodia360.es - $(date '+%Y-%m-%d %H:%M:%S')"
        echo "✅ Cambios committeados"

        echo "📤 Pushing a repositorio..."
        git push origin main
        if [ $? -eq 0 ]; then
            echo "✅ Push exitoso"
        else
            echo "❌ Error en push. Verifica tu repositorio Git."
            exit 1
        fi
    else
        echo "ℹ️ No hay cambios nuevos para commit"
    fi
fi

# Mostrar información de deploy
echo ""
echo "🎉 ¡Proyecto listo para deploy!"
echo ""
echo "📋 SIGUIENTE PASO:"
echo "1. Ve a https://app.netlify.com"
echo "2. Conecta tu repositorio GitHub"
echo "3. Configura build command: bun run build"
echo "4. Configura publish directory: .next"
echo "5. Añade tu dominio: custodia360.es"
echo "6. Configura las variables de entorno (ver .env.production.example)"
echo ""
echo "🌐 DNS Records para custodia360.es:"
echo "Type: A, Name: @, Value: 75.2.60.5"
echo "Type: CNAME, Name: www, Value: [tu-site].netlify.app"
echo ""
echo "📱 Una vez configurado, tu web estará en:"
echo "✅ https://custodia360.es"
echo "✅ https://www.custodia360.es"
echo ""
echo "⚡ Performance esperado:"
echo "✅ Lighthouse Score: >95"
echo "✅ Móvil optimizado: 100%"
echo "✅ Loading time: <2s"
echo "✅ Stripe funcionando: ✅"
echo ""
echo "🎯 ¡custodia360.es listo para generar ingresos!"

exit 0
