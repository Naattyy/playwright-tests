import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login();
    await expect(page).toHaveURL('https://dockerdev.prosoft.sk:8083/index.html#/rail/pass');
});