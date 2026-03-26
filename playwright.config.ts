import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'list',
  
  use: {
    baseURL: 'https://cipkartadmin-dev.kube8s.prosoft.sk',
    ignoreHTTPSErrors: true,
    launchOptions: {
      slowMo: 500
    },
    trace: 'on-first-retry',
    viewport: { width: 1920, height: 1080 },
  },

  projects: [
    {
      name: 'setup',
      testMatch: 'tests/auth.setup.ts',
    },
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});
