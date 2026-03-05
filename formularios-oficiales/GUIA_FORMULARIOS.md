# Guía de Formularios Oficiales — Nexell

**Empresa:** Construction Efficient Building and Services S.L.
**CIF:** B87004370 | **R.I.:** 206529 | **Tel:** 672 585 491 | **Email:** nexell@nexell.es

---

## Contenido de esta carpeta

### Formularios pre-rellenados (HTML editables)

| Archivo | Formulario | Uso |
|---------|-----------|-----|
| `RITE_MOD_IT_3.1.5_nexell.html` | Solicitud + Memoria Técnica RITE | Legalización de instalaciones térmicas <70 kW (aire acondicionado, aerotermia, caldera) |
| `RITE_MOD_IT_3.1.8_nexell.html` | Certificado de Instalación Térmica | "Boletín térmico" para instalaciones de 5-70 kW |
| `REBT_CIE_nexell.html` | Certificado de Instalación Eléctrica BT | "Boletín eléctrico" (plantilla de trabajo — el oficial se genera en EXIN) |
| `REBT_MTD_nexell.html` | Memoria Técnica de Diseño REBT | Para instalaciones eléctricas ≤100 kW que no requieren proyecto |
| `RSIF_certificado_nexell.html` | Certificado de Instalación Frigorífica | Para equipos con circuito frigorífico significativo |

### Checklists de documentación

| Archivo | Uso |
|---------|-----|
| `checklist_OCA_REBT.html` | Lista de documentación para inspección OCA de instalación eléctrica |
| `checklist_OCA_RITE.html` | Lista de documentación para inspección OCA de instalación térmica |
| `checklist_CAE_RES060.html` | Lista de documentación para obtener CAE por sustitución caldera→bomba de calor |

---

## Cómo usar los formularios

1. **Abrir** el archivo HTML en el navegador (Chrome, Firefox, Edge)
2. Los campos en **amarillo** ya están pre-rellenados con datos de Nexell
3. **Rellenar** los campos en blanco con los datos del cliente y la instalación
4. **Imprimir** con el botón "Imprimir / Guardar PDF" o Ctrl+P
5. Para PDF: en el diálogo de impresión, seleccionar "Guardar como PDF"

---

## Flujo de trabajo por servicio

### Legalizar Aire Acondicionado / Aerotermia
1. Rellenar **MOD IT 3.1.5** (solicitud + memoria técnica)
2. Rellenar **MOD IT 3.1.8** (certificado de instalación)
3. Imprimir 3 copias de cada uno
4. Pagar tasa DGIEM (Modelo 030)
5. Presentar ante EICI (SCI o ICN)
6. Si aplica CAE → usar **checklist_CAE_RES060**

### Legalizar Caldera
1. Rellenar **MOD IT 3.1.5** + **MOD IT 3.1.8**
2. Mismo proceso que arriba
3. Si sustituye caldera antigua por aerotermia → tramitar CAE

### Legalizar Instalación Eléctrica
1. Rellenar **MTD REBT** (memoria técnica de diseño)
2. Generar **CIE** oficial en sistema EXIN (usar plantilla como borrador)
3. Adjuntar esquema unifilar
4. Presentar ante DGIEM

### Inspección OCA
1. Usar **checklist correspondiente** (REBT o RITE) para preparar documentación
2. Contactar con SCI (91 884 43 93) o ICN para pedir cita
3. Reunir toda la documentación marcada como OBLIGATORIO
4. Verificar que la instalación pasa las comprobaciones de la sección C del checklist

### Certificados de Ahorro Energético (CAE)
1. **ANTES de instalar**: firmar Convenio CAE con Sujeto Delegado
2. Fotografiar equipo antiguo in situ
3. Realizar la instalación del equipo nuevo
4. Fotografiar equipo nuevo instalado
5. Reunir toda la documentación del **checklist_CAE_RES060**
6. Rellenar Ficha RES060 (PDF autocompletable de MITECO)
7. Enviar a verificador ENAC acreditado
8. Tras dictamen favorable → solicitar emisión en sede MITECO (procedimiento 1035)

---

## Enlaces útiles

| Recurso | URL |
|---------|-----|
| Registro RITE Comunidad de Madrid | https://sede.comunidad.madrid/inscripciones-registro/instalaciones-termicas-no-industriales |
| Certificación energética (existentes) | https://sede.comunidad.madrid/comunicaciones-declaraciones/certificacion-eficiencia-energetica |
| Catálogo fichas CAE residencial (MITECO) | https://www.miteco.gob.es/en/energia/eficiencia/cae/catalogo-de-fichas/catalogo-vigente-de-fichas/residencial.html |
| Sede electrónica MITECO — Emisión CAE | Procedimiento 1035 en sede.miteco.gob.es |
| Etiqueta energética Comunidad de Madrid | https://gestiona.comunidad.madrid/reee_etiqueta/ |
| SCI (inspecciones) | sci@scisa.es — 91 884 43 93 — extranet.scisa.es |
| Contacto Industria Madrid | hidrocarburos@madrid.org |

---

## Notas importantes

- **EXIN**: Desde 2022, el CIE oficial genera un código único en el sistema EXIN. La plantilla HTML es solo para preparar borradores.
- **Exención RITE**: No se requiere registro para potencia <5 kW o sustitución de generador ≤70 kW con variación ≤25% y misma fuente energética.
- **CAE mínimo**: El expediente mínimo para emitir CAEs es 30 MWh (agregable dentro de la misma CCAA).
- **Convenio CAE**: DEBE firmarse ANTES de realizar la instalación.
- **Precio CAE**: 115-140 EUR/MWh (mercado actual). Valor típico por vivienda: 300-1.000 EUR.
