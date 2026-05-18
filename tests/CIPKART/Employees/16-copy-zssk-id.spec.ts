import test, { expect } from '../../../fixtures/basePages';
import { employeesData } from '../../../data/employeesData';
import { RegistrationPage } from '../../../pages/ZSSK_konto';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.describe('TC_16_Copy_ZSSK_ID', () => {
  test('Copy ZSSK ID from ZSSK konto to CIPKART employee', async ({ browser, employeesPage }) => {
    const zsskContext = await browser.newContext();
    const zsskPage = await zsskContext.newPage();
    const zsskAccount = new RegistrationPage(zsskPage);

    try {
      await zsskAccount.goto();
      await zsskAccount.openLoginForm();
      await zsskAccount.loginToAccount(
        process.env.TEST_EMAIL!,
        process.env.TEST_PASSWORD!
      );

      await zsskAccount.expectDashboard();
      const zsskId = await zsskAccount.getZsskId();
      expect(zsskId).toMatch(/^\d+$/);

      await employeesPage.gotoEmployeesPage();
      await employeesPage.openEmployeeByBirthCertificate(employeesData.birthCertificate);
      await employeesPage.fillZsskId(zsskId);

      await employeesPage.saveEmployee();
      await employeesPage.expectToastMessage('Úspešne uložené');

      await employeesPage.openEmployeeByBirthCertificate(employeesData.birthCertificate);
      await employeesPage.expectZsskIdValue(zsskId);
    } finally {
      await zsskContext.close();
    }
  });
});
