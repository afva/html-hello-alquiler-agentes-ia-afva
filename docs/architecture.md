# AgentHub | Arquitectura técnica

**Estado:** aprobado por el usuario el 2026-11-25, sujeto a las restricciones del proyecto. La aprobación no autoriza crear código; debe cumplirse R18 de [SPECS.md](../SPECS.md). Los identificadores AT se relacionan con las tareas y validaciones en [specs/tasks.md](../specs/tasks.md).

## 1. AT01 | SPA y composición

Una única página `index.html` contiene el layout semántico compartido: barra lateral, cabecera y `main` con seis secciones identificadas. Solo una sección es visible y accesible a la vez. El layout no se duplica ni se crean páginas HTML por módulo. Las vistas son Dashboard, Usuarios, Agentes, Skills, Contrataciones y Log de errores. Cada sección contiene su título, zona de indicadores cuando proceda y lista, tabla o catálogo correspondiente. Las tablas y detalles se generan a partir de datos locales; el contenido oculto no recibe foco.

La barra lateral se adapta a panel móvil; el estado de vista activa, título y control del panel se coordina sin recargar. Cumple R01 y R16.

## 2. AT02 | Archivos y arranque

| Archivo | Responsabilidad |
|---|---|
| `index.html` | Estructura común, seis secciones, puntos de montaje y carga ordenada de scripts y Tailwind CDN. |
| `css/styles.css` | Solo estilos complementarios necesarios, incluidos estados o transiciones que no se resuelvan claramente con utilidades. |
| `js/data.js` | Datos iniciales ficticios y centralizados; ningún módulo duplica el catálogo. |
| `js/navigation.js` | Vista activa, título, estado de navegación y panel móvil. |
| `js/theme.js` | Clase global de tema y estado accesible del control. |
| `js/dropdowns.js` | Apertura, cierre, foco y delegación de menús contextuales. |
| `js/modals.js` | Modal único, contenidos por acción, foco, cancelación y confirmación. |
| `js/collapsibles.js` | Expansión y contracción accesible de skills. |
| `js/app.js` | Arranque, estado de sesión, validación de relaciones, cálculo de indicadores, renderizado y coordinación de acciones. |

Se usarán scripts clásicos con `defer`, cargados en el orden de la tabla y con `app.js` al final. Comparten un único espacio de nombres `AgentHub` para APIs de módulos, sin variables globales adicionales; no hay `import`, `fetch` de archivos locales ni build. De esta forma se puede abrir el HTML directamente, sujeto a la disponibilidad de Tailwind CDN; validar también con servidor estático si se utiliza. No añadir un backend para el prototipo. Los listeners se registran una sola vez; la delegación se usa para listas regeneradas.

Cumple R13 y R17 como decisión de diseño. La carga, compatibilidad real y errores de consola deberán verificarse; no se han ejecutado esas pruebas.

## 3. AT03 | Datos y relaciones

`data.js` define colecciones iniciales locales de objetos con IDs estables, únicos dentro de cada tipo. La estructura mínima aprobada es:

| Colección | Campos mínimos | Relaciones |
|---|---|---|
| `users` | `id`, `name`, `email`, `plan`, `status` | Propietario de agentes; una cuenta puede vincularse a clientes. |
| `clients` | `id`, `name`, `userId` | Cuenta existente; puede tener contrataciones. |
| `agents` | `id`, `name`, `ownerId`, `status`, `systemPrompt`, `skillIds` | Cuenta propietaria y skills existentes. |
| `skills` | `id`, `name`, `description`, `category` | Asociación muchos a muchos mediante `skillIds` del agente. |
| `contracts` | `id`, `clientId`, `agentId`, `status`, `startDate`, `endDate`, `basePrice`, `discount`, `skills` | Cliente y agente existentes; `skills` contiene `{skillId, price}` y cada skill está en el agente. Importes mensuales en euros. |
| `errors` | `id`, `agentId`, `occurredAt`, `type`, `description`, `severity`, `status`, `technicalDetail` | Agente existente; el registro permanece al resolverlo. |

Clientes son entidades separadas y no disponen de una vista de gestión ni acción de borrado. Se usarán céntimos enteros no negativos para `basePrice`, `discount` y `price`, convirtiéndolos a euros solo al presentar; el descuento no supera el subtotal. Las fechas son cadenas ISO válidas y el estado de contratación es explícito, no inferido de ellas. Los IDs de `skillIds` y de las skills de una misma contratación no se repiten. Los valores visibles serán ficticios y coherentes, no los datos de las capturas.

