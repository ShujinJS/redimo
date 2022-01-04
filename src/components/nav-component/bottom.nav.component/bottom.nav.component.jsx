import { useState, useContext } from "react";

// Syling
import "./bottom.nav.component.style.input.scss";
import "../../theme/theme.component.style.scss";


// Routing
import {Link} from "react-router-dom";

// Firebase
import { auth } from '../../../firebase/firebase.utils';

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

    let {currentUser, siteLogo} = props;

    let navLinks = {
        
        siteLanguages: [
                {
                    title: "TR",
                    content: [

                        {
                            title: "middleNav",
                            content: [
                                {
                                    title: "Kategoriler",
                                    toggled: true,
                                    url: "categories", 
                                    categories: [
                                        {
                                            title: "Filmler", 
                                            url: "movies"
                                        },
                                        {
                                            title: "Kitaplar",
                                            url: "books"
                                        },
                                        {
                                            title: "Giyim",
                                            url: "clothing"
                                        }
                                    ]
                                },
                                {
                                    title: "Tüm Ürünler", 
                                    url:"collections"
                                }
                            ]
                        },
                        {
                            title: "userNav",
                            content: [
                                {
                                    title: "Giriş Yap",
                                    url: "login"
                                },
                                {
                                    title: "Çıkış Yap",
                                    url: ""
                                }
                            ]
                        }
                    ]
                },
                {
                    title: "ENG",
                    content: [

                        {
                            title: "middleNav",
                            content: [
                                {
                                    title: "Categories",
                                    toggled: true,
                                    url: "categories", 
                                    categories: [
                                        {
                                            title: "Movies", 
                                            url: "movies"
                                        },
                                        {
                                            title: "Books",
                                            url: "books"
                                        },
                                        {
                                            title: "Clothing",
                                            url: "clothing"
                                        }
                                    ]
                                },
                                {
                                    title: "Collections", 
                                    url:"collections"
                                }
                            ]
                        },
                        {
                            title: "userNav",
                            content: [
                                {
                                    title: "Log-in",
                                    url: "login"
                                },
                                {
                                    title: "Sign-out",
                                    url: ""
                                }
                            ]
                        }
                    ]
                },               
        ]
        
    };

    // ContextAPI
    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;
    const siteLanguage = mainContext.state.siteLanguage;
    const sideNavToggled = mainContext.state.sideNavToggled;

    
    const toggleSideNav = () => {
        {!sideNavToggled? mainContext.dispatch({ type: "TOGGLE_SIDENAV_ON"}) : mainContext.dispatch({ type: "TOGGLE_SIDENAV_OFF"})}

    }


    return (
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
                                {navLinks ?

                                navLinks.siteLanguages.map(firstLvl => {
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
                                }) : "Loading"}

                            </ul>
                            <div className={`search-box search-box-bottom-nav ${darkMode ? "input-dark" : "input-light"}`}>
                                <FontAwesomeIcon icon={faSearch}/>
                                <input className={`search-input ${darkMode ? "font-dark" : "font-light"}`} type="search" placeholder="Ne arıyorsunuz?"/>
                            </div>
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
                            navLinks ?
                            navLinks.siteLanguages.map(firstLvl => {
                                return (
                                    <>
                                    {siteLanguage == firstLvl.title ?
                                        firstLvl.content.map(secondLvl => {
                                            console.log(secondLvl)
                                            return (
                                                <>
                                                {secondLvl.title == "userNav" ? 
                                                
                                                    currentUser ?
                                                    <div onClick={() => auth.signOut()} className="authing">
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