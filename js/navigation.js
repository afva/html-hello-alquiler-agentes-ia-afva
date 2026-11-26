globalThis.AgentHub = globalThis.AgentHub || {};

globalThis.AgentHub.initNavigation = function initNavigation() {
	const sidebar = document.getElementById('sidebar');
	const overlay = document.getElementById('sidebar-overlay');
	const menuButton = document.getElementById('menu-toggle');
	const closeButton = document.getElementById('menu-close');
	const pageTitle = document.getElementById('page-title');
	const links = Array.from(document.querySelectorAll('[data-view]'));
	const sections = Array.from(document.querySelectorAll('[data-section]'));
	const desktop = window.matchMedia('(min-width: 1024px)');

	if (!sidebar || !overlay || !menuButton || !closeButton || !pageTitle || links.length !== 6 || sections.length !== 6) {
		throw new Error('No se pudo inicializar la navegacion: falta parte de la estructura.');
	}

	function closeMenu(restoreFocus) {
		const wasOpen = sidebar.dataset.open === 'true';
		sidebar.dataset.open = 'false';
		overlay.hidden = true;
		menuButton.setAttribute('aria-expanded', 'false');
		if (wasOpen && restoreFocus && !desktop.matches) {
			menuButton.focus();
		}
	}

	function selectView(link) {
		const section = sections.find(item => item.dataset.section === link.dataset.view);
		if (!section) {
			throw new Error(`Vista inexistente: ${link.dataset.view}`);
		}
		for (const item of sections) {
			item.hidden = item !== section;
		}
		for (const item of links) {
			if (item === link) {
				item.setAttribute('aria-current', 'page');
			} else {
				item.removeAttribute('aria-current');
			}
		}
		pageTitle.textContent = link.textContent.trim();
		closeMenu(true);
	}

	for (const link of links) {
		link.addEventListener('click', event => {
			event.preventDefault();
			selectView(link);
		});
	}
	menuButton.addEventListener('click', () => {
		sidebar.dataset.open = 'true';
		overlay.hidden = false;
		menuButton.setAttribute('aria-expanded', 'true');
		closeButton.focus();
	});
	closeButton.addEventListener('click', () => closeMenu(true));
	overlay.addEventListener('click', () => closeMenu(true));
	document.addEventListener('keydown', event => {
		if (event.key === 'Escape' && sidebar.dataset.open === 'true') {
			closeMenu(true);
		} else if (event.key === 'Tab' && sidebar.dataset.open === 'true' && !desktop.matches) {
			const focusable = [closeButton, ...links];
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (event.shiftKey && (document.activeElement === first || !focusable.includes(document.activeElement))) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && (document.activeElement === last || !focusable.includes(document.activeElement))) {
				event.preventDefault();
				first.focus();
			}
		}
	});
	desktop.addEventListener('change', () => {
		const wasOpen = sidebar.dataset.open === 'true';
		closeMenu(false);
		if (wasOpen && desktop.matches) {
			links.find(link => link.getAttribute('aria-current') === 'page').focus();
		}
	});
	selectView(links[0]);
};
