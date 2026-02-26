import { Locator, Page } from '@playwright/test';

export class HomePage {
    page: Page;
    employees: Locator;
    customers: Locator;
    title: Locator;

    userIcon: Locator;
    logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.employees = page.getByText('Zamestnanci a rp');
        this.customers = page.getByText('Zákazníci');
        this.title = page.getByText('CIPKART ADMIN');

        this.userIcon = page.getByRole('button', { name: 'account of current user' });
        this.logoutButton = page.getByRole('menuitem', { name: 'Odhlásiť' });
    }

    async clickOnEmployees() {
        await this.employees.click();
    }

    async clickOnCustomers() {
        await this.customers.click();
    }

    async logout() {
        await this.userIcon.click();
        await this.logoutButton.click();
    }
}