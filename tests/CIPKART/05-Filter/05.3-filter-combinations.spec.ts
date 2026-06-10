import test, { expect } from '../../../fixtures/basePages';
import { filterData, filterDataAdvanced } from '../../../data/filterData';

test.use({
  viewport: { width: 1920, height: 1080 },
  trace: 'on-first-retry',
  storageState: 'playwright/.auth/user.json',
});

test.describe('Filter', () => {
    test.beforeEach(async ({ employeesPage }) => {
    await employeesPage.gotoEmployeesPage();
  });

    test("TC_05.3_Filter_combinations", async ({ page, filterPage }) => {
      await filterPage.openFilter();

      await filterPage.fillFilterRow(
      filterDataAdvanced.first.column,
      filterDataAdvanced.first.operation,
      filterDataAdvanced.first.value,
      0
      );

      await filterPage.addOrCondition();

      await filterPage.fillFilterRow(
      filterDataAdvanced.second.column,
      filterDataAdvanced.second.operation,
      filterDataAdvanced.second.value,
      1
      );

      await filterPage.applyFilter();

      await expect(page.getByText('Vybraných položiek: 0 z 3')).toBeVisible();
    });
});