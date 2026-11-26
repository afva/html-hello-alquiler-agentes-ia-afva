# AgentHub | Registro de decisiones

**Estado:** documentación y decisiones aprobadas por el usuario el 2026-11-25, sujetas a las restricciones académicas y del proyecto. Este registro no sustituye [SPECS.md](../SPECS.md), [docs/architecture.md](../docs/architecture.md) ni [docs/design-system.md](../docs/design-system.md). La aprobación documental no autoriza iniciar la implementación.

## DEC-001 | Arquitectura y datos locales

- **Fecha:** 2026-11-25. **Estado:** aprobada por el usuario.
- **Contexto:** prototipo administrativo sin integración de negocio.
- **Decisión:** una SPA con HTML5, Tailwind por CDN y JavaScript Vanilla; datos ficticios centralizados en `js/data.js`; estado en memoria sin persistencia adicional.
- **Justificación:** respeta las restricciones de [AGENTS.md](../AGENTS.md) y simplifica el prototipo.
- **Referencias:** R01, R13, R17; AT01–AT04 y AT06 en [docs/architecture.md](../docs/architecture.md).

## DEC-002 | Alcance de las operaciones

- **Fecha:** 2026-11-25. **Estado:** aprobada por el usuario.
- **Decisión:** eliminación simulada con confirmación y sin cascadas no autorizadas; configuración de agentes mediante modal con prompt editable y guardar/cancelar; resolución cambia el estado de la incidencia sin borrar el historial. Indicadores derivados de datos cuando sea coherente.
- **Detalle aprobado:** tipos de registros eliminables y bloqueos de R11, validación del prompt y fórmulas de R03; son decisiones del prototipo, no requisitos académicos adicionales.
- **Referencias:** R03, R08, R11, R12; AT03–AT05.

## DEC-003 | Exclusiones del alcance inicial

- **Fecha:** 2026-11-25. **Estado:** aprobada por el usuario.
- **Decisión:** excluir búsqueda, filtros, paginación, creación y exportación salvo obligación académica demostrada. La documentación académica disponible revisada no establece esas funciones como obligatorias. Se mantienen las exclusiones de integración, autenticación, pagos y ejecución real de [docs/CONTEXT.md](../docs/CONTEXT.md).
- **Referencias:** [SPECS.md](../SPECS.md), sección 4; R17.

## DEC-004 | Consolidación visual

- **Fecha:** 2026-11-25. **Estado:** aprobada por el usuario.
- **Contexto:** [DESIGN.md](../docs/references/stitch/DESIGN.md) y las seis referencias difieren en valores, recursos e interacciones; el modo oscuro no está consolidado en el original.
- **Decisión:** `#4f46e5` como primario claro, `#6366f1` como secundario de acento y `#f8fafc` como fondo claro; paleta oscura y semántica definida en [docs/design-system.md](../docs/design-system.md). Iconos locales coherentes; Inter local si está disponible y alternativa `sans-serif`.
- **Justificación:** prioriza valores recurrentes en el texto y ejemplos frente a sus alternativas; la propuesta original de Stitch sigue siendo referencia, no norma.
- **Alternativas consideradas:** tokens de cabecera `#3525cd`, `#4648d4` y `#f8f9ff`.

## DEC-005 | Modelo y recursos de implementación

- **Fecha:** 2026-11-25. **Estado:** aprobada por el usuario.
- **Decisión:** scripts clásicos diferidos en orden, espacio de nombres compartido mínimo, entidades separadas `users` y `clients`, importes enteros en céntimos y ausencia de persistencia. La selección concreta de iconos locales se hará dentro de los recursos permitidos; cualquier recurso externo adicional requiere autorización.
- **Justificación:** simplifica apertura directa y coherencia de relaciones/importes sin añadir bibliotecas. Debe validarse en navegador y frente a la versión CDN realmente servida.
- **Referencias:** R13, R17; AT02, AT03, AT06.

## DEC-006 | Antecedente académico de Git

- **Fecha:** 2026-11-25. **Estado:** interpretación confirmada por el usuario; no consta confirmación académica independiente.
- **Evidencia:** `0dfaf38` registró un `index.html` de plantilla con «Hello World»; `a9b4fe4` lo eliminó. Antes de implementar, el nuevo `index.html` era un marcador vacío sin seguimiento; ahora contiene la implementación de AgentHub, posterior al checkpoint. El historial consultado para ambos archivos no muestra un commit de especificación anterior al HTML de plantilla.
- **Interpretación:** el usuario confirmó que la plantilla genérica no es implementación de AgentHub y no incumple el requisito académico. Esta confirmación no modifica el orden histórico ni acredita una resolución externa.
- **Checkpoint:** el commit `0644497` registra exclusivamente `SPECS.md`, aprobado por el usuario; se verificó su contenido. No modifica el orden histórico ni acredita una resolución externa.
- **Restricción:** no iniciar implementación sin autorización posterior y cumplimiento de R18. No borrar el marcador ni reescribir historial para ocultar el antecedente.
- **Referencias:** R18; F01 y T01–T02. Todo commit requiere autorización expresa.

## DEC-007 | Placeholder semanal del Dashboard

- **Fecha:** 2026-11-25. **Estado:** aprobado por el usuario como requisito académico original y aplicado como adenda posterior al checkpoint.
- **Contexto:** la especificación versionada en `0644497` omitió el bloque semanal que el usuario confirma como parte del requisito académico; el enunciado completo no está reproducido en los documentos disponibles del repositorio.
- **Decisión:** agregar R19 sin reescribir ni reemplazar el commit original. El Dashboard contiene una representación semanal estática inspirada en Stitch, con siete días, retícula, leyenda y aviso de que las barras son ilustrativas. No contiene actividad medida, totales ni indicador de tiempo real; no cambia el modelo de `js/data.js` ni los cuatro KPI.
- **Justificación:** cubrir el requisito visual confirmado sin inventar datos funcionales ni modificar la arquitectura.
- **Referencias:** R19 en [SPECS.md](../SPECS.md), T17 y V12 en [specs/tasks.md](../specs/tasks.md).
