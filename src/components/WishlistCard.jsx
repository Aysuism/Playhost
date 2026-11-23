import { useContext } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { LangContext } from '../context/LangContext'
import { useServerWishlist } from '../hooks/useServerWishlist'
import { useServerCart } from '../hooks/useServerCart'
import { notify } from '../hooks/useNotify'

const WishlistCard = ({ wishListData }) => {
    const { lang } = useContext(LangContext)
    const { removeWishlistItem } = useServerWishlist()
    const { addItem } = useServerCart()

    const addToCart = async () => {
        const ok = await addItem(wishListData);
        if (ok) {
            notify.success('Məhsul əlavə edildi', 'Product added');
        }
    };

    return (
        <div className="wishlist-box">
            <div className="row d-flex align-items-center g-3">
                <div className="col-lg-3 col-md-6 col-sm-12">
                    <img src={`http://localhost:3333/${wishListData.imageUrl?.[0]}`} alt={wishListData.gameName} />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="details">
                        <h3>{wishListData.gameName}</h3>
                        <h5>Category:{wishListData.gameCategory}</h5>
                        <div className='price'>
                            <span className='original-price'>$ {wishListData.originalPrice}</span>
                            <span className='discounted-price'>
                                {wishListData.discountedPrice ? <span>$ {wishListData.discountedPrice}</span> : null}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-12 col-sm-12 text-center">
                    <button className='add-cart-btn' onClick={addToCart}>
                        {lang === 'AZ' ? 'Səbətə əlavə et' : 'Add To Cart'}
                    </button>
                    <button
                        className="trash-can"
                        onClick={() => removeWishlistItem(wishListData.id).catch(() => { })}
                        aria-label={lang === 'AZ' ? 'Sil' : 'Delete'}
                    >
                        <FaRegTrashAlt />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default WishlistCard