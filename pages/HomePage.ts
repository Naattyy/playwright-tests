import { Locator, Page } from '@playwright/test';

export class HomePage {
    page: Page;
    employees: Locator;
    customers: Locator;
    title: Locator;

    constructor(page: Page) {
        this.page = page;
        this.employees = page.getByText('Zamestnanci a rp');
        this.customers = page.getByText('Zákazníci');
        this.title = page.getByText('CIPKART ADMIN');
    }

    async clickOnEmployees() {
        await this.employees.click();
    }

    async clickOnCustomers() {
        await this.customers.click();
    }
}