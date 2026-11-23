export function getGalleryCategories(artworks) {
  return [
    'All Artwork',
    ...new Set(artworks.map((artwork) => artwork.category || 'Other Artwork')),
  ];
}

export function getArtworkText(artwork, field, language, translate) {
  const english = language === 'en' ? artwork[`${field}En`] : '';
  return english || translate(artwork[field]);
}
