import React from 'react'

import {connect} from "react-redux";

import "./addtocartbtn.component.style.scss";

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from  "@fortawesome/free-solid-svg-icons";

// cartActions
// import * as CartActions from "../../../redux/actions/cartActions";

export default function AddToCartBtnComponent(props) {

    // let {cartReducer, dispatch} = props;

    // function addToCart(){
    //     dispatch(CartActions.actionAddToCart());
    // };

    return (
        <div>
            <button className="cart-btn">
                {/* <FontAwesomeIcon icon={faShoppingCart}/>*/}
                Sepete Ekle
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
