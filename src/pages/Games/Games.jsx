import React, { useState } from 'react'
import Hero from './Hero';
import CategoryBtn from './CategoryBtn';
import Products from './Products';
import { useGetGamesQuery } from '../../dashboard/tools/api/games';

const GameServer = () => {
  const { data: games = [] } = useGetGamesQuery();

  const [keyword, setKeyword] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOption, setSortOption] = useState('default'); // New state for sorting

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const resetCategory = () => {
    setSelectedCategory(null);
  };

  // New function to handle sorting
  const handleSort = (option) => {
    setSortOption(option);
  };

  // Sort the games based on the selected option
  const sortedGames = games ? [...games] : [];
  switch (sortOption) {
    case 'rating-high':
      sortedGames.sort((a, b) => b.rating - a.rating);
      break;
    case 'price-low':
      sortedGames.sort((a, b) => (a.discountedPrice || a.originalPrice) - (b.discountedPrice || b.originalPrice));
      break;
    case 'price-high':
      sortedGames.sort((a, b) => (b.discountedPrice || b.originalPrice) - (a.discountedPrice || a.originalPrice));
      break;
    case 'discount-high':
      sortedGames.sort((a, b) => {
        const discountA = a.discountIndicator ? ((a.originalPrice - a.discountedPrice) / a.originalPrice) * 100 : 0;
        const discountB = b.discountIndicator ? ((b.originalPrice - b.discountedPrice) / b.originalPrice) * 100 : 0;
        return discountB - discountA;
      });
      break;
    case 'name-asc':
      sortedGames.sort((a, b) => a.gameName.localeCompare(b.gameName));
      break;
    case 'name-desc':
      sortedGames.sort((a, b) => b.gameName.localeCompare(a.gameName));
      break;
    default:
      // No sorting or default sorting
      break;
  }

  return (
    <section className="game-servers">
      <Hero value={keyword} setKeyword={setKeyword} />
      <CategoryBtn
        selectCategory={handleCategorySelect}
        resetCategory={resetCategory}
        activeCategory={selectedCategory}
        handleSort={handleSort} // Pass the sort function
        sortOption={sortOption} // Pass the current sort option
      />
      <Products
        keyword={keyword}
        filtered={filteredGames}
        selectedCategory={selectedCategory}
        games={sortedGames} // Pass the sorted games
      />
    </section>
  )
}

export default GameServer;