import { test, expect, request } from '@playwright/test';
import { MailTmClient } from '../../../pages/mailTmClient';

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.KONTO_URL!);

  await page.locator('[data-cy="header-user-profile"]').click();
  await page.locator('[data-cy="login-email"]').fill(process.env.TEST_EMAIL!);
  await page.locator('[data-cy="login-pwd"]').fill(process.env.TEST_PASSWORD!);
  await page.locator('[data-cy="login-submit"]').click();

  await page.waitForURL('**/dashboard');
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
