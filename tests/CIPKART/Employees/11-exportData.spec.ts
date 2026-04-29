import test, { expect } from '../../../fixtures/basePages';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.beforeEach(async ({ employeesPage }) => {
  await employeesPage.gotoEmployeesPage();
});

test('TC_11_Export data', async ({ employeesPage }) => {
      const download = await employeesPage.exportCsv();
    
      const fileName = download.suggestedFilename();
    
      expect(fileName.endsWith('.csv')).toBe(true);
});
