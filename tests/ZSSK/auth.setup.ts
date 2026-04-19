import { test as setup } from '@playwright/test';
import 'dotenv/config';

setup('zssk authenticate', async ({ page }) => {
  await page.goto(process.env.KONTO_URL!);

  await page.locator('[data-cy="header-user-profile"]').click();
  await page.locator('[data-cy="login-email"]').fill(process.env.TEST_EMAIL!);
  await page.locator('[data-cy="login-pwd"]').fill(process.env.TEST_PASSWORD!);
  await page.locator('[data-cy="login-submit"]').click();

  await page.waitForURL('**/dashboard');

  await page.context().storageState({ path: 'playwright/.auth/zssk-user.json' });
});
