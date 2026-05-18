import { defineConfig } from '@playwright/test';
import test, { expect } from '../../fixtures/basePages';


test.describe('Login', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.gotoLoginPage();
    })

    test('TC_01_Successful login', async ({ page, loginPage }) => {
    await loginPage.gotoLoginPage();
    await loginPage.login();
    await expect(page).toHaveURL(`${process.env.BASE_URL}/index.html#/rail/pass`);
    });

    test('TC_01.1_Cannot login with valid username and invalid password', async ({ loginPage }) => {
    await loginPage.enterValidUsername();
    await loginPage.enterInValidPassword();
    await loginPage.clickLoginButton();
    await expect(loginPage.invalidCredentialsErrorMessage).toBeVisible();
    });

    test('TC_01.2_Cannot login with invalid username and valid password', async ({ loginPage }) => {
    await loginPage.enterInValidUsername();
    await loginPage.enterValidPassword();
    await loginPage.clickLoginButton();
    await expect(loginPage.invalidCredentialsErrorMessage).toBeVisible();
    });

    test('TC_01.3_Cannot login with empty fields', async ({ page, loginPage }) => {
        await loginPage.clickLoginButton();

        await expect(page).toHaveURL(`${process.env.BASE_URL}/index.html`);
        await expect(loginPage.loginButton).toBeVisible();
    });

})
