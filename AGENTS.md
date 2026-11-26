# AGENTS.md | Instrucciones para agentes de desarrollo

## 1. Propósito

Este documento establece las instrucciones, restricciones y metodología de trabajo que deberán seguir los agentes de inteligencia artificial que participen en el desarrollo de AgentHub.

El agente deberá actuar como un desarrollador frontend sénior, priorizando la simplicidad, la calidad del código, la mantenibilidad, la coherencia visual y el cumplimiento de las especificaciones.

El desarrollo seguirá un enfoque Spec-Driven Development (SDD), combinado con Vision to Spec y desarrollo constructivo e iterativo.

## 2. Contexto del proyecto

AgentHub es un prototipo frontend interactivo de un panel de administración para una plataforma SaaS de alquiler de agentes de inteligencia artificial.

El contexto de negocio, los objetivos, los usuarios y el alcance general se encuentran definidos en:

- `README.md`

- `docs/CONTEXT.md`

El agente deberá consultar estos documentos para comprender el propósito del proyecto antes de tomar decisiones de implementación.

## 3. Fuentes de información y documentación

La documentación del repositorio constituye la fuente de referencia para el desarrollo.

| Documento | Responsabilidad |
|---|---|
| `AGENTS.md` | Instrucciones y reglas de trabajo para los agentes. |
| `README.md` | Presentación general del proyecto. |
| `SPECS.md` | Requisitos funcionales, visuales y comportamientos esperados. |
| `docs/CONTEXT.md` | Contexto de negocio, objetivos y alcance. |
| `docs/architecture.md` | Arquitectura técnica y organización del código. |
| `docs/design-system.md` | Identidad visual, componentes y reglas de diseño. |
| `docs/references/` | Referencias visuales y propuestas de diseño. |
| `docs/references/stitch/DESIGN.md` | Propuesta original Precision Slate de Google Stitch; fuente de referencia, no normativa. |
| `specs/plan.md` | Estrategia y secuencia de implementación. |
| `specs/tasks.md` | Tareas, dependencias y criterios de aceptación. |
| `memory-bank/decisions.md` | Registro de decisiones aprobadas. |
| `memory-bank/progress.md` | Estado actual y evolución del proyecto. |

### 3.1. Jerarquía documental

En caso de conflicto entre documentos, se aplicarán los siguientes criterios:

1. Los requisitos y restricciones oficiales del proyecto son de obligado cumplimiento.

2. `AGENTS.md` establece las reglas de actuación del agente.

3. `SPECS.md` define el comportamiento funcional esperado.

4. `docs/architecture.md` establece las decisiones técnicas.

5. `docs/design-system.md` establece las reglas visuales.

6. `specs/plan.md` y `specs/tasks.md` organizan la implementación.

7. El Memory Bank registra y referencia las decisiones aprobadas y el estado del proyecto.

El Memory Bank no sustituye ni modifica por sí mismo las especificaciones.

Si se detectan contradicciones relevantes, el agente deberá comunicarlas antes de implementar una solución.

No se deberán interpretar documentos vacíos, incompletos o pendientes de aprobación como especificaciones definitivas.

## 4. Arquitectura del proyecto

La arquitectura adoptada es una aplicación de página única (SPA) sin frameworks: un único `index.html`, una barra lateral persistente, una barra superior compartida y seis vistas intercambiables mediante JavaScript Vanilla. La navegación actualizará la sección activa y el contenido principal sin recargar la página. El tema claro u oscuro se aplicará globalmente. No se duplicará el layout ni se crearán seis páginas HTML independientes.

La estructura de referencia incorpora el archivo `DESIGN.md` previsto para conservar la propuesta original de Stitch. Su presencia física deberá verificarse en el repositorio:

