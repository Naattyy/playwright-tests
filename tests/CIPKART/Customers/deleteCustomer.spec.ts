import test from '../../../fixtures/basePages';
import { customersData } from '../../../data/customersData';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.describe('Delete Customer', () => {
  customersData.forEach((customer) => {
    test(`${customer.testCaseId}_Delete customer`, async ({ customersPage }) => {
      await customersPage.gotoCustomersPage();

      // setup - create customer
      await customersPage.clickAddCustomer();
      await customersPage.fillCustomerForm(
        customer.lastName,
        customer.firstName,
        customer.birthDate,
        customer.personalId
      );
      await customersPage.saveCustomer();
      await customersPage.expectCustomerInTable(customer.lastName);

      // delete
      await customersPage.deleteCustomerByLastName(customer.lastName);

      await customersPage.expectToastMessage('Úspešne zmazané');
      await customersPage.expectCustomerNotInTable(customer.lastName);
    });
  });
});