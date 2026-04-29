import test, { expect } from '../../../fixtures/basePages';
import { employeesData } from '../../../data/employeesData';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.describe('TC_05_Delete_Employee', () => {
    test(`${employeesData.testCaseId} @smoke @employees Delete employee`, async ({ employeesPage, page }) => {

        await employeesPage.gotoEmployeesPage();
        await employeesPage.deleteEmployeeByBirthCertificate(employeesData.birthCertificate);
        await employeesPage.expectToastMessage('Úspešne zmazané');
  
        await expect(page.locator('tr', { hasText: employeesData.birthCertificate })).not.toBeVisible();
    });
});