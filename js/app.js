globalThis.AgentHub = globalThis.AgentHub || {};

globalThis.AgentHub.validateData = function validateData(data) {
	const issues = [];
	const collectionNames = ['users', 'clients', 'agents', 'skills', 'contracts', 'errors'];

	if (!data || typeof data !== 'object') {
		return ['Los datos deben ser un objeto.'];
	}

	for (const name of collectionNames) {
		if (!Array.isArray(data[name])) {
			issues.push(`${name} debe ser una coleccion.`);
		}
	}
	if (issues.length > 0) {
		return issues;
	}

	const indexes = {};

	for (const name of collectionNames) {
		const index = new Map();
		for (const item of data[name]) {
			if (!item || typeof item !== 'object' || typeof item.id !== 'string' || !item.id.trim()) {
				issues.push(`${name} contiene un registro sin ID valido.`);
			} else if (index.has(item.id)) {
				issues.push(`${name} contiene el ID duplicado ${item.id}.`);
			} else {
				index.set(item.id, item);
			}
		}
		indexes[name] = index;
	}

	function requireText(item, fields) {
		for (const field of fields) {
			if (typeof item[field] !== 'string' || !item[field].trim()) {
				issues.push(`${item.id}: ${field} debe contener texto.`);
			}
		}
	}

	function requireOption(item, field, options) {
		if (!options.includes(item[field])) {
			issues.push(`${item.id}: ${field} no es valido.`);
		}
	}

	function isValidDate(value) {
		if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
			return false;
		}
		const date = new Date(`${value}T00:00:00Z`);
		return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
	}

	for (const user of indexes.users.values()) {
		requireText(user, ['name', 'email']);
		requireOption(user, 'plan', ['Starter', 'Pro', 'Enterprise']);
		requireOption(user, 'status', ['activo', 'inactivo', 'pendiente']);
	}

	for (const client of indexes.clients.values()) {
		requireText(client, ['name']);
		if (!indexes.users.has(client.userId)) {
			issues.push(`${client.id}: usuario inexistente.`);
		}
	}

	for (const skill of indexes.skills.values()) {
		requireText(skill, ['name', 'description', 'category']);
	}

	for (const agent of indexes.agents.values()) {
		requireText(agent, ['name', 'systemPrompt']);
		requireOption(agent, 'status', ['activo', 'inactivo', 'fallando']);
		if (!indexes.users.has(agent.ownerId)) {
			issues.push(`${agent.id}: propietario inexistente.`);
		}
		if (!Array.isArray(agent.skillIds)) {
			issues.push(`${agent.id}: skillIds debe ser una coleccion.`);
			continue;
		}
		if (new Set(agent.skillIds).size !== agent.skillIds.length) {
			issues.push(`${agent.id}: skills duplicadas.`);
		}
		for (const skillId of agent.skillIds) {
			if (!indexes.skills.has(skillId)) {
				issues.push(`${agent.id}: skill inexistente ${skillId}.`);
			}
		}
	}

	for (const contract of indexes.contracts.values()) {
		requireOption(contract, 'status', ['activa', 'finalizada']);
		const agent = indexes.agents.get(contract.agentId);
		if (!indexes.clients.has(contract.clientId)) {
			issues.push(`${contract.id}: cliente inexistente.`);
		}
		if (!agent) {
			issues.push(`${contract.id}: agente inexistente.`);
		}
		if (!isValidDate(contract.startDate) || !isValidDate(contract.endDate) || contract.endDate < contract.startDate) {
			issues.push(`${contract.id}: fechas de contrato invalidas.`);
		}
		const validBasePrice = Number.isSafeInteger(contract.basePrice) && contract.basePrice >= 0;
		const validDiscount = Number.isSafeInteger(contract.discount) && contract.discount >= 0;
		if (!validBasePrice || !validDiscount) {
			issues.push(`${contract.id}: importes invalidos.`);
		}
		if (!Array.isArray(contract.skills)) {
			issues.push(`${contract.id}: skills debe ser una coleccion.`);
			continue;
		}
		let subtotal = validBasePrice ? contract.basePrice : 0;
		let validPrices = validBasePrice;
		const contractedSkills = new Set();
		for (const skill of contract.skills) {
			if (!skill || typeof skill !== 'object') {
				issues.push(`${contract.id}: skill contratada invalida.`);
				validPrices = false;
				continue;
			}
			if (contractedSkills.has(skill.skillId)) {
				issues.push(`${contract.id}: skill contratada duplicada ${skill.skillId}.`);
			}
			contractedSkills.add(skill.skillId);
			if (!indexes.skills.has(skill.skillId) || !agent || !Array.isArray(agent.skillIds) || !agent.skillIds.includes(skill.skillId)) {
				issues.push(`${contract.id}: skill contratada no asociada al agente ${skill.skillId}.`);
			}
			if (!Number.isSafeInteger(skill.price) || skill.price < 0) {
				issues.push(`${contract.id}: precio de skill invalido.`);
				validPrices = false;
			} else {
				subtotal += skill.price;
			}
		}
		if (validPrices && (!Number.isSafeInteger(subtotal) || (validDiscount && contract.discount > subtotal))) {
			issues.push(`${contract.id}: subtotal o descuento invalido.`);
		}
	}

	for (const error of indexes.errors.values()) {
		requireText(error, ['occurredAt', 'type', 'description', 'technicalDetail']);
		requireOption(error, 'severity', ['baja', 'media', 'alta', 'crítica']);
		requireOption(error, 'status', ['abierta', 'resuelta']);
		if (!indexes.agents.has(error.agentId)) {
			issues.push(`${error.id}: agente inexistente.`);
		}
		if (typeof error.occurredAt !== 'string' ||
				!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/.test(error.occurredAt) ||
				!isValidDate(error.occurredAt.slice(0, 10)) || Number.isNaN(Date.parse(error.occurredAt))) {
			issues.push(`${error.id}: fecha de incidencia invalida.`);
		}
	}

	return issues;
};

