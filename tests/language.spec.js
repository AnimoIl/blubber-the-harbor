import { expect, test } from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import { character } from '../src/data/character';
import { interests } from '../src/data/interests';
import { gallery, galleryPageSize } from '../src/data/gallery';
import { socials } from '../src/data/socials';
import { translate } from '../src/data/translations';

const languageButton = 'Đổi ngôn ngữ / Switch language';

test('language switching translates content and preserves ocean, filters, and expanded cards', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('');
  await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
  await expect(page.locator('body')).not.toContainText(/cá mập voi/i);
  await page.getByRole('button', { name: 'Chế độ đại dương ban đêm' }).click();
  await page.getByRole('button', { name: 'Kể thêm một chút' }).first().click();
  await page.getByRole('button', { name: 'Chân dung', exact: true }).click();
  await expect(page.locator('.gallery-card')).toHaveCount(
    Math.min(galleryPageSize, gallery.filter((artwork) => artwork.category === 'Headshots').length),
  );
  await page.getByRole('button', { name: languageButton }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('body')).not.toContainText(/whale shark/i);
  await expect(page.locator('.profile-facts')).toContainText('Whale');
  await expect(page.locator('.hero-description')).toContainText('amid this stormy ocean');
  await expect(page.locator('.hero-description')).toContainText(
    'Welcome to Blubber’s little harbor',
  );
  await expect(page.locator('.origin-note p')).toContainText('dictionary');
  await expect(page.getByRole('button', { name: 'Night ocean mode' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.getByRole('button', { name: 'Headshots', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.getByRole('button', { name: 'A little less', exact: true })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await expect(page.locator('#interest-food')).toContainText('No durian');
  await expect(page.locator('.gallery-card')).toHaveCount(
    Math.min(galleryPageSize, gallery.filter((artwork) => artwork.category === 'Headshots').length),
  );
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'en_US');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /Visit the world of Blubber/,
  );
  await page.getByRole('button', { name: languageButton }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
  await expect(page.getByRole('button', { name: 'Chân dung', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.getByRole('button', { name: 'Thu gọn một chút', exact: true })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'vi_VN');
});

test('English persists and an open lightbox responds to changes from another tab', async ({
  page,
  context,
}) => {
  await page.goto('');
  await page.getByRole('button', { name: languageButton }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  const other = await context.newPage();
  await other.goto('');
  await expect(other.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('button', { name: 'View A little introduction', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText(
    'This sample SVG is not the official character design.',
  );
  await other.getByRole('button', { name: languageButton }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog')).toContainText('chưa phải thiết kế nhân vật chính thức');
  await expect(page.getByRole('button', { name: 'Đóng ảnh', exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(
    page.getByRole('button', { name: 'Xem A little introduction', exact: true }),
  ).toBeFocused();
  await other.close();
});

test('English remains accessible in day and night, including gallery keyboard controls', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('');
  await page.getByRole('button', { name: languageButton }).click();
  for (const mode of ['day', 'night']) {
    if (mode === 'night') await page.getByRole('button', { name: 'Night ocean mode' }).click();
    for (const item of await page.locator('.reveal').all()) {
      await item.scrollIntoViewIfNeeded();
      await expect(item).toHaveCSS('opacity', '1');
    }
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
    await page.getByRole('button', { name: 'View A little introduction', exact: true }).click();
    const dialogResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(dialogResults.violations).toEqual([]);
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('dialog').getByRole('heading')).toHaveText('An ocean-sized hug');
    await page.keyboard.press('Escape');
  }
});

test('both languages keep navigation controls separate at narrow widths', async ({ page }) => {
  await page.goto('');
  for (const language of ['vi', 'en']) {
    if (language === 'en') await page.getByRole('button', { name: languageButton }).click();
    for (const width of [320, 375, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await expect(page.getByRole('button', { name: languageButton })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      const fits = await page.evaluate(() => {
        const brand = document.querySelector('.navbar .brand').getBoundingClientRect();
        const controls = document.querySelector('.nav-controls').getBoundingClientRect();
        const nav = document.querySelector('.navbar').getBoundingClientRect();
        return brand.right <= controls.left && controls.right <= nav.right;
      });
      expect(fits).toBe(true);
    }
  }
});

test('language toggle works with blocked storage and content data has English translations', async ({
  page,
}) => {
  await page.addInitScript(() => {
    for (const method of ['getItem', 'setItem'])
      Object.defineProperty(Storage.prototype, method, {
        value() {
          throw new DOMException('Blocked', 'SecurityError');
        },
      });
  });
  await page.goto('');
  await page.getByRole('button', { name: languageButton }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('.hero-description')).toContainText('little harbor');
  const content = [
    character.welcome,
    character.personality,
    character.origin,
    character.species,
    character.weight,
    ...interests.flatMap((item) => [item.eyebrow, item.description, item.details, ...item.tags]),
    ...gallery.filter((item) => !item.descriptionEn).map((item) => item.description),
    ...socials.map((item) => item.label),
  ];
  for (const source of content.filter((text) => /[\u00c0-\u024f\u1e00-\u1eff]/i.test(text))) {
    expect(translate(source, 'en'), `Missing English translation: ${source}`).not.toBe(source);
  }
});
