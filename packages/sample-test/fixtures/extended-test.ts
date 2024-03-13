import { test as base } from "@playwright/test";
import { convertCookies, PartialCookie } from "./cookie-gen";

interface SampleTestFixtures {
  cookies: PartialCookie[],
};

interface SampleWorkerFixtures {
};

export const test = base.extend<SampleTestFixtures, SampleWorkerFixtures>({
  cookies: [[] , { option: false } ],
  context: async ({ context, baseURL, cookies }, use) => {
    const allCookies = convertCookies({baseURL: baseURL ?? "", cookies})
    context.addCookies(allCookies);
    await use(context);
  },
});

