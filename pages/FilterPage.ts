import { expect, Locator, Page } from "@playwright/test";

export class FilterPage {
  page: Page;
  rodneCisloHeader: Locator;
  rodneCisloFilterIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rodneCisloHeader = page.locator('div.table-header-td:has(h3:has-text("Rodné číslo"))');
    this.rodneCisloFilterIcon = this.rodneCisloHeader.locator('svg[data-testid="FilterAltIcon"]');
  }

  get filterDialog() {
    return this.page.locator('[role="dialog"]');
  }

  async filterByRodneCislo(value: string) {
    await this.rodneCisloHeader.first().hover();
    await this.rodneCisloFilterIcon.first().click();

    await this.filterDialog.locator('#val1').fill(value);
    await this.filterDialog.getByRole('button', { name: 'POUŽIŤ' }).click();
  }

  async expectRodneCisloVisible(rc: string) {
    await expect(this.page.getByText(rc, { exact: true })).toBeVisible();
  }
}