# DOC_SEO_SEARCH_CONSOLE.md — Guía Google Search Console
## nexelldox.com — Configuración, verificación y optimización
**Fecha**: 5 marzo 2026
**Propiedad**: nexelldox.com
**Verificación**: HTML tag (activa desde 4 mar 2026)

---

## RESUMEN EJECUTIVO

Google Search Console (GSC) es la herramienta gratuita de Google para monitorizar la presencia de nexelldox.com en los resultados de búsqueda. Permite:

- Ver qué páginas están indexadas
- Detectar errores de rastreo
- Enviar el sitemap
- Solicitar indexación de URLs nuevas
- Ver las queries por las que apareces
- Detectar problemas de rendimiento web

**Estado actual**: Verificado por HTML tag. Sitemap enviado. Campaña Google Ads activa (PMax, 15€/día). Dominio con 1 día de antigüedad — Google necesita 2-14 días para indexar completamente.

---

## 1. TIPO DE PROPIEDAD — DECISIÓN

### Opción elegida: URL Prefix (`https://nexelldox.com`)

| Criterio | URL Prefix | Domain Property |
|----------|-----------|----------------|
| Verificación | HTML tag ✅ | Requiere DNS TXT |
| Configuración | Más sencilla | Requiere acceso DNS |
| Datos | Solo https://nexelldox.com | Incluye http + www + subdominios |
| Recomendado para | Sitios simples, un dominio | Sitios con subdominios |

**Justificación**: nexelldox.com no tiene subdominios, no tiene versión www activa (redirige correctamente), y HTTPS está forzado. URL Prefix cubre el 100% del tráfico real.

### Opcional: Añadir Domain Property como complemento
Si quieres visibilidad total (incluyendo posibles variantes http/www):
1. Ir a GSC → Añadir propiedad
2. Seleccionar "Domain"
3. Introducir `nexelldox.com`
4. Verificar con registro TXT en Porkbun DNS:
   - Tipo: TXT
   - Host: `@`
   - Valor: El que proporcione GSC
   - TTL: 600

---

## 2. VERIFICACIÓN — ESTADO

### Método activo: HTML meta tag
```html
<meta name="google-site-verification" content="Du2-26c9c18j9zjOcC0NswO0q2GnMj7-2gjjOuci9i4">
<meta name="google-site-verification" content="Ewri1irvgcTkeHsYWPlRHpEgUAmtqI8kf-wkyMrVfoA">
```

Ambos tags están en `index.html` (líneas 22-23). La verificación es permanente mientras los tags permanezcan.

### Métodos alternativos disponibles (no necesarios actualmente)
- **Archivo HTML**: Subir archivo de verificación al root
- **DNS TXT**: Registro TXT en Porkbun (necesario solo para Domain Property)
- **Google Analytics**: Si se implementa GA4
- **Google Tag Manager**: Si se implementa GTM

---

## 3. SITEMAP — CONFIGURACIÓN

### Sitemap actual
- **URL**: `https://nexelldox.com/sitemap.xml`
- **Formato**: XML 1.0 con namespace xhtml (hreflang)
- **URLs incluidas**: 12
- **Declarado en**: robots.txt

### Estructura del sitemap
```
12 URLs totales:
├── / (home) — priority 1.0, weekly
├── 8 landing pages — priority 0.9, monthly
│   ├── /legalizar-aire-acondicionado
│   ├── /legalizar-instalacion-electrica
│   ├── /legalizar-aerotermia
│   ├── /legalizar-caldera
│   ├── /memoria-tecnica-diseno
│   ├── /inspeccion-oca
│   ├── /certificados-ahorro-energetico
│   └── /regularizacion-instalaciones
└── 3 páginas legales — priority 0.3, yearly
    ├── /aviso-legal
    ├── /politica-privacidad
    └── /condiciones-servicio
```

### Enviar/actualizar sitemap en GSC
1. Ir a GSC → **Sitemaps** (menú izquierdo)
2. En "Añadir un nuevo sitemap", escribir: `sitemap.xml`
3. Clic en **Enviar**
4. Verificar que el estado cambie a "Correcto" (puede tardar minutos)
5. Si ya estaba enviado, GSC lo re-procesa automáticamente al detectar cambios en `<lastmod>`

