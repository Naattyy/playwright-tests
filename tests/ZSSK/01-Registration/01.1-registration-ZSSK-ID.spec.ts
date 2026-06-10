import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../../pages/ZSSK_konto';
import { employeesData } from '../../../data/employeesData';

test('TC_01.1_Registrácia', async ({ page }) => {
  const registration = new RegistrationPage(page);

  await registration.goto();
  await registration.startRegistration();

  await registration.fillCredentialsStep(
    process.env.TEST_EMAIL!,
    process.env.TEST_PASSWORD!
  );

  await registration.fillPersonalInfoStep(employeesData);

  await registration.fillBirthDateStep(employeesData.birthDate);
  await registration.fillIdAndSubmitStep();

  await expect(page.locator('text=Takmer hotovo')).toBeVisible();
});
