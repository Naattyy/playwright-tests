import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../../pages/ZSSK_konto';
import { kontoData } from '../../../data/kontoData';

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
