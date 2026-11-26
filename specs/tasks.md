# AgentHub | Tareas y trazabilidad

**Estado:** aprobado por el usuario el 2026-11-25. La implementación incluye la adenda R19 y su refinamiento visual está validado; la entrega continúa en revisión por las condiciones de Git y académicas. R se define en [SPECS.md](../SPECS.md), AT en [docs/architecture.md](../docs/architecture.md), F en [plan.md](plan.md) y V en el catálogo de este documento.

## Catálogo de validaciones

| ID | Validación prevista |
|---|---|
| V01 | Revisar documentos, procedencia, aprobaciones, cobertura R → AT → F → T → V, alcance y ausencia de contradicciones. |
| V02 | Comprobar, según la tarea, la evidencia Git y la interpretación confirmada por el usuario, o la aprobación y el árbol del commit independiente sin HTML de implementación. |
| V03 | Verificar IDs únicos, referencias válidas, ausencia de datos reales, fechas, céntimos, descuentos y recálculo de métricas. |
| V04 | Recorrer seis vistas y panel móvil con ratón y teclado; comprobar vista/título activo, ausencia de recarga y retorno de foco. |
| V05 | Alternar tema en vistas y modales, navegar y recargar; comprobar que vuelve al estado inicial. |
| V06 | Abrir menús y modales de registros distintos; verificar ID, un único menú/modal, Escape, clic exterior, foco y cancelación. |
| V07 | Comparar indicadores, listas, detalles, importes, uso de skills y estados vacíos con datos simulados. |
| V08 | Comprobar expansión independiente y movimiento reducido; editar, validar, guardar y cancelar prompts de agentes distintos. |
| V09 | Cancelar y confirmar borrados permitidos; intentar borrar cada tipo referenciado; verificar ausencia de cascadas y restauración al recargar. |
| V10 | Resolver incidencia abierta; verificar su conservación, detalle, estado y ausencia de efectos en otras entidades; recargar. |
| V11 | Revisar contraste, foco, nombres accesibles, teclado, tres tamaños de R16, ambos temas, desbordamientos, consola, red y recursos. |
| V12 | Revisar el Dashboard frente a la captura Stitch y el sistema aprobado en claro/oscuro a tres tamaños; verificar KPI originales, selección por teclado, escala de las cuatro series simuladas y transición de barras. |

## F00 | Revisión documental

| ID y objetivo | R / AT | Dependencias | Archivos afectados | Aceptación | Validación | Estado |
|---|---|---|---|---|---|---|
| T00 · Revisar los siete documentos, resolver decisiones visuales y funcionales y registrar su aprobación. | R13–R18 / AT03, AT06, AT07 | Ninguna | `docs/design-system.md`, `SPECS.md`, `docs/architecture.md`, `specs/plan.md`, `specs/tasks.md`, `memory-bank/decisions.md`, `memory-bank/progress.md` | Cada documento se revisa; decisiones aprobadas y validaciones futuras quedan diferenciadas. | V01 | Completada |

## F01 | Checkpoint académico

| ID y objetivo | R / AT | Dependencias | Archivos afectados | Aceptación | Validación | Estado |
|---|---|---|---|---|---|---|
| T01 · Registrar el antecedente de la plantilla y la interpretación confirmada por el usuario. | R18 / AT07 | Ninguna; debe revisarse antes de T02 | `memory-bank/decisions.md`, `memory-bank/progress.md` | La confirmación del usuario y la evidencia histórica quedan registradas sin atribuirles acreditación académica independiente ni alterar el historial. | V02 | Completada |
| T02 · Revisar Git y, únicamente tras autorización, registrar la especificación aprobada en un commit independiente. | R18 / AT07 | T00, T01 | `SPECS.md`; historial Git solo con autorización expresa | Se verifican la aprobación, el árbol del commit sin HTML de implementación y la evidencia de T01. | V02 | Completada: `0644497` |

## F02 | Base compartida

