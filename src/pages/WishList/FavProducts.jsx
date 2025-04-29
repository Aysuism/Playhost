import React, { useContext } from 'react';
import WishlistCard from '../../components/WishlistCard';
import { useWishlist } from 'react-use-wishlist';
import { LangContext } from '../../context/LangContext';
import { Link } from 'react-router-dom';
import { FaHeartBroken } from 'react-icons/fa';

const FavProducts = () => {
  const { items } = useWishlist();
  const { lang } = useContext(LangContext);

  const favItems = items.map(item => ({
    ...item,
    gameCategory: typeof item.gameCategory === 'object'
      ? item.gameCategory?.category
      : item.gameCategory || (lang === 'AZ' ? 'Ümumi' : 'General'),
  })).filter((item, index, self) =>
    index === self.findIndex(t => t.id === item.id)
  );

  return (
    <section className="fav-items py-5">
      <div className="container">
        <div className="section-header mb-4">
          <h1 className="display-5 fw-bold">
            {lang === 'AZ' ? 'İstək Siyahısı' : 'Wishlist'}
          </h1>
        </div>

        {favItems.length === 0 ? (
          <div className="empty-wishlist text-center py-5">
            <img src='/no_wish_list-removebg-preview.png' alt="no-item" />
            <h1>{lang==='AZ'?'Istək Siyahınız Boşdur!':'Your WishList is empty!'}</h1>
          </div>
        ) : (
          <div className="row">
            {favItems.map((item) => (
              <div key={item.id} className="col-md-12">
                <WishlistCard wishListData={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FavProducts;