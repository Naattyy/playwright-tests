import test from '../../../fixtures/basePages';
<<<<<<< HEAD
import { CustomersData } from '../../../data/customersData';
=======
import { createCustomersData } from '../../../data/customersData';
>>>>>>> 3f05f5e (xx)

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.describe('Create Customer', () => {
<<<<<<< HEAD
  
    test(`${CustomersData} @smoke Create customer`, async ({ customersPage }) => {
=======
  createCustomersData.forEach((customer) => {
    test(`${customer.testCaseId} @smoke Create customer`, async ({ customersPage }) => {
>>>>>>> 3f05f5e (xx)
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