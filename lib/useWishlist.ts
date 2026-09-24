"use client";

import { useState, useEffect } from "react";

const WISHLIST_STORAGE_KEY = "music_school_wishlist";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load wishlist from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const toggleWishlist = (courseId: number) => {
    setWishlist((prev) => {
      const updated = prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId];
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updated));
        // Dispatch storage event so other components sync instantly
        window.dispatchEvent(new Event("wishlist-updated"));
      } catch (e) {
        console.error("Failed to save wishlist to localStorage", e);
      }
      return updated;
    });
  };

  const isWishlisted = (courseId: number) => wishlist.includes(courseId);

  useEffect(() => {
    const handleSync = () => {
      try {
        const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
        if (stored) {
          setWishlist(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Failed to sync wishlist", e);
      }
    };

    window.addEventListener("wishlist-updated", handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener("wishlist-updated", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  return { wishlist, toggleWishlist, isWishlisted, isLoaded };
}
