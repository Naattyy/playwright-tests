import test, { expect } from '../fixtures/basePages';

test.describe('Customers', () => {
  test.beforeEach(async ({ loginPage, page }) => {
      await loginPage.gotoLoginPage();
      await loginPage.login();
      await expect(page).toHaveURL('https://cipkartadmin-dev.kube8s.prosoft.sk/index.html#/rail/pass');
  });


  test('Create new customer', async ({ page, customersPage }) => {
      await page.getByRole('heading', { name: 'Zákazníci' }).click();
      await page.getByRole('link', { name: 'Preukazy', exact: true }).click();

      await customersPage.clickAddCustomer();
      
      await customersPage.fillCustomerForm(
        'Mrkva',
        'Ján',
        '01.01.1990',
        '98765432',
      );

      await customersPage.saveCustomer();

      // Hľadanie a scrollovanie, kým sa nenájde
      while ((await page.locator('tr', { hasText: 'Mrkva' }).count()) === 0) {
      await page.locator('tr').last().scrollIntoViewIfNeeded();
      }
  
      await expect(page.locator('text=Mrkva')).toBeVisible();
  });

  test('Edit existing customer - update street', async ({ page, customersPage }) => {
      await page.getByRole('heading', { name: 'Zákazníci' }).click();
      await page.getByRole('link', { name: 'Preukazy', exact: true }).click();

      await customersPage.clickAddCustomer();

      await customersPage.fillCustomerForm(
        'Mrkvová', 
        'Ivana',        
        '22.02.1999',    
        '4455667788' 
      );

      await customersPage.saveCustomer();

      // Hľadanie a scrollovanie, kým sa nenájde
      while ((await page.locator('tr', { hasText: 'Mrkvová' }).count()) === 0) {
      await page.locator('tr').last().scrollIntoViewIfNeeded();
      }

      await page.locator('tr', { hasText: 'Mrkvová' }).first().click();

      const street = 'Kamenná';
      await customersPage.editStreet(street);
      await customersPage.saveCustomer();
      await customersPage.expectEditStreetValue(street);

  });


  test('Delete existing customer', async ({ page, customersPage }) => {
      await page.getByRole('heading', { name: 'Zákazníci' }).click();
      await page.getByRole('link', { name: 'Preukazy', exact: true }).click();

      await customersPage.clickAddCustomer();

      await customersPage.fillCustomerForm(
        'Mrkvička', 
        'Milan',        
        '11.11.2001',    
        '00998811223' 
      );

      await customersPage.saveCustomer();

      // Hľadanie a scrollovanie, kým sa nenájde
      while ((await page.locator('tr', { hasText: 'Mrkvička' }).count()) === 0) {
      await page.locator('tr').last().scrollIntoViewIfNeeded();
      }
    
      await expect(page.locator('text=Mrkvička')).toBeVisible();

      await customersPage.deleteCustomerByNameOrId('Milan', '00998811223');
      await expect(page.locator('tr', { hasText: '00998811223' })).not.toBeVisible(); 
  });
  
});  