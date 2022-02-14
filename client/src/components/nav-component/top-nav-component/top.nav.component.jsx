import {useContext} from "react";

// Styling
import "./top.nav.component.style.scss";
import "../../theme/theme.component.style.scss";

// ContextAPI
import { MainContext } from "../../../context/main-context/main.context";

// Components
import LanguageButton from "./language-btn/language.btn.component";

export default function TopNavComponent(){

    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;

    return (
        <>
            <div id="topNavComponent" className={`${darkMode ? "footer-bg-dark" : "footer-bg-light"}`}>
                <div className="top-main-container">
                    <LanguageButton/>      
                </div>
            </div>
        </>
    )
}