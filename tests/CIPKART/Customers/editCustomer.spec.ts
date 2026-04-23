import test from '../../../fixtures/basePages';
import { CustomersData } from '../../../data/customersData';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.describe('Edit Customer', () => {
    test(`${CustomersData} @smoke Edit customer`, async ({ customersPage }) => {
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

      // edit
      await customersPage.openCustomerByLastName(CustomersData.lastName);
      await customersPage.editStreet(CustomersData.updatedStreet);
      await customersPage.saveCustomer();

      await customersPage.expectToastMessage('Úspešne uložené');
      await customersPage.openCustomerByLastName(CustomersData.lastName);
      await customersPage.expectEditStreetValue(CustomersData.updatedStreet);
    });
});