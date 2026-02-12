import { Locator, Page } from '@playwright/test';

export class CustomersPage {
  page: Page;
  addButton: Locator;
  lastNameInput: Locator;
  firstNameInput: Locator;
  birthDateInput: Locator;
  idInput: Locator;
  saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.getByText('+');
    this.lastNameInput = page.getByLabel('Priezvisko *');
    this.firstNameInput = page.getByLabel('Meno *');
    this.birthDateInput = page.getByLabel('Dátum narodenia');
    this.idInput = page.getByLabel('ID dokladu *');
    this.saveButton = page.getByRole('button', { name: 'ULOŽIŤ A ZAVRIEŤ' });
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
    await this.birthDateInput.fill(birthDate);
    await this.idInput.fill(id);
  }

  async saveCustomer() {
    await this.saveButton.click();
  }
}