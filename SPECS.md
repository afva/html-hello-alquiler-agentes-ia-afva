# AgentHub | Especificación funcional

**Estado:** aprobado por el usuario el 2026-11-25 para el alcance definido, sujeto a las restricciones académicas. La aprobación documental no autoriza por sí misma iniciar la implementación. Los tokens visuales se encuentran en [docs/design-system.md](docs/design-system.md) y la arquitectura en [docs/architecture.md](docs/architecture.md).

## 1. Objetivo, alcance y procedencia

Prototipo frontend de administración para supervisar usuarios, agentes, skills, contrataciones e incidencias de una plataforma de alquiler de agentes de IA. Lo utiliza un administrador; los perfiles de negocio, operaciones y técnica descritos en el contexto no implican roles ni autenticación. La interfaz y las operaciones son locales y simuladas.

**Fuentes:** [AGENTS.md](AGENTS.md), [README.es.md](README.es.md) y [docs/CONTEXT.md](docs/CONTEXT.md) establecen el alcance, las restricciones y la condición académica del historial. Los comportamientos concretos de eliminación, configuración, resolución, datos y criterios siguientes son decisiones aprobadas para el prototipo, no requisitos académicos adicionales. Las referencias Stitch orientan el diseño, no añaden funciones.

Cada identificador R es único. Sus criterios son verificables; los detalles no contemplados quedan fuera de alcance hasta su aprobación.

## 2. Requisitos funcionales

### R01 | Navegación y layout compartido

La aplicación presenta una sola página con navegación lateral, cabecera y seis vistas: Dashboard, Usuarios, Agentes, Skills, Contrataciones y Log de errores. Dashboard es la vista inicial. Seleccionar una entrada muestra solo su vista, actualiza título y elemento activo sin recargar, y conserva los datos y el tema en memoria. En móvil la barra se abre mediante botón y se cierra al elegir vista, pulsar su control de cierre, la superposición o Escape; devuelve el foco al botón que la abrió cuando corresponda.

**Aceptación:** recorrer las seis entradas con ratón y teclado muestra la vista y título correctos sin recarga; en móvil el menú abre, cierra y recupera foco.

### R02 | Tema global

Un control accesible alterna entre claro y oscuro en todo el layout, vistas, menús y modales. El tema inicial es claro; el cambio persiste al navegar dentro de la sesión, pero no se guarda tras recargar.

**Aceptación:** cambiar de tema, navegar y abrir un modal conserva el tema; recargar restaura el claro.

### R03 | Dashboard

Mostrar cuatro indicadores: ingresos mensuales netos y descuentos mensuales de contrataciones activas, número de agentes activos y número de agentes con fallos. El importe de cada contratación es mensual, en euros. Sus ingresos netos son `precioBase + suma(precioSkill) - descuento`; los descuentos son importes absolutos mensuales no negativos y no mayores que el subtotal. El Dashboard suma únicamente contrataciones cuyo estado sea `activa`; los conteos de agentes se basan en sus estados respectivos. Un conjunto vacío produce cero. Mostrar unidad monetaria y formato español.

**Aceptación:** recalcular manualmente los cuatro valores desde los datos produce los mismos resultados; al eliminar una contratación permitida, los importes se actualizan sin recargar.

### R04 | Usuarios

Listar cuentas ficticias con nombre, correo ficticio, plan (`Starter`, `Pro` o `Enterprise`) y estado (`activo`, `inactivo` o `pendiente`); cada una tiene un identificador único. Un menú por fila permite ver el detalle y solicitar su eliminación. Los clientes son entidades separadas vinculadas a una cuenta; el propietario de un agente también referencia una cuenta. Estos valores son decisiones del prototipo, no requisitos académicos.

**Aceptación:** cada detalle corresponde a la cuenta seleccionada y, sin usuarios, se muestra un estado vacío. Las restricciones de eliminación se rigen por R11.

### R05 | Agentes

Listar nombre, propietario, estado (`activo`, `inactivo` o `fallando`) y número de skills asociadas. Cada fila permite ver detalle, configurar y solicitar eliminación. Las skills aparecen inicialmente colapsadas; el control las expande y contrae con transición suave, respetando la preferencia de movimiento reducido. Un agente sin skills muestra ese hecho sin control vacío.

**Aceptación:** los nombres mostrados corresponden a los IDs asociados; expandir y contraer actualiza `aria-expanded` y no afecta a otra fila.

### R06 | Skills

Mostrar catálogo con nombre, descripción, categoría y número de agentes que utilizan cada skill. Un menú permite ver detalle y solicitar eliminación. El contador se deriva de las asociaciones de agentes, no de una cifra independiente.

