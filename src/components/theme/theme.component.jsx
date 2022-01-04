import {useContext} from "react";

// Styling
import "./theme.component.style.scss";

// ContextAPI
import { MainContext } from "../../context/main-context/main.context";

export default function ThemeComponent(){

    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;

    return (
        <div className={`site-back-cover ${darkMode ? "bg-dark" : "bg-light"}`}>

        </div>
    )
}