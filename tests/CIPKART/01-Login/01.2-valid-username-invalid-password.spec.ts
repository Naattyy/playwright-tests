import test, { expect } from '../../../fixtures/basePages';

test.describe('Login', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.gotoLoginPage();
    })

    test('TC_01.2_Cannot_login_with_valid_username_and_invalid_password', async ({ loginPage }) => {
    await loginPage.enterValidUsername();
    await loginPage.enterInValidPassword();
    await loginPage.clickLoginButton();
    await expect(loginPage.invalidCredentialsErrorMessage).toBeVisible();
    });
})