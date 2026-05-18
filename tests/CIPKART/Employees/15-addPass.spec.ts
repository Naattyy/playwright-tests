import test, { expect } from '../../../fixtures/basePages';
import { employeesData } from '../../../data/employeesData';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test(`${employeesData.testCaseId} Add Pass`, async ({ employeesPage, page }) => {

  await employeesPage.gotoEmployeesPage();
  await employeesPage.openEmployeeByBirthCertificate(employeesData.birthCertificate);
  await employeesPage.addLifePass();

});