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
    await expect(this.saveButton).toBeEnabled();
    await this.saveButton.click();
  }

  async openEmployeeByName(name: string) {
    const row = this.page.locator('tr', { hasText: name });
    await row.hover();
    await row.click();

    await this.page.waitForTimeout(500);
  }

  async editTitleBeforeName(title: string) {
      await this.newTitleInput.waitFor({ state: 'visible' });

      console.log(await this.newTitleInput.isEditable());
      await expect(this.newTitleInput).toBeEditable();
    
      await this.newTitleInput.click();
      await this.page.keyboard.insertText(title);
      await this.newTitleInput.blur();
  }

  async expectTitleBeforeNameValue(title: string) {
    await expect(this.newTitleInput).toHaveValue(title);
  }

  async deleteEmployeeByNameOrId(name: string, personalId: string) {
    await this.openEmployeeByName(name);

    await expect(this.deleteButton).toBeVisible();
    await this.deleteButton.click();

    await expect(this.confirmDeleteButton).toBeVisible();
    await this.confirmDeleteButton.click();

    await expect(this.page.locator('tr', { hasText: personalId })).not.toBeVisible({ timeout: 5000 });
  }

}