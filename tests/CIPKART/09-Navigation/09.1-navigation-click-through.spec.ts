import test, { expect } from '../../../fixtures/basePages';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test.describe('TC_09.1_CIPKART_Navigation_Click_Through', () => {
  test('TC_09.1_Click_through_main_CIPKART_sections', async ({ page, employeesPage, customersPage }) => {

    await test.step('Open employee sections', async () => {

      await employeesPage.gotoEmployeesPage();
      await expect(page.getByText('000101/0002', { exact: true })).toBeVisible();

      await page.getByRole('link', { name: 'Preukazy - história' }).click();
      await expect(page.getByRole('link', { name: 'Personálne údaje' })).toBeVisible();

        await page.locator('li').filter({ hasText: 'Personálne údaje' }).click();
        await expect(page.getByText('Položky:', { exact: false })).toBeVisible();

        await page.locator('li').filter({ hasText: 'Nárok na ŽP' }).click();
        await expect(page.getByText('Typ ŽP', { exact: true })).toBeVisible();

        await page.locator('li').filter({ hasText: 'Zamestnanecký preukaz' }).click();
        await expect(page.getByText('Typ ZP', { exact: true })).toBeVisible();

      await page.getByRole('link', { name: 'Skenované formuláre' }).click();
      await expect(page.getByText('Položky:')).toBeVisible();

      await page.getByRole('link', { name: 'Číselníky' }).click();
      await expect(page.getByRole('link', { name: 'Funkcia zamestnanca' })).toBeVisible();

        await page.locator('li').filter({ hasText: 'Funkcia zamestnanca' }).click();
        await expect(page.getByText('ID funkcie zamestnanca', { exact: false })).toBeVisible();

        await page.locator('li').filter({ hasText: 'Výkonna jednotka' }).click();
        await expect(page.getByText('ID výkonnej jednotky', { exact: true })).toBeVisible();

        await page.locator('li').filter({ hasText: 'Organizačný útvar' }).click();
        await expect(page.getByText('ID organizačného útvaru', { exact: true })).toBeVisible();

        await page.locator('li').filter({ hasText: 'Kód preukazu' }).click();
        await expect(page.getByText('ID kódu preukazu', { exact: true })).toBeVisible();

        await page.locator('li').filter({ hasText: 'Vyhradený obvod' }).click();
        await expect(page.getByText('ID vyhradeného obvodu', { exact: true })).toBeVisible();

        await page.locator('li').filter({ hasText: 'Oprávnenia' }).click();
        await expect(page.getByText('ID oprávnenia', { exact: true })).toBeVisible();
    });

    await test.step('Open customers sections', async () => {

      await page.getByRole('heading', { name: 'Zákazníci' }).click();
      await page.getByRole('link', { name: 'Preukazy' }).nth(2).click();
      await expect(page.getByText('ID držiteľa', { exact: true })).toBeVisible();

      await page.getByRole('link', { name: 'Preukazy - história' }).nth(1).click();
      await expect(page.getByText('Personálne údaje', { exact: true })).toBeVisible();

        await page.getByRole('link', { name: 'Personálne údaje' }).click();
        await expect(page.getByText('Priezvisko', { exact: true })).toBeVisible();

        await page.getByRole('link', { name: 'Zákaznícky preukaz' }).click();
        await expect(page.getByText('Typ ZaP', { exact: true })).toBeVisible();

      await page.getByRole('link', { name: 'Skenované formuláre' }).nth(1).click();
      await expect(page.getByText('ID držiteľa', { exact: true })).toBeVisible();

      await page.getByRole('link', { name: 'Číselníky' }).nth(1).click();
      await expect(page.getByText('Predajné miesta, stanice', { exact: true })).toBeVisible();
    });

    await test.step('Open chip card data', async () => {

      await page.getByRole('heading', { name: 'Správa BČK' }).click();
      await expect(page.getByText('Údaje BČK', { exact: true })).toBeVisible();

      await page.getByRole('link', { name: 'Údaje BČK' }).nth(0).click();
      await expect(page.getByText('SNR karty', { exact: true })).toBeVisible(); 
      
      await page.locator('li.li-border:text-is("Údaje BČK - história")').click();
      await expect(page.getByText('SNR karty', { exact: true })).toBeVisible(); 

      await page.getByRole('link', { name: 'Objednávky BČK' }).nth(0).click();
      await expect(page.getByText('Číslo objednávky', { exact: true })).toBeVisible(); 

      await page.getByRole('link', { name: 'Objednávky BČK - história' }).click();
      await expect(page.getByText('Číslo objednávky', { exact: true })).toBeVisible();

      await page.locator('li.li-border:text-is("Registrácie")').click();
      await expect(page.getByText('Číslo registrácie', { exact: true })).toBeVisible();
    });

    await test.step('Open travel documents', async () => {
        
      await page.getByRole('heading', { name: 'Cestovné doklady' }).click();
      await expect(page.getByRole('link', { name: 'Cestovné doklady' })).toBeVisible();

      await page.locator('li.li-border:text-is("Cestovné doklady")').click();
      await expect(page.getByText('ID transakcie', { exact: true })).toBeVisible();
    });

    await test.step('Open blacklist', async () => {  

      await page.getByRole('heading', { name: 'Správa Blacklist' }).click();
      await expect(page.getByText('Blacklist', { exact: true })).toBeVisible();

      await page.getByRole('link', { name: 'Blacklist' }).nth(0).click();
      await expect(page.getByText('Typ CD a P', { exact: true })).toBeVisible(); 
    
      await page.getByRole('link', { name: 'Blacklist - história' }).click();
      await expect(page.getByText('Typ CD a P', { exact: true })).toBeVisible(); 

      await page.getByRole('link', { name: 'Zadržané ručne' }).click();
      await expect(page.getByText('ID typu CD a P', { exact: true })).toBeVisible();

      await page.getByRole('link', { name: 'Zadržané automaticky' }).click();
      await expect(page.getByText('ID typu CD a P', { exact: true })).toBeVisible();
    });
  });
});
