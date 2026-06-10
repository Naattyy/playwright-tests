import test, { expect } from '../../../fixtures/basePages';

test.describe('Login', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.gotoLoginPage();
    })

    test('TC_01.4_Cannot_login_with_empty_fields', async ({ page, loginPage }) => {
        await loginPage.clickLoginButton();

        await expect(page).toHaveURL(`${process.env.BASE_URL}/index.html`);
        await expect(loginPage.loginButton).toBeVisible();
    });
})