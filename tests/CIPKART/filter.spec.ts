import test, { expect } from '../../fixtures/basePages';
import { filterData, filterDataAdvanced } from '../../data/filterData';

test.use({
  viewport: { width: 1920, height: 1080 },
  trace: 'on-first-retry',
  storageState: 'playwright/.auth/user.json',
});

test.describe('Filter', () => {
    test.beforeEach(async ({ employeesPage }) => {
    await employeesPage.gotoEmployeesPage();
  });

    test("TC_09 - Filtering ID cards", async ({ page, filterPage }) => {
      const rodneCislo = filterData.rodneCislo;
  
      await filterPage.filterByRodneCislo(rodneCislo);
        
      await expect(page.getByText(rodneCislo, { exact: true })).toBeVisible();    
    });

    test("TC_09.1 - Filter by Rodné číslo with advanced filter", async ({ page, filterPage }) => {
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

    test("TC_09.2 - Filter combinations", async ({ page, filterPage }) => {
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

      await expect(page.getByText(filterDataAdvanced.first.value, { exact: true })).toBeVisible();
      await expect(page.getByText(filterDataAdvanced.second.value, { exact: true })).toBeVisible();
    });

    test("TC_09.3 - Filter by Rodné číslo - invalid data", async ({ page, filterPage }) => {
      await filterPage.openFilter();

      await filterPage.fillFilterRow(
      filterDataAdvanced.first.column,
      filterDataAdvanced.first.operation,
      filterDataAdvanced.first.value2,
      0
      );

      await filterPage.applyFilter();

      await expect(page.getByText('Vybraných položiek: 0 z 0')).toBeVisible();
    });

    test("TC_10 - Reset filters in ID cards list", async ({ page, filterPage }) => {
      const rodneCislo = filterData.rodneCislo;

      await filterPage.filterByRodneCislo(rodneCislo);
      await filterPage.expectRodneCisloVisible(rodneCislo);
  
      await expect(filterPage.resetBtn).toBeVisible();
      await filterPage.resetFilter();
  
      await expect(filterPage.resetBtn).not.toBeVisible();  
    });
  });