| ID y objetivo | R / AT | Dependencias | Archivos afectados | Aceptación | Validación | Estado |
|---|---|---|---|---|---|---|
| T03 · Definir y validar colecciones y relaciones ficticias. | R13 / AT02, AT03, AT04 | T02 y autorización de implementación | `js/data.js`, `js/app.js` | Datos iniciales coherentes, IDs y referencias válidos, sin datos personales reales. | V03 | Completada |
| T04 · Construir estructura semántica y navegación compartida. | R01, R15, R16 / AT01, AT02, AT05 | T02 y autorización de implementación | `index.html`, `js/navigation.js`, `js/app.js`, `css/styles.css` | Seis secciones navegables, título activo y panel móvil accesible sin recarga. | V04, V11 | Completada: layout validado en ambos temas |
| T05 · Aplicar tema global y carga visual. | R02, R16, R17 / AT02, AT05, AT06 | T04 | `index.html`, `js/theme.js`, `js/app.js`, `css/styles.css` | Ambos temas se aplican globalmente; recarga restaura claro y recursos cumplen restricciones. | V05, V11 | Completada |
| T06 · Construir menú y modal reutilizables con gestión de foco. | R09, R10, R15 / AT02, AT05 | T04 | `index.html`, `js/dropdowns.js`, `js/modals.js`, `js/app.js`, `css/styles.css` | Un menú y modal como máximo; cierre, foco y contexto cumplen R09–R10. | V06, V11 | Completada: foco corregido y regresión de modales en Chrome |

## F03 | Consultas

| ID y objetivo | R / AT | Dependencias | Archivos afectados | Aceptación | Validación | Estado |
|---|---|---|---|---|---|---|
| T07 · Construir indicadores de Dashboard derivados de datos. | R03, R14 / AT01, AT03, AT04 | T03, T04 | `index.html`, `js/app.js`, `css/styles.css` | Cuatro indicadores concuerdan con cálculos de R03, incluido conjunto vacío. | V03, V07 | Completada |
| T08 · Construir listado y detalle de usuarios. | R04, R14 / AT01, AT03, AT05 | T03, T04, T06 | `index.html`, `js/app.js`, `css/styles.css` | Lista, detalle contextual y estado vacío corresponden a los datos. | V06, V07 | Completada |
| T09 · Construir catálogo y detalle de skills. | R06, R14 / AT01, AT03, AT05 | T03, T04, T06 | `index.html`, `js/app.js`, `css/styles.css` | Catálogo y contadores derivados corresponden a las asociaciones. | V06, V07 | Completada |

## F04 | Operaciones

| ID y objetivo | R / AT | Dependencias | Archivos afectados | Aceptación | Validación | Estado |
|---|---|---|---|---|---|---|
| T10 · Construir vista de agentes y expansión de skills. | R05, R14, R15 / AT01, AT03, AT05 | T03, T04, T06 | `index.html`, `js/app.js`, `js/collapsibles.js`, `css/styles.css` | Filas coherentes, expansión inicialmente cerrada y accesible, estado vacío. | V07, V08, V11 | Completada |
| T11 · Construir lista y detalle económico de contrataciones. | R07, R14 / AT01, AT03, AT04, AT05 | T03, T04, T06 | `index.html`, `js/app.js`, `css/styles.css` | Detalle y total mensual corresponden al contrato y a R03. | V03, V06, V07 | Completada |
| T12 · Construir log y resolución de incidencias. | R08, R14 / AT01, AT03, AT04, AT05 | T03, T04, T06 | `index.html`, `js/app.js`, `css/styles.css` | Resolver conserva registro y solo cambia su estado; detalle contextual y vacío funcionan. | V06, V07, V10 | Completada |
| T13 · Integrar eliminación con confirmación y bloqueo por referencias. | R11, R14 / AT03, AT04, AT05 | T06, T08, T09, T10, T11, T12 | `js/app.js`, `js/modals.js` | Borrado individual, cancelación, bloqueos y recálculos cumplen R11 sin cascadas. | V03, V06, V09 | Completada |
| T14 · Integrar edición del system prompt. | R12, R14 / AT03, AT04, AT05 | T06, T10 | `js/app.js`, `js/modals.js` | Prompt vacío se rechaza; guardar o cancelar afecta solo al agente correcto. | V06, V08 | Completada |

