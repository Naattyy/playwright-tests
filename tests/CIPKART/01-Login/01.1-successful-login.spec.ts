import test, { expect } from '../../../fixtures/basePages';

test.describe('Login', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.gotoLoginPage();
    })

    test('TC_01.1_Successful_login', async ({ page, loginPage }) => {
    await loginPage.gotoLoginPage();
    await loginPage.login();
    await expect(page).toHaveURL(`${process.env.BASE_URL}/index.html#/rail/pass`);
    });
})
