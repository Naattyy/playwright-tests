# TEST_CASES

## CIPKART_ADMIN

| Test Case ID | TC_01.1 |
|:-------------|:---------|
| Test Title      | Prihlásenie používateľa s platnými údajmi |
| Test Data       | Meno: P130<br>Heslo: aaaaa                |
| Precondition    | Používateľ je zaregistrovaný v systéme    |
| Expected Result | Používateľ je úspešne prihlásený          |

### Test Steps

1. Otvor stránku
2. Zadaj meno
3. Zadaj heslo
4. Klikni na tlačidlo **Prihlásiť sa**
<br>
<br>
<br>
| Test Case ID | TC_01.2 |
|:-------------|:---------|
| Test Title      | Prihlásenie používateľa s neplatným heslom|
| Test Data       | Meno: P130<br>Heslo: nesprávne            |
| Precondition    | Používateľ je zaregistrovaný v systéme    |
| Expected Result | Systém zobrazí chybovú hlášku ,,Nesprávne meno alebo heslo” <br> Používateľ nebude prihlásený                       |

### Test Steps

1. Otvor stránku
2. Zadaj meno
3. Zadaj nesprávne heslo
4. Klikni na tlačidlo **Prihlásiť sa**
<br>
<br>
<br>
