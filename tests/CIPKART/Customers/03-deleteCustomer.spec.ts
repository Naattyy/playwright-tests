import test from '../../../fixtures/basePages';
import { CustomersData } from '../../../data/customersData';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.describe('Delete Customer', () => {
  test(`${CustomersData.testCaseId} @smoke Delete customer`, async ({ customersPage }) => {
      await customersPage.gotoCustomersPage();

      await customersPage.deleteCustomerByLastName(CustomersData.lastName);

      await customersPage.expectToastMessage('Úspešne zmazané');
      await customersPage.expectCustomerNotInTable(CustomersData.lastName);
  });
});
