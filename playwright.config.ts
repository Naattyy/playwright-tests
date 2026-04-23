import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'list',
  timeout: 120000,
  
  use: {
    baseURL: process.env.BASE_URL,
    locale: 'sk-SK',
    ignoreHTTPSErrors: true,
    launchOptions: {
      slowMo: 500
    },
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'setup',
      testMatch: '**/auth.setup.ts',
    },
    {
      name: 'smoke',
      testMatch: [
        'tests/CIPKART/Customers/createCustomer.spec.ts', 
        'tests/CIPKART/Customers/editCustomer.spec.ts',
        'tests/CIPKART/Customers/deleteCustomer.spec.ts',
      ],
      grep: /@smoke/,
      use: {
        browserName: 'chromium',
      },
    },
    {
      name: 'chromium',
      testMatch: '**/*.spec.ts',
      grepInvert: /@smoke/,
      use: {
        browserName: 'chromium',
      },
    },
  ],
});
