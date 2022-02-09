import { useEffect, useContext } from 'react';
// Context API
import { MainContext } from '../../../context/main-context/main.context';
// Redux
import {connect} from "react-redux";
import "./addtocartbtn.component.style.scss";
//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from  "@fortawesome/free-solid-svg-icons";

// cartActions
// import * as CartActions from "../../../redux/actions/cartActions";

export default function AddToCartBtnComponent(props) {

    const mainContext = useContext(MainContext);
    const siteLanguage = mainContext.state.siteLanguage;

    // let {cartReducer, dispatch} = props;

    // function addToCart(){
    //     dispatch(CartActions.actionAddToCart());
    // };

    return (
        <div>
            <button className="cart-btn">
                {/* <FontAwesomeIcon icon={faShoppingCart}/>*/}
                {siteLanguage == "TR" ? `Sepete Ekle` : `Add to Cart`}
            </button>
        </div>
    )
}

// const mapStateToProps = (state) => {
//     //burası store'da değişiklik olunca çalışır
//     //state store'daki veriyi temsil eder
//     //bu component'teki verileri return ile dönülmeyi bekler
//     return {
//         cartReducer: state.cartReducer
//     }
// };

// export default connect(mapStateToProps)(AddToCartBtnComponent);
