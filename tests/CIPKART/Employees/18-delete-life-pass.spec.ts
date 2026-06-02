import test from '../../../fixtures/basePages';
import { employeesData } from '../../../data/employeesData';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.describe('TC_18_Delete_Life_Pass', () => {
  test('TC_18 Delete life pass', async ({ employeesPage }) => {
    await employeesPage.gotoEmployeesPage();
    await employeesPage.openEmployeeByBirthCertificate(employeesData.birthCertificate);
    await employeesPage.deleteLifePass();
    await employeesPage.expectToastMessage('Úspešne zmazané');
  });
});
