import { test } from '@playwright/test';
import { RegistrationPage } from '../../../pages/ZSSK_konto';

test('TC_08 - Overenie, že zrušený účet sa nedá prihlásiť', async ({ page }) => {
  const registration = new RegistrationPage(page);
  const email = process.env.MAIL_TM_EMAIL!;
  const password = process.env.MAIL_TM_PASSWORD!;

  await registration.goto();
  await registration.openLoginForm();
  await registration.loginToAccount(email, password);
  await registration.expectInvalidCredentials();
});
