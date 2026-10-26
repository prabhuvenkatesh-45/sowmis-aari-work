import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { WishlistProvider, useWishlist } from './context/WishlistContext';
import './App.css';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/common/CustomCursor';
import PageLoader from './components/common/PageLoader';
import WhatsAppButton from './components/common/WhatsAppButton';
import WishlistDrawer from './components/common/WishlistDrawer';

// Pages
import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionsPage';
import CustomOrderPage from './pages/CustomOrderPage';
import AboutPage from './pages/AboutPage';
import WishlistPage from './pages/WishlistPage';

// Scroll to top or targeted anchor helper on route change
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

// Wishlist Toast Consumer Component
const GlobalToast = () => {
  const { notification } = useWishlist();
  if (!notification) return null;

  return (
    <div className="wishlist-toast" role="status">
      <span style={{ color: 'var(--gold-primary)', fontSize: '1.1rem' }}>✦</span>
      <span>{notification}</span>
    </div>
  );
};

function AppContent() {
  const [loaderComplete, setLoaderComplete] = useState(() => {
    // Check if user already saw the loader in this session
    return Boolean(sessionStorage.getItem('aariwork_intro_viewed'));
  });

  const handleLoaderFinish = () => {
    setLoaderComplete(true);
    sessionStorage.setItem('aariwork_intro_viewed', 'true');
  };

  return (
    <div className="aari-app">
      {/* 1. Page Load Stitching Animation */}
      {!loaderComplete && <PageLoader onComplete={handleLoaderFinish} />}

      {/* 2. Custom Aari Needle & Thread Cursor */}
      <CustomCursor />

      {/* 3. Global Toast Notifications */}
      <GlobalToast />

      {/* 4. Global Wishlist Slide-out Drawer */}
      <WishlistDrawer />

      {/* 5. Sticky Navbar */}
      <Navbar />

      {/* 6. Main Routing */}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/custom-order" element={<CustomOrderPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>

      {/* 7. Footer */}
      <Footer />

      {/* 8. Floating WhatsApp Interactive Button */}
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <WishlistProvider>
        <Router>
          <AppContent />
        </Router>
      </WishlistProvider>
    </ThemeProvider>
  );
}

export default App;
