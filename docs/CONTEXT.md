# CONTEXT.md | Contexto del proyecto AgentHub

## 1. Contexto de negocio

AgentHub es una startup que está desarrollando una plataforma SaaS para el alquiler de agentes de inteligencia artificial.

La plataforma permite a las empresas contratar agentes inteligentes preconfigurados, equipados con diferentes habilidades (skills), para ejecutar tareas específicas y automatizar procesos de negocio.

Estas habilidades pueden incluir capacidades como:

- Navegación y búsqueda de información en Internet.
- Lectura y procesamiento de documentos.
- Gestión de calendarios.
- Automatización de tareas empresariales.

AgentHub dispone de un backend funcional, pero necesita desarrollar una interfaz de administración que permita gestionar y supervisar los recursos de la plataforma de forma centralizada.

## 2. Problema de negocio

El equipo fundador necesita un panel de administración que facilite la gestión operativa y económica de la plataforma.

Actualmente, se requiere una interfaz que permita:

- Supervisar los principales indicadores económicos y operativos.
- Consultar y gestionar los usuarios registrados.
- Monitorizar el estado de los agentes de inteligencia artificial.
- Consultar las habilidades disponibles y su utilización.
- Supervisar las contrataciones de agentes.
- Identificar y gestionar errores de ejecución.

El equipo necesita validar la estructura, el diseño y las interacciones de esta interfaz antes de abordar su integración con el backend existente.

## 3. Objetivo del proyecto

Desarrollar un prototipo frontend interactivo del panel de administración de AgentHub que permita validar la experiencia de usuario, la organización de la información y los principales flujos de gestión.

El prototipo deberá servir como referencia visual y funcional para el equipo de producto y los futuros desarrolladores responsables de su integración con el backend.

No se pretende desarrollar una aplicación productiva completa, sino un prototipo suficientemente representativo de la solución final.

## 4. Usuarios objetivo

El usuario principal del prototipo es el administrador de la plataforma AgentHub.

Se contemplan los siguientes perfiles de usuario como referencia para el diseño:

| Perfil | Necesidades |
|---|---|
| Administrador de plataforma | Gestión y supervisión general de los recursos. |
| Responsable de operaciones | Monitorización de agentes, estados e incidencias. |
| Responsable de negocio | Consulta de indicadores económicos y contrataciones. |
| Responsable técnico | Consulta de configuraciones, skills y errores de ejecución. |

Estos perfiles representan diferentes necesidades de consulta y gestión. No implican la implementación de roles, permisos o mecanismos de autenticación diferenciados.

## 5. Modelo conceptual de negocio

La plataforma se organiza alrededor de las siguientes entidades:

| Entidad | Descripción |
|---|---|
| Usuario | Persona o cuenta registrada en la plataforma. |
| Cliente | Entidad que contrata los servicios de AgentHub. |
| Agente | Asistente de inteligencia artificial configurado para ejecutar determinadas tareas. |
| Skill | Capacidad funcional que puede incorporarse a uno o varios agentes. |
| Contratación | Acuerdo de alquiler de un agente y sus habilidades asociadas durante un periodo determinado. |
| Error | Incidencia registrada durante la ejecución de un agente. |

### Relaciones conceptuales

- Un agente tiene un propietario.
- Un agente puede tener varias skills asociadas.
- Una skill puede estar habilitada en varios agentes.
- Un cliente puede contratar agentes y sus skills asociadas.
- Una contratación tiene unas fechas y un importe económico.
- Un agente puede generar errores durante su ejecución.

Estas relaciones constituyen una referencia conceptual para construir datos simulados coherentes. No representan un modelo físico de base de datos ni un contrato de integración con el backend.

## 6. Alcance funcional

El panel de administración estará compuesto por seis módulos principales.

### 6.1. Dashboard

Visión general de la situación económica y operativa de AgentHub mediante indicadores de ingresos, descuentos, agentes activos y agentes con fallos.

### 6.2. Gestión de usuarios

Consulta de los usuarios registrados, sus planes, estados y datos asociados.

### 6.3. Gestión de agentes

Supervisión de los agentes disponibles, propietarios, estados, configuraciones y habilidades asociadas.

### 6.4. Skills

Consulta del catálogo de habilidades disponibles y su nivel de utilización dentro de la plataforma.

### 6.5. Contrataciones de agentes

Consulta de los contratos de alquiler, clientes, agentes contratados y desglose económico de los servicios.

### 6.6. Log de errores

Supervisión de las incidencias de ejecución, clasificación visual de errores y consulta de información técnica asociada.

Los requisitos detallados, componentes, comportamientos y criterios de aceptación de cada módulo se definirán en `SPECS.md`.

