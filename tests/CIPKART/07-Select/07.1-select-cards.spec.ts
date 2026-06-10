import test, { expect } from '../../../fixtures/basePages';
import { employeesForSelection } from '../../../data/employeesData';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.beforeEach(async ({ employeesPage }) => {
  await employeesPage.gotoEmployeesPage();
});

test('TC_07.1_Select_multiple_ID_cards', async ({ employeesPage }) => {
      for (const employee of employeesForSelection) {
        await employeesPage.selectEmployeeByName(employee);
        await employeesPage.expectEmployeeSelected(employee);
      }
});