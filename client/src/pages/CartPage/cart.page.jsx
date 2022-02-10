import { useEffect, useContext } from 'react';
// Styling
import './cart.page.style.scss';
import '../../scss/products/products.style.scss'
import '../../scss/product-listing/product-listing.style.scss'
// Context API
import { MainContext } from '../../context/main-context/main.context';
// Redux
import { connect } from "react-redux";
import * as actions from "../../redux/_actions/actions";

function CartPage ( props ) {

    let { cartItems } = props;

    console.log(cartItems)

    var cartTotal = 0;
    var shippingFee = cartItems[0].shippingFee;

    useEffect(() => {
        
    }, []);
    
    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;
    const siteLanguage = mainContext.state.siteLanguage;

    return (
        <div id="cartPageContainer">
            <div id="cartContainer" className={`${darkMode ? "footer-bg-dark" : "footer-bg-light"}`}>
                <div id="cartGroupHolder">
                    <div id="cartItemGroup">
                        <ul>
                        {cartItems ? 
                            cartItems.map(item => {
                            let { __typename, _id, topic, author, brand, title, price, director, year, duration, genre, color, pages, publisher, publishDate, imageUrl, shippingFee, discount } = item;
                            
                            let shopPrice = Number(price)
                            let intPrice = Number(price).toFixed(2)
                            let newPrice = new Intl.NumberFormat().format(shopPrice);
                            let discountedPrice = Number(shopPrice - (shopPrice * (discount / 100))).toFixed(2);
                            let intDiscountedPrice = new Intl.NumberFormat().format(discountedPrice);
                            let shopDiscountedPrice = Number(discountedPrice);
                            console.log(shopDiscountedPrice)
                            cartTotal = cartTotal + shopDiscountedPrice;
                            console.log(cartTotal)
                        

                            return <li className={`cart-item ${darkMode ? "nav-bg-dark" : "footer-bg-light"}`}>
                                <img src={imageUrl}/>
                                <div id="cartDetailHolder">
                                    <div id="cartDetailGroup">
                                        <span className='cart-detail-titles cart-detail-topics'>{siteLanguage == "TR" ? "Ürün Adı" : "Product Name"}</span>
                                        <span className='cart-detail-titles cart-detail-topics'>{siteLanguage == "TR" ? "Ürün Fiyatı" : "Product Price"}</span>
                                        <span className='cart-detail-titles cart-detail-topics cart-detail-price-shipping'>{siteLanguage == "TR" ? "Kargo Ücreti" : "Shipping Fee"}</span>
                                    </div>
                                    <div id="cartItemDetails">
                                        <span className={`cart-detail-titles ${darkMode ? "theme-btn-light" : "theme-btn-dark"}`}>{title}</span>
                                        <div id="cartItemPriceGroup">
                                            <span className={`cart-detail-titles ${discount? "cart-detail-price-crossed" : ""} `}>{newPrice} ₺</span>
                                            {discount ? <span className="cart-detail-titles cart-detail-price-discounted">{intDiscountedPrice} ₺</span> : ""}
                                        </div>
                                        <span className='cart-detail-titles cart-detail-price-shipping'>{shippingFee} ₺</span>
                                    </div>
                                </div>

                            </li>
                            })
                        : ""}
                        </ul>
                    </div>
                    <div id="cartTotalGroup">
                            
                    </div>
                </div>
            </div>
            <div id="paymentContainer" className={`${darkMode ? "footer-bg-dark" : "footer-bg-light"}`}>
                <div id="paymentGroup">
                    <div>
                        <span>
                            {siteLanguage == "TR" ? `Sipariş Özeti` : "Order Summary"}
                        </span>
                    </div>
                    <div>
                        <div className='payment-row'>
                            <span className={`${darkMode ? "theme-btn-light" : "theme-btn-dark"}`}>
                                {siteLanguage == "TR" ? `Sepet Toplamı: ` : "Cart Total"}
                            </span>
                            <span className={`${darkMode ? "theme-btn-light" : "theme-btn-dark"}`}>
                                {`${cartTotal} ₺`}
                            </span>
                        </div>
                        <div className='payment-row'>
                            <span className={`${darkMode ? "theme-btn-light" : "theme-btn-dark"}`}>
                                {siteLanguage == "TR" ? `Kargo Ücreti: ` : "Shipping Fee"}
                            </span>
                            <span className='cart-detail-price-shipping'>
                                {`${shippingFee} ₺`}
                            </span>
                        </div>
                        <div className='payment-row'>
                            <span className={`${darkMode ? "theme-btn-light" : "theme-btn-dark"}`}>
                                {siteLanguage == "TR" ? `Sipariş Toplamı: ` : "Order Total"}
                            </span>
                            <span className={`${darkMode ? "theme-btn-light" : "theme-btn-dark"}`}>
                                {`${cartTotal + 9.90} ₺`}
                            </span>
                        </div>
                    </div>
                    <div>
                        <span>{siteLanguage == "TR" ? "Sipariş Adresi: " : "Order Address: "}</span>
                        <p className={`order-address ${darkMode ? "theme-btn-light" : "theme-btn-dark"}`}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat ratione ipsam corporis enim omnis, dignissimos voluptatibus voluptatum!
                        </p>
                    </div>
                    <div id="orderBtn">
                        <button>{siteLanguage == "TR" ? "Sipariş Ver" : "Give Order"}</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

function mapStateToProps ( state ) {
    let { cartItems } = state.cartReducer;
    return { cartItems };
}

const mapDispatchToProps = {
    getProductDetailAction: actions.productDetailActions.getProductDetailAction,
    clearProductDetailAction: actions.productDetailActions.clearProductDetailAction
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);