import test, { expect } from '../fixtures/basePages';

test('TC_02_Verify home title', async ({ page, loginPage, homePage }) => {
    await loginPage.gotoLoginPage();
    await loginPage.login();
    await expect(homePage.title).toBeVisible();
});

test('TC_14_Log out user', async ({ page, loginPage, homePage }) => {
    await loginPage.gotoLoginPage();
    await loginPage.login();
    await homePage.logout();
    await expect(page).toHaveURL('index.html#/login');
});