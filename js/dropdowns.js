globalThis.AgentHub = globalThis.AgentHub || {};

globalThis.AgentHub.initDropdowns = function initDropdowns(onAction) {
	let openRoot = null;

	function close(restoreFocus) {
		if (!openRoot) return;
		const trigger = openRoot.querySelector('[data-menu-toggle]');
		openRoot.querySelector('[data-menu]').hidden = true;
		trigger.setAttribute('aria-expanded', 'false');
		openRoot = null;
		if (restoreFocus && trigger.isConnected) trigger.focus();
	}

	document.addEventListener('click', event => {
		const action = event.target.closest('[data-menu-action]');
		if (action) {
			const root = action.closest('[data-menu-root]');
			const trigger = root.querySelector('[data-menu-toggle]');
			close(false);
			onAction(action, trigger);
			return;
		}
		const trigger = event.target.closest('[data-menu-toggle]');
		if (trigger) {
			const root = trigger.closest('[data-menu-root]');
			const wasOpen = root === openRoot;
			close(false);
			if (!wasOpen) {
				openRoot = root;
				const menu = root.querySelector('[data-menu]');
				menu.hidden = false;
				const triggerRect = trigger.getBoundingClientRect();
				const menuRect = menu.getBoundingClientRect();
				menu.style.left = `${Math.max(8, Math.min(window.innerWidth - menuRect.width - 8, triggerRect.right - menuRect.width))}px`;
				menu.style.top = `${triggerRect.bottom + menuRect.height + 8 <= window.innerHeight ? triggerRect.bottom + 4 : Math.max(8, triggerRect.top - menuRect.height - 4)}px`;
				trigger.setAttribute('aria-expanded', 'true');
			}
			return;
		}
		if (openRoot && !openRoot.contains(event.target)) close(false);
	});

	document.addEventListener('keydown', event => {
		if (event.key === 'Escape' && openRoot) {
			event.preventDefault();
			close(true);
		}
	});
	window.addEventListener('resize', () => close(false));
	document.addEventListener('scroll', () => close(false), true);
};
