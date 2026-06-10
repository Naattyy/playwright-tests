import test, { expect } from '../../../fixtures/basePages';
import { employeeWithPhoto } from '../../../data/employeesData';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test('TC_03.4_Create_Employee_With_Photo', async ({ page, employeesPage }) => {
        await employeesPage.gotoEmployeesPage();
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