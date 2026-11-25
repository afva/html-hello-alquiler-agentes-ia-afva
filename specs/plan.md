# AgentHub | Plan de implementación

**Estado:** aprobado por el usuario el 2026-11-25. Esta aprobación no autoriza por sí misma iniciar la implementación. [SPECS.md](../SPECS.md) es la fuente de requisitos; [docs/architecture.md](../docs/architecture.md) define las decisiones técnicas y [tasks.md](tasks.md) mantiene tareas y validaciones.

## 1. Estrategia

Aplicar en cada vista y componente la secuencia **descomposición → estructura → contenido → estilos → interactividad → validación**, con cambios pequeños y revisables. El layout y los datos compartidos se construyen antes de las vistas; estas pueden desarrollarse de forma independiente cuando sus dependencias estén disponibles. No generar toda la aplicación en una sola operación. La referencia visual se adapta a la SPA y no incorpora acciones excluidas.

## 2. Fases y dependencias

| Fase | Dependencias | Trabajo y entregable | Requisitos / decisiones | Hito de salida |
|---|---|---|---|---|
| F00 · Revisión documental | Documentación elaborada | Revisar y aprobar sistema visual, especificación, arquitectura, plan y tareas; registrar decisiones y progreso. | R13–R18; AT03, AT06, AT07 | Documentos aprobados por el usuario; no implica autorización de implementación. |
| F01 · Checkpoint | F00 | Registrar la interpretación confirmada por el usuario sobre el HTML histórico, verificar Git y, con autorización, registrar `SPECS.md` aprobado en commit independiente sin HTML de implementación. | R18; AT07 | Evidencia de interpretación, aprobación y commit. Sin aprobación y checkpoint no se implementa. |
| F02 · Base compartida | F01 y autorización de implementación | Descomponer y construir layout, carga, datos ficticios, navegación, tema y componentes compartidos. Entregable: esqueleto accesible con datos coherentes. | R01, R02, R09, R10, R13, R15–R17; AT01–AT06 | Base y componentes validados en aislamiento. |
| F03 · Consultas | F02 | Construir progresivamente Dashboard, Usuarios y Skills, incluidos detalles y estados vacíos. | R03, R04, R06, R14–R17; AT01–AT06 | Tres vistas con datos y cálculos comprobados. |
| F04 · Operaciones | F02 y datos de F03 cuando se necesiten | Construir Agentes, Contrataciones y Log de errores; integrar expansión, configuración, confirmación de eliminación, bloqueos y resolución. | R05, R07–R12, R14–R17; AT01–AT06 | Seis vistas y acciones simuladas completas. |
| F05 · Integración y entrega | F03 y F04 | Recorrer todos los requisitos, validar datos, accesibilidad, responsive, red, consola, cambios y documentación. | R01–R18; AT01–AT07 | Evidencia de validación y revisión de pendientes; solo entonces proponer cierre. |

La interpretación del HTML histórico ha sido confirmada por el usuario; no consta confirmación académica independiente. F02 requiere la aprobación documental, el checkpoint y autorización de implementación. Las tareas documentales o de revisión no dependen de implementar la aplicación.

## 3. Checkpoints Git y control de cambios

1. Antes de cada tarea futura: revisar `git status --short`, alcance autorizado y diferencias, sin sobrescribir cambios previos.
2. Antes de F01: inspeccionar `git log --oneline --all -- SPECS.md index.html`, el contenido y el árbol de los commits relevantes, y el estado de seguimiento. El usuario confirmó que el HTML de plantilla registrado en `0dfaf38` y eliminado en `a9b4fe4` se distingue de la futura implementación de AgentHub; no consta acreditación académica independiente. Un commit posterior no cambia ese antecedente.
3. Solo tras aprobación y autorización expresa: commit independiente que incluya `SPECS.md` aprobado y excluya HTML de implementación; comprobar contenido y orden en el historial. No reescribir historial ni eliminar el marcador para ocultar el antecedente.
4. Otros checkpoints o commits futuros solo con autorización expresa. Registrar evidencias y no declarar cerrada una tarea pendiente de validación.

## 4. Validación y riesgos

| Riesgo o bloqueo | Respuesta prevista |
|---|---|
| HTML de plantilla previo al checkpoint | Conservar la evidencia y la interpretación confirmada por el usuario; no presentar el orden histórico literal como modificado ni atribuirle confirmación académica independiente. |
| Cambios futuros sobre documentos aprobados | Revisar y aprobar cualquier modificación de alcance antes de implementarla. |
| Datos ficticios o importes inconsistentes | Validar IDs, referencias, fechas, céntimos, descuentos y cálculos en F02–F05. |
| Eliminación con referencias o pérdida de historial | Comprobar bloqueos y ausencia de cascada; conservar errores resueltos. |
| Dependencia de CDN y diferencias de versión | Verificar configuración Tailwind, conectividad, recursos y consola; registrar fallo de red. |
| Accesibilidad o desbordamiento en móvil | Validar teclado, foco, contraste, movimiento reducido y tamaños de R15–R16. |
| Incorporar funciones visibles en Stitch no aprobadas | Contrastar cada tarea con su R y las exclusiones antes de desarrollarla. |

Las validaciones funcionales, visuales y técnicas concretas están asociadas a cada tarea en [tasks.md](tasks.md). Las pruebas de navegador son futuras; la aprobación documental no implica que se hayan superado.
