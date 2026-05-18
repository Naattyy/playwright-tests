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
  photoInput: Locator;
  compressButton: Locator;
  zsskIdInput: Locator;

  birthCertificateHeader: Locator;
  birthCertificateFilterIcon: Locator;
  valueInput: Locator;
  applyFilterButton: Locator;
  resetBtn: Locator;

  lifePassButton: Locator;
  exuInput: Locator;
  exuOption: Locator;
  passCategoryInput: Locator;
  passCategoryOption: Locator;
  trainClassInput: Locator;
  railPassSaveButton: Locator;


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
    this.photoInput = page.locator('input[type="file"]'); 
    this.compressButton = page.getByRole('button', { name: 'KOMPRIMOVAŤ' });
    this.zsskIdInput = page.getByLabel('ZSSK ID');

    this.birthCertificateHeader = page.locator('div.table-header-td:has(h3:has-text("Rodné číslo"))');
    this.birthCertificateFilterIcon = this.birthCertificateHeader.locator('[data-testid="FilterAltIcon"]');
    this.valueInput = page.locator('#val1');
    this.applyFilterButton = page.getByRole('button', { name: 'POUŽIŤ' });
    this.resetBtn = page.locator('li', { hasText: 'Zrušiť filter' });

    this.lifePassButton = page.getByRole('button', { name: 'Nárok na ŽP' });
    this.exuInput = page.locator('#exuId');
    this.exuOption = page.getByRole('option', { name: /000500 - Technická ochrana a obnova železníc Žilina/, });
    this.passCategoryInput = page.locator('#passcId');
    this.passCategoryOption = page.getByRole('option', { name: /01 - Zamestnanec ZSSK, 2\.voz\.trieda/, });
    this.trainClassInput = page.locator('#rpTrainClass');
    this.railPassSaveButton = page.getByRole('button', { name: /uložiť a zavrieť/i, });
  }

  async clickAddEmployee() {
    await this.addButton.click();
  }

  async gotoEmployeesPage() {
  await this.page.goto('/index.html#/rail/pass');

  const employeesMenuItem = this.page.getByRole('heading', { name: 'Zamestnanci a r. p.' });
  const idCardsItem = this.page.locator('li').filter({ hasText: 'Preukazy' }).first();
  const employeesHeading = this.page.getByRole('heading', { name: 'Zamestnanci' });

  await expect(employeesMenuItem).toBeVisible();
  await employeesMenuItem.click();

  await expect(idCardsItem).toBeVisible();
  await idCardsItem.click();

  await expect(employeesHeading).toBeVisible();
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

    for (let i = 0; i < birthDate.length; i++) {
      await this.birthDateInput.press('ArrowLeft');
    }

    await this.birthDateInput.pressSequentially(birthDate, { delay: 150 });
    await expect.poll(async () => {
      const value = await this.birthDateInput.inputValue();
      return value.replace(/[\u2066-\u2069]/g, '');
    }).toBe(birthDate);
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

  async expectToastMessage(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  } 

  async fillZsskId(zsskId: string) {
    await expect(this.zsskIdInput).toBeVisible();
    await this.zsskIdInput.fill(zsskId);
  }

  async expectZsskIdValue(zsskId: string) {
    await expect(this.zsskIdInput).toHaveValue(zsskId);
  }

  async uploadEmployeePhoto(filePath: string) {
    await this.photoInput.setInputFiles(filePath);
  }

  async clickCompressPhoto() {
  await expect(this.compressButton).toBeVisible();
  await this.compressButton.click();
}


async addLifePass() {
  await expect(this.lifePassButton).toBeVisible();
  await this.lifePassButton.click();

  await expect(this.exuInput).toBeVisible();
  await this.exuInput.click();
  await this.exuInput.fill('tech');

  await expect(this.exuOption).toBeVisible();
  await this.exuOption.click();

  await expect(this.passCategoryInput).toBeVisible();
  await this.passCategoryInput.click();
  await this.passCategoryInput.fill('zam');

  await expect(this.passCategoryOption).toBeVisible();
  await this.passCategoryOption.click();

  await expect(this.trainClassInput).toBeVisible();
  await this.trainClassInput.click();
  await this.trainClassInput.fill('2');

  await expect(this.railPassSaveButton).toBeVisible();
  await this.railPassSaveButton.click();
}


}
