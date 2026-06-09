import test, { expect } from '../../../fixtures/basePages';
import { employeeForZSSKData } from '../../../data/employeesData';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.describe('TC_03.8_Delete_Pass', () => {
  test('TC_03.8 Delete pass', async ({ employeesPage, page }) => {
    await employeesPage.gotoEmployeesPage();
    await employeesPage.openEmployeeByBirthCertificate(employeeForZSSKData.birthCertificate);
    await employeesPage.deleteLifePass();
    await employeesPage.expectToastMessage('Úspešne zmazané');

    await employeesPage.deleteButton.click();
    await employeesPage.confirmDeleteButton.click();

    await expect(page.locator('tr', { hasText: employeeForZSSKData.birthCertificate })).not.toBeVisible();
  });
});
