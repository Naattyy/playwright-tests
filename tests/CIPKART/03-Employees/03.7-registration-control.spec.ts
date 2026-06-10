import test, { expect } from '../../../fixtures/basePages';
import { employeeForZSSKData } from '../../../data/employeesData';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.describe('TC_03.7_Registration_Control_Employee', () => {
    test(`${employeeForZSSKData.testCaseId} Control employee`, async ({ employeesPage, page }) => {
        
        await employeesPage.gotoEmployeesPage();
        await employeesPage.openEmployeeByBirthCertificate(employeeForZSSKData.birthCertificate);
        
        const employeeDialog = page.getByRole('dialog');
        const registrationsTab = employeeDialog
          .locator('li')
          .filter({ hasText: /^\s*Registrácie\s*$/ })
          .first();

        await expect(registrationsTab).toBeVisible();
        await registrationsTab.click();
        await expect(employeeDialog.getByRole('columnheader', { name: 'Číslo registrácie' })).toBeVisible();
      });
});
