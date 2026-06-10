import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

type AppName = 'cipkart' | 'zssk';

type ConnectionStep = {
  name: string;
  app: AppName;
  testMatch: string;
};

const slowMo = Number(process.env.SLOW_MO ?? 1000);

const appBaseURL: Record<AppName, string | undefined> = {
  cipkart: process.env.BASE_URL,
  zssk: process.env.KONTO_URL,
};

const chromium = {
  browserName: 'chromium' as const,
};

const connectionTests = [
  'tests/CIPKART/03-Employees/03.5-add-pass.spec.ts',
  'tests/ZSSK/01-Registration/01.1-registration-ZSSK-ID.spec.ts',
  'tests/ZSSK/01-Registration/01.2-email-activation.spec.ts',
  'tests/ZSSK/02-Login/02.1-login.spec.ts',
  'tests/CIPKART/03-Employees/03.6-copy-zssk-id.spec.ts',
  'tests/ZSSK/02-Login/02.3-create-registration-without-chip.spec.ts',
  'tests/CIPKART/03-Employees/03.7-registration-control.spec.ts',
  'tests/ZSSK/03-Delete/03.1-cancel-account.spec.ts',
  'tests/ZSSK/03-Delete/03.2-confirm-cancellation.spec.ts',
  'tests/ZSSK/03-Delete/03.3-cancelled-account-login.spec.ts',
  'tests/CIPKART/03-Employees/03.8-delete-pass.spec.ts',
];

const getConnectionApp = (testMatch: string): AppName =>
  testMatch.includes('/ZSSK/') ? 'zssk' : 'cipkart';

const getConnectionName = (testMatch: string, index: number) => {
  if (index === connectionTests.length - 1) {
    return 'CONNECTION';
  }

  const app = getConnectionApp(testMatch);
  const testCaseNumber = testMatch.split('/').pop()?.match(/^\d+/)?.[0];

  return `connection-${app}-tc${testCaseNumber}`;
};

const connectionSteps: ConnectionStep[] = connectionTests.map((testMatch, index) => ({
  name: getConnectionName(testMatch, index),
  app: getConnectionApp(testMatch),
  testMatch,
}));

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
        'tests/CIPKART/03-Employees/*.spec.ts',
        'tests/CIPKART/04-Customers/*.spec.ts',
      ],
      grep: /@smoke/,
      workers: 1,
      dependencies: ['cipkart-setup'],
      use: {
        ...chromium,
      },
    },
    {
      name: 'smoke-employees',
      testMatch: 'tests/CIPKART/03-Employees/*.spec.ts',
      grep: /@smoke/,
      workers: 1,
      dependencies: ['cipkart-setup'],
      use: {
        ...chromium,
    },
    },
    {
      name: 'smoke-customers',
      testMatch: 'tests/CIPKART/04-Customers/*.spec.ts',
      grep: /@smoke/,
      workers: 1,
      dependencies: ['cipkart-setup'],
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
