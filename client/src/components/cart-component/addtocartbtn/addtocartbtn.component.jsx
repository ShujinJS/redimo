import { useEffect, useContext } from 'react';
// Routing
import { useNavigate } from "react-router-dom";
// Context API
import { MainContext } from '../../../context/main-context/main.context';
// Styling
import "./addtocartbtn.component.style.scss";
// Redux
import {connect} from "react-redux";
import * as actions from "../../../redux/_actions/actions";

function AddToCartBtnComponent(props) {

    const mainContext = useContext(MainContext);
    const siteLanguage = mainContext.state.siteLanguage;
    const { user, logout } = useContext(MainContext);

    let { selectedProduct } = props;
    let { addToCartAction, increaseCartIndexAction, showToastAction, closeToastAction } = props;

    // Routing
    const navigate = useNavigate();
    const routeChange = ( _id ) => {
        let path = `/login`;
        navigate(path);
    }

    function addToCartClick ( item ) {
        if(user) {
            let newMessage = siteLanguage == "TR" ? "Ürün sepete eklendi" : "Product has been added to the cart"
            addToCartAction(item);
            increaseCartIndexAction();
            showToastAction(newMessage);
            setTimeout(closeToastAction, 1400);
        } else {
            routeChange();
        }

    }

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
    addToCartAction: actions.cartActions.addToCartAction,
    increaseCartIndexAction: actions.cartActions.increaseCartIndexAction,
    showToastAction: actions.toastActions.showToastAction,
    closeToastAction: actions.toastActions.closeToastAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartBtnComponent);

