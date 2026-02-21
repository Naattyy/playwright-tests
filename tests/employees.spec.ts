import test, { expect } from '../fixtures/basePages';

test.describe('Employees', () => {
    test.beforeEach(async ({ loginPage, page }) => {
        await loginPage.gotoLoginPage();
        await loginPage.login();
        await expect(page).toHaveURL('https://cipkartadmin-dev.kube8s.prosoft.sk/index.html#/rail/pass');
    });

    test('TC_02_Create new employee', async ({ page, employeesPage }) => {       
        await employeesPage.clickAddEmployee();

        await employeesPage.fillEmployeeForm(
          '010101/0101', 
          'Ján',        
          'Mrkvička',    
          '11.11.2011' 
        );

        await employeesPage.saveEmployee();

        await expect(page.locator('text=Mrkvička')).toBeVisible();
    });

    test('TC_03_Edit employee', async ({ page, employeesPage }) => {
        await employeesPage.clickAddEmployee();

        await employeesPage.fillEmployeeForm(
          '111111/2222', 
          'Janka',        
          'Mrkvová',    
          '22.02.1998' 
        );

        await employeesPage.saveEmployee();

        await expect(page.locator('text=Mrkvová')).toBeVisible();

        const newTitle = 'Ing.';
        await employeesPage.openEmployeeByName('Mrkvová');
        await employeesPage.editTitleBeforeName(newTitle);
        await employeesPage.saveEmployee();
        await employeesPage.expectTitleBeforeNameValue(newTitle);
    });


    test('TC_04_Delete employee', async ({ page, employeesPage }) => {
        await employeesPage.clickAddEmployee();

        await employeesPage.fillEmployeeForm(
          '123456/0000', 
          'Eva',        
          'Adamová',    
          '12.01.2004' 
        );

        await employeesPage.saveEmployee();

        await employeesPage.deleteEmployeeByNameOrId('Eva', '123456/0000');
        await expect(page.locator('tr', { hasText: '123456/0000' })).not.toBeVisible();        
    }); 

});