# 🌐 CONFIGURACIÓN AUTOMÁTICA DE NETLIFY PARA RAMONSUNE

## ✅ **PASOS PARA NETLIFY - SÚPER FÁCIL**

### **🎯 PASO 1: Crear cuenta Netlify**
1. Ve a: https://app.netlify.com
2. Click "Sign up"
3. **IMPORTANTE:** Click "GitHub" (usar tu cuenta GitHub)
4. Autorizar Netlify

### **🎯 PASO 2: Conectar custodia360**
1. Click "New site from Git"
2. Click "GitHub"
3. Buscar y click en "custodia360"
4. **CONFIGURACIÓN EXACTA:**
   ```
   Build command: bun run build
   Publish directory: .next
   Node version: 18
   ```
5. Click "Deploy site"

### **🎯 PASO 3: Configurar custodia360.es**
1. Tu site tendrá nombre como: `amazing-site-123456.netlify.app`
2. Click "Domain settings"
3. Click "Add custom domain"
4. Escribir: `custodia360.es`
5. Click "Verify" → "Add domain"

### **📝 NETLIFY TE DARÁ ESTOS DNS:**
```
Tipo: A
Nombre: @
Valor: 75.2.60.5

Tipo: CNAME
Nombre: www
Valor: [tu-site-netlify].netlify.app
```

---

## 🌐 **GODADDY DNS - CONFIGURACIÓN EXACTA**

### **🎯 VE A GODADDY:**
1. https://godaddy.com → Login
2. "My Products" → "Domains"
3. Click "custodia360.es" → "DNS"

### **🎯 BORRAR REGISTROS EXISTENTES:**
- Si hay registros "A" con nombre "@" → **Eliminar**
- Si hay registros "CNAME" con nombre "www" → **Eliminar**

### **🎯 AÑADIR ESTOS REGISTROS:**

**Registro 1:**
```
Type: A
Name: @
Value: 75.2.60.5
TTL: 1 Hour
```

**Registro 2:**
```
Type: CNAME
Name: www
Value: [COPIA EL NOMBRE DE NETLIFY].netlify.app
TTL: 1 Hour
```

**Click "Save" en cada uno**

---

## ⏰ **TIEMPOS DE ESPERA:**
- **Netlify build:** 5-10 minutos
- **DNS propagación:** 1-24 horas (normalmente 2 horas)

---

## ✅ **VERIFICAR QUE FUNCIONA:**
1. https://www.whatsmydns.net → `custodia360.es` → Tipo `A`
2. Debería mostrar: `75.2.60.5` en verde
3. Cuando esté verde → **custodia360.es funciona** ✅

---

## 📱 **RESULTADO FINAL:**
- ✅ **custodia360.es** carga tu web
- ✅ **www.custodia360.es** también funciona
- ✅ **SSL automático** (candado verde)
- ✅ **Móvil perfecto** optimizado
- ✅ **Ultra-rápido** con CDN global