**Aceptación:** el contador coincide con los agentes que referencian la skill; al no haber registros se muestra un estado vacío.

### R07 | Contrataciones

Listar cliente, agente, estado (`activa` o `finalizada`), fechas de inicio y fin, importe neto mensual y acciones. El detalle muestra precio base mensual, cada skill contratada con su precio mensual, subtotal, descuento y total de R03. Una contratación referencia cliente y agente existentes, y cada skill contratada pertenece a dicho agente. El menú permite ver detalle y solicitar eliminación.

**Aceptación:** el detalle y el total corresponden al registro seleccionado; una contratación finalizada no suma a los indicadores de R03. Las fechas son informativas y no cambian el estado automáticamente.

### R08 | Log de errores

Listar incidencias ficticias con fecha y hora, agente, tipo, descripción, gravedad (`baja`, `media`, `alta` o `crítica`) y estado (`abierta` o `resuelta`). El detalle muestra la información técnica simulada. Cada error abierto permite resolverlo; uno resuelto permanece visible y no ofrece nuevamente esa acción. No se eliminan incidencias desde la interfaz.

**Aceptación:** resolver un error actualiza solo su estado y conserva su detalle tras cambiar de vista; recargar restaura los datos iniciales. Resolverlo no modifica automáticamente el estado del agente.

### R09 | Menús contextuales

Cada menú muestra únicamente las acciones aplicables a su registro. Solo puede estar abierto un menú a la vez; abrir otro cierra el anterior. El botón tiene nombre accesible y `aria-expanded`. Cierra al elegir acción, pulsar fuera o Escape; Escape devuelve el foco al disparador.

**Aceptación:** abrir menús de dos registros sucesivamente no los deja abiertos a la vez; las acciones reciben el ID correcto y el cierre por teclado devuelve el foco.

### R10 | Modales y detalles

Usar un modal reutilizable para detalles, configuración, confirmación y mensajes de bloqueo. Mostrar título y datos del registro seleccionado; solo un modal abierto a la vez. Tiene nombre accesible, `aria-modal`, foco inicial dentro, ciclo de Tab dentro y retorno de foco al disparador al cerrar. Cierra mediante botón, Escape o pulsación en el fondo; cancelar o cerrar no guarda ni modifica datos. Si el disparador desaparece tras eliminar, el foco pasa al encabezado de la vista.

**Aceptación:** abrir detalles de dos registros distintos muestra sus propios datos; Tab permanece dentro, Escape cierra y el foco vuelve al lugar definido.

### R11 | Eliminación simulada y relaciones

Permitir solicitar eliminación de usuarios, agentes, skills y contrataciones. Antes de modificar datos mostrar un modal con tipo, nombre e identificación del registro, confirmación y cancelación. Cancelar o cerrar no modifica nada. Confirmar elimina solo el registro en memoria y actualiza la vista y los indicadores derivados.

No hay cascadas ni desvinculación automática. Bloquear la eliminación con explicación y botón de cierre cuando: un usuario sea propietario de un agente o esté vinculado a un cliente; un agente esté referenciado por una contratación o error, incluidos históricos; una skill esté asociada a un agente o contratación. Las contrataciones no tienen dependientes en este modelo y pueden eliminarse individualmente, previa confirmación. Los clientes y errores no son eliminables en esta versión. Los datos se restauran al recargar.

**Aceptación:** cancelar conserva el registro; confirmar uno sin referencias elimina solo ese registro; intentar borrar uno referenciado muestra el bloqueo y no cambia ninguna entidad ni relación. No se ejecutan peticiones de borrado.

### R12 | Configuración de agente

La acción Configurar abre un modal con nombre del agente y campo editable `system prompt`, rellenado desde ese agente. Guardar exige texto no vacío tras eliminar espacios al inicio y final; ante error conserva la edición, muestra mensaje asociado al campo y no modifica los datos. Guardar actualiza solo el prompt en memoria y cierra; Cancelar, Escape o fondo descartan la edición.

**Aceptación:** editar A y guardar afecta a A, no a B; un prompt vacío no se guarda; cancelar o recargar conserva o restaura respectivamente el valor anterior/inicial.

### R13 | Datos simulados y coherencia

Los datos iniciales se definen en `js/data.js`: usuarios, clientes, agentes, skills, contrataciones y errores, con IDs únicos por tipo y referencias válidas. Las cuentas y correos son ficticios; no incluir credenciales ni datos personales reales. Una skill puede pertenecer a varios agentes y viceversa. Todas las relaciones y cantidades mostradas proceden de esta fuente y se recalculan tras mutaciones permitidas. Las fechas de contratación deben ser válidas y el fin no anterior al inicio.