globalThis.AgentHub.formatCurrency = function formatCurrency(cents) {
	return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(cents / 100);
};

globalThis.AgentHub.contractSubtotal = function contractSubtotal(contract) {
	return contract.basePrice + contract.skills.reduce((sum, skill) => sum + skill.price, 0);
};

globalThis.AgentHub.contractTotal = function contractTotal(contract) {
	return globalThis.AgentHub.contractSubtotal(contract) - contract.discount;
};

globalThis.AgentHub.formatDate = function formatDate(date) {
	return new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
};

globalThis.AgentHub.getDashboardMetrics = function getDashboardMetrics(data) {
	const activeContracts = data.contracts.filter(contract => contract.status === 'activa');
	return {
		revenue: activeContracts.reduce((total, contract) => total + globalThis.AgentHub.contractTotal(contract), 0),
		discounts: activeContracts.reduce((total, contract) => total + contract.discount, 0),
		activeAgents: data.weeklyActivity.activeAgents.reduce((total, value) => total + value, 0),
		failedAgents: data.weeklyActivity.failedAgents.reduce((total, value) => total + value, 0)
	};
};

globalThis.AgentHub.renderDashboard = function renderDashboard() {
	globalThis.AgentHub.dashboardMetric = globalThis.AgentHub.dashboardMetric || 'revenue';
	const container = document.getElementById('dashboard-metrics');
	const metrics = globalThis.AgentHub.getDashboardMetrics(globalThis.AgentHub.state);
	const items = [
		['revenue', 'Ingresos totales', globalThis.AgentHub.formatCurrency(metrics.revenue), 'Contrataciones activas', 'icon-trend', 'positive'],
		['discounts', 'Pérdidas por descuentos y cupones', globalThis.AgentHub.formatCurrency(metrics.discounts), 'Contrataciones activas', 'icon-tag', 'warning'],
		['activeAgents', 'Agentes activos', String(metrics.activeAgents), 'Estado operativo', 'icon-agents', 'primary'],
		['failedAgents', 'Agentes con errores', String(metrics.failedAgents), 'Estado operativo', 'icon-errors', 'negative']
	];
	container.replaceChildren();
	for (const [key, label, value, description, iconName, tone] of items) {
		const card = document.createElement('button');
		card.type = 'button';
		card.className = `metric-card metric-${tone}`;
		card.dataset.metric = key;
		card.setAttribute('aria-pressed', String(globalThis.AgentHub.dashboardMetric === key));
		card.setAttribute('aria-label', `Mostrar evolución semanal de ${label}`);
		const headingRow = document.createElement('span');
		headingRow.className = 'metric-heading-row';
		const heading = document.createElement('span');
		heading.className = 'metric-label';
		heading.textContent = label;
		const icon = document.createElement('span');
		icon.className = 'metric-icon';
		icon.setAttribute('aria-hidden', 'true');
		const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		iconSvg.setAttribute('class', 'app-icon');
		const iconUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
		iconUse.setAttribute('href', `#${iconName}`);
		iconSvg.append(iconUse);
		icon.append(iconSvg);
		headingRow.append(heading, icon);
		const number = document.createElement('span');
		number.className = 'metric-value';
		number.textContent = value;
		const detail = document.createElement('span');
		detail.className = 'metric-detail';
		detail.textContent = description;
		card.append(headingRow, number, detail);
		card.addEventListener('click', () => globalThis.AgentHub.selectDashboardMetric(key));
		container.append(card);
	}
	globalThis.AgentHub.renderWeeklyActivity();
};

