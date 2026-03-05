# Arquitectura Notion + Make.com para Nexell Dox

## Resumen
Cuando un cliente envia un formulario desde cualquier pagina de servicio, los datos llegan al webhook de Make.com. Desde ahi, Make.com debe:
1. Crear un registro en Notion con todos los datos del cliente
2. Iniciar la generacion automatica del presupuesto
3. Pre-rellenar los formularios oficiales de la Comunidad de Madrid

---

## 1. Bases de Datos en Notion

### 1.1 BD: Solicitudes de Presupuesto (principal)

| Propiedad | Tipo | Descripcion |
|-----------|------|-------------|
| ID | Auto-incremento | Numero de solicitud (SOL-001, SOL-002...) |
| Fecha de solicitud | Date | Fecha/hora de recepcion |
| Estado | Select | `Nueva` / `En revision` / `Presupuesto enviado` / `Aceptado` / `Rechazado` / `En curso` / `Completado` |
| Servicio | Select | Legalizar Aire Acondicionado / Legalizar Aerotermia / Legalizar Caldera / Legalizar Inst. Electrica / Regularizacion / CAE / Inspeccion OCA / Memoria Tecnica |
| Tipo de cliente | Select | `Particular` / `Instalador / Empresa` |
| Nombre / Empresa | Title | Nombre del solicitante |
| Telefono | Phone | Telefono de contacto |
| Email | Email | Email de contacto |
| CIF (si instalador) | Text | CIF de la empresa instaladora |
| Ubicacion | Text | Provincia / Localidad |
| Pagina de origen | URL | Pagina desde la que se envio el formulario |
| Datos tecnicos (JSON) | Text (long) | Todos los campos especificos del formulario en formato JSON |
| Presupuesto | Relation | Relacion con BD Presupuestos |
| Acepta comercial | Checkbox | Si acepta recibir info comercial |
| Notas internas | Text (long) | Para uso del equipo de Nexell |
| Asignado a | Person | Tecnico asignado |

### 1.2 BD: Presupuestos

| Propiedad | Tipo | Descripcion |
|-----------|------|-------------|
| ID Presupuesto | Auto-incremento | PRES-001, PRES-002... |
| Solicitud | Relation | Relacion con BD Solicitudes |
| Fecha | Date | Fecha de emision |
| Estado | Select | `Borrador` / `Enviado` / `Aceptado` / `Rechazado` / `Caducado` |
| Servicio | Rollup | Desde la solicitud |
| Cliente | Rollup | Nombre desde la solicitud |
| **Conceptos** | | |
| Honorarios Nexell Dox | Number (EUR) | Precio del servicio tecnico |
| Tasa Industria | Number (EUR) | Tasa fija de registro (ver tabla 1.4) |
| Tasa CCAA | Number (EUR) | Tasa de la comunidad autonoma |
| Coste OCA (si aplica) | Number (EUR) | Tasa de inspeccion OCA |
| Subtotal | Formula | Suma de todos los conceptos |
| IVA | Formula | 21% sobre subtotal |
| Total | Formula | Subtotal + IVA |
| PDF Presupuesto | File | PDF generado |
| Notas | Text | Observaciones del presupuesto |

### 1.3 BD: Clientes

| Propiedad | Tipo | Descripcion |
|-----------|------|-------------|
| Nombre / Empresa | Title | Nombre completo o razon social |
| Tipo | Select | `Particular` / `Instalador / Empresa` |
| CIF/NIF | Text | Documento fiscal |
| Email | Email | Email principal |
| Telefono | Phone | Telefono principal |
| Direccion | Text | Direccion fiscal |
| Solicitudes | Relation | Todas las solicitudes del cliente |
| Presupuestos | Relation | Todos los presupuestos |
| Fecha alta | Date | Primera solicitud |
| Notas | Text | Observaciones |

### 1.4 BD: Tarifas y Tasas (referencia)

Esta base de datos contiene los precios fijos que no cambian frecuentemente:

