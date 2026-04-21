import test from '../../../fixtures/basePages';
import { customersData } from '../../../data/customersData';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.describe('Create Customer', () => {
  customersData.forEach((customer) => {
    test(`${customer.testCaseId}_Create customer`, async ({ customersPage }) => {
      await customersPage.gotoCustomersPage();

      await customersPage.clickAddCustomer();
      await customersPage.fillCustomerForm(
        customer.lastName,
        customer.firstName,
        customer.birthDate,
        customer.personalId
      );
      await customersPage.saveCustomer();

      await customersPage.expectToastMessage('Úspešne vytvorené');
      await customersPage.expectCustomerInTable(customer.lastName);
    });
  });
});