import test, { expect } from '../../../fixtures/basePages';
import { employeesData, employeeWithPhoto } from '../../../data/employeesData';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.describe('TC_03_Create_Employee', () => {
    test(`${employeesData.testCaseId} @smoke @employees Create employee`, async ({ employeesPage, page }) => {
      await employeesPage.gotoEmployeesPage();
      await employeesPage.clickAddEmployee();
  
        await employeesPage.fillEmployeeForm(
          employeesData.birthCertificate,
          employeesData.firstName,
          employeesData.lastName,
          employeesData.birthDate
        );
  
        await employeesPage.saveEmployee();
        await employeesPage.expectToastMessage('Úspešne vytvorené');
  
        await expect(page.getByText(employeesData.lastName)).toBeVisible();
      });

    test('TC_03.1_Create employee with photo', async ({ page, employeesPage }) => {
        await employeesPage.clickAddEmployee();

        await employeesPage.fillEmployeeForm(
          employeeWithPhoto.birthCertificate,
          employeeWithPhoto.firstName,
          employeeWithPhoto.lastName,
          employeeWithPhoto.birthDate
        );

        await employeesPage.uploadEmployeePhoto(employeeWithPhoto.photoPath);

        await employeesPage.saveEmployee();
        await employeesPage.clickCompressPhoto();
        await employeesPage.expectToastMessage('Úspešne vytvorené');

        await expect(page.getByText(employeeWithPhoto.lastName)).toBeVisible();

        await employeesPage.deleteEmployeeByBirthCertificate(employeeWithPhoto.birthCertificate);
        await employeesPage.expectToastMessage('Úspešne zmazané');
  
        await expect(page.locator('tr', { hasText: employeeWithPhoto.birthCertificate })).not.toBeVisible();
    });
});