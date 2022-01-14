import {useContext} from "react";

// Styling
import "./footer.component.style.scss";
import "../theme/theme.component.style.scss";

// ContextAPI
import { MainContext } from "../../context/main-context/main.context";

export default function FooterComponent(){

    // ContextAPI Theme
    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;

    let techs = [
        {
            title: "Javascript",
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/2048px-Unofficial_JavaScript_logo_2.svg.png"
        },
        {
            title: "React.js",
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png"
        },
        {
            title: "Redux",
            url: "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/themes/2147555239/settings_images/dW5iJNvT8SMYsXR6gmtg_BzWWXgLMTeyaPZSxpHAL_Redux_for_dummies.png"
        },
        {
            title: "Scss",
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/1280px-Sass_Logo_Color.svg.png"
        },
        {
            title: "Firebase",
            url: "https://4.bp.blogspot.com/-rtNRVM3aIvI/XJX_U07Z-II/AAAAAAAAJXY/YpdOo490FTgdKOxM4qDG-2-EzcNFAWkKACK4BGAYYCw/s640/logo%2Bfirebase%2Bicon.png"
        },
        {
            title: "GitHub",
            url: "https://cdn-icons-png.flaticon.com/512/25/25231.png"
        }
    ]

    return (
        <footer className={`${darkMode ? "footer-bg-dark" : "footer-bg-light"}`}>
            <div>
                <ul id="tech-list">
                    {techs.map(function(item){
                           return (
                            <li><img src={item.url} alt={item.title} className="tech-logo"/></li>
                           )
                    })}
                </ul>
            </div>
            <div className="copyright">
                © Uğur Yıldırım 2021, ReactJS
            </div>
        </footer>
    )
}