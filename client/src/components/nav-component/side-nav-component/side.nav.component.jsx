import { useContext } from "react";

// Syling
import "./side.nav.component.style.scss";
import "../../theme/theme.component.style.scss";

// Logos
import siteLogo from "../../../sitelogo.png";

// Routing
import { Link } from "react-router-dom";

// ContextAPI
import { MainContext } from "../../../context/main-context/main.context";

// Firebase
import { auth } from '../../../firebase/firebase.utils';

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleLeft, faBars, faSearch } from  "@fortawesome/free-solid-svg-icons";

export default function SideNavComponent(props){

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

    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;
    const siteLanguage = mainContext.state.siteLanguage;
    const sideNavToggled = mainContext.state.sideNavToggled;
 

    const toggleSideNav = () => {
        {!sideNavToggled? mainContext.dispatch({ type: "TOGGLE_SIDENAV_ON"}) : mainContext.dispatch({ type: "TOGGLE_SIDENAV_OFF"})}

    }

    const toggleCategory = () => {
        // {navLinks.siteLanguages.map(firstLvl => {
        //     firstLvl.content.map(secondLvl => {
        //         secondLvl.content.map(thirdLvl => {
        //             thirdLvl.toggled = !thirdLvl.toggled;
        //             console.log(thirdLvl.toggled)

        //         })
        //     })
        // })}
    }


    return (
        <div id="sideNavContainer" className={`${darkMode ? "sidenav-bg-dark font-dark" : "sidenav-bg-light font-light"}`}>

            <div id="sideNavGroup">
                
                {/* Marka grup: Ana sayfa ve toggler */}
                <div className="sidenav-title-holder">
                    <Link className="home-link-container" to="/">
                        <img src={siteLogo} className="sidenav-brand-logo"/>
                        <span className={darkMode ? "logo-dark" : "logo-light"}>Redimo</span>
                    </Link>
                        
                    <button onClick={toggleSideNav} className={`toggle-btn ${darkMode ? "toggle-btn-dark" : "toggle-btn-light"}`}>
                        <FontAwesomeIcon icon={faBars}/>
                    </button>
                </div>

                {/* Searchbox: Arama kutusu */}
                <div className={`search-box search-box-side ${darkMode ? "input-dark" : "input-light"}`}>
                    <FontAwesomeIcon icon={faSearch}/>
                    <input className={`search-input ${darkMode ? "font-dark" : "font-light"}`} type="search" placeholder="Ne arıyorsunuz?"/>
                </div>

                {/* Linkler: Link listesi */}
                <ul id="sideNavList">
                    
                {/* Sitenin dil seçeneğine göre API'den gelen data "middleNav" ise linkleri getir.*/}                                
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
                            <li className={`${darkMode ? "sidenav-link-dark" : "sidenav-link-light"}`}>                            
                            <div className="side-nav-inner-links">
                                {thirdLvl.url ? <Link to={thirdLvl.url}>{thirdLvl.title}</Link> : <div>{thirdLvl.title}</div>}
                                {thirdLvl.categories ? 
                                <div onClick={toggleCategory}>
                                    {!thirdLvl.toggled ? <FontAwesomeIcon icon={faAngleLeft} className="side-link-icon"/> : <FontAwesomeIcon icon={faAngleDown} className="side-link-icon"/>}
                                </div> : ""}                                
                            </div>
                
                            {thirdLvl.categories && thirdLvl.toggled ? 
                            <>
                            <ul>
                                {thirdLvl.categories.map(category => {
                                    return (
                                        <>
                                        <li><Link to={category.url}>
                                            {category.title}
                                        </Link></li>
                                        </>
                                    )
                                })}
                            </ul>
                            </> : ""}
                
                            </li>
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

                {/* User Panel: Giriş yap */}
                <div className={`user-panel-side ${darkMode ? "dark-color" : "light-color"}`}>
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
    )
}