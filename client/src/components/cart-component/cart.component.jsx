import {React, useContext} from 'react'
// Styling
import "./cart.component.style.scss";
import "../theme/theme.component.style.scss";
// Routing
import { useNavigate } from "react-router-dom";
// Redux
import { connect } from 'react-redux'
//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from  "@fortawesome/free-solid-svg-icons";

// ContextAPI
import { MainContext } from "../../context/main-context/main.context";


export const CartComponent = (props) => {

    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;

    // Routing
    const navigate = useNavigate();
    const routeChange = ( ) => {
        let path = `/cart`;
        navigate(path);
    }

    return (
        <div className={`cart-group ${darkMode ? "logo-dark" : "logo-light"}`} onClick={routeChange}>
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
