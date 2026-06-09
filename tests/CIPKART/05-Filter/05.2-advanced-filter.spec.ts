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

    test("TC_05.2_Filter_by_Rodné_číslo_with_advanced_filter", async ({ page, filterPage }) => {
      await filterPage.openFilter();

      await filterPage.fillFilterRow(
      filterDataAdvanced.first.column,
      filterDataAdvanced.first.operation,
      filterDataAdvanced.first.value,
      0
      );

      await filterPage.applyFilter();

      await expect(page.getByText(filterDataAdvanced.first.value, { exact: true })).toBeVisible();
    });    
});