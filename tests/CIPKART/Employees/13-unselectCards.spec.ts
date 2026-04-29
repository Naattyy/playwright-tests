import test, { expect } from '../../../fixtures/basePages';
import { employeesForToggle } from '../../../data/employeesData';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.beforeEach(async ({ employeesPage }) => {
  await employeesPage.gotoEmployeesPage();
});

test('TC_13_Unselect multiple ID cards', async ({ employeesPage }) => {
      for (const employee of employeesForToggle) {
        await employeesPage.toggleEmployeeByLastAndFirstName(employee.lastName, employee.firstName);
      }
    
      for (const employee of employeesForToggle) {
        await employeesPage.toggleEmployeeByLastAndFirstName(employee.lastName, employee.firstName);
      }
    
      await employeesPage.expectNoItemsSelected();
    
    });