globalThis.AgentHub.renderWeeklyActivity = function renderWeeklyActivity() {
	const key = globalThis.AgentHub.dashboardMetric;
	const series = globalThis.AgentHub.state.weeklyActivity[key];
	const configs = {
		revenue: { title: 'Ingresos totales', unit: 'Euros (EUR)', legend: 'Ingresos diarios simulados', currency: true },
		discounts: { title: 'Pérdidas por descuentos y cupones', unit: 'Euros (EUR)', legend: 'Pérdidas diarias simuladas', currency: true },
		activeAgents: { title: 'Agentes activos', unit: 'Número de agentes', legend: 'Agentes activos simulados', currency: false },
		failedAgents: { title: 'Agentes con errores', unit: 'Número de agentes', legend: 'Agentes con errores simulados', currency: false }
	};
	const config = configs[key];
	const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
	const rawMax = Math.max(...series);
	let scaleMax;
	let scaleTicks;
	if (config.currency) {
		const magnitude = Math.pow(10, Math.max(0, Math.floor(Math.log10(rawMax))));
		scaleMax = Math.ceil(rawMax / magnitude) * magnitude;
		scaleTicks = [scaleMax, scaleMax * 3 / 4, scaleMax / 2, scaleMax / 4, 0];
	} else {
		scaleMax = Math.max(1, rawMax);
		scaleTicks = [scaleMax, Math.round(scaleMax * 0.75), Math.round(scaleMax * 0.5), Math.round(scaleMax * 0.25), 0];
	}
	const chart = document.getElementById('activity-chart');
	document.getElementById('activity-heading').textContent = config.title;
	document.getElementById('activity-unit').textContent = `Datos simulados · ${config.unit}`;
	document.getElementById('activity-legend').replaceChildren();
	const legendItem = document.createElement('span');
	const swatch = document.createElement('i');
	swatch.className = 'legend-swatch legend-primary';
	legendItem.append(swatch, document.createTextNode(config.legend));
	document.getElementById('activity-legend').append(legendItem);
	chart.replaceChildren();
	const accessibleValues = series.map((value, index) => `${days[index]}: ${config.currency ? globalThis.AgentHub.formatCurrency(value) : `${value} agente${value === 1 ? '' : 's'}`}`).join('. ');
	chart.setAttribute('aria-label', `${config.title}: evolución diaria simulada de lunes a domingo. ${config.unit}. ${accessibleValues}.`);

	const scale = document.createElement('div');
	scale.className = 'chart-scale';
	for (const value of scaleTicks) {
		const label = document.createElement('span');
		label.textContent = config.currency ? globalThis.AgentHub.formatCurrency(value) : String(value);
		scale.append(label);
	}

	const grid = document.createElement('div');
	grid.className = 'chart-grid';
	grid.setAttribute('aria-hidden', 'true');
	for (let index = 0; index < scaleTicks.length - 1; index += 1) grid.append(document.createElement('span'));
	const daysElement = document.createElement('div');
	daysElement.className = 'chart-days';
	daysElement.setAttribute('aria-hidden', 'true');
	series.forEach((value, index) => {
		const day = document.createElement('div');
		day.className = `chart-day${index > 4 ? ' chart-weekend' : ''}`;
		const track = document.createElement('span');
		track.className = 'chart-track';
		const fill = document.createElement('span');
		fill.className = 'chart-fill';
		fill.style.height = '0%';
		const exactValue = config.currency ? globalThis.AgentHub.formatCurrency(value) : `${value} agente${value === 1 ? '' : 's'}`;
		fill.title = `${days[index]}: ${exactValue}`;
		fill.setAttribute('aria-label', `${days[index]}: ${exactValue}`);
		track.append(fill);
		const label = document.createElement('span');
		label.className = 'chart-day-label';
		label.textContent = days[index];
		day.append(track, label);
		daysElement.append(day);
		requestAnimationFrame(() => {
			fill.style.height = `${Math.round(value / scaleMax * 100)}%`;
		});
	});
	chart.append(scale, grid, daysElement);
};

