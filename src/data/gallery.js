import { getGalleryCategories } from '../utils/gallery';

// Add one object below per artwork. Only id, title, and image are required.
// image/thumbnail accept a direct HTTPS URL or a path relative to public/.
// Optional: category, description, titleEn, descriptionEn, artistName, artistUrl, scene.
// Categories appear automatically; keep each id unique.
export const galleryPageSize = 9;

const artworkEntries = [
  {
    id: 'reference',
    title: 'A little introduction',
    category: 'Reference Sheet',
    image:
      'https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/684982716_2796708414016410_2383951288832859539_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1348&ctp=s2048x1348&_nc_cat=111&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=bhwy6e5hftsQ7kNvwHAve3x&_nc_oc=AdpnFkLhRtMwq6zpBKdH73mLrJ3Gh_C42qJjZRiGFQU4qdPWHXkXUo2oiSJoYaecdYU&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=IeupiYeGSdA3xnJrWwMxQw&_nc_ss=7b2a8&oh=00_AQRy97lS5PNs0EG9ZcbVxJF2ykx6CDpd_v3sR5Kh333BIQ&oe=6B005EB9',
    description:
      'Một góc dành cho reference sheet của Blubber. Minh họa SVG mẫu, chưa phải thiết kế nhân vật chính thức.',
    artistName: '',
    artistUrl: '',
    scene: 'reference',
  },
  {
    id: 'ocean-hug',
    title: 'An ocean-sized hug',
    category: 'Full Body',
    image: '',
    description: 'Chỗ dành cho tranh toàn thân. Minh họa cá voi mẫu của website.',
    artistName: '',
    artistUrl: '',
    scene: 'hug',
  },
  {
    id: 'sunny-smile',
    title: 'Just keep smiling',
    category: 'Headshots',
    image: '',
    description: 'Một nụ cười nhỏ cho ngày của bạn. Minh họa mẫu, chờ artwork của Blubber.',
    artistName: '',
    artistUrl: '',
    scene: 'smile',
  },
  {
    id: 'star-collector',
    title: 'Among the little stars',
    category: 'Commissions',
    image: '',
    description:
      'Góc nhỏ chờ những bức commission được chủ nhân bổ sung. Chưa có nghệ sĩ được ghi nhận.',
    artistName: '',
    artistUrl: '',
    scene: 'stars',
  },
  {
    id: 'quiet-day',
    title: 'A slow day at the harbor',
    category: 'Other Artwork',
    image: '',
    description: 'Minh họa mẫu với những con sóng êm đềm của bến cảng.',
    artistName: '',
    artistUrl: '',
    scene: 'harbor',
  },
  {
    id: 'hello-friend',
    title: 'Hello, little friend!',
    category: 'Headshots',
    image: '',
    description: 'Một lời chào từ cá voi. Minh họa mẫu, chưa phải artwork chính thức.',
    artistName: '',
    artistUrl: '',
    scene: 'friend',
  },
];

export const gallery = artworkEntries.map((artwork) => ({
  image: '',
  description: '',
  artistName: '',
  artistUrl: '',
  scene: 'hug',
  ...artwork,
  category: artwork.category?.trim() || 'Other Artwork',
}));

export const galleryCategories = getGalleryCategories(gallery);
