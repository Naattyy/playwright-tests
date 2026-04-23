import test from '../../../fixtures/basePages';
import { CustomersData } from '../../../data/customersData';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.describe('Delete Customer', () => {
  test(`${CustomersData} @smoke Delete customer`, async ({ customersPage }) => {
      await customersPage.gotoCustomersPage();

      // setup - create customer
      await customersPage.clickAddCustomer();
      await customersPage.fillCustomerForm(
        CustomersData.lastName,
        CustomersData.firstName,
        CustomersData.birthDate,
        CustomersData.personalId
      );
      await customersPage.saveCustomer();
      await customersPage.expectCustomerInTable(CustomersData.lastName);

      // delete
      await customersPage.deleteCustomerByLastName(CustomersData.lastName);

      await customersPage.expectToastMessage('Úspešne zmazané');
      await customersPage.expectCustomerNotInTable(CustomersData.lastName);
  });
});