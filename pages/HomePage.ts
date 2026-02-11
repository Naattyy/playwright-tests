import { Locator, Page } from '@playwright/test';

export class HomePage {
    page: Page;
    employees: Locator;
    customers: Locator;
    title: Locator;
    button: Locator;
    checkbox: Locator;

    constructor(page: Page) {
        this.page = page;
        this.employees = page.getByText('Zamestnanci a rp');
        this.customers = page.getByText('Zákazníci');
        this.title = page.getByText('CIPKART ADMIN');
        this.button = page.getByText('+');
        this.checkbox = page.locator('input.PrivateSwitchBase-input.css-1m9pwf3');
    }

    async clickOnEmployees() {
        await this.employees.click();
    }

    async clickOnCustomers() {
        await this.customers.click();
    }

    async clickOnButton() {
        await this.button.click();
    }

    async clickOnCheckbox() {
        await this.checkbox.click();
    }
}