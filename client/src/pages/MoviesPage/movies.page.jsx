import { useEffect, useContext } from 'react';
// Apollo custom hooks
import useGetMovies from '../../Apollo/hooks/Movies/useGetMovies';
// Context API
import { MainContext } from '../../context/main-context/main.context';
// Styling
import './movies.page.style.scss';
import '../../scss/products/products.style.scss'
// Components
import SideFilterComponent from '../../components/side-filter-component/side.filter.component';
import AddToCartBtnComponent from '../../components/cart-component/addtocartbtn/addtocartbtn.component'
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faTruck } from  "@fortawesome/free-solid-svg-icons";

export default function MoviesPage ( ){
    const { loading, error, data } = useGetMovies();
    console.log(data)

    useEffect(() => {
        
    }, [data]);  

    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;
    const siteLanguage = mainContext.state.siteLanguage;

    function zoomInImage (e) {
        let currentImage = e.target;
        currentImage.style.width = "250px";
    }

    function zoomOutImage (e) {
        let currentImage = e.target;
        currentImage.style.width = "100%";
    }

    if(loading) return "Loading...";
    if(error) return `Bir hata meydana geldi: ${error}`;
    if(data) return (
        <div id="moviesPageContainer">
            <SideFilterComponent/>
            <div id="moviesCollectionContainer">
                <div className="content-container">
                    <ul className="item-list">
                        {data.getMovies.map(item => {
                            const { _id, topic, title, price, stock, imageUrl, shippingFee } = item;
                            console.log(item)

                            let shopPrice = Number(price)
                            let intPrice = Number(price).toFixed(2)
                            let newPrice = new Intl.NumberFormat().format(shopPrice);
                            
                            console.log(shopPrice)
                            console.log(intPrice)
                            console.log(newPrice)


                            return(
                            <li key={_id}>
                                <div className={`product-card-container`}>
                                    <div className={`product-card`}>
                                        <div className={`product-image`}
                                        onMouseEnter={zoomInImage} onMouseLeave={zoomOutImage}
                                        >
                                            <img src={imageUrl} />
                                        </div>

                                        <div className={`product-title-holder`}>
                                            <p className={`product-shipping`}><FontAwesomeIcon icon={faTruck}/> {shippingFee} ₺</p>
                                            
                                            {/* 10 adetten az ürün kaldıysa ribbon göster ve stokta ürün yoksa "Ürün Kalmadı" göster */}
                                            {stock<10 ?                                           <div className="corner-ribbon">
                                                    <div>
                                                    <div>
                                                    {stock == 0 ? "Ürün Kalmadı" : `${stock} adet kaldı`}
                                                    </div>
                                                    </div>
                                                </div> : "" }

                                            <p>{topic}</p>
                                            <p className={`product-title`}>{title}</p>
                                        </div>
                                        <div className={`product-price-group`}>
                                            <button className={`fav-btn`}>
                                                <FontAwesomeIcon icon={faHeart}/>
                                            </button>
                                            
                                        </div>
                                       
                                        <div>
                                            <p className={`product-price`}>
                                                {intPrice} ₺
                                            </p>
                                            <span className={`product-price discounted`}>{intPrice}₺</span>
                                            <span className="discounted percentage">%15</span>
                                        </div>
                                       
                                        <div>
                                            {stock == 0 ? <AddToCartBtnComponent disabled={true}/> : <AddToCartBtnComponent/>}
                                        </div>
                                    </div>
                                </div>
                            </li>
                            )
                        })}
                    </ul>

                </div>

            </div>

        </div>
    )
    


}