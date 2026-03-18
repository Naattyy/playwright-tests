import { Locator, Page, expect } from '@playwright/test';

export class EmployeesPage {
  page: Page;
  addButton: Locator;
  lastNameInput: Locator;
  firstNameInput: Locator;
  birthDateInput: Locator;
  birthCertificate: Locator;
  newTitleInput: Locator;
  saveButton: Locator;
  deleteButton: Locator;
  confirmDeleteButton: Locator;
  exportButton: Locator;
  confirmExportButton: Locator;
  selectedItemsInfo: Locator;

  birthCertificateHeader: Locator;
  birthCertificateFilterIcon: Locator;
  valueInput: Locator;
  applyFilterButton: Locator;
  resetBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.getByTestId('AddIcon');
    this.lastNameInput = page.getByLabel('Priezvisko *');
    this.firstNameInput = page.getByLabel('Meno *');
    this.birthDateInput = page.locator('#prdBirthdate');
    this.birthCertificate = page.locator('#prdHoldId');
    this.newTitleInput = page.locator('#prdTitleBefore');
    this.saveButton = page.getByRole('button', { name: 'ULOŽIŤ A ZAVRIEŤ' });
    this.deleteButton = page.getByRole('button').filter({ has: page.getByTestId('DeleteIcon') });    
    this.confirmDeleteButton = page.getByRole('button', { name: 'ZMAZAŤ' });
    this.exportButton = page.getByLabel('Export do csv');
    this.confirmExportButton = page.getByRole('button', { name: 'EXPORTOVAŤ' });
    this.selectedItemsInfo = page.getByText('Vybraných položiek:');

    this.birthCertificateHeader = page.locator('div.table-header-td:has(h3:has-text("Rodné číslo"))');
    this.birthCertificateFilterIcon = this.birthCertificateHeader.locator('[data-testid="FilterAltIcon"]');
    this.valueInput = page.locator('#val1');
    this.applyFilterButton = page.getByRole('button', { name: 'POUŽIŤ' });
    this.resetBtn = page.locator('li', { hasText: 'Zrušiť filter' });
  }

  async clickAddEmployee() {
    await this.addButton.click();
  }

  async fillEmployeeForm(
    birthCertificate: string,
    firstName: string,
    lastName: string,
    birthDate: string,
  ) {
    await this.birthCertificate.fill(birthCertificate);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.birthDateInput.click();
    await this.birthDateInput.pressSequentially(birthDate, { delay: 50 });
    await this.birthDateInput.press('Tab');
  }

  async saveEmployee() {
    await this.saveButton.click();
  }

  async openBirthCertificateFilter() {
    await this.birthCertificateHeader.first().hover();
    await this.birthCertificateFilterIcon.first().click();
    await expect(this.valueInput).toBeVisible();
  }
  
  async filterByBirthCertificate(value: string) {
    await this.openBirthCertificateFilter();
  
    await this.valueInput.click();
    await this.valueInput.fill('');
    await this.valueInput.fill(value);
  
    await expect(this.applyFilterButton).toBeEnabled();
    await this.applyFilterButton.click();
  
    await this.page.waitForTimeout(1000);
  }
  
  async resetFilter() {
    if (await this.resetBtn.isVisible().catch(() => false)) {
      await this.resetBtn.click();
      await this.page.waitForTimeout(500);
    }
  
    await this.page.keyboard.press('Escape').catch(() => {});
  }

  async openEmployeeByBirthCertificate(birthCertificate: string) {
    await this.resetFilter();
    await this.filterByBirthCertificate(birthCertificate);
  
    const row = this.page.locator('tr', { hasText: birthCertificate }).first();
    await expect(row).toBeVisible();
  
    await row.hover();
    await row.click();
  
    await this.page.waitForTimeout(500);
  }

  async expectEmployeeVisible(lastName: string) {
    await expect(this.page.getByText(lastName, { exact: false })).toBeVisible();
  }

  async editTitleBeforeName(title: string) {
      await this.newTitleInput.waitFor({ state: 'visible' });
      await expect(this.newTitleInput).toBeEditable();
    
      await this.newTitleInput.click();
      await this.newTitleInput.fill(title);
      await this.newTitleInput.press('Tab');
  }

  async expectTitleBeforeNameValue(title: string) {
    await expect(this.newTitleInput).toHaveValue(title);
  }

  async deleteEmployeeByBirthCertificate(birthCertificate: string) {
    await this.resetFilter();
    await this.filterByBirthCertificate(birthCertificate);
  
    const row = this.page.locator('tr', { hasText: birthCertificate }).first();
    await expect(row).toBeVisible();  
    await row.hover();
    await row.click();
  
    await expect(this.deleteButton).toBeVisible();
    await this.deleteButton.click();
  
    await expect(this.confirmDeleteButton).toBeVisible();
    await this.confirmDeleteButton.click();
  
    await this.resetFilter();
  }

  async exportCsv() {
    await expect(this.exportButton).toBeVisible();
  
    const downloadPromise = this.page.waitForEvent('download');
  
    await this.exportButton.click();
  
    await expect(this.confirmExportButton).toBeVisible();
    await this.confirmExportButton.click();
  
    return await downloadPromise;
  }

  async selectEmployeeByName(name: string) {
    const row = this.page.locator('tr', { hasText: name }).first();
    await expect(row).toBeVisible();
  
    await row.locator('.MuiCheckbox-root').first().click();
  }

  async expectEmployeeSelected(name: string) {
    const row = this.page.locator('tr', { hasText: name }).first();
  
    const checkedIcon = row.locator('[data-testid="CheckBoxIcon"]');
  
    await expect(checkedIcon).toBeVisible();
  }

  async toggleEmployeeByLastAndFirstName(lastName: string, firstName: string) {
    const row = this.page.locator('tr', { hasText: lastName }).filter({ hasText: firstName }).first();
  
    await expect(row).toBeVisible({ timeout: 10000 });
  
    await row.locator('.MuiCheckbox-root').first().click();
  }

  async expectNoItemsSelected() {
    await expect(this.selectedItemsInfo).toContainText('0 z');
  }

}