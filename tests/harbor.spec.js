import { expect, test } from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import { socials } from '../src/data/socials';
import { safeExternalUrl } from '../src/data/character';
import { gallery, galleryPageSize } from '../src/data/gallery';

test('all harbor stops render without client errors or broken images', async ({
  page,
  baseURL,
}) => {
  const base = new URL(baseURL);
  const errors = [];
  const invalidAssetPaths = [];
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (url.origin === base.origin && !url.pathname.startsWith(base.pathname)) {
      invalidAssetPaths.push(url.pathname);
    }
  });
  page.on('response', (response) => {
    if (new URL(response.url()).origin === base.origin && response.status() >= 400) {
      errors.push(`${response.status()} ${response.url()}`);
    }
  });
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.goto('');
  expect(invalidAssetPaths).toEqual([]);
  await expect(page).toHaveTitle('Blubber The Harbor | Whale Fursona Portfolio');
  await expect(page.locator('main section')).toHaveCount(6);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Blubber');
  await expect(page.locator('.whale-button').getByRole('img')).toBeVisible();
  for (const image of await page.locator('img').all()) await image.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator('img')
        .evaluateAll((images) =>
          images
            .filter((img) => !img.complete || img.naturalWidth === 0)
            .map((img) => img.currentSrc),
        ),
    )
    .toEqual([]);
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  expect(invalidAssetPaths).toEqual([]);
  expect(errors).toEqual([]);
});

test('character, lighthouse, bubbles, and treasure cards respond to visitors', async ({ page }) => {
  await page.goto('');
  await page.getByRole('button', { name: 'Chào Blubber — chạm để nhận một lời chào' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Blub blub!' })).toBeVisible();
  const bubble = page.getByRole('button', { name: 'Làm vỡ bong bóng 1', exact: true });
  await bubble.click({ force: true });
  await expect(bubble).toBeDisabled();
  const light = page.getByRole('button', { name: 'Bật hoặc tắt đèn hải đăng' });
  await light.click();
  await expect(light).toHaveAttribute('aria-pressed', 'true');
  await expect(
    page.getByRole('status').filter({ hasText: 'Một đốm sáng nhỏ dẫn bạn về nhà.' }),
  ).toBeVisible();
  const detail = page.getByRole('button', { name: 'Kể thêm một chút' }).first();
  await detail.click();
  await expect(
    page.getByText('Không sầu riêng, ít xương, ít ngọt.', { exact: false }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Thu gọn một chút' }).click();
  await expect(page.locator('#interest-food')).toBeHidden();
});

test('gallery filtering and lightbox support keyboard navigation and restore focus', async ({
  page,
}) => {
  await page.goto('');
  await page.getByRole('button', { name: 'Chân dung', exact: true }).click();
  await expect(page.locator('.gallery-card')).toHaveCount(
    Math.min(galleryPageSize, gallery.filter((artwork) => artwork.category === 'Headshots').length),
  );
  await page.getByRole('button', { name: 'Tất cả', exact: true }).click();
  await expect(page.locator('.gallery-card')).toHaveCount(
    Math.min(galleryPageSize, gallery.length),
  );
  const opener = page.getByRole('button', { name: 'Xem A little introduction', exact: true });
  await opener.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('button', { name: 'Đóng ảnh', exact: true })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('button', { name: 'Ảnh tiếp theo', exact: true })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Đóng ảnh', exact: true })).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(dialog.getByRole('heading')).toHaveText('An ocean-sized hug');
  await page.keyboard.press('ArrowLeft');
  await expect(dialog.getByRole('heading')).toHaveText('A little introduction');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
});

test('navigation reaches a section and mobile menu closes', async ({ page }, testInfo) => {
  await page.goto('');
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Mở menu', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Đóng menu', exact: true })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  }
  await page.getByRole('navigation').getByRole('link', { name: 'Art Harbor', exact: true }).click();
  await expect(page).toHaveURL(/#art-harbor$/);
  await expect(
    page
      .getByRole('navigation')
      .getByRole('link', { name: 'Art Harbor', exact: true, includeHidden: true }),
  ).toHaveAttribute('aria-current', 'location');
  if (testInfo.project.name === 'mobile')
    await expect(page.getByRole('button', { name: 'Mở menu', exact: true })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
});

test('page stays within viewport at narrow widths and reduced motion is respected', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('');
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
  }
  expect(
    await page.locator('.whale-float').evaluate((el) => getComputedStyle(el).animationName),
  ).toBe('none');
  expect(await page.locator('html').evaluate((el) => getComputedStyle(el).scrollBehavior)).toBe(
    'auto',
  );
  const configuredUrls = socials.map((social) => safeExternalUrl(social.url)).filter(Boolean);
  await expect(page.locator('.social-grid a')).toHaveCount(configuredUrls.length);
  expect(
    await page.locator('.social-grid a').evaluateAll((links) => links.map((link) => link.href)),
  ).toEqual(configuredUrls);
});

test('visible page and gallery dialog have no automated WCAG A/AA violations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('');
  for (const item of await page.locator('.reveal').all()) {
    await item.scrollIntoViewIfNeeded();
    await expect(item).toHaveCSS('opacity', '1');
  }
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);
  await page.getByRole('button', { name: 'Xem A little introduction', exact: true }).click();
  const dialogResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(dialogResults.violations).toEqual([]);
});
