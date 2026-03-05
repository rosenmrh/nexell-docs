# SEO_SUGERENCIAS.md — nexelldox.com
## Auditoría SEO técnica y propuestas de optimización
**Fecha**: 5 marzo 2026
**Dominio**: nexelldox.com
**Hosting**: GitHub Pages

---

## 1. RESUMEN EJECUTIVO

### Correcciones aplicadas (5 mar 2026)
- **URLs canonicals**: eliminada extensión `.html` de todas las canonicals → coinciden con sitemap
- **og:url**: sincronizadas con canonicals (sin `.html`)
- **Enlaces internos**: 50+ enlaces corregidos de `slug.html` → `/slug` (rutas limpias)
- **hreflang**: añadido `es-ES` en las 12 páginas + sitemap
- **Geo-targeting**: añadidos `geo.region=ES-MD` y `geo.placename=Madrid, España` en todas las páginas
- **robots.txt**: optimizado con bloqueo de imágenes innecesarias
- **sitemap.xml**: actualizado con namespace `xhtml` y hreflang por URL

### Estado actual
| Aspecto | Estado |
|---------|--------|
| Canonicals | ✅ Limpias, sin .html |
| Sitemap | ✅ 12 URLs, con hreflang |
| robots.txt | ✅ Optimizado |
| hreflang | ✅ es-ES en HTML + sitemap |
| Geo tags | ✅ ES-MD + Madrid, España |
| Schema.org | ✅ JSON-LD en todas las páginas |
| Open Graph | ✅ Completo |
| Twitter Cards | ✅ Completo |
| Internal linking | ✅ Cross-linking entre landings |
| HTTPS | ✅ Forzado (Let's Encrypt) |

---

## 2. ANÁLISIS DE TITLES Y DESCRIPTIONS

### Keywords objetivo
**Primarios**: legalización instalaciones, memorias técnicas, legalizar instalación eléctrica, legalizar aire acondicionado, legalizar aerotermia, legalizar caldera
**Secundarios**: REBT, RITE, RSIF, inspección OCA, certificados ahorro energético, regularización instalaciones
**Geo**: Madrid, toda España, Comunidad de Madrid
**Long-tail B2C**: legalizar aire acondicionado particular, regularizar instalación sin permiso, cuánto cuesta legalizar

### Titles actuales vs propuestos

| Página | Title actual | Propuesta | Motivo |
|--------|-------------|-----------|--------|
| **index.html** | Nexell Dox — Legalización de Instalaciones \| Particulares e Instaladores | Legalización de Instalaciones Eléctricas y Climatización \| Nexell Dox | Keyword primaria al inicio, brand al final |
| **legalizar-aire-acondicionado** | Legalizar Aire Acondicionado \| Documentacion RITE 2026 | Legalizar Aire Acondicionado: Documentación RITE \| Nexell Dox | Añade brand, quita año del title (ponerlo en description) |
| **legalizar-aerotermia** | Legalizar Aerotermia \| Documentacion RITE y RSIF 2026 | Legalizar Aerotermia: Documentación RITE y RSIF \| Nexell Dox | Brand consistency |
| **legalizar-caldera** | Legalizar Caldera \| Documentacion RITE Calderas y ACS | Legalizar Caldera y Calentador: Documentación RITE \| Nexell Dox | Añade calentador (búsqueda frecuente B2C) |
| **legalizar-instalacion-electrica** | Legalizar Instalacion Electrica \| MTD y CIE REBT 2026 | Legalizar Instalación Eléctrica: MTD y CIE REBT \| Nexell Dox | Brand + tildes |
| **memoria-tecnica-diseno** | Memoria Tecnica de Diseno (MTD) \| REBT y RITE 2026 | Memoria Técnica de Diseño (MTD) \| REBT y RITE \| Nexell Dox | Brand + tildes |
| **inspeccion-oca** | Inspeccion OCA \| Preparacion y Documentacion REBT RITE | Inspección OCA: Preparación Documental REBT y RITE \| Nexell Dox | Brand + tildes + claridad |
| **certificados-ahorro-energetico** | Certificados de Ahorro Energetico (CAE) \| Rentabiliza tu Aerotermia 2026 | Certificados de Ahorro Energético (CAE) \| Nexell Dox | Brand + tildes, quitar año |
| **regularizacion-instalaciones** | Regularizar Instalaciones Electricas y de Climatizacion \| Nexell Dox 2026 | Regularizar Instalaciones sin Legalizar \| Nexell Dox | "sin legalizar" es el intent B2C real |

### Descriptions — propuestas mejoradas

| Página | Description propuesta (max 155 chars) |
|--------|--------------------------------------|
| **index** | Legaliza tu instalación eléctrica, aire acondicionado, caldera o aerotermia. Entrega en 24-48h. Empresa habilitada R.I. 206529. Toda España. |
| **aire-acondicionado** | Legaliza tu aire acondicionado con documentación RITE completa. Memoria técnica, registro en Industria y certificados. Desde 250€. Entrega 48h. |
| **aerotermia** | Legaliza tu aerotermia con documentación RITE y RSIF. Memoria técnica, registro en Industria y tramitación completa. Desde 300€. Entrega 48h. |
| **caldera** | Legaliza tu caldera o calentador con documentación RITE. Gas, eléctrica o cambio de combustible. Memoria técnica y registro. Desde 250€. |
| **instalacion-electrica** | Legaliza tu instalación eléctrica: memoria técnica REBT, boletín y CIE. Viviendas, locales e industria. Desde 250€. Entrega 48h. |
| **memoria-tecnica** | Qué es la Memoria Técnica de Diseño (MTD). MTD eléctrica REBT y térmica RITE: cuándo se necesita, qué contiene, quién la firma. Desde 250€. |
| **inspeccion-oca** | Prepara tu instalación para la inspección OCA. Auditoría previa, documentación completa REBT/RITE y corrección de defectos. Desde 300€. |
| **certificados-ahorro** | Genera ingresos con los Certificados de Ahorro Energético (CAE). Al legalizar tu aerotermia puedes obtener entre 1.500€ y 2.500€. |
| **regularizacion** | Regulariza instalaciones eléctricas o de climatización sin legalizar. Documentación técnica, tramitación ante Industria. Desde 250€. Entrega 48h. |

---

## 3. ANÁLISIS H1 — ESTADO ACTUAL

| Página | H1 actual | Valoración |
|--------|-----------|------------|
| index | Tu instalación legalizada en 24–48 horas | ✅ Bueno (CTA implícito) |
| aire-acondicionado | Legalizar Aire Acondicionado: documentacion completa RITE | ✅ Keyword + servicio |
| aerotermia | Legalizar Aerotermia: documentacion RITE completa | ✅ Keyword + servicio |
| caldera | Legalizar Caldera: registro RITE y documentacion | ✅ Keyword + servicio |
| instalacion-electrica | Legalizar Instalacion Electrica: MTD, CIE y boletin REBT | ✅ Keyword + servicios |
| memoria-tecnica | Memoria Tecnica de Diseno: que es y cuando la necesitas | ✅ Informativo B2C |
| inspeccion-oca | Inspeccion OCA: preparacion documental y tecnica | ✅ Keyword + servicio |
| certificados-ahorro | Certificados de Ahorro Energetico (CAE): rentabiliza tu instalacion | ✅ CTA implícito |
| regularizacion | Regulariza tu instalacion sin complicaciones | ✅ CTA B2C directo |

**Nota**: Los H1 son correctos y variados. No requieren cambios urgentes.

---

## 4. DIFERENCIACIÓN B2B vs B2C

### Público actual por página
| Página | Enfoque | Target |
|--------|---------|--------|
| index | Mixto | Particulares + Instaladores |
| aire-acondicionado | B2B orientado | Instaladores que necesitan documentar |
| aerotermia | B2B orientado | Instaladores RITE/RSIF |
| caldera | B2B orientado | Instaladores calderas |
| instalacion-electrica | B2B orientado | Electricistas REBT |
| memoria-tecnica | Informativo mixto | Cualquiera que busque "qué es MTD" |
| inspeccion-oca | B2B orientado | Instaladores preparando inspección |
| certificados-ahorro | B2B orientado | Instaladores que ofrecen CAE |
| regularizacion | **B2C directo** | Particulares con instalación sin legalizar |

### Recomendaciones
1. **regularizacion-instalaciones** ya está bien enfocada B2C — es el modelo a replicar
2. Las landing pages B2B deberían incluir una sección tipo "¿Eres particular?" con CTA hacia la home o hacia regularización
3. La home podría segmentar más claramente: "Soy instalador" vs "Soy particular"

---

## 5. GEO-TARGETING MADRID

### Implementado
- `geo.region = ES-MD` en todas las páginas
- `geo.placename = Madrid, España` en todas las páginas
- Schema.org `ProfessionalService` con `areaServed` incluyendo Madrid y España
- Dirección fiscal en Schema.org (Camarma de Esteruelas, Madrid)

### Recomendaciones adicionales
1. **Google Business Profile**: Crear perfil para "Nexell Dox" con dirección de Camarma — mejora SEO local
2. **Añadir geo.position**: `<meta name="geo.position" content="40.5457;-3.3834">` (coordenadas Camarma)
3. **Texto localizado**: Las landing pages ya mencionan "Toda España" y "Comunidad de Madrid" — correcto
4. **Schema.org LocalBusiness**: Considerar añadir como tipo secundario

---

## 6. KEYWORDS Y OPORTUNIDADES

### Keywords de alto potencial (baja competencia, alto intent)
| Keyword | Vol. estimado | Página objetivo |
|---------|--------------|-----------------|
| legalizar aire acondicionado | medio | aire-acondicionado |
| legalizar instalación eléctrica | medio | instalacion-electrica |
| regularizar instalación eléctrica | medio-bajo | regularizacion |
| memoria técnica de diseño | medio | memoria-tecnica |
| inspección OCA qué es | bajo | inspeccion-oca |
| certificados ahorro energético aerotermia | bajo | certificados-ahorro |
| legalizar caldera gas | bajo | caldera |
| documentación RITE aerotermia | bajo | aerotermia |

### Long-tail B2C prioritarias
- "cuánto cuesta legalizar aire acondicionado"
- "legalizar instalación eléctrica vivienda"
- "regularizar instalación sin boletín"
- "multa por no legalizar aire acondicionado"
- "inspección OCA cada cuánto"

### Contenido sugerido (futuro)
1. **Blog/FAQ central**: Artículos informativos que capturen long-tail
2. **Página "Precios"**: Tabla de precios transparente (mejora conversión B2C)
3. **Página "Sobre Nosotros"**: E-E-A-T para Google (Experience, Expertise, Authority, Trust)
4. **Testimonios**: Social proof con casos reales

---

## 7. ASPECTOS TÉCNICOS

### Velocidad de carga
- GitHub Pages sirve con CDN (Fastly) — tiempos de carga buenos
- CSS inline en cada página (no archivo externo) — evita render-blocking pero aumenta tamaño
- Imágenes: solo 4 PNGs de logo — optimizar a WebP si se añaden más

### Duplicate content (RESUELTO)
- GitHub Pages sirve `/slug` y `/slug.html` con HTTP 200
- **Solución aplicada**: Todas las canonicals apuntan a `/slug` (sin .html)
- El sitemap solo contiene URLs limpias
- Google respetará la canonical como versión preferida

### Pendiente
- [ ] Implementar propuestas de titles (requiere edición HTML)
- [ ] Implementar propuestas de descriptions donde difieren
- [ ] Crear Google Business Profile
- [ ] Solicitar indexación manual en GSC para cada URL
- [ ] Monitorizar cobertura en GSC tras 1-2 semanas

---

*Documento generado el 5 marzo 2026 por Claude para Nexell Instalaciones*
