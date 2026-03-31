import { expect, test } from '@playwright/test';

const allTasks = [
  {
    id: 1,
    description: 'Validar integracao Angular com o companion',
    status: 'pending',
    project: 'VEGA',
    due: '2026-03-31',
  },
  {
    id: 2,
    description: 'Fortalecer mocks de projects para o MVP',
    status: 'pending',
    project: 'Frontend',
    due: '2026-04-01',
  },
];

test.describe('VEGA Ops Hub', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('http://127.0.0.1:8081/api/tasks/today', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([allTasks[0]]),
      });
    });

    await page.route('http://127.0.0.1:8081/api/tasks', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 3,
            description: 'Nova tarefa',
            status: 'pending',
            project: 'VEGA',
          }),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(allTasks),
      });
    });

    await page.route('http://127.0.0.1:8081/api/tasks/*/done', async (route) => {
      await route.fulfill({
        status: 204,
        body: '',
      });
    });
  });

  test('loads the operational home and tasks board', async ({ page }) => {
    await page.goto('/today');

    await expect(page.getByRole('heading', { name: 'Operational Focus' })).toBeVisible();
    await expect(page.locator('strong').filter({ hasText: 'Validar integracao Angular com o companion' }).first()).toBeVisible();
    await expect(page.getByText('Pending Queue')).toBeVisible();

    await page.goto('/tasks');

    await expect(page.getByRole('heading', { name: 'Task Control Board' })).toBeVisible();
    await expect(page.getByText('Fortalecer mocks de projects para o MVP').first()).toBeVisible();
  });
});
