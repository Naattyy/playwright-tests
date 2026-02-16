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

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.getByText('+');
    this.lastNameInput = page.getByLabel('Priezvisko *');
    this.firstNameInput = page.getByLabel('Meno *');
    this.birthDateInput = page.getByLabel('Dátum narodenia');
    this.idInput = page.getByLabel('ID dokladu *');
    this.saveButton = page.getByRole('button', { name: 'ULOŽIŤ A ZAVRIEŤ' });
    this.streetInput = page.locator('input#tpdStreet');
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

  async openCustomerByName(name: string) {
    const row = this.page.locator('tr', { hasText: name });
  
    await row.hover();
    await row.click();
  }

  async editStreet(street: string) {
    const input = this.page.getByLabel('Ulica');
  
    await input.click();        
    await input.fill('Kamenná');       
    await input.pressSequentially(street); 
    await input.press('Tab');   
  }

  async expectStreetValue(street: string) {
    await expect(this.streetInput).toHaveValue(street);
  }

}