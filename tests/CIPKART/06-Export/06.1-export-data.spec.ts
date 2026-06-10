import test, { expect } from '../../../fixtures/basePages';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.beforeEach(async ({ employeesPage }) => {
  await employeesPage.gotoEmployeesPage();
});

test('TC_06.1_Export_data', async ({ employeesPage }) => {
      const download = await employeesPage.exportCsv();
    
      const fileName = download.suggestedFilename();
    
      expect(fileName.endsWith('.csv')).toBe(true);
});
