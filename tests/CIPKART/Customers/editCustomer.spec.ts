import test from '../../../fixtures/basePages';
import { editCustomersData } from '../../../data/customersData';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.describe('Edit Customer', () => {
<<<<<<< HEAD
  editCustomersData.forEach((customer) => {    test(`${customer.testCaseId} @smoke Edit customer`, async ({ customersPage }) => {
=======
  editCustomersData.forEach((customer) => {
    test(`${customer.testCaseId} @smoke Edit customer`, async ({ customersPage }) => {
>>>>>>> 3f05f5e (xx)
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

      // edit
      await customersPage.openCustomerByLastName(customer.lastName);
      await customersPage.editStreet(customer.updatedStreet);
      await customersPage.saveCustomer();

      await customersPage.expectToastMessage('Úspešne uložené');
      await customersPage.openCustomerByLastName(customer.lastName);
      await customersPage.expectEditStreetValue(customer.updatedStreet);
    });
  });
});