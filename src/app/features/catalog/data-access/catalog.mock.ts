import { CatalogEntryDto } from '../models/catalog-entry.model';

export const CATALOG_ENTRY_MOCKS: CatalogEntryDto[] = [
  {
    id: 'companion-go',
    name: 'VEGA Companion',
    category: 'Service',
    owner: 'Platform',
    status: 'active',
    tags: ['go', 'api', 'local-first'],
    summary: 'Companion local em Go para tarefas, projetos, notas e automações do hub.',
  },
  {
    id: 'ops-shell',
    name: 'Ops Shell',
    category: 'Workspace',
    owner: 'Frontend',
    status: 'active',
    tags: ['angular', 'shell', 'material'],
    summary: 'Shell principal do VEGA Ops Hub com navegação, métricas rápidas e foco operacional.',
  },
  {
    id: 'risk-engine',
    name: 'Risk Analysis Engine',
    category: 'Assistant',
    owner: 'VEGA',
    status: 'draft',
    tags: ['assistant', 'analysis'],
    summary: 'Motor de análise tática para checklist, síntese e avaliação de riscos.',
  },
  {
    id: 'lab-catalog',
    name: 'Technical Lab Catalog',
    category: 'Catalog',
    owner: 'Hardware',
    status: 'deprecated',
    tags: ['hardware', 'inventory'],
    summary: 'Inventário legado de peças e módulos técnicos mantido para consulta histórica.',
  },
];
