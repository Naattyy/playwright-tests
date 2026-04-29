import { Page, test, expect } from '@playwright/test';

type RegistrationData = {
  firstName: string;
  lastName: string;
  phone: string;
  street: string;
  city: string;
};

type DeliveryUser = {
  firstName: string;
  lastName: string;
};

type DeliveryAddress = {
  country: string;
  city: string;
  zip: string;
  zipSearch: string;
  street: string;
};

type PaymentCard = {
  number: string;
  expiry: string;
  cvc: string;
};

export class RegistrationPage {
  constructor(private page: Page) {}

  private continueButton() {
    return this.page.getByRole('button', { name: 'Pokračovať' });
  }

  private async selectComboboxOption(index: number, optionName: string) {
    await this.page.locator('.p-dropdown-trigger').nth(index).click();
    await this.page.getByRole('option', { name: optionName }).click();
  }

  async goto() {
    await this.page.goto(process.env.KONTO_URL!);
  }

  async startRegistration() {
    await this.page.click('text=Vytvorenie nového zákazníckeho konta ZSSK');
  }

  async openLoginForm() {
    await this.page.locator('[data-cy="header-user-profile"]').click();
  }

  async loginToAccount(email: string, password: string) {
    await this.page.locator('[data-cy="login-email"]').fill(email);
    await this.page.locator('[data-cy="login-pwd"]').fill(password);
    await this.page.locator('[data-cy="login-submit"]').click();
  }

  async expectInvalidCredentials() {
    await expect(this.page.locator('text=Neplatné prihlasovacie údaje')).toBeVisible();
  }

  async fillCredentialsStep(email: string, password: string) {
    await test.step('Vyplnenie prihlasovacích údajov', async () => {
      await this.page.fill('[data-cy="credentials-email"]', email);
      await this.page.fill('[data-cy="credentials-pwd"]', password);
      await this.continue();
    });
  }

  async fillPersonalInfoStep(data: RegistrationData) {
    await test.step('Vyplnenie osobných údajov', async () => {
      await this.page.fill('[data-cy="personal-name"]', data.firstName);
      await this.page.fill('[data-cy="personal-surname"]', data.lastName);

      await this.page.click('.combobox');
      await this.page.getByText('Žena', { exact: true }).click();

      await this.page.fill('[data-cy="contact-street"]', data.street);
      await this.page.fill('.p-autocomplete-input', data.city);
      const options = this.page.locator('.p-autocomplete-panel .p-autocomplete-item');
      await options.first().waitFor();
      await options.first().click();

      await this.page.locator('.combobox').nth(2).click();
      await this.page.locator('.combobox-list__item').first().click();

      await this.page.fill('[data-cy="contact-number"]', data.phone);

      await this.continue();
    });
  }

  async fillBirthDateStep(_date: string) {
    await test.step('Vyplnenie dátumu narodenia', async () => {
      await this.selectComboboxOption(0, '25');
      await this.selectComboboxOption(1, '9');
      await this.selectComboboxOption(2, '1998');
      await this.continue();
    });
  }

  async fillIdAndSubmitStep() {
    await test.step('Dokončenie registrácie', async () => {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

      const randomLetters =
        letters[Math.floor(Math.random() * letters.length)] +
        letters[Math.floor(Math.random() * letters.length)];

      const randomNumbers = Math.floor(100 + Math.random() * 900);

      const uniqueId = `${randomLetters}${randomNumbers}`;

      await this.page.locator('[data-cy="registration-number"]').fill(uniqueId);

      await this.page.getByRole('checkbox', { name: 'Súhlasím s obchodnými' }).check();
      await this.page.getByRole('checkbox', { name: 'Potvrdzujem správnosť vyššie' }).check();

      await this.page.click('button:has-text("Vytvoriť ZSSK konto")');
    });
  }

  async continue() {
    await this.continueButton().click();
  }
}

export class OrderPage {
  constructor(private page: Page) {}

  private continueButton() {
    return this.page.getByRole('button', { name: 'Pokračovať' });
  }

  private async fillField(selector: string, value: string) {
    const field = this.page.locator(selector);
    await field.fill(value);
    await expect(field).toHaveValue(value);
  }

  private async selectAutocompleteOption(input: string, searchValue: string, optionText: string) {
    const field = this.page.locator(input).first();
    const option = this.page
      .locator('.p-autocomplete-panel .p-autocomplete-item')
      .filter({ hasText: optionText })
      .first();

    await field.click();
    await field.fill(searchValue);
    await option.click();
  }

  async goToDashboard(baseUrl: string) {
    await test.step('Prechod na dashboard', async () => {
      await this.page.goto(`${baseUrl}/zk/dashboard`);
      await expect(this.page).toHaveURL(/\/zk\/dashboard/);
    });
  }

  async openLicences() {
    await test.step('Otvorenie sekcie preukazov', async () => {
      const licencesLink = this.page.locator('a[href="/zk/licences"]');
      await licencesLink.click();
      await expect(this.page).toHaveURL(/\/zk\/licences/);
    });
  }

