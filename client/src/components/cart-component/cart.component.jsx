import {React, useContext} from 'react'
// Styling
import "./cart.component.style.scss";
import "../theme/theme.component.style.scss";
// Redux
import { connect } from 'react-redux'
//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from  "@fortawesome/free-solid-svg-icons";

// ContextAPI
import { MainContext } from "../../context/main-context/main.context";


export const CartComponent = (props) => {
    //let {cartReducer, dispatch} = props;

    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;

    // function addToCart(){
    //     dispatch(CartActions.actionAddToCart());
    // };

    return (
        <div className={`cart-group ${darkMode ? "logo-dark" : "logo-light"}`}>
            <FontAwesomeIcon id="cartIcon" icon={faShoppingCart}/>
            {/* <input id="cartIndex" value={cartReducer.cartIndex}/> */}
        </div>
    )
}

const mapStateToProps = (state) => {
    //burası store'da değişiklik olunca çalışır
    //state store'daki veriyi temsil eder
    //bu component'teki verileri return ile dönülmeyi bekler
    return {
        
    }
};

// const mapDispatchToProps = {
    
// }

export default connect(mapStateToProps)(CartComponent);
