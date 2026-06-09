import test, { expect } from '../../../fixtures/basePages';
import { employeeForFirstTests } from '../../../data/employeesData';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.describe('TC_03.2_Edit_Employee', () => {
    test(`${employeeForFirstTests.testCaseId} @smoke @employees Edit employee`, async ({ employeesPage, page }) => {

        await employeesPage.gotoEmployeesPage();
        await employeesPage.openEmployeeByBirthCertificate(employeeForFirstTests.birthCertificate);
        await employeesPage.editTitleBeforeName(employeeForFirstTests.newTitle);
        await employeesPage.expectTitleBeforeNameValue(employeeForFirstTests.newTitle);
        await employeesPage.saveEmployee();
        await employeesPage.expectToastMessage('Úspešne uložené');
  
        await expect(page.getByText(employeeForFirstTests.lastName)).toBeVisible();
    });
});