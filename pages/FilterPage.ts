import { expect, Locator, Page } from "@playwright/test";

export class FilterPage {
  page: Page;
  rodneCisloHeader: Locator;
  rodneCisloFilterIcon: Locator;
  resetBtn: Locator;
  valueInput: Locator;
  applyFilterButton: Locator;

  filterIcon: Locator;
  confirmButton: Locator;
  applyAndCloseButton: Locator;
  addOrButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rodneCisloHeader = page.locator('div.table-header-td:has(h3:has-text("Rodné číslo"))');
    this.rodneCisloFilterIcon = this.rodneCisloHeader.locator('svg[data-testid="FilterAltIcon"]');
    this.resetBtn = page.locator('li', { hasText: 'Zrušiť filter' });
    this.valueInput = page.locator('#val1');
    this.applyFilterButton = page.getByRole('button', { name: 'POUŽIŤ' });

    this.filterIcon = page.locator('li', { hasText: 'Filter' }).first();
    this.confirmButton = this.page.locator('label:has([data-testid="DoneOutlineIcon"])');
    this.applyAndCloseButton = page.getByRole('button', { name: 'POUŽIŤ A ZAVRIEŤ' });
    this.addOrButton = page.getByRole('button', { name: 'PRIDAŤ(ALEBO)' });
  }

  async openRodneCisloFilter() {
    await this.rodneCisloHeader.first().hover();
    await this.rodneCisloFilterIcon.first().click();
    await expect(this.valueInput).toBeVisible();
  }

  async filterByRodneCislo(value: string) {
    await this.openRodneCisloFilter();

    await this.valueInput.fill(value);

    await expect(this.applyFilterButton).toBeEnabled();
    await this.applyFilterButton.click();
  }

  async expectRodneCisloVisible(rc: string) {
    await expect(this.page.getByText(rc, { exact: true })).toBeVisible();
  }

  async resetFilter() {
    await expect(this.resetBtn).toBeVisible();
    await this.resetBtn.click();
  }

  async openFilter() {
    await this.filterIcon.click();
  }

  async addOrCondition() {
    await this.addOrButton.click();
  }

  async fillFilterRow(column: string, operation: string, value: string, rowIndex = 0) {
  const columnInputs = this.page.locator('input#col');
  const operationInputs = this.page.locator('input#operation');
  const valueInputs = this.page.locator('input#val1');

  // COLUMN
  await columnInputs.nth(rowIndex).click();
  await this.page.getByRole('option', { name: column, exact: true }).click();

  // OPERATION
  await operationInputs.nth(rowIndex).click();
  await this.page.getByRole('option', { name: operation }).click();

  // VALUE
  await valueInputs.nth(rowIndex).fill(value);
  await this.page.waitForTimeout(300);

  // CONFIRM
  await this.page
  .locator('label:has([data-testid="DoneOutlineIcon"])')
  .filter({ has: this.page.locator('svg') })
  .last()
  .click({ force: true });
  }

  async applyFilter() {
    await this.applyAndCloseButton.click();
  }
}