```text
html-hello-alquiler-agentes-ia-afva/
├── AGENTS.md
├── index.html
├── learn.json
├── README.cn.md
├── README.es.md
├── README.md
├── server.py
├── SPECS.md
├── assets/
├── css/
│   └── styles.css
├── docs/
│   ├── architecture.md
│   ├── CONTEXT.md
│   ├── design-system.md
│   └── references/
│       └── stitch/
│           ├── DESIGN.md
│           ├── agents/
│           │   ├── code.txt
│           │   └── screen.png
│           ├── contracts/
│           │   ├── code.txt
│           │   └── screen.png
│           ├── dashboard/
│           │   ├── code.txt
│           │   └── screen.png
│           ├── error-log/
│           │   ├── code.txt
│           │   └── screen.png
│           ├── skills/
│           │   ├── code.txt
│           │   └── screen.png
│           └── users/
│               ├── code.txt
│               └── screen.png
├── js/
│   ├── app.js
│   ├── collapsibles.js
│   ├── data.js
│   ├── dropdowns.js
│   ├── modals.js
│   ├── navigation.js
│   └── theme.js
├── memory-bank/
│   ├── decisions.md
│   └── progress.md
└── specs/
    ├── plan.md
    └── tasks.md
```

La existencia de un archivo no implica que esté implementado, aprobado o validado. El agente deberá verificar el estado real del repositorio, incluidos los archivos ocultos. No deberá crear carpetas o módulos adicionales sin justificación técnica; los cambios relevantes de arquitectura requieren aprobación y documentación.

### 4.1. Responsabilidad de los archivos de implementación

| Archivo | Responsabilidad |
|---|---|
| `index.html` | Estructura semántica de la interfaz y composición de las secciones. |
| `css/styles.css` | Estilos complementarios que no puedan resolverse adecuadamente mediante Tailwind CSS. |
| `js/app.js` | Inicialización y coordinación de los módulos JavaScript. |
| `js/data.js` | Definición centralizada de los datos simulados. |
| `js/navigation.js` | Gestión de la navegación y visualización de las secciones. |
| `js/theme.js` | Gestión del modo claro y oscuro. |
| `js/dropdowns.js` | Comportamiento reutilizable de los menús desplegables. |
| `js/modals.js` | Apertura, cierre y gestión de ventanas modales. |
| `js/collapsibles.js` | Comportamiento de los elementos expandibles y colapsables. |
| `assets/` | Recursos gráficos e iconografía aprobados para la aplicación. |

La organización definitiva y las dependencias entre módulos se establecerán en `docs/architecture.md`.

### 4.2. Archivos originales del proyecto

Los siguientes archivos pertenecen a la estructura inicial proporcionada por 4Geeks:

- `.vscode/`, si existe

- `learn.json`

- `server.py`

- `README.es.md`

- `README.cn.md`

El agente deberá conservar estos archivos y evitar modificaciones o eliminaciones innecesarias.

Cualquier cambio deberá estar justificado y autorizado.

## 5. Restricciones tecnológicas

### 5.1. Tecnologías permitidas

- HTML5.

- Tailwind CSS mediante CDN.

- JavaScript Vanilla.

- CSS complementario cuando esté justificado.

- Recursos gráficos locales.

### 5.2. Tecnologías no permitidas

- React.

- Next.js.

- Vue.

- Angular.

- jQuery.

- Frameworks JavaScript adicionales.

- Herramientas de compilación o build.

- Dependencias npm y herramientas de instalación o compilación para el frontend.

- Servicios backend adicionales.

- Conexiones con APIs de negocio.

- Bases de datos.

El agente no deberá introducir tecnologías adicionales para resolver problemas que puedan abordarse mediante HTML, Tailwind CSS y JavaScript Vanilla.

### 5.3. Gestión de datos

Todos los datos utilizados por la aplicación deberán ser simulados y estar definidos localmente.

Los datos deberán:

- Estar centralizados en `js/data.js`.

- Mantener una estructura consistente.

- Representar escenarios realistas.

- Mantener coherencia entre usuarios, agentes, skills, contrataciones y errores.

- Utilizar identificadores únicos cuando sea necesario relacionar entidades.

- Evitar duplicidades innecesarias.

- No contener información personal real ni credenciales.

Las operaciones administrativas serán simuladas localmente según los comportamientos definidos en `SPECS.md`.

No se deberá implementar persistencia adicional sin aprobación previa.

## 6. Metodología de desarrollo

### 6.1. Vision to Spec

Antes de implementar una interfaz, el agente deberá:

1. Comprender los requisitos de negocio.

2. Analizar las referencias visuales disponibles.

3. Identificar los componentes necesarios.

4. Traducir las referencias visuales en requisitos verificables.

5. Identificar comportamientos, estados e interacciones.

6. Validar la coherencia con `SPECS.md` y `docs/design-system.md`.

Las propuestas visuales generadas mediante Google Stitch serán utilizadas como referencia, no como una implementación definitiva.

