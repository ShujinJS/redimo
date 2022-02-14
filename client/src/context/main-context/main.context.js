import React, { useReducer, createContext } from "react";
import jwtDecode from 'jwt-decode';

export const MainContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
});

const initialState = { darkMode: false, siteLanguage: "TR", sideNavToggled: false, user: null };

if(localStorage.getItem("token")) {
    const decodedToken = jwtDecode(localStorage.getItem("token"));

    if(decodedToken.exp * 1000 < Date.now()){
        localStorage.removeItem("token");
    } else {
        initialState.user = decodedToken;
    }
}

const mainReducer = (state, action) => {
    switch (action.type){
        case "LIGHTMODE":
            return { ...state, darkMode: false };
        case "DARKMODE":
            return { ...state, darkMode: true };
        case "SWITCH_TR":
            return { ...state, siteLanguage: "TR" };
        case "SWITCH_ENG":
            return { ...state, siteLanguage: "ENG" };
        case "LOG_IN":
            return { ...state, user: action.payload };
        case "LOG_OUT":
            return { ...state, user: null }
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

    const login = ( userData ) => {
        localStorage.setItem("token", userData.token);
        dispatch({
            type: "LOG_IN",
            payload: userData
        })
    };

    function logout() {
        localStorage.removeItem("token");
        dispatch({ type: "LOG_OUT" });
    }

    return <MainContext.Provider value={{state: state, dispatch: dispatch, user: state.user, login, logout }}>{props.children}</MainContext.Provider>
}