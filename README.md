# AgentHub | Panel de administración

AgentHub es un prototipo frontend interactivo para supervisar una plataforma de alquiler de agentes de inteligencia artificial. Está orientado a la administración y utiliza exclusivamente datos ficticios locales; no se conecta a servicios de negocio ni ejecuta agentes reales.

## Funcionalidades

- **Dashboard:** indicadores de ingresos, descuentos, agentes activos y agentes con fallos, calculados a partir de los datos simulados, además de un placeholder visual de actividad semanal sin métricas reales.
- **Usuarios:** listado, detalle y eliminación simulada cuando no existen referencias que la impidan.
- **Agentes:** estado, propietario, skills expandibles y configuración de un system prompt.
- **Skills:** catálogo, detalle y número de agentes asociados.
- **Contrataciones:** clientes, agentes, fechas y desglose económico mensual.
- **Log de errores:** gravedad, detalle técnico simulado y resolución sin eliminar el historial.

La interfaz incorpora navegación adaptable, modo claro y oscuro, menús, modales y acciones accesibles por teclado. Las eliminaciones requieren confirmación y no producen cascadas.

## Arquitectura y tecnologías

La aplicación es una SPA de una sola página HTML con layout compartido y seis vistas. Emplea HTML5, Tailwind CSS mediante CDN, JavaScript Vanilla, CSS complementario e iconos SVG locales. No requiere frameworks, compilación ni dependencias npm.

Los datos iniciales están centralizados en `js/data.js`. El estado y las operaciones se mantienen en memoria y se restauran al recargar la página. Los módulos de `js/` separan navegación, tema, menús, modales, componentes expandibles e inicialización. La arquitectura detallada se describe en [docs/architecture.md](docs/architecture.md).

## Ejecución

Se necesita un navegador moderno y conexión a Internet para cargar Tailwind desde su CDN. La aplicación puede abrirse directamente desde `index.html`; en un contenedor o Codespaces es más práctico servir los archivos estáticos:

```bash
python3 -m http.server 8000 --bind 0.0.0.0
```

Abre `http://localhost:8000/` o el puerto reenviado por Codespaces. El servidor solo entrega archivos estáticos y no implementa servicios de negocio. Para detenerlo, pulsa `Ctrl+C` en su terminal.

## Documentación y estado

- [SPECS.md](SPECS.md): requisitos y criterios de aceptación.
- [docs/design-system.md](docs/design-system.md): sistema visual aprobado.
- [specs/tasks.md](specs/tasks.md): tareas y trazabilidad.
- [memory-bank/progress.md](memory-bank/progress.md): progreso, validaciones y observación académica.

El prototipo está implementado con datos simulados. La entrega requiere registrar y publicar los cambios autorizados; la confirmación académica externa sobre el HTML de plantilla anterior continúa pendiente.