| Concepto | Importe | Normativa | CCAA |
|----------|---------|-----------|------|
| Tasa registro RITE Comunidad de Madrid | 17,20 EUR | Ley 7/2006 | Madrid |
| Tasa registro REBT Comunidad de Madrid | 17,20 EUR | Ley 7/2006 | Madrid |
| Tasa registro RSIF Comunidad de Madrid | 17,20 EUR | Ley 7/2006 | Madrid |
| Tasa modificacion registro | 8,60 EUR | Ley 7/2006 | Madrid |
| Tasa expedicion certificado | 4,30 EUR | Ley 7/2006 | Madrid |
| Inspeccion OCA electrica (hasta 100kW) | 150-250 EUR | Variable OCA | Todas |
| Inspeccion OCA electrica (100-250kW) | 250-400 EUR | Variable OCA | Todas |
| Inspeccion OCA termica | 200-350 EUR | Variable OCA | Todas |

**Nota**: Las tasas de la Comunidad de Madrid se actualizan con la Ley de Presupuestos anual. Verificar cada enero.

**Tabla de precios Nexell Dox (honorarios):**

| Servicio | Precio Particular | Precio Instalador | Notas |
|----------|-------------------|-------------------|-------|
| MTD Electrica REBT (vivienda/local) | 250-400 EUR | 200-350 EUR | Hasta 100 kW |
| MTD Electrica REBT (industrial) | 600-1.200 EUR | 500-1.000 EUR | >100 kW o complejidad |
| MTD Termica RITE (climatizacion) | 300-500 EUR | 250-450 EUR | Splits, AA, aerotermia |
| MTD Termica RITE (caldera) | 300-500 EUR | 250-450 EUR | Calderas, calentadores |
| Documentacion RSIF | 350-500 EUR | 300-450 EUR | Cuando aplique |
| Pack legalizacion (MTD+CIE+tramites) | 400-700 EUR | 350-600 EUR | Todo incluido |
| Preparacion inspeccion OCA | 300-500 EUR | 250-450 EUR | Auditoria + documentacion |
| Calculos electricos/termicos | 150-300 EUR | 100-250 EUR | Complementario |
| Regularizacion instalacion | 250-1.200 EUR | 200-1.000 EUR | Variable segun caso |
| Gestion CAE | A convenir | A convenir | % sobre importe CAE |

### 1.5 BD: Formularios Oficiales (plantillas)

| Propiedad | Tipo | Descripcion |
|-----------|------|-------------|
| Nombre formulario | Title | Nombre oficial del formulario |
| Reglamento | Select | RITE / REBT / RSIF |
| CCAA | Select | Madrid / Cataluna / Andalucia... |
| Plantilla | File | PDF/Word con campos pre-rellenados con datos Nexell |
| Campos a rellenar | Text | Lista de campos que se rellenan con datos del cliente |
| URL tramitacion online | URL | Enlace al tramite telematico |
| Notas | Text | Instrucciones especificas |

**Formularios oficiales de la Comunidad de Madrid pre-cargados:**

1. **RITE - Certificado de Instalacion Termica**
   - Datos Nexell pre-rellenados: R.I. 206529, CIF B87004370, datos empresa
   - Campos del cliente: titular, direccion, datos equipo

2. **REBT - Certificado de Instalacion Electrica (CIE)**
   - Datos Nexell pre-rellenados: R.I. 206529, categoria instalador
   - Campos del cliente: titular, direccion, potencia, circuitos

3. **RSIF - Certificado de Instalacion Frigorifica**
   - Datos Nexell pre-rellenados: habilitacion frigorista N1
   - Campos del cliente: titular, equipo, refrigerante, carga

4. **Solicitud de registro ante Industria (formulario generico)**
   - Datos Nexell pre-rellenados: datos empresa, firma
   - Campos del cliente: titular, instalacion, tipo de actuacion

---

## 2. Flujo de Automatizacion Make.com

### 2.1 Scenario: "Nueva Solicitud Web"

**Trigger**: Webhook recibe POST del formulario web

**Pasos**:

