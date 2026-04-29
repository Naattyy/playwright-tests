import test from '../../../fixtures/basePages';
import { CustomersData } from '../../../data/customersData';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.describe('TC_06_Create_Customer', () => {
    test(`${CustomersData.testCaseId} @smoke @customers Create customer`, async ({ customersPage }) => {
      await customersPage.gotoCustomersPage();

      await customersPage.clickAddCustomer();
      await customersPage.fillCustomerForm(
        CustomersData.lastName,
        CustomersData.firstName,
        CustomersData.birthDate,
        CustomersData.personalId
      );
      await customersPage.saveCustomer();

      await customersPage.expectToastMessage('Úspešne vytvorené');
      await customersPage.expectCustomerInTable(CustomersData.lastName);
    });
});
