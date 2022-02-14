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
            title: "Apollo",
            url: "https://aws1.discourse-cdn.com/business5/uploads/apollographql/original/1X/25bd5104d61020fe4dc0777a5919cd009bca633e.png"
        },
        {
            title: "Nodejs",
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png"
        },
        {
            title: "Expressjs",
            url: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png"
        },
        {
            title: "GraphQL",
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/2048px-GraphQL_Logo.svg.png"
        },
        {
            title: "MongoDB",
            url: "https://d33wubrfki0l68.cloudfront.net/4b27b5bdd5af913e7b5ccc0139cad7fce72ee93b/ab559/img/integrations/mongodb.png"
        },
        {
            title: "Stripe",
            url: "https://seeklogo.com/images/S/stripe-logo-C409DC9652-seeklogo.com.png"
        },
        {
            title: "Scss",
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/1280px-Sass_Logo_Color.svg.png"
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