`app.js` calcula importes y contadores a partir de la copia en memoria; los importes contratados son instantáneas de precio, no precios consultados a un servicio. Las reglas de R03, R06, R07 y R13 son la fuente funcional; esta tabla solo establece su representación.

## 4. AT04 | Estado y mutaciones

Al iniciar, `app.js` crea una copia independiente de los datos iniciales. El estado de sesión contiene esa copia, la vista activa, el tema, menú y modal activos y las expansiones de skills. No usa cookies, `localStorage`, `sessionStorage` ni solicitudes de negocio. Recargar restaura los datos iniciales y el tema claro. Los cálculos de Dashboard y uso de skills se obtienen del estado actual; no se mantiene una segunda copia editable de esos indicadores.

Las únicas mutaciones de negocio son las definidas en R08, R11 y R12: resolver un error sin borrarlo, eliminar un registro permitido previa confirmación y guardar el prompt validado. La verificación de referencias de R11 ocurre antes de abrir la confirmación y se repite al confirmar; ante bloqueo se mantiene todo el estado. No hay cascadas ni desvinculaciones implícitas. Tras una mutación se actualizan las secciones afectadas y se preserva el foco según R10. No hay creación, búsqueda, filtros, paginación ni exportación.

## 5. AT05 | Interacciones compartidas

- `navigation.js` mantiene vista activa y panel móvil, y actualiza atributos accesibles; `theme.js` aplica o retira la clase global `dark` y actualiza el nombre/estado del control.
- `dropdowns.js` admite un menú a la vez, recibe el ID y tipo del registro y cierra según R09. La acción pasa el disparador original a `modals.js` para restaurar el foco.
- `modals.js` administra una única capa con título, cuerpo y acciones; controla foco, Escape y pulsación en fondo. Al cerrar sin confirmar descarta la edición; tras borrar, devuelve foco al encabezado si el disparador ya no existe.
- `collapsibles.js` sincroniza visibilidad, `aria-expanded` y transición respetando movimiento reducido; el estado inicial es cerrado.
- `app.js` resuelve el registro por ID justo antes de ejecutar acciones y maneja el caso de registro inexistente sin modificar otros datos. Genera texto con `textContent` y nodos DOM; no inserta contenido no confiable como HTML.

Cumple R02, R05 y R08–R15. Los badges combinan texto y color; el catálogo visual se define en el sistema de diseño, no aquí.

## 6. AT06 | Tailwind y recursos

Tailwind se carga únicamente desde su CDN, con configuración compatible con la versión realmente servida y `darkMode: 'class'` tras comprobarla en navegador. Las utilidades responsive y `dark:` cubren el diseño; `styles.css` complementa solo cuando sea necesario. La carga por CDN requiere red: debe probarse la disponibilidad y registrarse su fallo, sin prometer funcionamiento visual sin conexión. El texto y las funciones de negocio no dependen de APIs remotas.

Se usarán iconos locales aprobados y tipografía Inter si está disponible localmente, con alternativa `sans-serif`. No se añade Lucide CDN, Material Symbols ni otra biblioteca por haber aparecido en una referencia. La selección concreta de iconos se realizará durante la implementación dentro de los recursos permitidos; cualquier carga externa adicional requiere autorización. Cumple R16 y R17.

## 7. AT07 | Validación y checkpoint

Validar relaciones, cálculos, cancelación/confirmación y ausencia de cascadas; recorrer las seis vistas con ratón y teclado, comprobar foco, estados vacíos, modo oscuro y tres tamaños de R16; inspeccionar red, consola y carga de recursos. La matriz concreta de tareas y casos está en [specs/tasks.md](../specs/tasks.md).

Antes de cualquier implementación, verificar R18. El usuario confirmó que el HTML histórico de plantilla se distingue de la implementación de AgentHub; no consta una confirmación académica independiente. El commit de `SPECS.md` debe ser independiente y excluir HTML de implementación; requiere autorización expresa. La aprobación documental no altera el orden histórico. Cumple R18 como decisión de proceso; su evidencia debe verificarse en Git.
