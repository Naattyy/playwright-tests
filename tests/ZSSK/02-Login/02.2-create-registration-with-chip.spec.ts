import { test } from '@playwright/test';
import { OrderPage } from '../../../pages/ZSSK_konto';
import { orderData } from '../../../data/employeesData';

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.KONTO_URL!);

  await page.locator('[data-cy="header-user-profile"]').click();
  await page.locator('[data-cy="login-email"]').fill(process.env.TEST_EMAIL!);
  await page.locator('[data-cy="login-pwd"]').fill(process.env.TEST_PASSWORD!);
  await page.locator('[data-cy="login-submit"]').click();

  await page.waitForURL('**/dashboard');
});

test('TC_02.2_Vytvorenie_preukazu_s_čipovou_kartou_a_s_fotkou', async ({ page }) => {
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
