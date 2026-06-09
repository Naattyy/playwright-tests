import test, { expect } from '../../../fixtures/basePages';
import { employeeForFirstTests } from '../../../data/employeesData';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.describe('TC_03.3_Delete_Employee', () => {
    test(`${employeeForFirstTests.testCaseId} @smoke @employees Delete employee`, async ({ employeesPage, page }) => {

        await employeesPage.gotoEmployeesPage();
        await employeesPage.deleteEmployeeByBirthCertificate(employeeForFirstTests.birthCertificate);
        await employeesPage.expectToastMessage('Úspešne zmazané');
  
        await expect(page.locator('tr', { hasText: employeeForFirstTests.birthCertificate })).not.toBeVisible();
    });
});