```
1. WEBHOOK (trigger)
   └─ Recibe JSON con todos los campos del formulario

2. ROUTER (segun servicio)
   ├─ Ruta A: Servicios termicos (AA, Aerotermia, Caldera)
   ├─ Ruta B: Servicios electricos (Electrica)
   ├─ Ruta C: Regularizacion
   ├─ Ruta D: CAE
   ├─ Ruta E: Inspeccion OCA
   └─ Ruta F: Memoria Tecnica

3. NOTION: Buscar cliente existente
   └─ Busca por email o telefono en BD Clientes

4. NOTION: Crear/Actualizar cliente
   ├─ Si existe → actualizar datos
   └─ Si no existe → crear nuevo registro en BD Clientes

5. NOTION: Crear Solicitud
   └─ Crea registro en BD Solicitudes con:
       - Todos los campos del formulario
       - Relacion con el cliente
       - Estado: "Nueva"
       - Datos tecnicos en JSON

6. NOTION: Crear Presupuesto (borrador)
   └─ Crea registro en BD Presupuestos con:
       - Relacion con la solicitud
       - Honorarios estimados (segun tabla de precios y servicio)
       - Tasas de Industria (desde BD Tarifas)
       - Tasas CCAA (desde BD Tarifas, segun ubicacion)
       - Estado: "Borrador"

7. EMAIL: Notificacion interna
   └─ Envia email a nexell@nexell.es con:
       - Resumen de la solicitud
       - Enlace al registro en Notion
       - Presupuesto estimado

8. EMAIL: Confirmacion al cliente (opcional)
   └─ Envia email de confirmacion al solicitante:
       - "Hemos recibido tu solicitud"
       - Plazo de respuesta: 2 horas
       - Datos de contacto directo
```

### 2.2 Scenario: "Presupuesto Aceptado → Preparar Expediente"

**Trigger**: Cambio de estado en BD Presupuestos a "Aceptado"

```
1. NOTION: Leer solicitud asociada
   └─ Obtiene todos los datos tecnicos

2. NOTION: Crear carpeta de expediente
   └─ Crea pagina en Notion con estructura:
       ├─ Datos del cliente
       ├─ Datos tecnicos de la instalacion
       ├─ Checklist de documentos necesarios
       ├─ Formularios oficiales (enlace a plantillas)
       └─ Estado del tramite

3. NOTION: Pre-rellenar formularios
   └─ Duplica la plantilla del formulario oficial correspondiente
       y rellena los campos del cliente automaticamente:
       - Titular: nombre del cliente
       - Direccion: ubicacion de la instalacion
       - Equipo: marca, modelo, potencia (del formulario web)
       - Instalador: datos Nexell (R.I. 206529)

4. NOTION: Asignar tecnico
   └─ Asigna al tecnico segun tipo de servicio
```

---

## 3. Estructura de Carpetas en Notion

```
NEXELL DOX (Workspace)
├── Dashboard
│   ├── Solicitudes nuevas (vista filtrada: Estado = Nueva)
│   ├── Presupuestos pendientes (Estado = Enviado)
│   ├── Trabajos en curso (Estado = En curso)
│   └── Metricas (facturacion, conversion, tiempos)
│
├── CRM
│   ├── BD Clientes
│   ├── BD Solicitudes
│   └── BD Presupuestos
│
├── Tarifas y Precios
│   ├── BD Tarifas y Tasas
│   └── Tabla de honorarios Nexell Dox
│
├── Plantillas
│   ├── Formularios Oficiales Madrid
│   │   ├── Certificado Instalacion Termica (RITE)
│   │   ├── Certificado Instalacion Electrica (REBT/CIE)
│   │   ├── Certificado Instalacion Frigorifica (RSIF)
│   │   └── Solicitud Registro Industria
│   ├── Plantillas de Presupuesto
│   │   ├── Presupuesto Particular
│   │   └── Presupuesto Instalador
│   └── Plantillas de Email
│       ├── Confirmacion solicitud
│       ├── Envio presupuesto
│       └── Seguimiento
│
└── Operaciones
    ├── Expedientes activos
    └── Archivo (completados)
```

---

## 4. Campos del Webhook por Servicio

Cada formulario envia un JSON con la siguiente estructura base + campos especificos:

### Campos comunes (todos los formularios):
```json
{
  "servicio": "Legalizar Aire Acondicionado",
  "pagina_origen": "legalizar-aire-acondicionado",
  "nombre": "...",
  "telefono": "...",
  "email": "...",
  "tipo_cliente": "particular|instalador",
  "ubicacion": "...",
  "observaciones": "...",
  "acepta_privacidad": "si|no",
  "acepta_comercial": "si|no"
}
```

