import test, { expect } from '../../../fixtures/basePages';

test('TC_07.1_Log_out_user', async ({ page, loginPage, homePage }) => {
    await loginPage.gotoLoginPage();
    await loginPage.login();
    await homePage.logout();
    await expect(page).toHaveURL(`${process.env.BASE_URL}/index.html#/login`);
});