import test, { expect } from '../fixtures/basePages';
import { customersData } from '../data/customersData';

test.describe('Customers', () => {
  test.beforeEach(async ({ loginPage, page }) => {
      await loginPage.gotoLoginPage();
      await loginPage.login();
      await expect(page).toHaveURL(/#\/rail\/pass$/);
  });

  customersData.forEach((customer) => {
    test(`${customer.testCaseId}_Create-Edit-Delete customer`, async ({ customersPage }) => {
      await customersPage.gotoCustomersPage();

      await customersPage.clickAddCustomer();
      await customersPage.fillCustomerForm(
        customer.lastName,
        customer.firstName,
        customer.birthDate,
        customer.personalId
      );
      await customersPage.saveCustomer();
      await customersPage.expectCustomerInTable(customer.lastName);

      await customersPage.openCustomerByLastName(customer.lastName);
      await customersPage.editStreet(customer.updatedStreet);
      await customersPage.saveCustomer();
      await customersPage.expectEditStreetValue(customer.updatedStreet);

      await customersPage.resetFilter();
      await customersPage.deleteCustomerByLastName(customer.lastName);
      await customersPage.expectCustomerNotInTable(customer.lastName);
    });
  });
});