globalThis.AgentHub.selectDashboardMetric = function selectDashboardMetric(key) {
	globalThis.AgentHub.dashboardMetric = key;
	document.querySelectorAll('[data-metric]').forEach(card => {
		card.setAttribute('aria-pressed', String(card.dataset.metric === key));
	});
	globalThis.AgentHub.renderWeeklyActivity();
};

globalThis.AgentHub.element = function element(tag, className, text) {
	const node = document.createElement(tag);
	if (className) node.className = className;
	if (text !== undefined) node.textContent = text;
	return node;
};

globalThis.AgentHub.countLabel = function countLabel(count, singular, plural) {
	return `${count} ${count === 1 ? singular : plural}`;
};

globalThis.AgentHub.badge = function badge(value) {
	const positive = ['activo', 'activa', 'resuelta'].includes(value);
	const warning = ['pendiente', 'media'].includes(value);
	const negative = ['fallando', 'alta', 'crítica'].includes(value);
	const kind = positive ? 'positive' : warning ? 'warning' : negative ? 'negative' : 'neutral';
	return globalThis.AgentHub.element('span', `status-badge status-${kind}`, value.charAt(0).toUpperCase() + value.slice(1));
};

globalThis.AgentHub.createMenu = function createMenu(type, id, name, entries) {
	const root = globalThis.AgentHub.element('div', 'menu-root');
	root.dataset.menuRoot = '';
	root.dataset.type = type;
	root.dataset.id = id;
	const trigger = globalThis.AgentHub.element('button', 'row-action');
	const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	const iconUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
	icon.setAttribute('class', 'app-icon');
	icon.setAttribute('aria-hidden', 'true');
	iconUse.setAttribute('href', '#icon-more');
	icon.append(iconUse);
	trigger.append(icon);
	trigger.type = 'button';
	trigger.dataset.menuToggle = '';
	trigger.setAttribute('aria-label', `Acciones de ${name}`);
	trigger.setAttribute('aria-expanded', 'false');
	trigger.setAttribute('aria-haspopup', 'true');
	trigger.title = `Acciones de ${name}`;
	const menu = globalThis.AgentHub.element('div', 'menu-popup');
	menu.dataset.menu = '';
	menu.hidden = true;
	for (const [action, label] of entries) {
		const button = globalThis.AgentHub.element('button', 'menu-item', label);
		button.type = 'button';
		button.dataset.menuAction = action;
		button.dataset.type = type;
		button.dataset.id = id;
		menu.append(button);
	}
	root.append(trigger, menu);
	return root;
};

