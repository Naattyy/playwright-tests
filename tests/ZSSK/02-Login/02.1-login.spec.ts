import { test } from '@playwright/test';

test('TC_02.1_Prihlásenie_do_konta_ZSSK', async ({ page }) => {
  const email = process.env.TEST_EMAIL!;
  const password = process.env.TEST_PASSWORD!;

  await page.goto(process.env.KONTO_URL!);

  await page.locator('[data-cy="header-user-profile"]').click();

  await page.locator('[data-cy="login-email"]').fill(email);
  await page.locator('[data-cy="login-pwd"]').fill(password);

  await page.locator('[data-cy="login-submit"]').click();

  await page.waitForURL('**/dashboard');
});
