import test, { expect } from '../fixtures/basePages';


test.describe('Login', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.gotoLoginPage();
    })

    test('Successful login', async ({ page, loginPage }) => {
    await loginPage.login();
    await expect(page).toHaveURL('https://cipkartadmin-dev.kube8s.prosoft.sk/index.html#/rail/pass');
    });

    test('Cannot login with valid username and invalid password', async ({ page, loginPage }) => {
    await loginPage.enterValidUsername();
    await loginPage.enterInValidPassword();
    await loginPage.clickLoginButton();
    await expect(loginPage.invalidCredentialsErrorMessage).toBeVisible();
    });

    test('Cannot login with invalid username and valid password', async ({ page, loginPage }) => {
    await loginPage.enterInValidUsername();
    await loginPage.enterValidPassword();
    await loginPage.clickLoginButton();
    await expect(loginPage.invalidCredentialsErrorMessage).toBeVisible();
    });

})