globalThis.AgentHub.renderTable = function renderTable(container, headers, rows) {
	container.replaceChildren();
	if (!rows.length) {
		container.append(globalThis.AgentHub.element('p', 'empty-state', 'No hay registros.'));
		return;
	}
	const wrapper = globalThis.AgentHub.element('div', 'table-wrap');
	const table = globalThis.AgentHub.element('table', 'record-table');
	const head = document.createElement('thead');
	const headRow = document.createElement('tr');
	for (const label of headers) {
		const cell = globalThis.AgentHub.element('th', '', label);
		cell.scope = 'col';
		headRow.append(cell);
	}
	head.append(headRow);
	const body = document.createElement('tbody');
	for (const cells of rows) {
		const row = document.createElement('tr');
		for (const value of cells) {
			const cell = document.createElement('td');
			if (typeof value === 'string') cell.textContent = value;
			else cell.append(value);
			row.append(cell);
		}
		body.append(row);
	}
	table.append(head, body);
	wrapper.append(table);
	container.append(wrapper);
};

globalThis.AgentHub.renderUsers = function renderUsers() {
	const users = globalThis.AgentHub.state.users;
	document.getElementById('users-count').textContent = globalThis.AgentHub.countLabel(users.length, 'cuenta', 'cuentas');
	const rows = users.map(user => [user.name, user.email, user.plan, globalThis.AgentHub.badge(user.status),
		globalThis.AgentHub.createMenu('users', user.id, user.name, [['detail', 'Ver detalle'], ['delete', 'Eliminar']])]);
	globalThis.AgentHub.renderTable(document.getElementById('users-content'), ['Cuenta', 'Correo', 'Plan', 'Estado', 'Acciones'], rows);
};

globalThis.AgentHub.renderSkills = function renderSkills() {
	const { skills, agents } = globalThis.AgentHub.state;
	document.getElementById('skills-count').textContent = globalThis.AgentHub.countLabel(skills.length, 'skill', 'skills');
	const container = document.getElementById('skills-content');
	container.replaceChildren();
	if (!skills.length) {
		container.append(globalThis.AgentHub.element('p', 'empty-state', 'No hay registros.'));
		return;
	}
	const grid = globalThis.AgentHub.element('div', 'skill-grid');
	for (const skill of skills) {
		const card = globalThis.AgentHub.element('article', 'skill-card');
		const heading = globalThis.AgentHub.element('div', 'skill-heading');
		heading.append(globalThis.AgentHub.element('h2', 'skill-title', skill.name),
			globalThis.AgentHub.createMenu('skills', skill.id, skill.name, [['detail', 'Ver detalle'], ['delete', 'Eliminar']]));
		const count = agents.filter(agent => agent.skillIds.includes(skill.id)).length;
		card.append(heading, globalThis.AgentHub.element('p', 'skill-description', skill.description),
			globalThis.AgentHub.element('p', 'skill-meta', `${skill.category}  ·  ${globalThis.AgentHub.countLabel(count, 'agente', 'agentes')}`));
		grid.append(card);
	}
	container.append(grid);
};

