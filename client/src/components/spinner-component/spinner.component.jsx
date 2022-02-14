import { useEffect, useContext } from 'react';
// Context API
import { MainContext } from '../../context/main-context/main.context';
// Styling
import "./spinner.component.style.scss";
import { TailSpin } from  'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// Redux
import {connect} from "react-redux";
import * as actions from "../../redux/_actions/actions";

function SpinnerComponent(props) {

    const mainContext = useContext(MainContext);
    const siteLanguage = mainContext.state.siteLanguage;
    const darkMode = mainContext.state.darkMode;


    let { isLoading } = props;

    useEffect(() => {
        
    }, [isLoading]);

    return (
        <>
            { isLoading ?
            <div id="spinnerContainer"> 
                <TailSpin width="100" height="100" ariaLabel="loading" color={`${darkMode ? "cyan" : "orange"}`}/>
            </div>
              
             : 
                ""
            }
        </>

 
    )
}

function mapStateToProps ( state ) {
    let { isLoading } = state.spinnerReducer;
    return { isLoading };
}

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(SpinnerComponent);

