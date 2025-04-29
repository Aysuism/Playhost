import React from 'react';
import SingleCard from '../../components/SingleCard';
import { useContext } from 'react';
import { LangContext } from '../../context/LangContext';

const Products = ({ keyword, filtered, selectedCategory, games, sortOption }) => {
    const { lang } = useContext(LangContext)
    const gamesWithDiscount = games.map((game) => {
        const discountPercentage = game.discountIndicator
            ? Math.round(((game.originalPrice - game.discountedPrice) / game.originalPrice) * 100)
            : 0;

        return {
            ...game,
            discountPercentage,
        };
    });

    const filteredProducts = filtered.length > 0
        ? filtered
        : gamesWithDiscount.filter((game) => {
            const matchesKeyword = game.gameName.toLowerCase().includes(keyword.toLowerCase());

            // Filter by category
            let matchesCategory = true;
            if (selectedCategory) {
                if (typeof game.gameCategory === 'object' && game.gameCategory !== null) {
                    matchesCategory = game.gameCategory.categoryId === selectedCategory;
                } else {
                    matchesCategory = game.gameCategory === selectedCategory;
                }
            }

            return matchesKeyword && matchesCategory;
        });

    return (
        <section className="products">
            {filteredProducts.length > 0 && (
                <div className="mb-3 text-light">
                   {lang==='AZ'?'Oyunların Sayı: ':'Number of Games: '} {filteredProducts.length}
                </div>
            )}
            <div className="row g-5">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item) => (
                        <SingleCard key={item._id} alldata={item} />
                    ))
                ) : (
                    <div className="col-12 text-center py-5">
                        <h4>No games found matching your criteria</h4>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Products;