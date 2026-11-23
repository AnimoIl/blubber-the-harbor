import { test as base, expect } from '@playwright/test';

const sampleImage =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1600"><rect width="1200" height="1600" fill="#b9f0fa"/><circle cx="600" cy="700" r="300" fill="#379bfa"/></svg>';

export const test = base.extend({
  page: async ({ page, baseURL }, use) => {
    // Owner-supplied remote artwork must not make browser checks depend on its host.
    const origin = new URL(baseURL).origin;
    await page.route('**/*', async (route) => {
      const request = route.request();
      if (request.resourceType() === 'image' && new URL(request.url()).origin !== origin) {
        return route.fulfill({ contentType: 'image/svg+xml', body: sampleImage });
      }
      return route.continue();
    });
    await use(page);
  },
});

export { expect };
