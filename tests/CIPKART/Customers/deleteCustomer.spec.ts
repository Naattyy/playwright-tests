import test from '../../../fixtures/basePages';
import { deleteCustomersData } from '../../../data/customersData';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.describe('Delete Customer', () => {
  deleteCustomersData.forEach((customer) => {
    test(`${customer.testCaseId} @smoke Delete customer`, async ({ customersPage }) => {
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