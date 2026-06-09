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

    test("TC_05.1_Filtering_ID_cards", async ({ page, filterPage }) => {
      const rodneCislo = filterData.rodneCislo;
  
      await filterPage.filterByRodneCislo(rodneCislo);
        
      await expect(page.getByText(rodneCislo, { exact: true })).toBeVisible();    
    });
});