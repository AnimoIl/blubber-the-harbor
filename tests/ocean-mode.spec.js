import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const toggleName = 'Chế độ đại dương ban đêm';

test('keyboard toggle changes the ocean and remembers the selected mode', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await page.goto('');
  const toggle = page.getByRole('button', { name: toggleName });
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await toggle.focus();
  await page.keyboard.press('Space');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('html')).toHaveAttribute('data-ocean-mode', 'night');
  await expect(page.locator('.ocean-moon')).toHaveCSS('opacity', '1');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#102b41');
  await expect(page.locator('.hero-section .ocean-waves path').first()).toHaveCSS(
    'fill',
    'rgb(16, 43, 65)',
  );
  await expect(page.getByRole('button', { name: 'Bật hoặc tắt đèn hải đăng' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.locator('.lighthouse-message')).toBeEmpty();
  const lighthouse = page.getByRole('button', { name: 'Bật hoặc tắt đèn hải đăng' });
  await lighthouse.click();
  await expect(lighthouse).toHaveAttribute('aria-pressed', 'false');
  await lighthouse.click();
  await expect(lighthouse).toHaveAttribute('aria-pressed', 'true');
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await expect(toggle).toBeVisible();
  }
  await page.reload();
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await page.reload();
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#B9F0FA');
});

test('follows the device theme until the visitor chooses a mode', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.goto('');
  const toggle = page.getByRole('button', { name: toggleName });
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await toggle.click();
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
});

test('mode selection synchronizes across open tabs', async ({ page, context }) => {
  await page.goto('');
  const other = await context.newPage();
  await other.goto('');
  const toggle = page.getByRole('button', { name: toggleName });
  const otherToggle = other.getByRole('button', { name: toggleName });
  await toggle.click();
  await expect(otherToggle).toHaveAttribute('aria-pressed', 'true');
  await otherToggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await other.close();
});

test('toggle still works when browser storage is blocked', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.addInitScript(() => {
    for (const method of ['getItem', 'setItem']) {
      Object.defineProperty(Storage.prototype, method, {
        value() {
          throw new DOMException('Storage unavailable', 'SecurityError');
        },
      });
    }
  });
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await page.goto('');
  const toggle = page.getByRole('button', { name: toggleName });
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  expect(errors).toEqual([]);
});

test('night mode preserves accessible content and gallery controls', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.goto('');
  await expect(page.getByRole('button', { name: toggleName })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  for (const item of await page.locator('.reveal').all()) {
    await item.scrollIntoViewIfNeeded();
    await expect(item).toHaveCSS('opacity', '1');
  }
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);
  await page.getByRole('button', { name: 'Xem A little introduction', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  const dialogResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(dialogResults.violations).toEqual([]);
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('dialog').getByRole('heading')).toHaveText('An ocean-sized hug');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
});
