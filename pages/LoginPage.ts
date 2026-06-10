import { Locator, Page } from '@playwright/test';

export class LoginPage {
    page: Page;
    userNameInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    invalidCredentialsErrorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameInput = page.locator('.login-form-input[name="username"]');
        this.passwordInput = page.locator('.login-form-input[name="password"]');
        this.loginButton = page.locator('.login-form-button');
        this.invalidCredentialsErrorMessage = page.locator('div.alert-box');
    }

    async gotoLoginPage() {
        await this.page.goto('/');
    }

    async enterValidUsername() {
        await this.userNameInput.fill(process.env.USERNAME!);
    }

    async enterInValidUsername() {
        await this.userNameInput.fill('meno');
    }

    async enterValidPassword() {
        await this.passwordInput.fill(process.env.PASSWORD!);
    }

    async enterInValidPassword() {
        await this.passwordInput.fill('heslo');
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }
    
    async login() {
        await this.userNameInput.fill(process.env.USERNAME!);
        await this.passwordInput.fill(process.env.PASSWORD!);
        await this.loginButton.click();
    }
}