globalThis.AgentHub.renderAgents = function renderAgents() {
	const { agents, users, skills } = globalThis.AgentHub.state;
	document.getElementById('agents-count').textContent = globalThis.AgentHub.countLabel(agents.length, 'agente', 'agentes');
	const rows = agents.map(agent => {
		const owner = users.find(user => user.id === agent.ownerId);
		const skillsCell = globalThis.AgentHub.element('div', 'agent-skills');
		if (!agent.skillIds.length) {
			skillsCell.textContent = 'Sin skills';
		} else {
			const expanded = globalThis.AgentHub.expandedSkills.has(agent.id);
			const toggle = globalThis.AgentHub.element('button', 'skill-toggle', globalThis.AgentHub.countLabel(agent.skillIds.length, 'skill', 'skills'));
			toggle.type = 'button';
			toggle.dataset.skillToggle = agent.id;
			toggle.setAttribute('aria-expanded', String(expanded));
			toggle.setAttribute('aria-controls', `agent-skills-${agent.id}`);
			const panel = globalThis.AgentHub.element('div', 'skill-collapse');
			panel.id = `agent-skills-${agent.id}`;
			panel.dataset.expanded = String(expanded);
			panel.setAttribute('aria-hidden', String(!expanded));
			const inner = document.createElement('div');
			const list = globalThis.AgentHub.element('ul', 'skill-list');
			for (const skillId of agent.skillIds) {
				const skill = skills.find(item => item.id === skillId);
				list.append(globalThis.AgentHub.element('li', '', skill.name));
			}
			inner.append(list);
			panel.append(inner);
			skillsCell.append(toggle, panel);
		}
		return [agent.name, owner.name, globalThis.AgentHub.badge(agent.status), skillsCell,
			globalThis.AgentHub.createMenu('agents', agent.id, agent.name, [['detail', 'Ver detalle'], ['configure', 'Configurar'], ['delete', 'Eliminar']])];
	});
	globalThis.AgentHub.renderTable(document.getElementById('agents-content'), ['Agente', 'Propietario', 'Estado', 'Skills', 'Acciones'], rows);
};

globalThis.AgentHub.renderContracts = function renderContracts() {
	const { contracts, clients, agents } = globalThis.AgentHub.state;
	document.getElementById('contracts-count').textContent = globalThis.AgentHub.countLabel(contracts.length, 'contratación', 'contrataciones');
	const rows = contracts.map(contract => {
		const client = clients.find(item => item.id === contract.clientId);
		const agent = agents.find(item => item.id === contract.agentId);
		return [client.name, agent.name, globalThis.AgentHub.badge(contract.status),
			globalThis.AgentHub.formatDate(contract.startDate), globalThis.AgentHub.formatDate(contract.endDate),
			globalThis.AgentHub.formatCurrency(globalThis.AgentHub.contractTotal(contract)),
			globalThis.AgentHub.createMenu('contracts', contract.id, contract.id, [['detail', 'Ver detalle'], ['delete', 'Eliminar']])];
	});
	globalThis.AgentHub.renderTable(document.getElementById('contracts-content'), ['Cliente', 'Agente', 'Estado', 'Inicio', 'Fin', 'Importe mensual', 'Acciones'], rows);
};

globalThis.AgentHub.renderErrors = function renderErrors() {
	const { errors, agents } = globalThis.AgentHub.state;
	document.getElementById('errors-count').textContent = globalThis.AgentHub.countLabel(errors.length, 'incidencia', 'incidencias');
	const rows = errors.map(error => {
		const agent = agents.find(item => item.id === error.agentId);
		const date = new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' }).format(new Date(error.occurredAt));
		const actions = [['detail', 'Ver detalle']];
		if (error.status === 'abierta') actions.push(['resolve', 'Resolver']);
		return [date, agent.name, error.type, error.description, globalThis.AgentHub.badge(error.severity),
			globalThis.AgentHub.badge(error.status), globalThis.AgentHub.createMenu('errors', error.id, error.id, actions)];
	});
	globalThis.AgentHub.renderTable(document.getElementById('errors-content'), ['Fecha (UTC)', 'Agente', 'Tipo', 'Descripción', 'Gravedad', 'Estado', 'Acciones'], rows);
};

globalThis.AgentHub.renderAll = function renderAll() {
	globalThis.AgentHub.renderDashboard();
	globalThis.AgentHub.renderUsers();
	globalThis.AgentHub.renderSkills();
	globalThis.AgentHub.renderAgents();
	globalThis.AgentHub.renderContracts();
	globalThis.AgentHub.renderErrors();
};

