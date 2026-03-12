import { Locator, Page, expect } from '@playwright/test';

export class CustomersPage {
  page: Page;
  addButton: Locator;
  lastNameInput: Locator;
  firstNameInput: Locator;
  birthDateInput: Locator;
  idInput: Locator;
  saveButton: Locator;
  streetInput: Locator;
  deleteButton: Locator;
  confirmDeleteButton: Locator;

  lastNameHeader: Locator;
  lastNameFilterIcon: Locator;
  valueInput: Locator;
  applyFilterButton: Locator;
  resetBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.getByTestId('AddIcon');
    this.lastNameInput = page.getByLabel('Priezvisko *');
    this.firstNameInput = page.getByLabel('Meno *');
    this.birthDateInput = page.locator('#tpdBirthdate');
    this.idInput = page.getByLabel('ID dokladu *');
    this.saveButton = page.getByRole('button', { name: 'ULOŽIŤ A ZAVRIEŤ' });
    this.streetInput = page.locator('#tpdStreet');
    this.deleteButton = page.getByRole('button').filter({ has: page.getByTestId('DeleteIcon') });
    this.confirmDeleteButton = page.getByRole('button', { name: 'ZMAZAŤ' });

    this.lastNameHeader = page.locator('div.table-header-td:has(h3:has-text("Priezvisko"))');
    this.lastNameFilterIcon = this.lastNameHeader.locator('[data-testid="FilterAltIcon"]');
    this.valueInput = page.locator('#val1');
    this.applyFilterButton = page.getByRole('button', { name: 'POUŽIŤ' });
    this.resetBtn = page.locator('li', { hasText: 'Zrušiť filter' });
  }

  async clickAddCustomer() {
    await this.addButton.click();
  }

  async fillCustomerForm(
    lastName: string,
    firstName: string,
    birthDate: string,
    id: string
  ) {
    await this.lastNameInput.fill(lastName);
    await this.firstNameInput.fill(firstName);
    await this.birthDateInput.click();
    await this.birthDateInput.pressSequentially(birthDate, { delay: 50 });
    await this.birthDateInput.press('Tab');
    await this.idInput.fill(id);
  }

  async gotoCustomersPage() {
    await this.page.keyboard.press('Escape').catch(() => {});
    await this.resetFilter();
  
    const customersHeading = this.page.getByRole('heading', { name: 'Zákazníci' });
    const preukazyLink = this.page.getByRole('link', { name: 'Preukazy', exact: true });
  
    await expect(customersHeading).toBeVisible({ timeout: 10000 });
    await customersHeading.click();
  
    await expect(preukazyLink).toBeVisible({ timeout: 10000 });
    await preukazyLink.click();
  }

  async saveCustomer() {
    await this.saveButton.click();
  }

  async openLastNameFilter() {
    await this.lastNameHeader.first().hover();
    await this.lastNameFilterIcon.first().click();
    await expect(this.valueInput).toBeVisible();
  }
  
  async filterByLastName(lastName: string) {
    const baseName = lastName.split('_')[0];
  
    await this.openLastNameFilter();
    await this.valueInput.fill(baseName);
  
    await expect(this.applyFilterButton).toBeEnabled();
    await this.applyFilterButton.click();
  }


  async resetFilter() {
    const resetButton = this.page.locator('li', { hasText: 'Zrušiť filter' });
  
    if (await resetButton.isVisible().catch(() => false)) {
      await resetButton.click();
    }

    await this.page.keyboard.press('Escape').catch(() => {});
  }

  async expectCustomerInTable(lastName: string) {
    const baseLastName = lastName.split('_')[0];
  
    await this.resetFilter();
    await this.filterByLastName(baseLastName);
  
    await expect(
      this.page.getByText(baseLastName, { exact: false }).first()
    ).toBeVisible({ timeout: 10000 });
  }
  
  async openCustomerByLastName(lastName: string) {
    const baseLastName = lastName.split('_')[0];
  
    await this.resetFilter();
    await this.filterByLastName(baseLastName);
  
    const cell = this.page.getByText(baseLastName, { exact: false }).first();
    await expect(cell).toBeVisible({ timeout: 10000 });
    await cell.click();
  }

  async editStreet(street: string) {
    await this.streetInput.waitFor({ state: 'visible' });
    await expect(this.streetInput).toBeEditable();

    await this.streetInput.click();
    await this.streetInput.clear();
    await this.page.keyboard.insertText(street);
    await this.streetInput.blur();
  }

  async expectEditStreetValue(value: string) {
    await expect(this.streetInput).toHaveValue(value);
  }

  
  async deleteCustomerByLastName(lastName: string) {
    await expect(this.deleteButton).toBeVisible();
    await this.deleteButton.click();
  
    await expect(this.confirmDeleteButton).toBeVisible();
    await this.confirmDeleteButton.click();
  
    await this.resetFilter();
    await this.filterByLastName(lastName);
  
    await expect(
      this.page.getByText(lastName, { exact: false }).first()
    ).not.toBeVisible({ timeout: 10000 });
  }
  
  async expectCustomerNotInTable(lastName: string) {
    const baseLastName = lastName.split('_')[0];
  
    await this.resetFilter();
    await this.filterByLastName(baseLastName);
  
    await expect(
      this.page.getByText(baseLastName, { exact: false }).first()
    ).not.toBeVisible({ timeout: 10000 });
  }
}