import { test, expect } from './fixtures';
import { getArtworkText, getGalleryCategories } from '../src/utils/gallery';

test('large viewer zooms, fits the image, expands, and resets zoom on navigation', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('');
  const opener = page.getByRole('button', { name: 'Xem A little introduction', exact: true });
  await opener.click();
  const dialog = page.getByRole('dialog');
  await expect(page.locator('.lightbox-zoom-level')).toHaveText('100%');
  await expect(page.getByRole('button', { name: 'Thu nhỏ ảnh', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Phóng to ảnh', exact: true }).click();
  await expect(page.locator('.lightbox-zoom-level')).toHaveText('150%');
  expect(
    await page
      .locator('.lightbox-viewport')
      .evaluate((frame) => frame.scrollWidth > frame.clientWidth),
  ).toBe(true);
  const expand = page.getByRole('button', { name: 'Mở rộng khung xem ảnh', exact: true });
  await expand.click();
  await expect(expand).toHaveAttribute('aria-pressed', 'true');
  await expect(dialog).toHaveClass(/is-expanded/);
  await page.getByRole('button', { name: 'Vừa khung ảnh', exact: true }).click();
  await expect(page.locator('.lightbox-zoom-level')).toHaveText('100%');
  await page.getByRole('button', { name: 'Phóng to ảnh', exact: true }).click();
  await page.getByRole('button', { name: 'Ảnh tiếp theo', exact: true }).click();
  await expect(dialog.getByRole('heading')).toHaveText('An ocean-sized hug');
  await expect(page.locator('.lightbox-zoom-level')).toHaveText('100%');
  await page.keyboard.press('Escape');
  await expect(opener).toBeFocused();
});

test('viewer controls stay within a narrow viewport and translated controls work', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 850 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('');
  await page.getByRole('button', { name: 'Đổi ngôn ngữ / Switch language' }).click();
  await page.getByRole('button', { name: 'View A little introduction', exact: true }).click();
  await page.getByRole('button', { name: 'Zoom in', exact: true }).click();
  await expect(page.locator('.lightbox-zoom-level')).toHaveText('150%');
  expect(
    await page.locator('.lightbox').evaluate((dialog) => dialog.scrollWidth <= dialog.clientWidth),
  ).toBe(true);
  await expect(page.getByRole('button', { name: 'Close artwork', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Expand artwork viewer', exact: true }).click();
  expect(
    await page.locator('.lightbox').evaluate((dialog) => dialog.scrollWidth <= dialog.clientWidth),
  ).toBe(true);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
});

test('extra categories and per-artwork translations need no component edits', () => {
  expect(
    getGalleryCategories([{ category: 'Sketchbook' }, { category: 'Sketchbook' }, {}]),
  ).toEqual(['All Artwork', 'Sketchbook', 'Other Artwork']);
  const artwork = { title: 'Một ngày ở biển', titleEn: 'A day by the sea', description: '' };
  expect(getArtworkText(artwork, 'title', 'en', (value) => value)).toBe('A day by the sea');
  expect(getArtworkText(artwork, 'title', 'vi', (value) => value)).toBe('Một ngày ở biển');
});