#### Referencias de Stitch

Las seis referencias se encuentran en `docs/references/stitch/`, organizadas por módulo: `dashboard`, `users`, `agents`, `skills`, `contracts` y `error-log`.

- `screen.png`: referencia visual de cada vista.

- `code.txt`: código original exportado por Stitch, conservado como texto de referencia no ejecutable.

- `docs/references/stitch/DESIGN.md`: sistema de diseño original Precision Slate generado por Stitch. Deberá conservarse íntegro y consultarse junto con las seis capturas y sus códigos. Si falta o está incompleto, el agente deberá comunicarlo.

El agente deberá analizar conjuntamente las imágenes y el código, extraer patrones, utilidades Tailwind y componentes reutilizables, e identificar inconsistencias entre las seis vistas. Deberá distinguir los elementos observados de las propuestas nuevas y consolidarlos en `docs/design-system.md` para aprobación. Si no puede inspeccionar una imagen, deberá comunicarlo y no afirmar que la ha revisado.

No deberá modificar las referencias originales, ejecutar su código ni copiarlo indiscriminadamente. Deberá comprobar la compatibilidad de las clases, la versión y configuración de Tailwind CDN, los recursos externos y los comportamientos con las restricciones del proyecto. No deberá incorporar funcionalidades adicionales presentes en las referencias pero ajenas al alcance aprobado.

Las referencias no sustituyen a `SPECS.md`, `docs/design-system.md` ni `docs/architecture.md`. La implementación deberá reutilizar el layout global y adaptar las seis vistas a la arquitectura SPA.

En caso de discrepancia entre una referencia visual y un requisito obligatorio, prevalecerá el requisito.

### 6.2. Spec-Driven Development

El desarrollo deberá seguir la siguiente secuencia:

```text
Contexto y requisitos
        ↓
Referencias visuales y técnicas de Stitch
        ↓
Consolidación del sistema de diseño
        ↓
Especificación funcional
        ↓
Arquitectura técnica
        ↓
Plan de implementación y tareas
        ↓
Inicialización del Memory Bank
        ↓
Checkpoint Git: commit independiente de SPECS.md
        ↓
Implementación iterativa
        ↓
Validación y actualización documental
        ↓
Entrega
```

No se deberá implementar ninguna funcionalidad que no esté contemplada en las especificaciones aprobadas.

Si una funcionalidad requiere modificar una especificación, el agente deberá presentar primero la propuesta de modificación.

### 6.3. Restricción inicial de implementación

La especificación `SPECS.md` deberá estar completa, aprobada y registrada mediante un commit independiente antes de crear el primer archivo HTML del proyecto.

Antes de comenzar la implementación, el agente deberá verificar el historial de Git y el contenido de los archivos existentes mediante operaciones de lectura (`git status --short`, `git log --oneline --all -- SPECS.md index.html` y revisión de `index.html`).

El árbol facilitado ya contiene `index.html`. Se deberá determinar si es un marcador vacío, si contiene implementación y si está registrado en Git. La existencia de un marcador vacío no permite dar por cumplida la restricción académica. Si existe un posible incumplimiento, se deberá comunicar al usuario antes de continuar y solicitar aclaración sobre el procedimiento de corrección. No se eliminarán archivos ni se reescribirá el historial para ocultarlo.

Los archivos `code.txt` de Stitch son referencias documentales; no se convertirán en archivos HTML antes del checkpoint.

La existencia de un archivo `SPECS.md` vacío o sin registrar en Git no satisface este requisito.

Hasta que se cumpla esta condición, el agente únicamente podrá realizar tareas de análisis, diseño, planificación y documentación.

### 6.4. Desarrollo constructivo e iterativo

Cada módulo de la interfaz deberá desarrollarse progresivamente mediante las siguientes fases:

1. **Descomposición:** identificar los componentes y sus responsabilidades.

2. **Estructura:** construir la estructura semántica HTML.

3. **Contenido:** incorporar datos y contenido representativo.

4. **Estilos:** aplicar las reglas visuales del sistema de diseño.

5. **Interactividad:** implementar los comportamientos mediante JavaScript Vanilla.

6. **Validación:** comprobar el resultado y realizar ajustes.

