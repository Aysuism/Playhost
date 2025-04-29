import React from 'react'
import { useCart } from 'react-use-cart'
import { LangContext } from '../../context/LangContext'
import { useContext } from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { FaRegTrashAlt } from 'react-icons/fa'
import { BsCart4 } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Basket = ({ isOpen, togglePanel }) => {
  const { isEmpty, items, updateItemQuantity, removeItem, cartTotal, emptyCart } = useCart()
  const { lang } = useContext(LangContext)
  const navigate = useNavigate();


  return (
    <>
      <div className={`overlay ${isOpen ? "show" : ""}`} onClick={togglePanel}></div>

      <section className={`basket ${isOpen ? "open" : ""}`}>
        <div className="cart-title">
          <h2>
            {lang === 'AZ' ? 'Səbətiniz' : 'Your Cart'}
            <BsCart4 className='cart-icon' />
          </h2>
          <IoMdCloseCircleOutline onClick={togglePanel} className='close-btn' />
        </div>

        {/* ---------------------------- If Cart is Empty ------------------------ */}

        {isEmpty ? <div className='d-flex justify-content-center align-items-center flex-column'>
          <div className="gojo-gif"></div>
          <h4 className='pt-5'>Your Cart is Empty!</h4>
        </div> :

          //  ---------------------------- If Cart is Empty ------------------------ 


          < div className="container p-0">
            {items.map((item, count) => (
              <div className="cart-item" key={count}>
                <div className="row">
                  <div className="col-md-4 col-sm-4">
                    <img src={`https://playhost-backend.onrender.com/${item.imageUrl}`} alt="" />
                  </div>
                  <div className="col-md-8 col-sm-8">
                    <div className="text">
                      <h4>{item.gameName}</h4>

                      <button className='quantity-btn' onClick={() => updateItemQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                      <span className='quantity'>{item.quantity}</span>
                      <button className='quantity-btn' onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>

                      <div className="price">$ {Math.round(item.price * item.quantity)}</div>
                      <button className='trash-can' onClick={() => { removeItem(item.id) }}><FaRegTrashAlt /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="total">
              <h3>{lang === "AZ" ? "Yekun Qiymət" : "Total price:"} ${Math.round(cartTotal)}</h3>
              <button
                className="checkout-btn"
                onClick={() => {
                  togglePanel();
                  navigate('/checkout');
                }}
                >
                {lang === "AZ" ? "Ödənişə Keç" : "Check Out"}
              </button>

              <button className='emptyall' onClick={emptyCart}>{lang === "AZ" ? "Səbəti Boşalt" : "Clear all"}</button>
            </div>
          </div>
        }
      </section >
    </>
  )
}

export default Basket