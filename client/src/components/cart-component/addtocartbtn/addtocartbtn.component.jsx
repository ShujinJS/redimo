import { useEffect, useContext } from 'react';
// Context API
import { MainContext } from '../../../context/main-context/main.context';
// Styling
import "./addtocartbtn.component.style.scss";
// Redux
import {connect} from "react-redux";
import * as actions from "../../../redux/_actions/actions";
//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from  "@fortawesome/free-solid-svg-icons";
// import * as CartActions from "../../../redux/actions/cartActions";

function AddToCartBtnComponent(props) {

    const mainContext = useContext(MainContext);
    const siteLanguage = mainContext.state.siteLanguage;

    let { selectedProduct } = props;
    console.log(selectedProduct)
    let { addToCartAction } = props;

    function addToCartClick ( item ) {
        addToCartAction(item);
    }

    // function addToCart(){
    //     dispatch(CartActions.actionAddToCart());
    // };

    return (
        <div>
            <button className="cart-btn" onClick={() => addToCartClick(selectedProduct)}>
                {/* <FontAwesomeIcon icon={faShoppingCart}/>*/}
                {siteLanguage == "TR" ? `Sepete Ekle` : `Add to Cart`}
            </button>
        </div>
    )
}

function mapStateToProps ( state ) {
    let { selectedProduct } = state.productDetailReducer;
    return { selectedProduct };
}

const mapDispatchToProps = {
    getProductDetailAction: actions.productDetailActions.getProductDetailAction,
    clearProductDetailAction: actions.productDetailActions.clearProductDetailAction,
    addToCartAction: actions.cartActions.addToCartAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartBtnComponent);