## F05 | Integración y entrega

| ID y objetivo | R / AT | Dependencias | Archivos afectados | Aceptación | Validación | Estado |
|---|---|---|---|---|---|---|
| T17 · Refinar el Dashboard y layout compartido; incorporar el gráfico semanal interactivo con datos simulados. | R01–R03, R15, R16, R19 / AT01, AT05, AT06 | T05, T07 y autorización de refinamiento del Dashboard | `index.html`, `js/app.js`, `js/data.js`, `css/styles.css`, `SPECS.md`, `specs/tasks.md`, `memory-bank/progress.md` | Conserva KPI y navegación; las cuatro tarjetas seleccionan su serie semanal simulada y actualizan título, leyenda, unidad y escala; sidebar, cabecera y dashboard respetan ambos temas y responsive. | V12 | Completada en Chrome; R19 actualizada para la interacción posterior al checkpoint |
| T15 · Validar integralmente flujos, responsive, accesibilidad y límites técnicos. | R01–R19 / AT01–AT06 | T05, T07–T14, T17 | Solo lectura de implementación y recursos; `memory-bank/progress.md` si se autoriza registrar resultados | Evidencias por requisito; fallos y pruebas pendientes documentados, sin declarar éxito no ejecutado. | V03–V12 | Completada en Chrome: lector de pantalla y otros navegadores pendientes |
| T16 · Revisar entrega y trazabilidad documental. | R18, R19 / AT01, AT06, AT07 | T00–T15, T17 | `SPECS.md`, `specs/plan.md`, `specs/tasks.md`, `memory-bank/decisions.md`, `memory-bank/progress.md` | Estado y evidencia coinciden con la realidad; pendientes impiden cerrar tareas afectadas. | V01, V02, V12 | En revisión: registro y publicación Git y confirmación académica externa pendientes |

## Matriz requisito → arquitectura → fase → tarea → validación

| Requisito | Decisión técnica | Fase | Tarea | Validación |
|---|---|---|---|---|
| R01 | AT01, AT05 | F02, F05 | T04, T15, T17 | V04, V11, V12 |
| R02 | AT04, AT05 | F02, F05 | T05, T15, T17 | V05, V11, V12 |
| R03 | AT03, AT04, AT06 | F03, F05 | T07, T15, T17 | V03, V07, V12 |
| R04 | AT01, AT03, AT05 | F03, F05 | T08, T15 | V06, V07 |
| R05 | AT03, AT05 | F04, F05 | T10, T15 | V07, V08, V11 |
| R06 | AT03, AT04 | F03, F05 | T09, T15 | V06, V07 |
| R07 | AT03, AT04 | F04, F05 | T11, T15 | V03, V07 |
| R08 | AT03, AT04 | F04, F05 | T12, T15 | V07, V10 |
| R09 | AT05 | F02, F05 | T06, T15 | V06, V11 |
| R10 | AT05 | F02, F05 | T06, T15 | V06, V11 |
| R11 | AT03, AT04, AT05 | F04, F05 | T13, T15 | V03, V06, V09 |
| R12 | AT04, AT05 | F04, F05 | T14, T15 | V06, V08 |
| R13 | AT02, AT03, AT04 | F02, F05 | T03, T15 | V03 |
| R14 | AT01, AT04, AT05 | F03, F04, F05 | T07–T14, T15 | V06–V10 |
| R15 | AT01, AT05, AT06 | F02, F04, F05 | T04, T06, T10, T15, T17 | V04, V06, V08, V11, V12 |
| R16 | AT01, AT06 | F02, F05 | T04, T05, T15, T17 | V04, V05, V11, V12 |
| R17 | AT02, AT06 | F02, F05 | T05, T15 | V05, V11 |
| R18 | AT07 | F00, F01, F05 | T00–T02, T16 | V01, V02 |
| R19 | AT01, AT06 | F05 | T17, T15 | V12 |

Las referencias con intervalos incluyen todos sus IDs extremos e intermedios. Cada tarea tiene al menos un requisito; las tareas transversales justifican cobertura de integración y proceso. La aprobación documental no implica autorización de implementación ni validaciones de navegador realizadas.
