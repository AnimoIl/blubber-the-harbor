export const character = {
  name: 'Blubber The Harbor',
  // Paste a direct HTTPS image URL, or keep a path relative to public/.
  images: {
    hero: 'images/blubber/hero.png',
    profile: 'images/blubber/profile.png',
    story: 'images/blubber/story.png',
  },
  nicknames: 'Ú, Cá Mập',
  species: 'Whale · Cá voi',
  weight: '~90 kg (tùy bữa ăn!)',
  occupation: 'Food & Beverage Department',
  tagline: 'A Little Whale, A Whole Ocean of Warmth',
  welcome:
    'Chào mừng đến với bến cảng nhỏ của Blubber — nơi một chú cá voi mũm mĩm luôn sẵn sàng mang đến nụ cười, những câu chuyện và một chút bình yên giữa đại dương đầy rẫy giông tố này.',
  personality:
    'Một chiếc cá voi mũm mĩm, một nụ cười thật tươi và một chiếc bụng đầy năng lượng tích cực. Blubber thích giúp đỡ mọi người, thích làm ai đó vui lên, và luôn dành chỗ cho bạn ở bến cảng nhỏ này.',
  origin:
    'Ngày ấy, khi đang tìm một biệt danh cho mình, mình tình cờ bắt gặp “Blubber” trong từ điển. Đó là tên gọi lớp mỡ dày của các loài thú biển như cá voi. Nghe vừa ngộ nghĩnh vừa đáng yêu quá, thế là cái tên ở lại với mình đến tận bây giờ!',
};

export const harborStops = [
  { id: 'the-dock', label: 'The Dock' },
  { id: 'captains-log', label: 'Captain’s Log' },
  { id: 'treasure-cove', label: 'Treasure Cove' },
  { id: 'starry-waters', label: 'Starry Waters' },
  { id: 'art-harbor', label: 'Art Harbor' },
  { id: 'message-in-a-bottle', label: 'Message in a Bottle' },
];

export const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
// Build-time inventory prevents unnecessary requests for artwork that has not been added.
export const hasImage = (path) => __HARBOR_IMAGES__.includes(path);

export function safeExternalUrl(value) {
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
