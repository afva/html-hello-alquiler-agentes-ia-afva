# AgentHub | Sistema de diseño Precision Slate

**Estado:** aprobado por el usuario el 2026-11-25, sujeto a las restricciones del proyecto. Este documento consolida las referencias sin modificarlas. [DESIGN.md](references/stitch/DESIGN.md) y las seis parejas `screen.png`/`code.txt` son material de referencia, no especificaciones funcionales.

## 1. Evidencia y criterios de consolidación

Las seis vistas comparten navegación lateral, cabecera, superficies claras, tablas o tarjetas, badges, acentos índigo e iconografía lineal. La propuesta original describe Inter, superficies neutras, espaciado de 4 a 32 px y navegación de 240 a 260 px. Los ejemplos mezclan Lucide y Material Symbols, cifras y etiquetas inconsistentes, controles ajenos al alcance y estados oscuros incompletos. No se trasladan literalmente sus datos ni funciones.

El original asigna al rol primario `#3525cd` en sus tokens y `#4f46e5` en su texto; al secundario `#4648d4` y `#6366f1`; y al fondo `#f8f9ff` y `#f8fafc`. Se han aprobado los valores del texto y de la configuración visible en los ejemplos para la interacción y el fondo. La consolidación, el tema oscuro y los pares semánticos siguientes son decisiones nuevas, no valores previamente aprobados en las referencias. Los requisitos y comportamientos prevalecen sobre cualquier captura.

## 2. Tokens aprobados

| Rol | Claro | Oscuro | Uso |
|---|---|---|---|
| Fondo de aplicación | `#f8fafc` | `#111827` | Área de trabajo |
| Superficie | `#ffffff` | `#1f2937` | Barra lateral, tablas, tarjetas y modales |
| Superficie secundaria | `#f1f5f9` | `#374151` | Cabeceras de tabla y estados al pasar el puntero |
| Texto principal | `#0f172a` | `#f9fafb` | Contenido principal |
| Texto secundario | `#475569` | `#d1d5db` | Metadatos y etiquetas |
| Borde | `#cbd5e1` | `#6b7280` | Separadores y contornos |
| Primario | `#4f46e5` | `#a5b4fc` | Acción principal, navegación activa y foco |
| Texto sobre primario | `#ffffff` | `#111827` | Botón primario |
| Secundario | `#6366f1` | `#c7d2fe` | Acento no textual; no usar como texto blanco de botón sin verificar contraste |
| Positivo, texto / fondo | `#065f46` / `#ecfdf5` | `#a7f3d0` / `#064e3b` | Activo o resuelto |
| Advertencia, texto / fondo | `#92400e` / `#fffbeb` | `#fde68a` / `#78350f` | Atención o gravedad media |
| Error, texto / fondo | `#9f1239` / `#fff1f2` | `#fecdd3` / `#881337` | Fallo o gravedad alta |
| Neutro, texto / fondo | `#334155` / `#f1f5f9` | `#e5e7eb` / `#374151` | Inactivo u otros estados |

El color nunca será el único indicador: cada estado tendrá texto y, cuando proceda, icono. Texto normal: contraste mínimo 4,5:1; texto grande y contornos funcionales: 3:1. Verificar los pares realmente utilizados, incluidos foco y hover, en ambos temas; no asumir que estos tokens cumplen todas las combinaciones posibles.

## 3. Tipografía, escala y composición

- Referencia observada: Inter, con cuerpo de 14 px y encabezados de 18 a 32 px. Usar Inter si está disponible localmente y alternativa `sans-serif` sin bloqueo; no añadir carga externa de fuentes sin autorización. Números tabulares en importes y fechas. No utilizar espaciado entre letras negativo.
- Tamaños aprobados: encabezado de página 24/32 px, sección 18/26 px, cuerpo 14/20 px, etiqueta 12/16 px. No escalar texto en función del ancho de ventana; permitir salto de línea.
- Espaciado: 4, 8, 16, 24 y 32 px. Bordes de 1 px y radios de 4 a 8 px; las insignias pueden ser de tipo píldora. Sombras discretas únicamente para superficies elevadas.
- Layout: navegación lateral de 256 px en escritorio, cabecera compartida y contenido fluido hasta 1440 px. Sin tarjetas anidadas ni contenedores decorativos para secciones completas.
- Mobile-first: por debajo de 768 px, una columna y márgenes de 16 px; de 768 a 1023 px, cuadrícula adaptable y márgenes de 24 px; desde 1024 px, barra lateral fija y márgenes de 32 px. En tamaños menores, navegación lateral en panel superpuesto accesible. Las tablas tendrán desplazamiento horizontal dentro de su propio contenedor, no en la página.

## 4. Componentes y estados

| Componente | Diseño y estados aprobados |
|---|---|
| Navegación | Seis enlaces; activo con fondo, texto e indicador identificables; foco visible y nombre accesible. |
| Botón | Primario, secundario, discreto y destructivo; estados normal, hover, foco y deshabilitado. Los botones de icono tienen nombre accesible y título. |
| Tarjeta de indicador | Valor, etiqueta y unidad; dimensiones estables y textos adaptables. |
| Tabla | Cabecera diferenciada, filas separadas, acciones por registro y estado vacío legible; sin paginación ni filtros en el alcance inicial. |
| Badge | Texto más color semántico para estado y gravedad; los colores no sustituyen el contenido. |
| Menú | Acciones contextuales, superficie elevada, foco visible y cierre sin alterar datos. |
| Modal | Superposición, título, contenido y acciones claramente jerarquizadas; el foco permanece dentro y vuelve al disparador al cerrar. |
| Campo de texto | Etiqueta persistente, contorno, foco visible, descripción y error cuando corresponda; altura adaptable para el prompt. |
| Skills expandibles | Control con etiqueta y `aria-expanded`; inicialmente cerrado, transición breve y alternativa sin movimiento si se solicita. |

La referencia combina Lucide y Material Symbols. La implementación utiliza símbolos SVG lineales locales en la página, sin CDN de iconos ni nueva dependencia, para navegación y controles; el favicon local está disponible en SVG e ICO. Incorporar recursos externos requiere autorización.

## 5. Validación visual

Se han revisado ambos temas en Chrome a 320, 768 y 1440 px, el contraste de los pares principales, la navegación por teclado, el foco, las tablas contenidas y la carga del CDN. El Dashboard se ha comparado visualmente con su referencia y refinado, incluyendo el placeholder semanal R19. La regresión comprobó el retorno del foco, los modales y los iconos locales. Quedan pendientes las pruebas con lector de pantalla y otros navegadores. Las referencias Stitch no incorporan funcionalidades excluidas del alcance.
