# 🚀 Guía de Despliegue - Fitness Tracker

## Despliegue en Vercel (Recomendado)

### Opción 1: Despliegue Automático desde GitHub (Recomendado)

1. **Ve a Vercel:** https://vercel.com
2. **Haz clic en "New Project"**
3. **Conecta tu cuenta de GitHub** (si no está conectada)
4. **Selecciona el repositorio:** `fitness-tracker`
5. **Vercel detectará automáticamente:**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. **Haz clic en "Deploy"**

Vercel desplegará automáticamente cada vez que hagas push a `master`.

### Opción 2: Despliegue Manual con Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Desplegar
vercel

# Para producción
vercel --prod
```

## Configuración de Dominio Personalizado

1. En Vercel Dashboard, ve a tu proyecto
2. Haz clic en "Settings" → "Domains"
3. Agrega tu dominio personalizado
4. Sigue las instrucciones de DNS

## Variables de Entorno

Si necesitas variables de entorno:

1. Ve a "Settings" → "Environment Variables"
2. Agrega tus variables
3. Redeploy

## Monitoreo

- **Vercel Analytics:** Automático
- **Performance:** Dashboard de Vercel
- **Logs:** En "Deployments" → "Logs"

## Rollback

Si algo sale mal:

1. Ve a "Deployments"
2. Selecciona un deployment anterior
3. Haz clic en "Promote to Production"

## Troubleshooting

### Build falla
- Verifica que `npm run build` funciona localmente
- Revisa los logs en Vercel

### Sitio muestra error 404
- Asegúrate que `dist/index.html` existe
- Verifica que `outputDirectory` es `dist`

### Datos no persisten
- IndexedDB funciona en el navegador
- Los datos se guardan localmente en cada dispositivo

## Soporte

Para más información: https://vercel.com/docs
