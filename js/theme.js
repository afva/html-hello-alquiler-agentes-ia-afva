globalThis.AgentHub = globalThis.AgentHub || {};

if (globalThis.tailwind) {
	globalThis.tailwind.config = { darkMode: 'class' };
}

globalThis.AgentHub.initTheme = function initTheme() {
	const button = document.getElementById('theme-toggle');
	const icon = document.getElementById('theme-icon');

	if (!button || !icon) {
		throw new Error('No se pudo inicializar el tema: falta el control.');
	}

	function setTheme(dark) {
		document.documentElement.classList.toggle('dark', dark);
		button.setAttribute('aria-pressed', String(dark));
		button.title = dark ? 'Activar modo claro' : 'Activar modo oscuro';
		icon.setAttribute('href', dark ? '#icon-sun' : '#icon-moon');
	}

	setTheme(false);
	button.addEventListener('click', () => {
		setTheme(!document.documentElement.classList.contains('dark'));
	});
};
