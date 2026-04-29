import { test, expect, request } from '@playwright/test';
import { MailTmClient } from '../../../pages/mailTmClient';

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
