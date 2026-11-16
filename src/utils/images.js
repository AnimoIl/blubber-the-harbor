import { assetUrl, hasImage, safeExternalUrl } from '../data/character';

export function resolveImageSource(value) {
  if (typeof value !== 'string' || !value.trim()) return '';
  const source = value.trim();
  const remote = safeExternalUrl(source);
  if (remote) return remote;

  const local = source.replace(/^\/+/, '');
  return hasImage(local) ? assetUrl(local) : '';
}
