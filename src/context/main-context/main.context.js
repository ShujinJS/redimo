import React, {useReducer} from "react";

export const MainContext = React.createContext();

const initialState = {darkMode: false, siteLanguage: "TR", sideNavToggled: false};

const mainReducer = (state, action) => {
    switch (action.type){
        case "LIGHTMODE":
            return {...state, darkMode: false};
        case "DARKMODE":
            return {...state, darkMode: true};
        case "SWITCH_TR":
            return {...state, siteLanguage: "TR"};
        case "SWITCH_ENG":
            return {...state, siteLanguage: "ENG"};
        case "TOGGLE_SIDENAV_ON":
            return {...state, sideNavToggled: true};
        case "TOGGLE_SIDENAV_OFF":
            return {...state, sideNavToggled: false};
        default:
            return state;
    }
}

export function MainContextProvider(props){
    const [state, dispatch] = useReducer(mainReducer, initialState);

    return <MainContext.Provider value={{state: state, dispatch: dispatch}}>{props.children}</MainContext.Provider>
}