Se aplicará el algoritmo del pintor (Painter's Algorithm) para la construcción visual:

```text
Estructura → Contenido → Estilos
```

El agente deberá evitar generar o reconstruir toda la aplicación en una única operación.

Las modificaciones deberán ser incrementales, controladas y verificables.

### 6.5. Descomposición de componentes

Los componentes deberán dividirse en unidades con responsabilidades claramente definidas.

Se priorizará la reutilización de patrones comunes, especialmente:

- Tarjetas de indicadores.

- Tablas.

- Badges de estado.

- Botones.

- Dropdowns.

- Modales.

- Componentes colapsables.

- Elementos de navegación.

La descomposición deberá detenerse cuando los componentes tengan una responsabilidad clara y manejable.

No se deberá introducir complejidad arquitectónica innecesaria.

## 7. Protocolo de actuación del agente

### 7.1. Antes de comenzar una tarea

El agente deberá:

1. Consultar `AGENTS.md`.

2. Consultar `README.md` y `docs/CONTEXT.md`.

3. Revisar los requisitos aplicables en `SPECS.md`.

4. Consultar la arquitectura y el sistema de diseño.

5. Revisar `specs/plan.md` y `specs/tasks.md`.

6. Consultar `memory-bank/decisions.md` y `memory-bank/progress.md`.

7. Inspeccionar el código existente, las referencias Stitch aplicables y el estado de Git.

8. Identificar la tarea, sus dependencias y criterios de aceptación.

9. Identificar posibles contradicciones, bloqueos o riesgos.

El agente deberá revisar los documentos relevantes antes de solicitar información que ya esté disponible en el repositorio.

### 7.2. Presentación del plan

Antes de implementar una tarea, el agente deberá presentar:

- Objetivo de la tarea.

- Requisitos aplicables.

- Archivos que se crearán o modificarán.

- Propuesta de implementación.

- Dependencias y posibles riesgos.

- Validaciones que se realizarán.

- Decisiones pendientes de aprobación.

El agente deberá esperar la aprobación del usuario antes de ejecutar el plan, salvo que el usuario haya autorizado explícitamente la implementación de ese alcance.

### 7.3. Durante la implementación

El agente deberá:

- Limitar los cambios al alcance aprobado.

- Respetar las funcionalidades existentes.

- Reutilizar los componentes y comportamientos disponibles.

- Evitar duplicidades de código.

- Mantener la coherencia con la arquitectura.

- Respetar el sistema de diseño.

- Evitar cambios no relacionados con la tarea.

- Comunicar cualquier desviación relevante.

Si aparece una necesidad de modificación fuera del alcance aprobado, deberá detener esa parte del trabajo y presentar la propuesta correspondiente.

### 7.4. Después de la implementación

El agente deberá:

1. Revisar los cambios realizados.

2. Ejecutar las validaciones disponibles.

3. Comprobar los criterios de aceptación.

4. Verificar que no se han introducido regresiones.

5. Actualizar el estado de la tarea cuando esté dentro del alcance autorizado.

6. Actualizar el Memory Bank cuando corresponda y esté autorizado; en caso contrario, proponer la actualización.

7. Presentar un resumen de los resultados.

El informe final deberá incluir:

- Funcionalidades implementadas.

- Archivos creados o modificados.

- Validaciones realizadas.

- Resultados obtenidos.

- Validaciones pendientes.

- Incidencias o limitaciones detectadas.

- Decisiones que requieren revisión.

No se deberán declarar pruebas como superadas si no se han ejecutado.

## 8. Estándares de código

### 8.1. Principios generales

El código deberá seguir los siguientes principios:

- KISS: Keep It Simple, Stupid.

- DRY: Don't Repeat Yourself.

- YAGNI: You Aren't Gonna Need It.

- Separation of Concerns.

- Single Responsibility Principle.

Se priorizará la claridad y la mantenibilidad frente a soluciones excesivamente abstractas o complejas.

No se deberán implementar funcionalidades futuras que no formen parte del alcance aprobado.

### 8.2. Convenciones de nomenclatura

- Documentación del proyecto en español.

- Nombres de archivos y carpetas técnicos en inglés, respetando la estructura aprobada.

- Variables y funciones JavaScript en inglés.

- Variables y funciones mediante `camelCase`.

- Constantes globales mediante `UPPER_SNAKE_CASE`.

- Identificadores HTML y clases CSS personalizadas mediante `kebab-case`.

- Nombres descriptivos y relacionados con su responsabilidad.

Se deberán evitar abreviaturas ambiguas y nombres genéricos que dificulten la comprensión del código.

### 8.3. HTML

- Utilizar elementos semánticos HTML5.

- Mantener una jerarquía correcta de encabezados.

- Utilizar botones para acciones y enlaces para navegación.

- Evitar estructuras HTML innecesariamente anidadas.

- Utilizar atributos `data-*` cuando sea necesario identificar comportamientos JavaScript.

- Mantener identificadores únicos.

- Incorporar atributos de accesibilidad cuando corresponda.

- Evitar manejadores JavaScript inline como `onclick`.

- Evitar estilos inline innecesarios.

### 8.4. CSS y Tailwind

- Priorizar las utilidades de Tailwind CSS.

- Respetar las reglas definidas en `docs/design-system.md`.

- Utilizar un enfoque mobile-first.

- Mantener consistencia en colores, tipografía, espaciado y tamaños.

- Utilizar las variantes `dark:` de Tailwind para el modo oscuro.

- Utilizar CSS personalizado únicamente cuando aporte una solución necesaria o más mantenible.

- Evitar duplicar estilos y utilizar `!important` sin justificación.

- Evitar valores arbitrarios cuando exista una utilidad equivalente en el sistema de diseño.

### 8.5. JavaScript

- Utilizar JavaScript Vanilla moderno.

- Priorizar `const` y utilizar `let` cuando sea necesaria la reasignación.

- Evitar `var`.

- Mantener funciones pequeñas y con responsabilidades claras.

- Separar los datos, la inicialización y los comportamientos.

- Utilizar `addEventListener` para gestionar eventos.

- Utilizar delegación de eventos cuando simplifique la gestión de elementos repetidos o dinámicos.

- Evitar variables globales innecesarias.

- Evitar registrar múltiples veces los mismos eventos.

- Comprobar la existencia de elementos DOM cuando corresponda.

- Evitar errores silenciosos.

- Utilizar `textContent` para insertar texto dinámico cuando no sea necesario generar HTML.

- Evitar la inserción de contenido no confiable mediante `innerHTML`.

### 8.6. Comentarios y documentación

Los comentarios deberán explicar decisiones o comportamientos que no resulten evidentes mediante la lectura del código.

Se evitarán comentarios redundantes que simplemente describan instrucciones evidentes.

Las funciones complejas o reutilizables podrán documentarse mediante JSDoc.

## 9. Sistema de diseño

El agente deberá consultar `docs/design-system.md` antes de realizar cualquier modificación visual.

### 9.1. Consolidación de Precision Slate

El archivo `docs/references/stitch/DESIGN.md` conserva la propuesta original. El archivo `docs/design-system.md` contiene el sistema de diseño consolidado y, una vez aprobado, constituye la referencia normativa visual de AgentHub.

Para consolidarlo, el agente deberá analizar el documento original, los seis `screen.png` y los seis `code.txt`. Deberá identificar patrones comunes, contrastar los tokens con el código y las imágenes, y proponer una definición única por rol visual. En particular, deberá resolver de forma justificada las discrepancias de la propuesta original: primario `#3525cd` frente a `#4f46e5`, secundario `#4648d4` frente a `#6366f1` y fondo `#f8f9ff` frente a `#f8fafc`. Estos valores son referencias en conflicto, no decisiones aprobadas.

Deberá distinguir los valores observados de las propuestas nuevas, incluyendo los tokens de modo oscuro que no estén definidos en las referencias. No deberá modificar el original ni incorporar funcionalidades ajenas a las especificaciones. La consolidación deberá someterse a aprobación antes de utilizarse como norma de implementación.

### 9.2. Reglas visuales

Las reglas del sistema de diseño deberán contemplar:

- Paleta de colores.

- Tipografía.

- Escala de espaciado.

- Jerarquía visual.

- Iconografía.

- Bordes y sombras.

- Estados interactivos.

- Componentes reutilizables.

- Modo claro y oscuro.

- Comportamiento responsive.

No se deberán introducir colores, estilos o patrones visuales que contradigan el sistema de diseño aprobado.

Cuando una necesidad visual no esté contemplada, el agente deberá proponer una ampliación del sistema de diseño antes de establecer un nuevo patrón.

## 10. Interacciones obligatorias

La aplicación deberá implementar los comportamientos establecidos en `SPECS.md`, incluyendo como mínimo:

| Componente | Comportamiento |
|---|---|
| Sidebar | Acceso a los seis módulos y navegación lateral persistente. |
| Theme toggle | Cambio global entre modo claro y oscuro. |
| Dropdown | Visualización de las acciones asociadas a cada registro. |
| Modal | Visualización de información detallada y mecanismos de cierre. |
| Collapsible | Expansión y contracción de las skills asociadas a los agentes. |
| Badges | Representación visual de estados, tipos y gravedad de errores. |

Los comportamientos compartidos deberán implementarse de forma reutilizable.

Los dropdowns y modales deberán mostrar la información correspondiente al registro seleccionado.

Las skills asociadas a los agentes deberán permanecer colapsadas inicialmente y expandirse mediante una transición suave.

Los comportamientos específicos de eliminación, configuración y resolución de errores se ajustarán a las especificaciones aprobadas.

No se deberán implementar operaciones reales contra servicios externos.

## 11. Accesibilidad y diseño responsive

El agente deberá procurar que la interfaz sea accesible y utilizable.

Se tendrán en cuenta los siguientes criterios:

- Contraste suficiente entre texto y fondo.

- Indicadores de estado que no dependan exclusivamente del color.

- Etiquetas accesibles para botones de iconos.

- Estados de foco visibles.

- Navegación mediante teclado.

- Atributos `aria-expanded` en componentes expandibles.

- Identificación accesible de ventanas modales.

- Gestión del foco durante la apertura y cierre de modales.

- Cierre mediante teclado cuando corresponda.

- Adaptación a diferentes tamaños de pantalla.

- Prevención de desbordamientos horizontales de la página.

- Gestión adecuada del contenido de tablas en pantallas pequeñas.

Estos criterios deberán aplicarse sin introducir dependencias adicionales.

## 12. Validación y control de calidad

### 12.1. Validación funcional

Se deberá comprobar:

- Acceso a los seis módulos.

- Visualización de los indicadores del Dashboard.

- Coherencia de los datos simulados.

- Apertura y cierre de dropdowns.

- Apertura y cierre de modales.

- Correspondencia entre registros y contenido de los modales.

- Expansión y contracción de las skills.

- Funcionamiento global del modo claro y oscuro.

- Comportamiento de las acciones administrativas según la especificación.

### 12.2. Validación visual

Se deberá revisar:

- Espaciado.

- Alineación.

- Jerarquía visual.

- Contraste.

- Consistencia de componentes.

- Legibilidad.

- Comportamiento responsive.

- Coherencia entre modo claro y oscuro.

### 12.3. Validación técnica

Se deberá comprobar:

- Ausencia de errores JavaScript en la consola del navegador.

- Ausencia de referencias a archivos inexistentes.

- Carga correcta de los recursos.

- Cumplimiento de las restricciones tecnológicas.

- Coherencia con la arquitectura aprobada.

- Ausencia de cambios fuera del alcance de la tarea.

Las pruebas manuales que no puedan ejecutarse deberán quedar identificadas como pendientes.

## 13. Gestión del Memory Bank

El Memory Bank tiene como objetivo mantener la continuidad del proyecto entre diferentes sesiones y agentes de desarrollo.

### 13.1. Registro de decisiones

Archivo: `memory-bank/decisions.md`.

Deberá registrar:

- Decisiones de arquitectura.

- Decisiones tecnológicas.

- Decisiones de diseño.

- Decisiones funcionales relevantes.

- Motivos de las decisiones.

- Alternativas consideradas cuando sean relevantes.

- Referencias a los documentos correspondientes.

- Fecha y estado de aprobación.

Formato recomendado:

```markdown
## DEC-001 | Título de la decisión
- Fecha:
- Estado: Propuesta / Aprobada / Sustituida
- Contexto:
- Decisión:
- Justificación:
- Alternativas consideradas:
- Documentos afectados:
```

Las decisiones propuestas no deberán presentarse como aprobadas.

### 13.2. Registro de progreso

Archivo: `memory-bank/progress.md`.

Deberá registrar:

- Fase actual del proyecto.

- Funcionalidades completadas.

- Funcionalidades en desarrollo.

- Tareas pendientes.

- Validaciones realizadas.

- Validaciones pendientes.

- Bloqueos conocidos.

- Próximos pasos.

El agente deberá actualizar este documento después de completar una tarea o cuando se produzca un cambio relevante en el estado del proyecto, siempre dentro del alcance autorizado. Si la tarea limita los archivos modificables, deberá informar de las actualizaciones pendientes sin modificar archivos adicionales.

### 13.3. Reglas de mantenimiento

El Memory Bank deberá:

- Mantenerse actualizado.

- Ser conciso.

- Referenciar los documentos originales.

- Evitar duplicar especificaciones.

- Diferenciar hechos, propuestas y decisiones aprobadas.

- Conservar la trazabilidad de los cambios relevantes.

No deberá utilizarse como sustituto de `SPECS.md`, `docs/architecture.md` o `specs/tasks.md`.

## 14. Control de versiones

El agente deberá respetar el historial y el estado del repositorio Git.

### 14.1. Reglas generales

- Consultar `git status` antes de modificar archivos.

- Identificar y respetar cambios previos realizados por el usuario.

- Revisar las diferencias mediante `git diff`.

- Mantener cambios pequeños y relacionados con una tarea.

- No eliminar archivos sin autorización.

- No sobrescribir cambios del usuario.

- No modificar el historial de Git.

- No ejecutar operaciones destructivas.

- No realizar commits ni pushes sin autorización explícita.

- No crear o eliminar ramas sin autorización.

### 14.2. Commit obligatorio de especificación

Antes de crear el primer archivo HTML deberá existir un commit independiente que contenga la especificación aprobada.

Mensaje de commit recomendado:

```text
docs: define AgentHub functional and visual specifications
```

El agente deberá comprobar que este requisito se cumple antes de iniciar la implementación. El commit deberá contener la especificación aprobada y excluir los archivos HTML de implementación. No se realizará sin autorización explícita. Véase el procedimiento de verificación de la sección 6.3.

### 14.3. Convención de commits

Cuando se autorice la creación de commits, se utilizará preferentemente Conventional Commits.

| Prefijo | Finalidad |
|---|---|
| `docs:` | Documentación. |
| `feat:` | Nueva funcionalidad. |
| `fix:` | Corrección de errores. |
| `style:` | Cambios de formato sin modificación funcional. |
| `refactor:` | Reorganización interna del código. |
| `test:` | Incorporación o modificación de pruebas. |
| `chore:` | Tareas de mantenimiento. |

Los mensajes deberán ser descriptivos y estar escritos en inglés.

## 15. Gestión de cambios y resolución de dudas

El agente no deberá asumir decisiones relevantes que no estén contempladas en la documentación aprobada.

Cuando exista incertidumbre deberá:

1. Revisar la documentación y el código existente.

2. Identificar la información que falta.

3. Proponer una solución razonada.

4. Explicar las alternativas cuando aporten valor.

5. Solicitar aprobación si la decisión afecta al alcance, la arquitectura, el diseño o el comportamiento funcional.

Las decisiones menores de implementación podrán resolverse de forma autónoma siempre que respeten las especificaciones y no alteren el alcance aprobado.

Se evitarán preguntas innecesarias sobre cuestiones que puedan resolverse consultando el repositorio.

## 16. Definition of Done

Una tarea se considerará completada cuando:

- Cumpla los requisitos definidos en `SPECS.md`.

- Satisfaga sus criterios de aceptación.

- Respete la arquitectura y el sistema de diseño.

- Cumpla las restricciones tecnológicas.

- No introduzca regresiones conocidas.

- No presente errores técnicos detectados en las validaciones realizadas.

- Disponga de evidencias de las comprobaciones requeridas.

- Se haya actualizado su estado en `specs/tasks.md`.

- Se haya actualizado el Memory Bank cuando corresponda.

- Se hayan comunicado las limitaciones y validaciones pendientes.

Una tarea implementada pero pendiente de validación deberá mantenerse en estado de revisión, no como completada.

## 17. Principio rector

El agente deberá priorizar el cumplimiento de las especificaciones, la simplicidad, la calidad y la trazabilidad del desarrollo.

No deberá introducir complejidad innecesaria, ampliar el alcance sin autorización ni sustituir decisiones aprobadas por preferencias propias.

El objetivo no es generar la mayor cantidad posible de código, sino construir un prototipo funcional, coherente, mantenible y verificable mediante un proceso de desarrollo controlado.
