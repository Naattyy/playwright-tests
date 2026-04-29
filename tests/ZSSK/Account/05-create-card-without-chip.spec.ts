import { test } from '@playwright/test';
import { OrderPage } from '../../../pages/ZSSK_konto';
import { orderNoCardData } from '../../../data/kontoData';

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.KONTO_URL!);

  await page.locator('[data-cy="header-user-profile"]').click();
  await page.locator('[data-cy="login-email"]').fill(process.env.TEST_EMAIL!);
  await page.locator('[data-cy="login-pwd"]').fill(process.env.TEST_PASSWORD!);
  await page.locator('[data-cy="login-submit"]').click();

  await page.waitForURL('**/dashboard');
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
