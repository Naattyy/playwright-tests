import test from '../../../fixtures/basePages';
import { CustomersData } from '../../../data/customersData';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.describe('TC_07_Edit_Customer', () => {
    test(`${CustomersData.testCaseId} @smoke Edit customer`, async ({ customersPage }) => {
      await customersPage.gotoCustomersPage();

      await customersPage.openCustomerByLastName(CustomersData.lastName);
      await customersPage.editStreet(CustomersData.updatedStreet);
      await customersPage.saveCustomer();

      await customersPage.expectToastMessage('Úspešne uložené');
      await customersPage.openCustomerByLastName(CustomersData.lastName);
      await customersPage.expectEditStreetValue(CustomersData.updatedStreet);
    });
});
