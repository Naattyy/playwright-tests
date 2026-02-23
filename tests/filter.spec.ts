import test, { expect } from '../fixtures/basePages';
import { FilterPage } from '../pages/FilterPage';

test.describe('Filter', () => {
    test.beforeEach(async ({ loginPage, page }) => {
        await loginPage.gotoLoginPage();
        await loginPage.login();
        await expect(page).toHaveURL('https://cipkartadmin-dev.kube8s.prosoft.sk/index.html#/rail/pass');
    });

    test("TC_09 - Filtering ID cards", async ({ page }) => {
      const filterPage = new FilterPage(page);
      const rodneCislo = "000101/123";
  
      await filterPage.filterByRodneCislo(rodneCislo);
  
      await expect(page.getByText(rodneCislo, { exact: true })).toBeVisible();    
    });
  });