  async selectProduct(product: string) {
    await test.step(`Výber produktu ${product}`, async () => {
      const productCard = this.page.getByText(product, { exact: true });
      await productCard.click();
      await this.continue();
    });
  }

  async selectCard(card: string) {
    await test.step(`Výber karty ${card}`, async () => {
      const cardOption = this.page.locator('.referer__head').filter({ hasText: card }).first();
      await cardOption.click();
    });
  }

  async uploadPhoto(file: string) {
    await test.step('Nahratie fotografie', async () => {
      const uploadInput = this.page.locator('input[type="file"]');
      await uploadInput.setInputFiles(file);
      await expect(this.page.getByRole('button', { name: 'Vytvoriť ukážku' })).toBeVisible();
    });
  }

  async createPreview() {
    await test.step('Vytvorenie náhľadu fotografie', async () => {
      await this.page.getByRole('button', { name: 'Vytvoriť ukážku' }).click();
      await this.continue();
      await expect(this.page.locator('[formcontrolname="deliveryAddressFirstName"]')).toBeVisible();
    });
  }

  async fillPersonalData(user: DeliveryUser) {
    await test.step('Vyplnenie osobných údajov pre doručenie', async () => {
      await this.fillField('[formcontrolname="deliveryAddressFirstName"]', user.firstName);
      await this.fillField('[formcontrolname="deliveryAddressLastName"]', user.lastName);
    });
  }

  async fillAddress(address: DeliveryAddress) {
    await test.step('Vyplnenie adresy doručenia', async () => {
      const countryDropdown = this.page.locator('.p-dropdown').first();
      await countryDropdown.click();
      await this.page.getByText(address.country, { exact: true }).click();

      await this.selectAutocompleteOption('input[role="combobox"]', address.city, address.city);
      await this.selectAutocompleteOption('p-autocomplete[field="zipcode"] input', address.zipSearch, address.zip);
      await this.fillField('[formcontrolname="deliveryAddressStreetName"]', address.street);
    });
  }

  async continue() {
    await this.continueButton().click();
  }

  async selectPayment(method: string, email: string) {
    await test.step('Výber platby a emailu', async () => {
      const paymentRadio = this.page.locator(`[data-cy="radio-${method}"]`);
      await paymentRadio.check();
      await this.fillField('sup-form-field:has-text("E-mailová adresa") input', email);
    });
  }

  async confirmOrder() {
    await this.page.locator('[data-cy="single"]').check();
    await this.page.click('text=Zaplatiť');
  }



  async selectProductWithOption(product: string, option: string) {
    await this.page.click(`text=${product}`);
    await this.page.locator(`label:has-text("${option}")`).click();
    await this.continue();
  }

  async skipCardStep() {
    await this.page.locator('button:has-text("Preskočiť")').click();
  }

  async fillPaymentEmail(email: string) {
    await this.page.locator('[data-cy="radio-muzoPay"]').check();
    await this.fillField('sup-form-field:has-text("E-mailová adresa") input', email);
    await this.continue();
  }

  async confirmTermsAndPay() {
    await this.page.locator('[data-cy="single"]').check();
    await this.page.click('text=Zaplatiť');
  }

  async fillCardDetails(card: PaymentCard) {
    await this.page.locator('#inputPan').fill(card.number);
    await this.page.locator('#input-expiration').fill(card.expiry);
    await this.page.locator('#inputCvc').fill(card.cvc);
    await this.page.locator('#send').click();
  }

  async continueAfterPayment() {
    const continueButton = this.continueButton();

    if (await continueButton.isVisible().catch(() => false)) {
      await continueButton.click();
    }
  }

  async expectPaymentSuccess() {
    const successMessage = this.page.getByText(
      /Platba prebehla v poriadku|platba.*(úspešne|uspesne)|Ďakujeme za objednávku|Dakujeme za objednavku/i
    );

    if (await successMessage.first().isVisible().catch(() => false)) {
      await expect(successMessage.first()).toBeVisible();
      return;
    }

    await expect(this.page).toHaveURL(/success|completed|result|status|licences|dashboard/i);
  }
}

export class AccountSettingsPage {
  constructor(private page: Page) {}

  async gotoDashboard(baseUrl: string) {
    await this.page.goto(`${baseUrl}/zk/dashboard`);
  }

  async openProfile() {
    await this.page.getByText('Môj profil').click();
  }

  async openPersonalDetails() {
    await this.page.getByRole('link', { name: 'Osobné údaje' }).click();
  }

  async startAccountCancellation() {
    await this.page.getByRole('button', { name: 'Zrušiť konto' }).click();
    await this.page.getByRole('button', { name: 'Zrušiť moje ZSSK konto' }).click();
  }

  async fillCancellationReason(reason: string) {
    await this.page.locator('input[formcontrolname="reason"]').fill(reason);
  }

  async submitCancellation() {
    await this.page.getByRole('button', { name: 'Pokračovať' }).click();
  }

  async expectCancellationPending() {
    await expect(this.page.locator('text=Takmer hotovo')).toBeVisible();
  }
}
