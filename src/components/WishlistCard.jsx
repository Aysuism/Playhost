import React from 'react'
import { useContext } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { useCart } from 'react-use-cart'
import { useWishlist } from 'react-use-wishlist'
import Swal from 'sweetalert2'
import { LangContext } from '../context/LangContext'

const WishlistCard = ({ wishListData }) => {
    const { lang } = useContext(LangContext)
    const { removeWishlistItem } = useWishlist()
    const { addItem } = useCart()

    const addToCart = () => {
        addItem(wishListData)
        Swal.fire({
            title: lang === 'AZ' ? 'Məhsul əlavə edildi' : 'Product added',
            icon: "success"
        })
    }
    console.log(wishListData);

    return (
        <div className="wishlist-box">
            <div className="row d-flex align-items-center g-3">
                <div className="col-lg-3 col-md-6 col-sm-12">
                    <img src={`https://playhost-backend.onrender.com/${wishListData.imageUrl}`} alt={wishListData.title} />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="details">
                        <h3>{wishListData.gameName}</h3>
                        <h5>Category:{wishListData.gameCategory}</h5>
                        <div className='price'>
                            <span>$ {wishListData.originalPrice} </span>
                            $ {wishListData.discountedPrice}
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-12 col-sm-12 text-center">
                    <button className='add-cart-btn' onClick={addToCart}>
                        {lang === 'AZ' ? 'Səbətə əlavə et' : 'Add To Cart'}
                    </button>
                    <button
                        className="trash-can"
                        onClick={() => { removeWishlistItem(wishListData.id) }}
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