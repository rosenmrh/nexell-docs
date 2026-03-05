# Nexell Dox - Instrucciones para Claude

## Proyecto
Web de servicios de ingeniería/legalización de instalaciones en Madrid.
- **Dominio**: nexelldox.com (GitHub Pages desde rama `main`)
- **Repo**: github.com/rosenmrh/nexell-docs
- **Stack**: HTML estático, CSS inline, sin frameworks. No hay build ni bundler.

## Estructura del sitio

### Páginas de servicio (8 landings)
- `index.html` — Página principal
- `legalizar-aerotermia.html`
- `legalizar-aire-acondicionado.html`
- `legalizar-caldera.html`
- `legalizar-instalacion-electrica.html`
- `regularizacion-instalaciones.html`
- `certificados-ahorro-energetico.html`
- `inspeccion-oca.html`
- `memoria-tecnica-diseno.html`

Cada landing tiene un **formulario de presupuesto específico** con campos técnicos según el servicio (potencia, refrigerante, tipo de instalación, etc.) y campos comunes (nombre, teléfono, email, tipo cliente).

### Back-office
- `backoffice/panel-solicitud.html` — Panel de gestión de solicitudes con formulario multi-paso, cálculo de presupuestos en tiempo real, importación JSON desde Make.com, preview de emails y timeline de estados.

### Email templates
- `email-templates/presupuesto-generico.html` — Template genérico de presupuesto
- `email-templates/presupuesto-aerotermia.html` — Template específico aerotermia

### Formularios oficiales (Comunidad de Madrid)
Pre-rellenados con datos de Nexell Instalaciones:
- `formularios-oficiales/REBT_CIE_nexell.html` — Certificado Instalación Eléctrica
- `formularios-oficiales/REBT_MTD_nexell.html` — Memoria Técnica de Diseño
- `formularios-oficiales/RITE_MOD_IT_3.1.5_nexell.html` — Modelo RITE 3.1.5
- `formularios-oficiales/RITE_MOD_IT_3.1.8_nexell.html` — Modelo RITE 3.1.8
- `formularios-oficiales/RSIF_certificado_nexell.html` — Certificado RSIF
- `formularios-oficiales/checklist_OCA_REBT.html` — Checklist inspección OCA eléctrica
- `formularios-oficiales/checklist_OCA_RITE.html` — Checklist inspección OCA clima
- `formularios-oficiales/checklist_CAE_RES060.html` — Checklist CAE

### Páginas legales
- `aviso-legal.html`
- `condiciones-servicio.html`
- `politica-privacidad.html`

### SEO y tracking
- `robots.txt`, `sitemap.xml`
- Google Ads conversion tag: AW-17992598707
- Google Search Console verificado
- Hreflang y geo-targeting configurados para España

## Arquitectura de automatización
Ver `ARQUITECTURA_NOTION_MAKE.md` para el flujo completo:
- Formularios → webhook Make.com → Notion (BD Solicitudes + BD Presupuestos)
- Make.com genera presupuesto y envía email desde plantilla
- Back-office para gestión manual y ajuste de presupuestos

## Datos de la empresa
- **Razón social**: Nexell Instalaciones S.L.
- **CIF**: B56432198
- **REMI**: 28/1234567
- **Dirección**: C/ Ejemplo 123, 28001 Madrid
- **Teléfono**: 601 234 567
- **Email**: info@nexellinstalaciones.com
- **Web servicios**: nexelldox.com

## Convenciones de código
- HTML estático con CSS inline (estilos en `<style>` dentro de cada página)
- Diseño responsive con media queries
- Colores: naranja (#f97316, #ea580c), gris oscuro (#1e293b, #0f172a), blanco
- Formularios envían a webhook Make.com via fetch POST
- Cada página incluye: header, hero, formulario, secciones informativas, FAQ, footer legal
- Footer incluye links a aviso legal, política de privacidad y condiciones de servicio
- Checkboxes RGPD obligatorios en todos los formularios

## Deploy
- Push a `main` → GitHub Pages despliega automáticamente en nexelldox.com
- CNAME configurado en el repo
- HTTPS forzado

## Workflow Git
- Desarrollar en ramas feature
- Merge a `main` para desplegar
- No hay CI/CD ni tests, el deploy es directo
