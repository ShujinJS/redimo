import {useContext} from "react";

// Styling
import "./language.btn.component.style.scss";
import "../../../theme/theme.component.style.scss";

// ContextAPI
import { MainContext } from "../../../../context/main-context/main.context";

export default function LanguageButton(){

    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;
    const siteLanguage = mainContext.state.siteLanguage;

    let changeLanguageToTr = () => {
        if(siteLanguage == "ENG"){        
            mainContext.dispatch({ type: "SWITCH_TR"});
        }
    }

    let changeLanguageToEng = () => {
        if(siteLanguage == "TR"){        
            mainContext.dispatch({ type: "SWITCH_ENG"});
        }
    }

    return (
        <>
        <button onClick={changeLanguageToTr} className="language-btn tr-btn"></button>
        <button onClick={changeLanguageToEng} className="language-btn eng-btn"></button>        
        </>
    )
}