globalThis.AgentHub.deletionBlock = function deletionBlock(type, record, data) {
	const references = [];
	if (type === 'users') {
		if (data.agents.some(agent => agent.ownerId === record.id)) references.push('agentes');
		if (data.clients.some(client => client.userId === record.id)) references.push('clientes');
	} else if (type === 'agents') {
		if (data.contracts.some(contract => contract.agentId === record.id)) references.push('contrataciones');
		if (data.errors.some(error => error.agentId === record.id)) references.push('incidencias');
	} else if (type === 'skills') {
		if (data.agents.some(agent => agent.skillIds.includes(record.id))) references.push('agentes');
		if (data.contracts.some(contract => contract.skills.some(skill => skill.skillId === record.id))) references.push('contrataciones');
	}
	return references.length ? `No se puede eliminar: está relacionado con ${references.join(' y ')}.` : '';
};

globalThis.AgentHub.detailContent = function detailContent(type, record) {
	const data = globalThis.AgentHub.state;
	const entries = [['ID', record.id]];
	if (type === 'users') {
		entries.push(['Cuenta', record.name], ['Correo', record.email], ['Plan', record.plan], ['Estado', record.status]);
	} else if (type === 'agents') {
		entries.push(['Agente', record.name], ['Propietario', data.users.find(user => user.id === record.ownerId).name],
			['Estado', record.status], ['Skills', record.skillIds.map(id => data.skills.find(skill => skill.id === id).name).join(', ') || 'Sin skills'],
			['System prompt', record.systemPrompt]);
	} else if (type === 'skills') {
		entries.push(['Skill', record.name], ['Categoría', record.category], ['Descripción', record.description],
			['Agentes', String(data.agents.filter(agent => agent.skillIds.includes(record.id)).length)]);
	} else if (type === 'contracts') {
		entries.push(['Cliente', data.clients.find(client => client.id === record.clientId).name],
			['Agente', data.agents.find(agent => agent.id === record.agentId).name], ['Estado', record.status],
			['Inicio', globalThis.AgentHub.formatDate(record.startDate)], ['Fin', globalThis.AgentHub.formatDate(record.endDate)],
			['Precio base mensual', globalThis.AgentHub.formatCurrency(record.basePrice)]);
		for (const item of record.skills) {
			entries.push([data.skills.find(skill => skill.id === item.skillId).name, globalThis.AgentHub.formatCurrency(item.price)]);
		}
		entries.push(['Subtotal', globalThis.AgentHub.formatCurrency(globalThis.AgentHub.contractSubtotal(record))],
			['Descuento', globalThis.AgentHub.formatCurrency(record.discount)], ['Total mensual', globalThis.AgentHub.formatCurrency(globalThis.AgentHub.contractTotal(record))]);
	} else if (type === 'errors') {
		entries.push(['Agente', data.agents.find(agent => agent.id === record.agentId).name], ['Fecha (UTC)', record.occurredAt],
			['Tipo', record.type], ['Descripción', record.description], ['Gravedad', record.severity],
			['Estado', record.status], ['Detalle técnico', record.technicalDetail]);
	}
	const list = globalThis.AgentHub.element('dl', 'detail-list');
	for (const [label, value] of entries) {
		list.append(globalThis.AgentHub.element('dt', '', label), globalThis.AgentHub.element('dd', '', value));
	}
	return list;
};

globalThis.AgentHub.showMessage = function showMessage(title, message, opener) {
	globalThis.AgentHub.modal.open({
		title, opener, content: globalThis.AgentHub.element('p', 'dialog-message', message),
		actions: [{ label: 'Cerrar' }]
	});
};

