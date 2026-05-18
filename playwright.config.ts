import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

type AppName = 'cipkart' | 'zssk';

type ConnectionStep = {
  name: string;
  app: AppName;
  testMatch: string | string[];
};

const slowMo = Number(process.env.SLOW_MO ?? 500);

const appBaseURL: Record<AppName, string | undefined> = {
  cipkart: process.env.BASE_URL,
  zssk: process.env.KONTO_URL,
};

const chromium = {
  browserName: 'chromium' as const,
};

const connectionSteps: ConnectionStep[] = [
  {
    name: 'connection-cipkart-tc03',
    app: 'cipkart',
    testMatch: 'tests/CIPKART/Employees/03-createEmployee.spec.ts',
  },
  {
    name: 'connection-zssk-tc01',
    app: 'zssk',
    testMatch: 'tests/ZSSK/Account/01-registration-ZSSK-ID.spec.ts',
  },
  {
    name: 'connection-zssk-tc02',
    app: 'zssk',
    testMatch: 'tests/ZSSK/Account/02-email-activation.spec.ts',
  },
  {
    name: 'connection-zssk-tc03',
    app: 'zssk',
    testMatch: 'tests/ZSSK/Account/03-login.spec.ts',
  },
  {
    name: 'connection-cipkart-tc15',
    app: 'cipkart',
    testMatch: 'tests/CIPKART/Employees/15-addPass.spec.ts',
  },
  {
    name: 'connection-cipkart-tc16',
    app: 'cipkart',
    testMatch: 'tests/CIPKART/Employees/16-copy-zssk-id.spec.ts',
  },
  {
    name: 'connection-zssk-tc05',
    app: 'zssk',
    testMatch: 'tests/ZSSK/Account/05-create-registration-without-chip.spec.ts',
  },
  {
    name: 'connection-cipkart-tc17',
    app: 'cipkart',
    testMatch: 'tests/CIPKART/Employees/17-registration-control.spec.ts',
  },
  {
    name: 'connection-zssk-tc06',
    app: 'zssk',
    testMatch: 'tests/ZSSK/Account/06-cancel-account.spec.ts',
  },
  {
    name: 'connection-zssk-tc07',
    app: 'zssk',
    testMatch: 'tests/ZSSK/Account/07-confirm-cancellation.spec.ts',
  },
  {
    name: 'connection-zssk-tc08',
    app: 'zssk',
    testMatch: 'tests/ZSSK/Account/08-cancelled-account-login.spec.ts',
  },
  {
    name: 'CONNECTION',
    app: 'cipkart',
    testMatch: 'tests/CIPKART/Employees/05-deleteEmployee.spec.ts',
  },
];

const connectionProjects = connectionSteps.map((step, index) => ({
  name: step.name,
  testMatch: step.testMatch,
  dependencies: [index === 0 ? 'cipkart-setup' : connectionSteps[index - 1].name],
  use: {
    ...chromium,
    baseURL: appBaseURL[step.app],
  },
}));

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'list',
  timeout: 120000,
  expect: {
    timeout: 15000,
  },
  
  use: {
    baseURL: process.env.BASE_URL,
    locale: 'sk-SK',
    ignoreHTTPSErrors: true,
    actionTimeout: 30000,
    navigationTimeout: 60000,
    launchOptions: {
      slowMo,
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
        ...chromium,
      },
    },
    {
      name: 'zssk',
      testMatch: 'tests/ZSSK/**/*.spec.ts',
      use: {
        ...chromium,
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
        ...chromium,
      },
    },
    {
      name: 'smoke-employees',
      testMatch: 'tests/CIPKART/Employees/*.spec.ts',
      grep: /@smoke/,
      workers: 1,
      use: {
        ...chromium,
      },
    },
    {
      name: 'smoke-customers',
      testMatch: 'tests/CIPKART/Customers/*.spec.ts',
      grep: /@smoke/,
      workers: 1,
      use: {
        ...chromium,
      },
    },
    ...connectionProjects,
    {
      name: 'chromium',
      testMatch: '**/*.spec.ts',
      grepInvert: /@smoke/,
      use: {
        ...chromium,
      },
    },
  ],
});
