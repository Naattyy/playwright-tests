import test, { expect } from '../../../fixtures/basePages';
import { employeesData } from '../../../data/employeesData';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.describe('TC_04_Edit_Employee', () => {
    test(`${employeesData.testCaseId} @smoke @employees Edit employee`, async ({ employeesPage }) => {

        await employeesPage.openEmployeeByBirthCertificate(employeesData.birthCertificate);
        await employeesPage.editTitleBeforeName(employeesData.newTitle);
        await employeesPage.expectTitleBeforeNameValue(employeesData.newTitle);
        await employeesPage.saveEmployee();
        await employeesPage.expectToastMessage('Úspešne uložené');
    });
});