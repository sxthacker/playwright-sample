import { defineConfig, devices } from "@playwright/test";
import { SampleOptions } from "@sample/test";

export default defineConfig<SampleOptions>({
  testDir: "./tests",
  testMatch: "*spec.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "https://playwright.dev",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
       name: "chrome",
       use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],
});
