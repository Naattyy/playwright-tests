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
    await this.page.goto('/index.html#/rail/pass');
    
    const customersHeading = this.page.getByRole('heading', { name: 'Zákazníci' });
    const preukazyItem = this.page.locator('li:visible').filter({ hasText: 'Preukazy' }).first();
  
    await expect(customersHeading).toBeVisible({ timeout: 10000 });
    await customersHeading.click();
  
    await expect(preukazyItem).toBeVisible({ timeout: 10000 });
    await preukazyItem.click();
  }

  async saveCustomer() {
    await this.saveButton.click();
  }

  async openLastNameFilter() {
    await this.lastNameHeader.first().hover();
    await expect(this.lastNameFilterIcon.first()).toBeVisible();
    await this.lastNameFilterIcon.first().click();
    await this.valueInput.waitFor({ state: 'visible' });
  }
  
  async filterByLastName(lastName: string) {
    await this.openLastNameFilter();
    await this.valueInput.fill(lastName);
  
    await expect(this.applyFilterButton).toBeEnabled();
    await this.applyFilterButton.click();
  }

  async resetFilter() {  
    await this.resetBtn.click();
  }

  async expectCustomerInTable(lastName: string) {
    await this.filterByLastName(lastName);
  
    await expect(this.page.getByText(lastName, { exact: false }).first()).toBeVisible({ timeout: 10000 });
  }
  
  async openCustomerByLastName(lastName: string) {
    await this.filterByLastName(lastName);
  
    const row = this.page.locator('tr', {has: this.page.locator('.table-body-td', { hasText: lastName })}).first();
  
    await expect(row).toBeVisible({ timeout: 10000 });
    await row.hover();
    await row.click();
  }

  async editStreet(street: string) {
    await this.streetInput.waitFor({ state: 'visible' });
    await expect(this.streetInput).toBeEditable();

    await this.streetInput.click();
    await this.streetInput.fill(street);
    await this.streetInput.press('Tab');
  }

  async expectEditStreetValue(value: string) {
    await expect(this.streetInput).toHaveValue(value);
  }

  async deleteCustomerByLastName(lastName: string) {
    await this.openCustomerByLastName(lastName);
  
    await expect(this.deleteButton).toBeVisible({ timeout: 10000 });
    await this.deleteButton.click();
  
    await expect(this.confirmDeleteButton).toBeVisible({ timeout: 10000 });
    await this.confirmDeleteButton.click();

    await this.expectCustomerNotInTable(lastName);
  }

  async expectCustomerNotInTable(lastName: string) {
    await this.resetFilter();
    await this.filterByLastName(lastName);

    const row = this.page.locator('.table-body-td', { hasText: lastName });

    await expect(row).toBeHidden();
  }

  async expectToastMessage(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  } 
}