import test, { expect } from '../../../fixtures/basePages';

test.describe('Login', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.gotoLoginPage();
    })

    test('TC_01.3_Cannot_login_with_invalid_username_and_valid_password', async ({ loginPage }) => {
    await loginPage.enterInValidUsername();
    await loginPage.enterValidPassword();
    await loginPage.clickLoginButton();
    await expect(loginPage.invalidCredentialsErrorMessage).toBeVisible();
    });
})