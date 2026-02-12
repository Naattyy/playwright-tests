import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CustomersPage } from '../pages/CustomersPage';

test('Create new customer', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const customersPage = new CustomersPage(page);
  await loginPage.gotoLoginPage();
  await loginPage.login();
  await page.getByRole('heading', { name: 'Zákazníci' }).click();
  await page.getByRole('link', { name: 'Preukazy', exact: true }).click();
  await page.getByRole('button', { name: /add/i }).click();
  await customersPage.fillCustomerForm(
    'Mrkva',
    'Janko',
    '01.01.1990',
    '123456789',
  );
  await page.getByRole('button', { name: 'ULOŽIŤ A ZAVRIEŤ' }).click();
});