import { useEffect, useContext } from 'react';
// Context API
import { MainContext } from '../../context/main-context/main.context';
// Styling
import "./toast.component.style.scss";
// Redux
import {connect} from "react-redux";
import * as actions from "../../redux/_actions/actions";

function ToastComponent(props) {

    const mainContext = useContext(MainContext);
    const siteLanguage = mainContext.state.siteLanguage;
    const darkMode = mainContext.state.darkMode;


    let { toastMessage, showToast } = props;

    let { closeToastAction } = props;

    useEffect(() => {
        
    }, [showToast]);

    function closeToastActionClick () {
        closeToastAction()
    }

    return (
        <>
            {showToast ?
                <div id="toastContainer" className={`${darkMode ? "footer-bg-dark" : "footer-bg-light"}`}>
                    <span>{toastMessage}</span>
                    <span id="toastCloser" onClick={closeToastActionClick}>x</span>
                </div>    
            : ""}        
        </>


    )
}

function mapStateToProps ( state ) {
    let { toastMessage, showToast } = state.toastReducer;
    return { toastMessage, showToast };
}

const mapDispatchToProps = {
    closeToastAction: actions.toastActions.closeToastAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ToastComponent);