**Aceptación:** comprobar unicidad, integridad de referencias, importes, fechas y coherencia entre listas, detalles, indicadores y skills; no aparecen nombres reales de las capturas como datos obligatorios.

### R14 | Vacío, bloqueo y error de validación

Cada lista vacía comunica que no hay registros; las listas sin acciones aplicables no presentan botones activos engañosos. Los intentos bloqueados de eliminación explican la relación que lo impide. Las validaciones del prompt identifican el problema con texto accesible, no solo color.

**Aceptación:** probar cada estado sin datos, un borrado bloqueado y un prompt vacío; se recibe información comprensible y no se modifica el estado.

## 3. Requisitos no funcionales y restricciones

### R15 | Accesibilidad

Usar HTML semántico, jerarquía de encabezados, etiquetas para controles de iconos, foco visible, teclado y atributos accesibles aplicables. Estado y gravedad se expresan mediante texto además de color. Modal y elementos expandibles cumplen R05 y R10. Se respetan las preferencias de movimiento reducido. Contraste mínimo de texto normal 4,5:1 y de texto grande y componentes visuales funcionales 3:1.

**Aceptación:** completar navegación, apertura/cierre de menú, modal, configuración y expansión solo con teclado; comprobar nombres accesibles, foco, contraste y movimiento reducido.

### R16 | Responsive y diseño

Aplicar el sistema de diseño aprobado; adaptar layout y navegación a móvil, tableta y escritorio. Evitar solapamientos, cortes de texto y desplazamiento horizontal de la página; las tablas pueden desplazarse dentro de su contenedor. Mantener todos los flujos disponibles en ambos temas.

**Aceptación:** revisar al menos 320 × 640, 768 × 1024 y 1440 × 900 en ambos temas; tablas, controles y textos permanecen utilizables sin desbordamiento de página.

### R17 | Tecnologías, seguridad y ejecución

Usar HTML5, Tailwind CSS por CDN, JavaScript Vanilla y CSS complementario justificado. No frameworks, jQuery, herramientas de build, dependencias npm frontend, backend, APIs de negocio ni bases de datos. No ejecutar el código de Stitch ni usar manejadores inline. Cargar texto de datos con APIs DOM adecuadas, sin insertar HTML no confiable. No persistir datos ni tema en almacenamiento; sin peticiones de negocio. La carga de Tailwind requiere red y sus fallos deben registrarse en la validación.

**Aceptación:** inspeccionar recursos, código y red; verificar tecnologías permitidas, ausencia de peticiones de negocio y persistencia, y ausencia de errores de consola en la ruta de uso documentada.

### R18 | Proceso académico y documentación

Antes de implementar, la especificación y el sistema de diseño deben revisarse y aprobarse; `SPECS.md` aprobado debe registrarse en un commit independiente sin HTML de implementación. La documentación del proyecto exige que el historial demuestre el orden respecto al primer HTML. El usuario ha confirmado la interpretación de que el HTML histórico genérico de plantilla no constituye implementación de AgentHub y no incumple ese requisito; se distingue del futuro HTML de AgentHub. No consta en estos documentos una confirmación independiente de una autoridad académica. Un commit futuro no cambia el orden histórico. No reescribir historial ni borrar archivos para ocultarlo. Los commits requieren autorización expresa.

**Aceptación:** registrar la interpretación confirmada por el usuario, la aprobación documental y la comprobación del commit independiente y su árbol; sin aprobación y checkpoint, la implementación permanece bloqueada. Deberá conservarse la evidencia del HTML histórico sin afirmar que el orden histórico literal se ha modificado.

## 4. Fuera de alcance

Autenticación y permisos, integración de backend o APIs, bases de datos, ejecución real de agentes, pagos/facturación real, monitorización en tiempo real, persistencia, búsquedas, filtros, paginación, creación y exportación. Tampoco se implementan las funciones adicionales visibles en Stitch por el mero hecho de aparecer en sus referencias. Ninguna ausencia se presenta como requisito académico no verificado.

## 5. Trazabilidad y revisión

La correspondencia R → decisión técnica → fase → tarea → validación se mantiene en [specs/tasks.md](specs/tasks.md); [specs/plan.md](specs/plan.md) describe sus dependencias. R18 conserva la interpretación confirmada y exige el checkpoint, sin afirmar que un commit posterior pueda reparar retroactivamente la secuencia histórica.
