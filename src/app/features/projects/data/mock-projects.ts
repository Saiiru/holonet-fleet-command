export interface ProjectSummary {
  id: string;
  name: string;
  status: 'active' | 'planning' | 'paused';
  summary: string;
  tags: string[];
}

export const MOCK_PROJECTS: ProjectSummary[] = [
  {
    id: 'vega-ops-hub',
    name: 'VEGA Ops Hub',
    status: 'active',
    summary: 'Workspace local-first para projetos, tarefas, notas e assistência técnica.',
    tags: ['angular', 'productivity', 'companion'],
  },
  {
    id: 'vega-companion',
    name: 'VEGA Companion',
    status: 'active',
    summary: 'Serviço local em Go para dados operacionais e automações do hub.',
    tags: ['go', 'backend', 'api'],
  },
  {
    id: 'helmet-hud',
    name: 'Helmet HUD',
    status: 'planning',
    summary: 'Build eletrônica com energia, display e estrutura para uso embarcado.',
    tags: ['electronics', 'wearable'],
  },
];
