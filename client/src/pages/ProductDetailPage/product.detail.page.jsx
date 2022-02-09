import { useEffect, useContext, useState } from 'react';
// Styling
import './product.detail.page.style.scss';
// Context API
import { MainContext } from '../../context/main-context/main.context';
// Components
import AddToCartBtnComponent from '../../components/cart-component/addtocartbtn/addtocartbtn.component';
// Redux
import { connect } from "react-redux";
import * as actions from "../../redux/_actions/actions";
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faTruck } from  "@fortawesome/free-solid-svg-icons";

function ProductDetailPage ( props ) {
  
  let { selectedProduct } = props;
  let { __typename, _id, topic, author, brand, title, price, director, year, duration, genre, color, pages, publisher, publishDate, imageUrl, shippingFee, discount } = selectedProduct;
  console.log(selectedProduct)

  let colorImages;
  if(color) colorImages = color[0].images;

  let defaultSizes;
  if(color) defaultSizes = color[0].size;

  let [bigImage, setBigImage] = useState(imageUrl);

  let [smallImages, setSmallImages] = useState(colorImages);
  
  let [selectedSize, setSelectedSize] = useState()

  useEffect(() => {
        
  }, []);
  
  const mainContext = useContext(MainContext);
  const darkMode = mainContext.state.darkMode;
  const siteLanguage = mainContext.state.siteLanguage;

  let shopPrice = Number(price)
  let intPrice = Number(price).toFixed(2)
  let newPrice = new Intl.NumberFormat().format(shopPrice);
  let discountedPrice = Number(shopPrice - (shopPrice * (discount / 100))).toFixed(2);
  let intDiscountedPrice = new Intl.NumberFormat().format(discountedPrice);

  console.log(shopPrice)
  console.log(intPrice)
  console.log(newPrice)
  console.log(discountedPrice)
  console.log(intDiscountedPrice)

  return (
    <div id="productDetailGroupContainer">
      <div id="productDetailGroupHolder">
        {/* First Half */}
        <div id="productDetailFirstHalf">
          <div id="productDetailImageHolder">
            <div id="productDetailImage">
              {bigImage ? <img src={bigImage} className="product-detail-image"/> : "loading"}
            </div>
            <div id="productDetailImageGroup">
              <ul>
                {smallImages ? smallImages.map(images => 
                  
                  <li onClick={() => setBigImage(images.url)}>
                    <img src={images.url}/>
                  </li>
                  
                ) : ""}
              </ul>
            </div>
          </div>
        </div>

        {/* Second Half */}
        <div id="productDetailSecondHalf" >
          <div id="productDetailDescriptionHolder">
            {/* Topic */}
            <div id="productDetailTopicGroup">
              {selectedProduct ? <>
                <p className={`product-detail-topic`}>{author ? author : "" || brand ? brand : "" || topic ? topic : ""}</p>
                <p className={`product-detail-title`}>{title}</p>
              </> : "Loading..." }
            </div>
            {/* Movie Details */}
            {director ? 
              <div id="productDetailMovieGroup">
                <div className='product-price-group'>
                  <span>{siteLanguage == "TR" ? `Tür: ` : `Genre: `}</span>
                  <span>{genre}</span>
                </div>
                <div className='product-price-group'>
                  <span>{siteLanguage == "TR" ? `Yönetmen: ` : `Director: `}</span>
                  <span>{director}</span>
                </div>
                <div className='product-price-group'>
                  <span>{siteLanguage == "TR" ? `Süre: ` : `Duration: `}</span>
                  <span>{siteLanguage == "TR" ? `${duration} dk` : `${duration} min `}</span>
                </div>
                <div className='product-price-group'>
                  <span>{siteLanguage == "TR" ? `Çıkış Tarihi: ` : `Release Date: `}</span>
                  <span>{year}</span>
                </div>
              </div>
            : ""}
            {/* Book Details */}
            {publisher ?
                <div id="productDetailBookGroup">
                  <div className='product-price-group'>
                    <span>{siteLanguage == "TR" ? `Sayfa sayısı: ` : `Pages: `}</span>
                    <span>{siteLanguage == "TR" ? `${pages}` : `${pages}`}</span>
                  </div>
                  <div className='product-price-group'>
                    <span>{siteLanguage == "TR" ? `Yayım Yılı: ` : `Publish Date: `}</span>
                    <span>{publishDate}</span>
                  </div>
                  <div className='product-price-group'>
                    <span>{siteLanguage == "TR" ? `Yayım Evi: ` : `Publisher: `}</span>
                    <span>{publisher}</span>
                  </div>
                </div> : ""
              }
            {/* Clothe Details */}
            {color ? 
              <div id="productDetailColorGroup">
                <span>{siteLanguage == "TR" ? "Renkler" : "Colors"}</span>
                <ul>
                {
                  color.map(color => {
                  console.log(color)
                  return <li className={`product-detail-color ${color.title ?  "color-blue" : ""}`} onClick={()=> setSmallImages(color.images)}></li>
                  })
                }
                </ul>
              </div>
            : ""}

            {/* Sizes */}
            { defaultSizes ? 
              <div id='productDetailSizeGroup'>
                <div className='product-price-group'>
                  <span>{siteLanguage == "TR" ? `Seçili beden: ` : `Selected size: `}</span>
                    { selectedSize ? 
                      <span>{selectedSize}</span>
                    : "" }
                </div>
          
                <ul>
                  {defaultSizes ? defaultSizes.map(sizes => 
                              
                  <li className="product-detail-size" onClick={() => setSelectedSize(sizes.title)}>
                    <span>{sizes.title}</span>
                  </li>
                              
                  ) : ""}
                </ul>
              </div>
            : ""}


            {/* Price */}
            <div id="productDetailPriceGroup">
                {selectedProduct ? <>
                  <div className='product-price-group'>
                    <span className='product-detail-price-label'>{siteLanguage == "TR" ? "Ürün Fiyatı: " : "Price: "}</span>
                    <span className={`product-detail-price ${discount ? "product-detail-crossed-price" : ""}`}>
                      {newPrice} ₺
                    </span>
                  </div>
                  {discount ?
                    <div className='product-price-group'>
                      <span className='product-detail-price-label'>{siteLanguage == "TR" ? "İndirimli Fiyat: " : "Discounted Price: "}</span>
                      <div className="product-detail-price discounted-price">
                        <span>{intDiscountedPrice} ₺</span>
                        <span className="product-detail-percentage">▼ %15</span>
                      </div>
                    </div> 

                  : ""}

                  <div className="product-detail-shipping product-price-group">
                    <span className='product-detail-price-label'>{siteLanguage == "TR" ? "Kargo Ücreti: " : "Shipping Fee: "}</span>
                    <span className='product-detail-price'>{shippingFee} ₺</span>
                  </div>
                </> : "Loading..." }
            </div>

          </div>
            {/* Cart Btn */}
            <div className={`product-detail-cartbtn`}>
              {selectedProduct ? <AddToCartBtnComponent className=""/> : "Loading..."}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);
