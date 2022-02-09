import { useEffect, useContext } from 'react';
// Styling
import '../../scss/products/products.style.scss';
// Routing
import { useNavigate } from "react-router-dom";
// Context API
import { MainContext } from '../../context/main-context/main.context';
// Redux
import { connect } from "react-redux";
import * as actions from "../../redux/_actions/actions";
// Components
import AddToCartBtnComponent from '../../components/cart-component/addtocartbtn/addtocartbtn.component'
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faTruck } from  "@fortawesome/free-solid-svg-icons";

function ProductComponent(props) {

    let { item } = props;
    let { getProductDetailAction, clearProductDetailAction } = props;

    const { _id, author, topic, brand, title, price, discount, stock, imageUrl, shippingFee } = item;

    useEffect(() => {
        
    }, [item]); 

    // Routing
    const navigate = useNavigate();
    const routeChange = ( _id ) => {
        let path = `/productdetail/${_id}`;
        navigate(path);
    }

    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;
    const siteLanguage = mainContext.state.siteLanguage;

    let shopPrice = Number(price)
    let intPrice = Number(price).toFixed(2)
    let newPrice = new Intl.NumberFormat().format(shopPrice);
    let discountedPrice = Number(shopPrice - (shopPrice * (discount / 100))).toFixed(2);
    let intDiscountedPrice = new Intl.NumberFormat().format(discountedPrice);

    function zoomInImage (e) {
        let currentImage = e.target;
        currentImage.style.width = "250px";
    }

    function zoomOutImage (e) {
        let currentImage = e.target;
        currentImage.style.width = "100%";
    }

    function getProductDetailClick ( item ) {
        clearProductDetailAction();
        getProductDetailAction(item);
        routeChange(item._id);
    }

    return (
        <div className={`product-card-container`}>
            <div className={`product-card`}  onClick={() => getProductDetailClick(item)}>
                <div className={`product-image`}
                onMouseEnter={zoomInImage} onMouseLeave={zoomOutImage}
                >
                    <img src={imageUrl}/>
                </div>

                <div className={`product-title-holder`}>
                    <p className={`product-shipping`}><FontAwesomeIcon icon={faTruck}/> {shippingFee} ₺</p>

                    {/* Eğer siteLanguage TR ise türkçe stok bilgisi, değilse ingilizce stok bilgisi ve eğer 10 adetten az kaldıysa */}
                    {stock == 0 ? <p className='product-stock'>{siteLanguage == "TR" ? `ürün kalmadı` : `out of stock`}</p> : "" || stock<10 ?
                        <p className='product-stock'>{siteLanguage == "TR" ? `${stock} adet kaldı` : `${stock} stock left`}</p>
                        : ""
                    }
                                            


                    <p>{author ? author : "" || brand ? brand : "" || topic ? topic : ""}</p>
                    <p className={`product-title`}>{title}</p>
                </div>

                {/* Favori Butonu */}
                {/* <div className={`product-price-group`}>
                    <button className={`fav-btn`}>
                        <FontAwesomeIcon icon={faHeart}/>
                    </button>     
                </div> */}
                                       
                <div className="product-price-holder">
                    <div>
                        <span className={`${discount ? "product-price-crossed" : "product-price"}`}>
                        {newPrice} ₺
                        </span>
                    </div>
                    {discount ? 
                        <div>
                            <span className="discounted">{intDiscountedPrice} ₺</span>
                            <span className="discounted percentage">▼ %15</span>
                        </div>
                    : ""}
                </div>
            </div>
        </div>   
    );
}

function mapStateToProps ( state ) {
    let { selectedProduct } = state.productDetailReducer;
    return { selectedProduct };
}

const mapDispatchToProps = {
    getProductDetailAction: actions.productDetailActions.getProductDetailAction,
    clearProductDetailAction: actions.productDetailActions.clearProductDetailAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductComponent);