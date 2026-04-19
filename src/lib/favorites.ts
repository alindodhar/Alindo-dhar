/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const toggleFavorite = (item: { id: string | number; title: string; type: string }) => {
  const saved = localStorage.getItem('clicker_favorites');
  let favorites = saved ? JSON.parse(saved) : [];
  
  const exists = favorites.find((f: any) => f.id === item.id);
  
  if (exists) {
    favorites = favorites.filter((f: any) => f.id !== item.id);
  } else {
    favorites.push({
      ...item,
      date: new Date().toLocaleDateString()
    });
  }
  
  localStorage.setItem('clicker_favorites', JSON.stringify(favorites));
  return !exists;
};

export const isFavorited = (id: string | number) => {
  const saved = localStorage.getItem('clicker_favorites');
  const favorites = saved ? JSON.parse(saved) : [];
  return !!favorites.find((f: any) => f.id === id);
};
