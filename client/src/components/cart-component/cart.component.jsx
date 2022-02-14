import {React, useContext, useEffect} from 'react'
// Styling
import "./cart.component.style.scss";
import "../theme/theme.component.style.scss";
// Routing
import { useNavigate } from "react-router-dom";
// Redux
import {connect} from "react-redux";
import * as actions from "../../redux/_actions/actions";
//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from  "@fortawesome/free-solid-svg-icons";
// ContextAPI
import { MainContext } from "../../context/main-context/main.context";


export const CartComponent = (props) => {

    let { cartIndex } = props;

    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;

    useEffect(() => {
        
    }, [cartIndex]);

    // Routing
    const navigate = useNavigate();
    const routeChange = ( ) => {
        let path = `/cart`;
        navigate(path);
    }

    return (
        <div className={`cart-group ${darkMode ? "logo-dark" : "logo-light"}`} onClick={routeChange}>
            <FontAwesomeIcon id="cartIcon" icon={faShoppingCart}/>
            <span id="cartIndex">{cartIndex}</span>
        </div>
    )
}

function mapStateToProps ( state ) {
    let { cartIndex } = state.cartReducer;
    return { cartIndex };
}

// const mapDispatchToProps = {
    
// }

export default connect(mapStateToProps)(CartComponent);
