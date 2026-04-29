import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
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
      name: 'cipkart-setup',
      testMatch: 'tests/CIPKART/auth.setup.ts',
    },
    {
      name: 'cipkart',
      testMatch: 'tests/CIPKART/**/*.spec.ts',
      dependencies: ['cipkart-setup'],
      use: {
        browserName: 'chromium',
      },
    },
    {
      name: 'zssk',
      testMatch: 'tests/ZSSK/**/*.spec.ts',
      use: {
        browserName: 'chromium',
        baseURL: process.env.KONTO_URL,
      },
    },
    {
      name: 'smoke',
      testMatch: [
            'tests/CIPKART/Customers/*.spec.ts',
            'tests/CIPKART/Employees/*.spec.ts',
      ],
      grep: /@smoke/,
      workers: 1,
      use: {
        browserName: 'chromium',
      },
    },
    {
      name: 'smoke-employees',
      testMatch: 'tests/CIPKART/Employees/*.spec.ts',
      grep: /@smoke/,
      workers: 1,
      use: {
        browserName: 'chromium',
      },
    },
    {
      name: 'smoke-customers',
      testMatch: 'tests/CIPKART/Customers/*.spec.ts',
      grep: /@smoke/,
      workers: 1,
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