---

## 4. GEO-TARGETING

### Configuración actual
GSC ya no permite establecer geo-targeting manual por país (se eliminó la opción "International Targeting"). Google determina el target geográfico automáticamente mediante:

1. **hreflang tags** (implementado): `es-ES` en todas las páginas + sitemap
2. **Geo meta tags** (implementado): `geo.region=ES-MD`, `geo.placename=Madrid, España`
3. **Dominio**: `.com` (genérico, no es ccTLD)
4. **Contenido**: Todo en español, referencias a Madrid y España
5. **Schema.org**: `areaServed` con Madrid y España

### Señales adicionales recomendadas
- **Google Business Profile**: Crear perfil en Google (maps.google.com) con dirección de Camarma de Esteruelas → refuerza localización
- **NAP consistente**: Name, Address, Phone iguales en web, GBP y directorios

---

## 5. INSPECCIÓN DE URLs — PASO A PASO

### Solicitar indexación de una URL nueva
1. Ir a GSC → **Inspección de URLs** (barra superior)
2. Pegar la URL completa, ej: `https://nexelldox.com/legalizar-aire-acondicionado`
3. Esperar el resultado de la inspección
4. Si dice "La URL no está en Google":
   - Clic en **Solicitar indexación**
   - Esperar confirmación "Solicitud de indexación enviada"
5. Repetir para cada URL del sitemap

### URLs a indexar manualmente (prioridad)
Ejecutar en este orden:
1. `https://nexelldox.com/`
2. `https://nexelldox.com/legalizar-aire-acondicionado`
3. `https://nexelldox.com/legalizar-instalacion-electrica`
4. `https://nexelldox.com/legalizar-aerotermia`
5. `https://nexelldox.com/legalizar-caldera`
6. `https://nexelldox.com/memoria-tecnica-diseno`
7. `https://nexelldox.com/inspeccion-oca`
8. `https://nexelldox.com/certificados-ahorro-energetico`
9. `https://nexelldox.com/regularizacion-instalaciones`
10. `https://nexelldox.com/aviso-legal`
11. `https://nexelldox.com/politica-privacidad`
12. `https://nexelldox.com/condiciones-servicio`

**Nota**: Google limita las solicitudes de indexación. Si aparece un límite, esperar 24h y continuar.

### Interpretar resultados de inspección
| Estado | Significado | Acción |
|--------|------------|--------|
| "URL está en Google" | Indexada correctamente | Nada |
| "URL no está en Google" | No indexada aún | Solicitar indexación |
| "URL es una alternativa" | Google prefiere otra versión | Verificar canonical |
| "Excluida: no seleccionada como canónica" | Google eligió otra URL | Verificar duplicados |
| "Rastreada, no indexada actualmente" | Google la vio pero no la incluyó | Mejorar contenido |

---

## 6. COBERTURA — MONITORIZACIÓN

### Dónde ver el estado de indexación
1. GSC → **Páginas** (menú izquierdo, sección "Indexación")
2. Gráfico muestra:
   - **Páginas indexadas** (verde): Aparecen en Google
   - **Páginas no indexadas** (gris): No aparecen

### Errores comunes y soluciones
| Error | Causa probable | Solución |
|-------|---------------|----------|
| "No encontrada (404)" | URL cambió o no existe | Verificar URL en sitemap |
| "Redireccionada" | Redirección detectada | Actualizar sitemap con URL final |
| "Bloqueada por robots.txt" | robots.txt bloquea la URL | Revisar robots.txt |
| "Duplicada, sin canónica" | Dos URLs misma página | Añadir/corregir canonical |
| "Rastreada, no indexada" | Contenido insuficiente | Mejorar contenido de la página |

### Frecuencia de revisión
- **Semana 1-2** (ahora): Revisar diariamente — ver si Google empieza a indexar
- **Semana 3-4**: Cada 2-3 días
- **Mes 2+**: Semanal

---

## 7. RENDIMIENTO — MÉTRICAS CLAVE

