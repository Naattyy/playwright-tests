import { expect, Locator, Page } from "@playwright/test";

export class FilterPage {
  page: Page;
  rodneCisloHeader: Locator;
  rodneCisloFilterIcon: Locator;
  resetBtn: Locator;
  filterDialog: Locator;
  valueInput: Locator;
  applyFilterButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rodneCisloHeader = page.locator('div.table-header-td:has(h3:has-text("Rodné číslo"))');
    this.rodneCisloFilterIcon = this.rodneCisloHeader.locator('svg[data-testid="FilterAltIcon"]');
    this.resetBtn = page.locator('li', { hasText: 'Zrušiť filter' });
    this.filterDialog = page.locator('[role="dialog"]');
    this.valueInput = this.filterDialog.locator('#val1');
    this.applyFilterButton = this.filterDialog.getByRole('button', { name: 'POUŽIŤ' });
  }


  async filterByRodneCislo(value: string) {
    await this.rodneCisloHeader.first().hover();
    await this.rodneCisloFilterIcon.first().click();

    await expect(this.valueInput).toBeVisible();
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
}