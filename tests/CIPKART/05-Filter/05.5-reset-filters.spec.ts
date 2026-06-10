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

    test("TC_05.5_Reset_filters_in_ID_cards_list", async ({ page, filterPage }) => {
      const rodneCislo = filterData.rodneCislo;

      await filterPage.filterByRodneCislo(rodneCislo);
      await filterPage.expectRodneCisloVisible(rodneCislo);
  
      await expect(filterPage.resetBtn).toBeVisible();
      await filterPage.resetFilter();
  
      await expect(filterPage.resetBtn).not.toBeVisible();  
    });
});