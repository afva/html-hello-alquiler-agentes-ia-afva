globalThis.AgentHub = globalThis.AgentHub || {};

globalThis.AgentHub.initCollapsibles = function initCollapsibles() {
	document.addEventListener('click', event => {
		const button = event.target.closest('[data-skill-toggle]');
		if (!button) return;
		const panel = document.getElementById(button.getAttribute('aria-controls'));
		const expanded = button.getAttribute('aria-expanded') !== 'true';
		button.setAttribute('aria-expanded', String(expanded));
		panel.dataset.expanded = String(expanded);
		panel.setAttribute('aria-hidden', String(!expanded));
		if (expanded) globalThis.AgentHub.expandedSkills.add(button.dataset.skillToggle);
		else globalThis.AgentHub.expandedSkills.delete(button.dataset.skillToggle);
	});
};
