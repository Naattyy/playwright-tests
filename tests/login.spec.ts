import { test, expect } from '@playwright/test';

test('TC_01 - Prihlásenie používateľa s platnými údajmi', async ({ page }) => {

    //1. Otvor stránku
    await page.goto('https://dockerdev.prosoft.sk:8083/index.html');
    
    //2. Zadaj meno
    await page.fill('input[name="username"]', 'P130');

    //3. Zadaj heslo
    await page.fill('input[name="password"]', 'aaaaa');

    //4. Klikni na tlačidlo "Prihlásiť sa"
    await page.click('button:has-text("Prihlásiť sa")');

    //5. Expected result - používateľ je prihlásený

    //a) presmerovanie
    await expect(page).toHaveURL('https://dockerdev.prosoft.sk:8083/index.html#/rail/pass');
});
