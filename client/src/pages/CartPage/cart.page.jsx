import { useState, useEffect, useContext } from 'react';
// Styling
import './cart.page.style.scss';
import '../../scss/products/products.style.scss'
import '../../scss/product-listing/product-listing.style.scss'
// Routing
import { useNavigate } from "react-router-dom";
// Context API
import { MainContext } from '../../context/main-context/main.context';
// Redux
import { connect } from "react-redux";
import * as actions from "../../redux/_actions/actions";

function CartPage ( props ) {

    let { cartItems } = props;

    let { removeFromCartAction, decreaseCartIndexAction, showToastAction, closeToastAction } = props;

    var cartTotal = 0;
    var shopTotal = 0;
      
    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;
    const siteLanguage = mainContext.state.siteLanguage;

    useEffect(() => {

    }, []);

    // Routing
    const navigate = useNavigate();
    const routeChange = ( _id ) => {
        let path = `/collections/${_id}`;
        navigate(path);
    }

    const routeChangeToShopping = () => {
        let path = `/collections`;
        navigate(path);
    }

    const routeChangeToCheckout = () => {
        let path= `/checkout`;
        navigate(path);
    }

    function removeFromCartClick( item ) {
        let newMessage = siteLanguage == "TR" ? "Ürün sepetten çıkarıldı" : "Product has been removed from the cart"
        removeFromCartAction(item);
        decreaseCartIndexAction();
        showToastAction(newMessage);
        setTimeout(closeToastAction, 1000);
    }

    return (
        <>
            {cartItems.length > 0 ? 
                <div id="cartPageContainer">
                    <div id="cartContainer" className={`${darkMode ? "footer-bg-dark" : "footer-bg-light"}`}>
                        <div id="cartGroupHolder">
                            <div id="cartItemGroup">
                                <ul>
                                {cartItems ? 
                                    cartItems.map(item => {
                                    let { __typename, _id, topic, author, brand, title, price, director, year, duration, genre, color, pages, publisher, publishDate, imageUrl, shippingFee, discount } = item;
                                    
                                    let shopPrice = Number(price);
                                    let intPrice = Number(price).toFixed(2)
                                    // Decimal (xx,x)
                                    let newPrice = new Intl.NumberFormat().format(shopPrice);
                                    // İndirim varsa düşür
                                    let discountedPrice = Number(shopPrice - (shopPrice * (discount / 100))).toFixed(2);
                                    // Decimal (xx,x)
                                    let intDiscountedPrice = new Intl.NumberFormat().format(discountedPrice);
                                    let shopDiscountedPrice = Number(discountedPrice);
                                    // Virgülden sonra iki sayıya sabitle
                                    cartTotal = Number((cartTotal + shopDiscountedPrice).toFixed(2));
                                    // Noktayı virgüle çevir, virgülden sonra 2 sayıya sabitle
                                    shopTotal = Number((cartTotal + 9.90).toFixed(2))
                                
                                    return <li className={`cart-item ${darkMode ? "nav-bg-dark" : "bg-light"}`}>
                                        <img src={imageUrl} onClick={() => routeChange(_id)}/>
                                        <div id="cartDetailHolder">
                                            <div id="cartDetailGroup">
                                                <span className='cart-detail-titles cart-detail-topics'>{siteLanguage == "TR" ? "Ürün Adı" : "Product Name"}</span>
                                                <span className='cart-detail-titles cart-detail-topics'>{siteLanguage == "TR" ? "Ürün Fiyatı" : "Product Price"}</span>
                                                <span className='cart-detail-titles cart-detail-topics'>{siteLanguage == "TR" ? "Kaldır" : "Remove"}</span>
                                            </div>
                                            <div id="cartItemDetails">
                                                <span className={`cart-detail-titles ${darkMode ? "theme-btn-light" : "theme-btn-dark"}`}>{title}</span>
                                                <div id="cartItemPriceGroup">
                                                    <span className={`cart-detail-titles ${discount? "cart-detail-price-crossed" : ""} `}>{newPrice} ₺</span>
                                                    {discount ? <span className="cart-detail-titles cart-detail-price-discounted">{intDiscountedPrice} ₺</span> : ""}
                                                </div>
                                                <div onClick={() => removeFromCartClick(item)} className='cart-detail-titles cart-detail-price-remove'>
                                                    x
                                                </div>
                                            </div>
                                        </div>
        
                                    </li>
                                    })
                                : ""}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div id="paymentContainer" className={`${darkMode ? "nav-bg-dark" : "bg-light"}`}>
                        <div id="paymentGroup">
                            <div>
                                <span className={`${darkMode ? "font-dark" : "font-light"}`}>
                                    {siteLanguage == "TR" ? `Sipariş Özeti` : "Order Summary"}
                                </span>
                            </div>
                            <div>
                                <div className='payment-row'>
                                    <span className={`${darkMode ? "theme-btn-light" : "theme-btn-dark"}`}>
                                        {siteLanguage == "TR" ? `Sepet Toplamı: ` : "Cart Total"}
                                    </span>
                                    <span className={`${darkMode ? "theme-btn-light" : "theme-btn-dark"}`}>
                                        {`${new Intl.NumberFormat().format(cartTotal)} ₺`}
                                    </span>
                                </div>
                                <div className='payment-row'>
                                    <span className={`${darkMode ? "font-dark" : "font-light"}`}>
                                        {siteLanguage == "TR" ? `Kargo Ücreti: ` : "Shipping Fee"}
                                    </span>
                                    <span className={`${darkMode ? "font-dark" : "font-light"}`}>
                                        {`9,90 ₺`}
                                    </span>
                                </div>
                                <div className='payment-row'>
                                    <span className={`${darkMode ? "theme-btn-light" : "theme-btn-dark"}`}>
                                        {siteLanguage == "TR" ? `Sipariş Toplamı: ` : "Order Total"}
                                    </span>
                                    <span className={`${darkMode ? "theme-btn-light" : "theme-btn-dark"}`}>
                                        {`${new Intl.NumberFormat().format(shopTotal) } ₺`}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <span className={`${darkMode ? "font-dark" : "font-light"}`}>{siteLanguage == "TR" ? "Sipariş Adresi: " : "Order Address: "}</span>
                                <p className={`order-address ${darkMode ? "theme-btn-light" : "theme-btn-dark"}`}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat ratione ipsam corporis enim omnis, dignissimos voluptatibus voluptatum!
                                </p>
                            </div>
                            <form onClick={routeChangeToCheckout}>
                                <div className="orderBtn">
                                    <button type='submit'>{siteLanguage == "TR" ? "Sipariş Ver" : "Give Order"}</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            : 
            <div id="emptyCart" className={`${darkMode ? "footer-bg-dark" : "font-light bg-light"}`}>
                <span>{siteLanguage == "TR" ? "Sepetin Boş :(" : "Your cart is empty :("}</span>
                <span onClick={routeChangeToShopping} className={`back-to-shopping ${darkMode ? "logo-dark" : "logo-light"}`}>{siteLanguage == "TR" ? "Alışverişe dön" : "Back to Shopping"}</span>
            </div>
            }
        </>
    )
}

function mapStateToProps ( state ) {
    let { cartItems } = state.cartReducer;
    return { cartItems };
}

const mapDispatchToProps = {
    getProductDetailAction: actions.productDetailActions.getProductDetailAction,
    clearProductDetailAction: actions.productDetailActions.clearProductDetailAction,
    removeFromCartAction: actions.cartActions.removeFromCartAction,
    decreaseCartIndexAction: actions.cartActions.decreaseCartIndexAction,
    showToastAction: actions.toastActions.showToastAction,
    closeToastAction: actions.toastActions.closeToastAction
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);