### Dónde ver las métricas
GSC → **Rendimiento** → **Resultados de búsqueda**

### Métricas principales
| Métrica | Qué mide | Objetivo |
|---------|----------|----------|
| Clics | Visitas desde Google | Crecimiento mensual |
| Impresiones | Veces que apareces | > 100/semana al mes 2 |
| CTR | Clics / Impresiones | > 3% para landing pages |
| Posición media | Ranking promedio | < 20 para keywords target |

### Filtros útiles
- **Queries**: Ver por qué búsquedas apareces
- **Páginas**: Ver qué páginas reciben tráfico
- **Países**: Verificar que España domina
- **Dispositivos**: Verificar rendimiento móvil vs escritorio

---

## 8. CORE WEB VITALS

### Dónde verlos
GSC → **Experiencia** → **Métricas web principales**

### Métricas
| Métrica | Bueno | Necesita mejora | Malo |
|---------|-------|----------------|------|
| LCP (Largest Contentful Paint) | < 2.5s | 2.5-4s | > 4s |
| INP (Interaction to Next Paint) | < 200ms | 200-500ms | > 500ms |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.1-0.25 | > 0.25 |

**Expectativa para nexelldox.com**: GitHub Pages con CDN Fastly debería tener buenos Core Web Vitals. CSS inline evita render-blocking. Sin imágenes pesadas. Probable resultado: todo en verde.

---

## 9. ENLACES — MONITORIZACIÓN

### Dónde verlos
GSC → **Enlaces** (menú izquierdo)

### Qué monitorizar
- **Enlaces externos**: Otros sitios que enlazan a nexelldox.com
- **Enlaces internos**: Estructura de links entre tus páginas
- **Sitios con más enlaces**: Principales referentes

### Estrategia de link building (orgánico)
1. **Directorios profesionales**: Registrar en directorios de instaladores (páginas amarillas, infoconstruccion.es, etc.)
2. **Google Business Profile**: Enlace desde GBP a la web
3. **Redes sociales**: Perfiles con enlace (LinkedIn empresa)
4. **Contenido linkeable**: FAQs y guías informativas ya atraen enlaces naturales

---

## 10. CHECKLIST DE CONFIGURACIÓN INICIAL

### Inmediato (hoy)
- [x] Verificar propiedad en GSC (HTML tag)
- [x] Enviar sitemap.xml
- [x] Revisar robots.txt
- [ ] Solicitar indexación manual de las 12 URLs (ver sección 5)
- [ ] Verificar que no hay errores en cobertura

### Primera semana
- [ ] Revisar cobertura diariamente
- [ ] Verificar que las páginas empiezan a indexarse
- [ ] Comprobar que no aparecen errores 404

### Primer mes
- [ ] Revisar métricas de rendimiento semanalmente
- [ ] Analizar queries por las que apareces
- [ ] Verificar Core Web Vitals
- [ ] Crear Google Business Profile
- [ ] Revisar y corregir cualquier error de cobertura

### Segundo mes en adelante
- [ ] Análisis mensual de rendimiento
- [ ] Optimizar titles/descriptions según CTR real
- [ ] Identificar queries con impresiones pero pocos clics
- [ ] Considerar contenido adicional (blog, precios, testimonios)

---

## 11. URLs PARÁMETROS

### Estado actual
nexelldox.com no usa parámetros URL (?utm_source, ?ref, etc.). Si se implementan en el futuro:

- **UTM parameters** (Google Ads): Google los ignora automáticamente para indexación
- **Filtros o paginación**: No aplica (sitio estático)
- **Tracking**: El Google Ads tag (AW-17992598707) usa scripts, no parámetros URL

**Conclusión**: No requiere configuración de parámetros URL en GSC.

---

## 12. ACCESO A GSC

### URL de acceso
https://search.google.com/search-console?resource_id=https://nexelldox.com/

### Usuarios con acceso
Configurar en GSC → Configuración → Usuarios y permisos:
- **Propietario**: Cuenta Google vinculada a la verificación
- **Recomendación**: Añadir una segunda cuenta como propietario de respaldo

---

*Documento generado el 5 marzo 2026 por Claude para Nexell Instalaciones*
