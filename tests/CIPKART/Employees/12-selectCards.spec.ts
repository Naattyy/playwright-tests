import test, { expect } from '../../../fixtures/basePages';
import { employeesForSelection } from '../../../data/employeesData';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test('TC_12_Select multiple ID cards', async ({ employeesPage }) => {
      for (const employee of employeesForSelection) {
        await employeesPage.selectEmployeeByName(employee);
        await employeesPage.expectEmployeeSelected(employee);
      }
});