import { test as baseTest } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CustomersPage } from '../pages/CustomersPage';
import { EmployeesPage } from '../pages/EmployeesPage';
import { FilterPage } from '../pages/FilterPage';

const test = baseTest.extend<{
    loginPage: LoginPage;
    homePage: HomePage;
    customersPage: CustomersPage;
    employeesPage: EmployeesPage;
    filterPage: FilterPage;
}>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) =>{
        await use(new HomePage(page));
    },
    customersPage: async ({ page }, use) =>{
        await use(new CustomersPage(page));
    },
    employeesPage: async ({ page }, use) =>{
        await use(new EmployeesPage(page));
    },
    filterPage: async ({ page }, use) =>{
        await use(new FilterPage(page));
    }
});

export default test;
export const { expect } = test;