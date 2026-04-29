import { test, expect, request } from '@playwright/test';
import { RegistrationPage, OrderPage } from '../../pages/ZSSK_konto';
import { kontoData, orderData, orderNoCardData } from '../../data/kontoData';
import { MailTmClient } from '../../pages/mailTmClient';

test('TC_01 - Registrácia', async ({ page }) => {
  const registration = new RegistrationPage(page);

  await registration.goto();
  await registration.startRegistration();

  await registration.fillCredentialsStep(
    process.env.TEST_EMAIL!,
    process.env.TEST_PASSWORD!
  );

  await registration.fillPersonalInfoStep(kontoData);

  await registration.fillBirthDateStep(kontoData.birthDate);
  await registration.fillIdAndSubmitStep();

  await expect(page.locator('text=Takmer hotovo')).toBeVisible();
});

test('TC_02 - Mail.tm API verify email + open activation link', async ({ page }) => {
  const apiContext = await request.newContext({
    baseURL: process.env.MAIL_TM_BASE_URL,
  });

  const client = new MailTmClient(apiContext);

  const email = process.env.MAIL_TM_EMAIL!;
  const password = process.env.MAIL_TM_PASSWORD!;

  const token = await client.login(email, password);
  expect(token).toBeTruthy();

  const mail = await client.waitForActivationMail(token);

  const detail = await client.getMessageDetail(token, mail.id);
  const body = detail.text || detail.html;

  const activationLink = client.extractActivationLink(body);

  await page.goto(activationLink);

  await expect(page).toHaveURL(/activate|verify|success/);
});

test('TC_03 - Prihlásenie do konta ZSSK', async ({ page }) => {
  const email = process.env.TEST_EMAIL!;
  const password = process.env.TEST_PASSWORD!;

  await page.goto(process.env.KONTO_URL!);

  await page.locator('[data-cy="header-user-profile"]').click();

  await page.locator('[data-cy="login-email"]').fill(email);
  await page.locator('[data-cy="login-pwd"]').fill(password);

  await page.locator('[data-cy="login-submit"]').click();

  await page.waitForURL('**/dashboard');
});

test.describe('Logged in tests', () => {
test.use({
  baseURL: process.env.KONTO_URL,
});

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.KONTO_URL!);

  await page.locator('[data-cy="header-user-profile"]').click();
  await page.locator('[data-cy="login-email"]').fill(process.env.TEST_EMAIL!);
  await page.locator('[data-cy="login-pwd"]').fill(process.env.TEST_PASSWORD!);
  await page.locator('[data-cy="login-submit"]').click();

  await page.waitForURL('**/dashboard');
});

test('TC_04 - Vytvorenie preukazu s čipovou kartou a s fotkou', async ({ page }) => {
  const orderPage = new OrderPage(page);

  await orderPage.goToDashboard(process.env.KONTO_URL!);

  await orderPage.openLicences();
  await orderPage.selectProduct(orderData.product.type);
  await orderPage.selectCard(orderData.product.card);

  await orderPage.uploadPhoto(orderData.file);
  await orderPage.createPreview();

  await orderPage.fillPersonalData(orderData.user);
  await orderPage.fillAddress(orderData.address);

  await orderPage.continue();

  await orderPage.selectPayment(orderData.payment.method, orderData.user.email);

  await orderPage.continue();

  await orderPage.confirmOrder();
});

test('TC_05 - Vytvorenie preukazu bez čipovej karty', async ({ page }) => {
  const orderPage = new OrderPage(page);

  await orderPage.goToDashboard(process.env.KONTO_URL!);

  await orderPage.openLicences();

  await orderPage.selectProductWithOption(
    orderNoCardData.product.type,
    orderNoCardData.product.option
  );

  await orderPage.skipCardStep();

  await orderPage.fillPaymentEmail(orderNoCardData.user.email);

  await orderPage.confirmTermsAndPay();

  await orderPage.fillCardDetails(orderNoCardData.payment.card);
  
  await orderPage.continueAfterPayment();

  await orderPage.expectPaymentSuccess();
});

test('TC_06 - Zrušenie konta', async ({ page }) => {
  await page.goto('https://konto.test.zssk.sk/zk/dashboard');

  await page.locator('text=Môj profil').click();

  await page.getByRole('link', { name: 'Osobné údaje' }).click();

  await page.getByRole('button', { name: 'Zrušiť konto' }).click();

  await page.getByRole('button', { name: 'Zrušiť moje ZSSK konto' }).click();

  await page.locator('input[formcontrolname="reason"]').fill('Automated test PROSOFT- account deletion');

  await page.getByRole('button', { name: 'Pokračovať' }).click();

  await expect(page.locator('text=Takmer hotovo')).toBeVisible();
});

test('TC_07 - Mail.tm API confirm account cancellation via email link', async ({ page }) => {
  const apiContext = await request.newContext({
    baseURL: process.env.MAIL_TM_BASE_URL,
  });

  const client = new MailTmClient(apiContext);

  const email = process.env.MAIL_TM_EMAIL!;
  const password = process.env.MAIL_TM_PASSWORD!;

  const token = await client.login(email, password);
  expect(token).toBeTruthy();

  const cancelMail = await client.waitForCancellationMail(token);
  const messageDetail = await client.getMessageDetail(token, cancelMail.id);
  const cancelLink = client.extractCancellationLink(messageDetail.html);

  await page.goto(cancelLink);

  const notification = page.locator('.sup-notification__text');
  await notification.waitFor({ state: 'visible', timeout: 10000 });
  await expect(notification).toContainText('Boli ste odhlasený/á!');
});

});

test('TC_08 - Overenie, že zrušený účet sa nedá prihlásiť', async ({ page }) => {
  const registration = new RegistrationPage(page);
  const email = process.env.MAIL_TM_EMAIL!;
  const password = process.env.MAIL_TM_PASSWORD!;

  await registration.goto();
  await registration.openLoginForm();
  await registration.loginToAccount(email, password);
  await registration.expectInvalidCredentials();
});
