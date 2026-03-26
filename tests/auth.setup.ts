import { test as setup, expect } from '@playwright/test';
import 'dotenv/config';

setup('authenticate', async ({ page }) => {
  await page.goto('/');

  await page.fill('[name="username"]', process.env.USERNAME!);
  await page.fill('[name="password"]', process.env.PASSWORD!);
  await page.click('.login-form-button');

  await expect(page).toHaveURL('/index.html#/rail/pass');

  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});