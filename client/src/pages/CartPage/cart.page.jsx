import { useEffect, useContext } from 'react';
// Styling
import './cart.page.style.scss';
import '../../scss/products/products.style.scss'
import '../../scss/product-listing/product-listing.style.scss'
// Redux
import { connect } from "react-redux";
import * as actions from "../../redux/_actions/actions";

function CartPage (props) {

    let testArr = [ 1, 2, 3, 4];

    useEffect(() => {
        
    }, []);  

    return (
        <div id="cartContainer">
            <div id="cartGroupHolder">
                <div id="cartItemGroup">
                    <ul>
                    {testArr ? 
                        testArr.map(item => {
                        return <li className="cart-item">{item}</li>
                        })
                    : ""}
                    </ul>
                </div>
                <div id="cartTotalGroup">
                        
                </div>
            </div>
        </div>
    )
}

function mapStateToProps ( state ) {
    let { selectedProduct } = state.productDetailReducer;
    return { selectedProduct };
}

const mapDispatchToProps = {
    getProductDetailAction: actions.productDetailActions.getProductDetailAction,
    clearProductDetailAction: actions.productDetailActions.clearProductDetailAction
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);