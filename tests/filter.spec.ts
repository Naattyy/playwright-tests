import test, { expect } from '../fixtures/basePages';

test.describe('Filter', () => {
    test.beforeEach(async ({ loginPage, page }) => {
        await loginPage.gotoLoginPage();
        await loginPage.login();
        await expect(page).toHaveURL('https://cipkartadmin-dev.kube8s.prosoft.sk/index.html#/rail/pass');
    });

    test("TC_09 - Filtering ID cards", async ({ page, filterPage }) => {
      const rodneCislo = "000101/123";
  
      await filterPage.filterByRodneCislo(rodneCislo);
  
      await expect(page.getByText(rodneCislo, { exact: true })).toBeVisible();    
    });

    test("TC_10 - Reset filters in ID cards list", async ({ page, filterPage }) => {
      const rodneCislo = "000101/123";

      await filterPage.filterByRodneCislo(rodneCislo);
      await filterPage.expectRodneCisloVisible(rodneCislo);
  
      await expect(filterPage.resetBtn).toBeVisible();
      await filterPage.resetFilter();
  
      await expect(filterPage.resetBtn).not.toBeVisible();
  
    });

  });