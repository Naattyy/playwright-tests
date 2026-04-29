import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.KONTO_URL!);

  await page.locator('[data-cy="header-user-profile"]').click();
  await page.locator('[data-cy="login-email"]').fill(process.env.TEST_EMAIL!);
  await page.locator('[data-cy="login-pwd"]').fill(process.env.TEST_PASSWORD!);
  await page.locator('[data-cy="login-submit"]').click();

  await page.waitForURL('**/dashboard');
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
