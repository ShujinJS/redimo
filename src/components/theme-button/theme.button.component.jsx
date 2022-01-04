import {useContext} from "react";

// Syling
import "./theme.button.component.style.scss";
import "../theme/theme.component.style.scss";

// ContextAPI
import { MainContext } from "../../context/main-context/main.context";

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from  "@fortawesome/free-solid-svg-icons";

export default function ThemeButtonComponent(){

    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;

    let changeTheme = () => {
        if (darkMode){
            mainContext.dispatch({ type: "LIGHTMODE"});
        }else{
            mainContext.dispatch({ type: "DARKMODE"})
        }
    };

    return (
       <button id="themeButton" className={`${darkMode ? "input-dark nav-bg-dark" : "input-light bg-light"}`} onClick={changeTheme}>
           <FontAwesomeIcon icon={faSun} className={`${darkMode ? "theme-btn-sun" : "theme-btn-light"}`}/>
           <FontAwesomeIcon icon={faMoon} className="theme-btn-dark"/>
        </button>
    )
   
}