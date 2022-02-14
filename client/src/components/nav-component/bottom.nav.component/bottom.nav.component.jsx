import { useState, useContext } from "react";
// Syling
import "./bottom.nav.component.style.input.scss";
import "../../theme/theme.component.style.scss";
// Routing
import {Link} from "react-router-dom";
// Apollo Custom Hooks
import useGetSiteLanguages from "../../../Apollo/hooks/Languages/useGetSiteLanguages";
//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from  "@fortawesome/free-solid-svg-icons";
// Components
// import SideNavComponent from "./side-nav-component/side.nav.component";
import CartComponent from "../../cart-component/cart.component";
import ThemeButtonComponent from "../../theme-button/theme.button.component";
// ContextAPI
import { MainContext } from "../../../context/main-context/main.context";

function BottomNavComponent(props) {
    let { siteLogo } = props;
    let { loading, error, data } = useGetSiteLanguages();

    // ContextAPI
    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;
    const siteLanguage = mainContext.state.siteLanguage;
    const sideNavToggled = mainContext.state.sideNavToggled;
    const { user, logout } = useContext(MainContext);
    console.log(user)


    const onLogout = () => {
        logout();
    }

    
    const toggleSideNav = () => {
        {!sideNavToggled? mainContext.dispatch({ type: "TOGGLE_SIDENAV_ON"}) : mainContext.dispatch({ type: "TOGGLE_SIDENAV_OFF"})}

    }

    if(loading) return <></>;
    if(error) return `Bir hata meydana geldi: ${error}`;
    if(data) return (

        <div>
            <div className={`bot-nav-component ${darkMode ? "nav-bg-dark" : "bg-light"}`}>
                <div className="bottom-main-container">
                    
                        <div id="home">
                            <Link to="/">
                                <div id="logoContainer">
                                    <img src={siteLogo} className="logo"/>
                                    <span className={darkMode ? "logo-dark" : "logo-light"}>Redimo</span>
                                </div>
                            </Link>

                            <button onClick={toggleSideNav} className={`toggle-btn ${darkMode ? "toggle-btn-dark" : "toggle-btn-light"}`}>
                                <FontAwesomeIcon icon={faBars}/>
                            </button>
                        </div>
    
                    <div className="middle-nav-container">
                        <div id="bottom-nav">
                            <ul id="navList">
                                {/* Sitenin dil seçeneğine göre API'den gelen data "middleNav" ise linkleri getir.
                                */}                                
                                {data ?

                                data.getSiteLanguages.map(firstLvl => {
                                    return (
                                    <>
                                       {siteLanguage == firstLvl.title
                                       
                                       ? 
                                       firstLvl.content.map(secondLvl => {
                                            return (
                                                <>
                                                {secondLvl.title == "middleNav" ? secondLvl.content.map(thirdLvl => {
                                                    return (
                                                        <>
                                                        <li className={`${darkMode ? "font-dark" : "font-light"}`}>{thirdLvl.url ? <Link to={thirdLvl.url}>{thirdLvl.title}</Link> : <div>{thirdLvl.title}</div>}</li>
                                                        </>
                                                    )
                                                    }) : ""}
                                                 </>
                                            )
                                             
                                         })
                                        : ""}
                                    
                                    </>
                                    )
                                }) : ""}

                            </ul>
                            {/* <div className={`search-box search-box-bottom-nav ${darkMode ? "input-dark" : "input-light"}`}>
                                <FontAwesomeIcon icon={faSearch}/>
                                <input className={`search-input ${darkMode ? "font-dark" : "font-light"}`} type="search" placeHolder="..."/>
                            </div> */}
                            <ThemeButtonComponent/>

                        </div>
                    </div>
                    <div id="profileContainer">
                        <CartComponent/>
                        
                        {/* Sitenin dil seçeneğine göre görüntüleme yap.
                        Kullanıcı bilgisi varsa, Çıkış Yap'ı, yoksa Giriş Yap'ı göster.
                        Eğer API'den gelen uzantı "userNav" ise Giriş Yap ve Çıkış Yap butonlarını getir */}
                        <div className="user-panel-bottom-nav">
                        {
                            data ?
                            data.getSiteLanguages.map(firstLvl => {
                                return (
                                    <>
                                    {siteLanguage == firstLvl.title ?
                                        firstLvl.content.map(secondLvl => {
                                            return (
                                                <>
                                                {secondLvl.title == "userNav" ? 
                                                
                                                    user ?
                                                    <div onClick={onLogout} className={`auth-btn ${darkMode ? "font-dark" : "font-light"}`}>
                                                        {secondLvl.content[1].title}
                                                    </div> :
                                                    <Link to="login">
                                                        <div className={`${darkMode ? "font-dark" : "font-light"}`}>
                                                            {secondLvl.content[0].title}
                                                        </div>
                                                    </Link>

                                                : ""}
                                                </>
                                            )
                                        })
                                    : ""}
                                    </>
                                )
                            }) : ""
                            
                        }                    
                            
                        </div>


                    </div>
                </div>
            </div>

        </div>

    )
}

export default BottomNavComponent;