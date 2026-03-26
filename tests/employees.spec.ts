import test, { expect } from '../fixtures/basePages';
import { employeesData, employeesForSelection, employeesForToggle, employeeWithPhoto } from '../data/employeesData';


test.describe('Employees', () => {
  test.beforeEach(async ({ employeesPage }) => {
    await employeesPage.gotoEmployeesPage();
  });
    test('TC_03_Create 5 new employees', async ({ page, employeesPage }) => {
      for (const employee of employeesData) {
        await employeesPage.clickAddEmployee();
  
        await employeesPage.fillEmployeeForm(
          employee.birthCertificate,
          employee.firstName,
          employee.lastName,
          employee.birthDate
        );
  
        await employeesPage.saveEmployee();
        await employeesPage.expectToastMessage('Úspešne vytvorené');
  
        await expect(page.getByText(employee.lastName)).toBeVisible();
      }
    });

    test('TC_03.1_Create employee with photo', async ({ page, employeesPage }) => {
        await employeesPage.clickAddEmployee();

        await employeesPage.fillEmployeeForm(
          employeeWithPhoto.birthCertificate,
          employeeWithPhoto.firstName,
          employeeWithPhoto.lastName,
          employeeWithPhoto.birthDate
        );

        await employeesPage.uploadEmployeePhoto(employeeWithPhoto.photoPath);

        await employeesPage.saveEmployee();
        await employeesPage.clickCompressPhoto();
        await employeesPage.expectToastMessage('Úspešne vytvorené');

        await expect(page.getByText(employeeWithPhoto.lastName)).toBeVisible();

        await employeesPage.deleteEmployeeByBirthCertificate(employeeWithPhoto.birthCertificate);
        await employeesPage.expectToastMessage('Úspešne zmazané');
  
        await expect(page.locator('tr', { hasText: employeeWithPhoto.birthCertificate })).not.toBeVisible();
    });
  
    test('TC_04_Edit 2 employees', async ({ employeesPage }) => {
      const employeesToEdit = employeesData.slice(0, 2);
  
      for (const employee of employeesToEdit) {
        await employeesPage.openEmployeeByBirthCertificate(employee.birthCertificate);
        await employeesPage.editTitleBeforeName(employee.newTitle);
        await employeesPage.expectTitleBeforeNameValue(employee.newTitle);
        await employeesPage.saveEmployee();
        await employeesPage.expectToastMessage('Úspešne uložené');
      }
    });
  
    test('TC_05_Delete 5 employees', async ({ page, employeesPage }) => {
      for (const employee of employeesData) {
        await employeesPage.deleteEmployeeByBirthCertificate(employee.birthCertificate);
        await employeesPage.expectToastMessage('Úspešne zmazané');
  
        await expect(page.locator('tr', { hasText: employee.birthCertificate })).not.toBeVisible();
        }
    }); 

    test('TC_11_Export data', async ({ employeesPage }) => {
      const download = await employeesPage.exportCsv();
    
      const fileName = download.suggestedFilename();
    
      expect(fileName.endsWith('.csv')).toBe(true);
    });

    test('TC_12_Select multiple ID cards', async ({ employeesPage }) => {
      for (const employee of employeesForSelection) {
        await employeesPage.selectEmployeeByName(employee);
        await employeesPage.expectEmployeeSelected(employee);
      }
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

});