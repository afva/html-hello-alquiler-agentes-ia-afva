# AgentHub | Panel de Administración

## 1. Descripción del proyecto

AgentHub es una plataforma SaaS que permite a las empresas alquilar agentes de inteligencia artificial, equipados con diferentes habilidades (skills), para automatizar tareas y procesos de negocio.

Este proyecto tiene como objetivo desarrollar un prototipo frontend interactivo del panel de administración de AgentHub, que permita visualizar y gestionar los principales recursos de la plataforma.

El prototipo servirá como referencia funcional y visual para una futura integración con el backend.

## 2. Objetivos

- Diseñar una interfaz profesional, intuitiva y coherente.
- Aplicar la metodología Spec-Driven Development (SDD).
- Traducir requisitos funcionales y visuales en especificaciones técnicas.
- Desarrollar el frontend mediante un proceso constructivo e iterativo asistido por IA.
- Implementar y validar las interacciones de los componentes.
- Facilitar la mantenibilidad y futura evolución del proyecto.

## 3. Alcance funcional

| Módulo | Descripción |
|---|---|
| Dashboard | Visualización de indicadores económicos y operativos de la plataforma. |
| Gestión de usuarios | Consulta y gestión de usuarios registrados. |
| Gestión de agentes | Visualización de agentes, estados, configuración y skills asociadas. |
| Skills | Catálogo de habilidades disponibles y su nivel de utilización. |
| Contrataciones | Consulta de contratos de alquiler y desglose económico de los servicios contratados. |
| Log de errores | Monitorización de errores de ejecución, clasificación por gravedad y gestión de incidencias. |

### Funcionalidades transversales

- Navegación lateral persistente.
- Modo claro y oscuro.
- Menús desplegables de acciones.
- Ventanas modales.
- Componentes expandibles y colapsables.
- Indicadores visuales de estado.
- Diseño responsive.

## 4. Tecnologías

| Tecnología | Finalidad |
|---|---|
| HTML5 | Estructura semántica de la interfaz. |
| Tailwind CSS (CDN) | Diseño visual y estilos responsive. |
| JavaScript Vanilla | Comportamiento e interactividad. |
| Google Stitch | Generación de propuestas visuales. |
| GitHub Copilot | Desarrollo asistido por inteligencia artificial. |
| GitHub Codespaces | Entorno de desarrollo. |
| Git y GitHub | Control de versiones y gestión del repositorio. |

## 5. Metodología de desarrollo

El proyecto combina tres enfoques complementarios:

### Vision to Spec

Transformación de las propuestas visuales y los requisitos de negocio en especificaciones funcionales y técnicas.

### Spec-Driven Development (SDD)

Definición de los requisitos, restricciones, arquitectura y criterios de aceptación antes de comenzar la implementación.

### Proceso constructivo iterativo

Desarrollo progresivo de los componentes mediante las siguientes fases:

1. Descomposición de la interfaz en componentes.
2. Definición de la estructura HTML.
3. Incorporación de contenido y datos representativos.
4. Aplicación de estilos y diseño visual.
5. Implementación de interacciones.
6. Validación y refinamiento.

Cada fase será revisada antes de avanzar a la siguiente.

## 6. Restricciones técnicas

- No se utilizarán frameworks frontend como React, Vue o Angular.
- No se utilizarán jQuery ni herramientas de compilación.
- Tailwind CSS se cargará exclusivamente mediante CDN.
- Los datos serán simulados y estarán definidos localmente.
- No se implementarán conexiones con APIs ni servicios backend.
- La especificación `SPECS.md` deberá estar aprobada y registrada en Git antes de comenzar la implementación HTML.

## 7. Documentación

La documentación del proyecto recogerá las especificaciones funcionales, las decisiones de arquitectura, el sistema de diseño, la planificación y los criterios de aceptación.

El documento principal será `SPECS.md`, que actuará como referencia para la implementación y validación del prototipo.

## 8. Estado del proyecto

**Estado actual: prototipo implementado y correcciones de auditoría validadas en Chrome.**

- [x] Inicialización del repositorio.
- [x] Definición de requisitos funcionales.
- [x] Diseño visual con Google Stitch.
- [x] Elaboración de especificaciones.
- [x] Definición de arquitectura y planificación.
- [x] Implementación del frontend y de las interacciones.
- [x] Validación funcional y visual en Chrome.
- [ ] Entrega final: cambios pendientes de registro y publicación; confirmación académica externa pendiente.

El Dashboard se ha refinado visualmente con sus KPI y un placeholder semanal ilustrativo; no muestra mediciones reales ni actividad en tiempo real. El estado detallado se mantiene en [memory-bank/progress.md](memory-bank/progress.md).

## 9. Contexto académico

Proyecto desarrollado como parte del programa de Ingeniería de Inteligencia Artificial de 4Geeks Academy.

**Módulo:** Frontend Development with Coding Agents.

**Proyecto:** Especificaciones y prototipo guiado por prompts de AgentHub.