globalThis.AgentHub.handleAction = function handleAction(action, opener) {
	const { type, id, menuAction } = action.dataset;
	const records = globalThis.AgentHub.state[type];
	const record = Array.isArray(records) ? records.find(item => item.id === id) : null;
	if (!record) {
		globalThis.AgentHub.showMessage('Registro no disponible', 'El registro ya no existe.', opener);
		return;
	}
	if (menuAction === 'detail') {
		globalThis.AgentHub.modal.open({
			title: 'Detalle', opener, content: globalThis.AgentHub.detailContent(type, record),
			actions: [{ label: 'Cerrar' }]
		});
	} else if (menuAction === 'configure' && type === 'agents') {
		const content = globalThis.AgentHub.element('div', 'prompt-form');
		content.append(globalThis.AgentHub.element('p', 'dialog-message', record.name));
		const label = globalThis.AgentHub.element('label', 'prompt-label', 'System prompt');
		label.htmlFor = 'agent-prompt';
		const input = globalThis.AgentHub.element('textarea', 'prompt-input');
		input.id = 'agent-prompt';
		input.rows = 6;
		input.value = record.systemPrompt;
		input.setAttribute('aria-describedby', 'prompt-error');
		const error = globalThis.AgentHub.element('p', 'field-error');
		error.id = 'prompt-error';
		error.hidden = true;
		error.setAttribute('role', 'alert');
		content.append(label, input, error);
		globalThis.AgentHub.modal.open({
			title: 'Configurar agente', opener, content, initialFocus: input,
			actions: [
				{ label: 'Cancelar' },
				{ label: 'Guardar', variant: 'primary', onClick: () => {
					const value = input.value.trim();
					if (!value) {
						error.textContent = 'El system prompt no puede estar vacío.';
						error.hidden = false;
						input.setAttribute('aria-invalid', 'true');
						input.focus();
						return false;
					}
					record.systemPrompt = value;
				} }
			]
		});
	} else if (menuAction === 'delete' && ['users', 'agents', 'skills', 'contracts'].includes(type)) {
		const blocked = globalThis.AgentHub.deletionBlock(type, record, globalThis.AgentHub.state);
		if (blocked) {
			globalThis.AgentHub.showMessage('No se puede eliminar', blocked, opener);
			return;
		}
		const labels = { users: 'usuario', agents: 'agente', skills: 'skill', contracts: 'contratación' };
		const name = record.name || record.id;
		const content = globalThis.AgentHub.element('p', 'dialog-message', `¿Eliminar ${labels[type]} ${name} (${record.id})?`);
		globalThis.AgentHub.modal.open({
			title: 'Confirmar eliminación', opener, content,
			actions: [
				{ label: 'Cancelar' },
				{ label: 'Eliminar', variant: 'danger', onClick: () => {
					const current = globalThis.AgentHub.state[type].find(item => item.id === id);
					const reason = current && globalThis.AgentHub.deletionBlock(type, current, globalThis.AgentHub.state);
					if (!current || reason) {
						globalThis.AgentHub.showMessage('No se puede eliminar', reason || 'El registro ya no existe.', opener);
						return false;
					}
					const next = structuredClone(globalThis.AgentHub.state);
					next[type] = next[type].filter(item => item.id !== id);
					if (globalThis.AgentHub.validateData(next).length) {
						globalThis.AgentHub.showMessage('No se puede eliminar', 'La operación dejaría datos incoherentes.', opener);
						return false;
					}
					globalThis.AgentHub.state[type] = next[type];
					if (type === 'agents') globalThis.AgentHub.expandedSkills.delete(id);
					globalThis.AgentHub.renderAll();
				} }
			]
		});
	} else if (menuAction === 'resolve' && type === 'errors' && record.status === 'abierta') {
		record.status = 'resuelta';
		globalThis.AgentHub.renderErrors();
		const replacement = Array.from(document.querySelectorAll('[data-menu-root]')).find(root => root.dataset.type === type && root.dataset.id === id);
		if (replacement) replacement.querySelector('[data-menu-toggle]').focus();
	}
};

if (typeof document !== 'undefined') {
	const dataIssues = globalThis.AgentHub.validateData(globalThis.AgentHub.initialData);
	if (dataIssues.length) throw new Error(`Datos invalidos: ${dataIssues.join(' ')}`);
	globalThis.AgentHub.state = structuredClone(globalThis.AgentHub.initialData);
	globalThis.AgentHub.expandedSkills = new Set();
	globalThis.AgentHub.initNavigation();
	globalThis.AgentHub.initTheme();
	globalThis.AgentHub.modal = globalThis.AgentHub.initModals();
	globalThis.AgentHub.initDropdowns((action, opener) => globalThis.AgentHub.handleAction(action, opener));
	globalThis.AgentHub.initCollapsibles();
	globalThis.AgentHub.renderAll();
}