### Campos extra por servicio:

**Aire Acondicionado**: tipo_equipo, marca, modelo, potencia_kw, refrigerante, num_unidades, estado_instalacion
**Aerotermia**: tipo_sistema, uso_principal, marca, modelo, potencia_kw, refrigerante, sustituye_caldera, interesado_cae
**Caldera**: tipo_equipo, combustible, uso, potencia_kw, marca, modelo, estado_instalacion
**Instalacion Electrica**: tipo_inmueble, tipo_actuacion, potencia_kw, superficie_m2, tiene_boletin
**Regularizacion**: tipo_instalacion, antiguedad, requerimiento_industria, tiene_documentacion, descripcion
**CAE**: tipo_actuacion, equipo_antiguo, equipo_nuevo, marca_modelo_nuevo, potencia_kw, fecha_instalacion, instalacion_legalizada, num_viviendas
**Inspeccion OCA**: tipo_instalacion, tipo_inmueble, potencia_kw, tiene_fecha, fecha_inspeccion, tiene_documentacion
**Memoria Tecnica**: tipo_mtd, tipo_inmueble, potencia_kw, superficie_m2, nueva_o_regularizacion, descripcion

### Campos extra si tipo_cliente = "instalador":
**Comunes instalador**: cif_empresa, num_instalaciones
**Aire Acondicionado**: necesita_calculos
**Aerotermia**: necesita_rsif, necesita_calculos
**Caldera**: necesita_cert_gas
**Electrica**: necesita_calculos, mtd_o_proyecto
**CAE**: num_actuaciones, gestion_bloque
**Memoria Tecnica**: num_memorias, pack_recurrente

---

## 5. Logica de Precios Automaticos

Cuando Make.com crea el presupuesto borrador, puede estimar el precio automaticamente:

```
SI servicio = "Legalizar Aire Acondicionado":
    SI potencia_kw <= 12 Y tipo_equipo = "split-1x1":
        honorarios = 300
    SI potencia_kw > 12 O tipo_equipo IN ("multisplit", "conductos", "cassette"):
        honorarios = 400
    SI tipo_equipo = "roof-top":
        honorarios = 500

    tasa_industria = 17.20  (Madrid)
    total_estimado = honorarios + tasa_industria

SI servicio = "Legalizar Aerotermia":
    SI potencia_kw <= 12:
        honorarios = 300
    SI potencia_kw > 12:
        honorarios = 400
    SI necesita_rsif = "si":
        honorarios += 350

    tasa_industria = 17.20
    total_estimado = honorarios + tasa_industria

... (logica similar para cada servicio)

SI tipo_cliente = "instalador" Y num_instalaciones > 3:
    honorarios = honorarios * 0.85  (15% descuento por volumen)
```

---

## 6. Implementacion Paso a Paso

### Fase 1: Configurar Notion (1-2 horas)
1. Crear las 5 bases de datos con las propiedades indicadas
2. Configurar las relaciones entre BDs
3. Cargar los datos de tarifas y tasas
4. Crear las vistas del Dashboard

### Fase 2: Configurar Make.com (2-3 horas)
1. Crear Scenario "Nueva Solicitud Web"
2. Configurar el modulo Notion (crear registros)
3. Configurar el modulo Email (notificaciones)
4. Probar con datos de prueba desde cada formulario

### Fase 3: Plantillas de formularios oficiales (1-2 horas)
1. Subir formularios oficiales de la Comunidad de Madrid a Notion
2. Pre-rellenar datos de Nexell en cada plantilla
3. Documentar que campos se rellenan con datos del cliente

### Fase 4: Automatizacion de presupuestos (2-3 horas)
1. Implementar la logica de precios en Make.com
2. Generar PDF de presupuesto automatico
3. Configurar el flujo de envio al cliente

---

## 7. Proximos Pasos Recomendados

1. **Inmediato**: Los formularios web ya estan implementados y envian datos al webhook existente
2. **Semana 1**: Configurar las BDs en Notion y el Scenario basico en Make.com
3. **Semana 2**: Implementar la logica de precios y las plantillas de formularios
4. **Semana 3**: Pruebas end-to-end y ajustes
5. **Continuo**: Ir anadiendo formularios oficiales de otras CCAA segun demanda
