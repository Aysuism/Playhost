import { useContext } from 'react';
import WishlistCard from '../../components/WishlistCard';
import { LangContext } from '../../context/LangContext';
import { useServerWishlist } from '../../hooks/useServerWishlist';

const FavProducts = () => {
  const { items } = useServerWishlist();
  const { lang } = useContext(LangContext);

  const favItems = items.map(item => ({
    ...item,
    id: item._id,
    price: item.discountIndicator ? item.discountedPrice : item.originalPrice,
    gameCategory: typeof item.gameCategory === 'object'
      ? item.gameCategory?.category
      : item.gameCategory || (lang === 'AZ' ? 'Ümumi' : 'General'),
  }));

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
            <h1>{lang === 'AZ' ? 'Istək Siyahınız Boşdur!' : 'Your WishList is empty!'}</h1>
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