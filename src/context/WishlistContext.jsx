import React, { createContext, useContext, useEffect, useState } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('aariwork_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('aariwork_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlist]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 2800);
  };

  const addToWishlist = (item) => {
    setWishlist(prev => {
      if (prev.some(i => i.id === item.id)) return prev;
      showNotification(`Added "${item.title}" to your wishlist`);
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist(prev => {
      const removed = prev.find(i => i.id === id);
      if (removed) {
        showNotification(`Removed "${removed.title}" from wishlist`);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const toggleWishlist = (item) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  const isInWishlist = (id) => {
    return wishlist.some(i => i.id === id);
  };

  const clearWishlist = () => {
    setWishlist([]);
    showNotification('Wishlist cleared');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        notification
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
