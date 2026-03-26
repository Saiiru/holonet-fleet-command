# Requirements Coverage Matrix – VEGA Ops Bench

| Requisito/Tecnologia         | Status    | Evidência/Arquivo(s)                                    | Próxima Ação                         |
|-----------------------------|-----------|--------------------------------------------------------|--------------------------------------|
| Angular (>=v8)              | Feito     | package.json, angular.json                              | —                                    |
| TypeScript/HTML/CSS/JS      | Feito     | src/                                                   | —                                    |
| RxJS                        | Feito     | fleet-page.component.ts, starships-api.service.ts       | —                                    |
| Angular CLI                 | Feito     | angular.json, package.json                             | —                                    |
| Angular Material            | Feito     | package.json, imports nos componentes                   | —                                    |
| REST API (SWAPI)            | Feito     | starships-api.service.ts, models/starship.model.ts      | —                                    |
| Arquitetura front-end       | Parcial   | features/, core/, shared/, layout/                      | Melhorar separação por domínio       |
| CI/CD básico                | Feito     | .github/workflows/ci.yml                               | Melhorar cache e badge no README     |
| Jasmine/Karma base          | Feito     | src/test.ts, specs                                     | Adicionar mais testes de feature     |
| NgRx                        | Parcial   | instalado, bootstrapado em app.config.ts                | Implementar slice real de feature    |
| ngx-translate               | Parcial   | instalado, config inicial                               | Adicionar toggle e textos reais      |
| GraphQL (Apollo)            | Parcial   | instalado, apollo.config.ts                             | Usar em tela de detalhe              |
| E2E moderno (Playwright)    | Parcial   | playwright.config.ts, scripts/                          | Adicionar teste real                 |
| PrimeNG                     | Faltando  | —                                                      | Implementar em showcase              |
| ngx-bootstrap               | Faltando  | —                                                      | Implementar em showcase              |
| Testes unitários/integration| Parcial   | alguns specs                                            | Cobrir features principais           |
| Docker                      | Faltando  | —                                                      | Criar Dockerfile multi-stage         |
| Kubernetes                  | Faltando  | —                                                      | Criar manifests em infra/k8s/        |
| Cloud docs                  | Faltando  | —                                                      | Escrever docs/deployment.md          |
| Documentação forte          | Parcial   | README.md, docs/                                       | Completar docs/ARCHITECTURE.md etc.  |
| Coverage matrix             | Feito     | docs/REQUIREMENTS-COVERAGE.md                          | Atualizar conforme evoluir           |
| Demo script                 | Faltando  | —                                                      | Criar docs/DEMO-SCRIPT.md            |

**Legenda:**
- Feito: Implementado e validado
- Parcial: Implementado parcialmente ou precisa de exemplos reais
- Faltando: Não iniciado ou só dependência instalada

> Atualize esta matriz a cada entrega relevante.
