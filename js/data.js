globalThis.AgentHub = globalThis.AgentHub || {};

globalThis.AgentHub.initialData = {
	users: [
		{ id: 'user-001', name: 'Cuenta Demo Norte', email: 'norte@example.invalid', plan: 'Enterprise', status: 'activo' },
		{ id: 'user-002', name: 'Cuenta Demo Sur', email: 'sur@example.invalid', plan: 'Pro', status: 'activo' },
		{ id: 'user-003', name: 'Cuenta Demo Centro', email: 'centro@example.invalid', plan: 'Starter', status: 'pendiente' },
		{ id: 'user-004', name: 'Cuenta Demo Libre', email: 'libre@example.invalid', plan: 'Starter', status: 'inactivo' }
	],
	clients: [
		{ id: 'client-001', name: 'Empresa Demo Norte', userId: 'user-001' },
		{ id: 'client-002', name: 'Empresa Demo Sur', userId: 'user-002' }
	],
	agents: [
		{
			id: 'agent-001', name: 'Asistente de facturas', ownerId: 'user-001', status: 'activo',
			systemPrompt: 'Revisa facturas de ejemplo y resume los resultados.',
			skillIds: ['skill-001', 'skill-002']
		},
		{
			id: 'agent-002', name: 'Asistente de soporte', ownerId: 'user-002', status: 'activo',
			systemPrompt: 'Clasifica consultas de ejemplo para el equipo de soporte.',
			skillIds: ['skill-002', 'skill-003']
		},
		{
			id: 'agent-003', name: 'Asistente de informes', ownerId: 'user-003', status: 'fallando',
			systemPrompt: 'Resume informes de ejemplo sin usar datos externos.',
			skillIds: ['skill-001']
		},
		{
			id: 'agent-004', name: 'Asistente de prueba', ownerId: 'user-003', status: 'inactivo',
			systemPrompt: 'Procesa tareas de ejemplo cuando se active.',
			skillIds: []
		}
	],
	skills: [
		{ id: 'skill-001', name: 'Lectura de documentos', description: 'Extrae texto de documentos de ejemplo.', category: 'Documentos' },
		{ id: 'skill-002', name: 'Resumen de texto', description: 'Genera resúmenes de contenido de ejemplo.', category: 'Contenido' },
		{ id: 'skill-003', name: 'Clasificador de consultas', description: 'Agrupa consultas por tema.', category: 'Soporte' },
		{ id: 'skill-004', name: 'Agenda de prueba', description: 'Organiza eventos de ejemplo.', category: 'Productividad' }
	],
	contracts: [
		{
			id: 'contract-001', clientId: 'client-001', agentId: 'agent-001', status: 'activa',
			startDate: '2026-01-01', endDate: '2026-12-31', basePrice: 120000, discount: 15000,
			skills: [{ skillId: 'skill-001', price: 25000 }, { skillId: 'skill-002', price: 10000 }]
		},
		{
			id: 'contract-002', clientId: 'client-002', agentId: 'agent-002', status: 'activa',
			startDate: '2026-04-01', endDate: '2027-03-31', basePrice: 80000, discount: 0,
			skills: [{ skillId: 'skill-003', price: 20000 }]
		},
		{
			id: 'contract-003', clientId: 'client-001', agentId: 'agent-001', status: 'finalizada',
			startDate: '2025-01-01', endDate: '2025-12-31', basePrice: 100000, discount: 10000,
			skills: [{ skillId: 'skill-001', price: 20000 }]
		}
	],
	errors: [
		{
			id: 'error-001', agentId: 'agent-003', occurredAt: '2026-11-25T09:00:00Z',
			type: 'Entrada no válida', description: 'El informe de ejemplo no tiene contenido.',
			severity: 'baja', status: 'abierta', technicalDetail: 'Código simulado: EMPTY_INPUT.'
		},
		{
			id: 'error-002', agentId: 'agent-003', occurredAt: '2026-11-25T09:15:00Z',
			type: 'Tiempo agotado', description: 'La tarea simulada supera el tiempo permitido.',
			severity: 'media', status: 'abierta', technicalDetail: 'Código simulado: TASK_TIMEOUT.'
		},
		{
			id: 'error-003', agentId: 'agent-003', occurredAt: '2026-11-25T09:30:00Z',
			type: 'Proceso interrumpido', description: 'No se pudo completar el informe de ejemplo.',
			severity: 'alta', status: 'abierta', technicalDetail: 'Código simulado: PROCESS_INTERRUPTED.'
		},
		{
			id: 'error-004', agentId: 'agent-002', occurredAt: '2026-11-24T16:00:00Z',
			type: 'Error de prueba', description: 'La incidencia simulada ya fue resuelta.',
			severity: 'crítica', status: 'resuelta', technicalDetail: 'Código simulado: TEST_FAILURE.'
		}
	],
	weeklyActivity: {
		revenue: [30000, 38000, 35000, 32000, 42000, 31000, 32000],
		discounts: [2500, 2200, 2000, 1800, 3000, 2000, 1500],
		activeAgents: [1, 2, 1, 2, 3, 2, 2],
		failedAgents: [1, 1, 1, 1, 1, 1, 0]
	}
};