## 7. Principios de diseño

La interfaz deberá desarrollarse siguiendo los siguientes principios:

- **Claridad:** facilitar la comprensión de la información y de las acciones disponibles.
- **Consistencia:** mantener patrones visuales y funcionales comunes entre los módulos.
- **Usabilidad:** reducir la complejidad de las tareas administrativas.
- **Jerarquía visual:** priorizar los indicadores, estados y acciones relevantes.
- **Modularidad:** favorecer la reutilización de componentes y comportamientos.
- **Accesibilidad:** facilitar la lectura, navegación e interacción con la interfaz.
- **Escalabilidad:** permitir la futura incorporación de funcionalidades sin reorganizar completamente el proyecto.
- **Diseño responsive:** adaptar la presentación a diferentes tamaños de pantalla.

La identidad visual y las reglas específicas de diseño se definirán en `docs/design-system.md`, tomando como punto de partida una propuesta generada mediante Google Stitch.

## 8. Alcance técnico

El proyecto se desarrollará como un prototipo frontend estático e interactivo.

### Tecnologías permitidas

- HTML5.
- Tailwind CSS mediante CDN.
- JavaScript Vanilla.
- CSS complementario cuando esté justificado.

### Restricciones

- No utilizar frameworks frontend.
- No utilizar jQuery.
- No utilizar herramientas de compilación o build.
- No establecer conexiones con APIs externas.
- No implementar servicios backend.
- Utilizar exclusivamente datos simulados definidos localmente.

Las decisiones relativas a la organización del código y la arquitectura de componentes se documentarán en `docs/architecture.md`.

## 9. Fuera de alcance

Quedan fuera del alcance del proyecto:

- Autenticación real de usuarios.
- Autorización y gestión de permisos.
- Integración con bases de datos.
- Integración con el backend existente.
- Ejecución real de agentes de inteligencia artificial.
- Procesamiento real de pagos y facturación.
- Persistencia de operaciones administrativas en sistemas externos.
- Implementación de servicios de monitorización en tiempo real.

Las operaciones administrativas podrán simularse mediante interacciones locales cuando sea necesario para validar el comportamiento de la interfaz.

## 10. Metodología de desarrollo

El proyecto seguirá un enfoque de desarrollo asistido por inteligencia artificial basado en tres metodologías complementarias.

### Vision to Spec

Transformar los requisitos de negocio y las propuestas visuales en especificaciones estructuradas y verificables.

### Spec-Driven Development

Definir y aprobar las especificaciones antes de comenzar la implementación, utilizándolas como contrato entre los requisitos y el código.

### Desarrollo constructivo e iterativo

Construir la interfaz progresivamente mediante:

1. Descomposición en componentes.
2. Definición de la estructura.
3. Incorporación del contenido.
4. Aplicación de estilos.
5. Implementación de interacciones.
6. Validación y refinamiento.

La implementación deberá realizarse de forma incremental, evitando modificaciones fuera del alcance de cada tarea.

## 11. Criterios generales de éxito

El proyecto se considerará satisfactorio cuando:

- Los seis módulos estén representados en la interfaz.
- La navegación lateral permita acceder a todos los módulos.
- La interfaz disponga de modo claro y oscuro.
- Los componentes interactivos obligatorios funcionen correctamente.
- Los datos simulados sean representativos y coherentes.
- El diseño sea profesional y consistente.
- La implementación respete las restricciones tecnológicas.
- El código y la documentación estén disponibles en un repositorio público de GitHub.
- El historial de Git demuestre que `SPECS.md` fue registrado antes de la creación del primer archivo HTML.

## 12. Documentación de referencia

| Documento | Responsabilidad |
|---|---|
| `README.md` | Presentación general del proyecto. |
| `AGENTS.md` | Instrucciones para los agentes de desarrollo. |
| `docs/CONTEXT.md` | Contexto de negocio, objetivos y alcance. |
| `SPECS.md` | Especificaciones funcionales y visuales. |
| `docs/architecture.md` | Arquitectura técnica y organización del código. |
| `docs/design-system.md` | Sistema de diseño y reglas visuales. |
| `specs/plan.md` | Estrategia de implementación. |
| `specs/tasks.md` | Tareas y criterios de aceptación. |
| `memory-bank/decisions.md` | Registro de decisiones aprobadas. |
| `memory-bank/progress.md` | Estado y evolución del proyecto. |

## 13. Fuente de requisitos

Proyecto académico de 4Geeks Academy:

- Programa: Ingeniería de Inteligencia Artificial.
- Módulo: Frontend Development with Coding Agents.
- Proyecto: Especificaciones y prototipo guiado por prompts de AgentHub.
