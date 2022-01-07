import {React, useContext} from 'react'

// Styling
import "./cart.component.style.css";
import "../theme/theme.component.style.scss";


// Redux
import { connect } from 'react-redux'

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from  "@fortawesome/free-solid-svg-icons";

// cartActions
import * as CartActions from '../../redux/actions/cartActions';

// ContextAPI
import { MainContext } from "../../context/main-context/main.context";


export const CartComponent = (props) => {
    let {cartReducer, dispatch} = props;
    console.log(props, dispatch);

    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;

    function addToCart(){
        dispatch(CartActions.actionAddToCart());
    };

    return (
        <div className={`cart-group ${darkMode ? "logo-dark" : "logo-light"}`}>
            <FontAwesomeIcon id="cartIcon" icon={faShoppingCart}/>
            <input id="cartIndex" value={cartReducer.cartIndex}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    //burası store'da değişiklik olunca çalışır
    //state store'daki veriyi temsil eder
    //bu component'teki verileri return ile dönülmeyi bekler
    return {
        cartReducer: state.cartReducer
    }
};

// const mapDispatchToProps = {
    
// }

export default connect(mapStateToProps)(CartComponent);
