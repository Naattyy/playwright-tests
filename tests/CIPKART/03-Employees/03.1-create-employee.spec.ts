import test, { expect } from '../../../fixtures/basePages';
import { employeeForFirstTests } from '../../../data/employeesData';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.describe('TC_03.1_Create_Employee', () => {
    test(`${employeeForFirstTests.testCaseId} @smoke @employees Create employee`, async ({ employeesPage, page }) => {
      await employeesPage.gotoEmployeesPage();
      await employeesPage.clickAddEmployee();
  
        await employeesPage.fillEmployeeForm(
          employeeForFirstTests.birthCertificate,
          employeeForFirstTests.firstName,
          employeeForFirstTests.lastName,
          employeeForFirstTests.birthDate
        );
  
        await employeesPage.saveEmployee();
        await employeesPage.expectToastMessage('Úspešne vytvorené');
  
        await expect(page.getByText(employeeForFirstTests.lastName)).toBeVisible();
      });
});