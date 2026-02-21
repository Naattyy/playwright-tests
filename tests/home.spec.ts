import test, { expect } from '../fixtures/basePages';

test('Verify home title', async ({ page, loginPage, homePage }) => {
    await loginPage.gotoLoginPage();
    await loginPage.login();
    await expect(homePage.title).toBeVisible();
});