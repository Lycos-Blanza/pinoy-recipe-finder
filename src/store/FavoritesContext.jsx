import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  // Load favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  // Sync favorites with localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add/remove a recipe (toggle)
  const toggleFavorite = (recipe) => {
    setFavorites((prev) => {
      const exists = prev.some((r) => r.id === recipe.id);
      return exists
        ? prev.filter((r) => r.id !== recipe.id)
        : [...prev, recipe];
    });
  };

  // Remove a recipe by id (used in Favorites page)
  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((r) => r.id !== id));
  };

  // Check if a recipe is already in favorites
  const isFavorite = (id) => favorites.some((r) => r.id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  return useContext(FavoritesContext);
}
