globalThis.AgentHub = globalThis.AgentHub || {};

globalThis.AgentHub.initModals = function initModals() {
	const overlay = document.getElementById('modal-overlay');
	const dialog = document.getElementById('modal-dialog');
	const title = document.getElementById('modal-title');
	const body = document.getElementById('modal-body');
	const actions = document.getElementById('modal-actions');
	const closeButton = document.getElementById('modal-close');
	let opener = null;

	function close(restoreFocus = true) {
		if (overlay.hidden) return;
		overlay.hidden = true;
		if (restoreFocus) {
			const target = opener && opener.isConnected ? opener : document.querySelector('[data-section]:not([hidden]) h1');
			if (target) {
				if (target.tagName === 'H1') target.setAttribute('tabindex', '-1');
				target.focus();
			}
		}
		opener = null;
	}

	function open(options) {
		if (!overlay.hidden) close(false);
		opener = options.opener;
		title.textContent = options.title;
		body.replaceChildren(options.content);
		actions.replaceChildren();
		for (const action of options.actions || []) {
			const button = document.createElement('button');
			button.type = 'button';
			button.className = `dialog-action dialog-action-${action.variant || 'secondary'}`;
			button.textContent = action.label;
			button.addEventListener('click', () => {
				if (!action.onClick || action.onClick() !== false) close();
			});
			actions.append(button);
		}
		overlay.hidden = false;
		(options.initialFocus || closeButton).focus();
	}

	closeButton.addEventListener('click', () => close());
	overlay.addEventListener('click', event => {
		if (event.target === overlay) close();
	});
	dialog.addEventListener('keydown', event => {
		if (event.key === 'Escape') {
			event.preventDefault();
			event.stopPropagation();
			close();
		} else if (event.key === 'Tab') {
			const focusable = Array.from(dialog.querySelectorAll('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href]'));
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

	return { open, close };
};
