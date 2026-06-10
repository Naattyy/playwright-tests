import test, { expect } from '../../../fixtures/basePages';
import { employeeForZSSKData } from '../../../data/employeesData';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.describe('TC_03.5_Add_Pass', () => {
    test(`${employeeForZSSKData.testCaseId} Add Pass`, async ({ employeesPage, page }) => {

      await employeesPage.gotoEmployeesPage();
      await employeesPage.clickAddEmployee();

      await employeesPage.fillEmployeeForm(
        employeeForZSSKData.birthCertificate,
        employeeForZSSKData.firstName,
        employeeForZSSKData.lastName,
        employeeForZSSKData.birthDate
      );

      await employeesPage.saveEmployee();
      await employeesPage.expectToastMessage('Úspešne vytvorené');

      await expect(page.getByText(employeeForZSSKData.lastName)).toBeVisible();

      await employeesPage.openEmployeeByBirthCertificate(employeeForZSSKData.birthCertificate);
      await employeesPage.addLifePass();
    });
});
