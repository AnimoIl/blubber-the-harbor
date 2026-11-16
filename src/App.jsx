import { MotionConfig } from 'motion/react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import InterestsSection from './sections/InterestsSection';
import StorySection from './sections/StorySection';
import GallerySection from './sections/GallerySection';
import ContactSection from './sections/ContactSection';
import useOceanMode from './hooks/useOceanMode';
import useLanguage from './hooks/useLanguage';

export default function App() {
  const { mode, toggleMode } = useOceanMode();
  const { t } = useLanguage();
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main-content">
        {t('Bỏ qua menu, đến nội dung')}
      </a>
      <Navbar oceanMode={mode} onToggleOceanMode={toggleMode} />
      <main id="main-content">
        <HeroSection oceanMode={mode} />
        <AboutSection />
        <InterestsSection />
        <StorySection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </MotionConfig>
  );
}
