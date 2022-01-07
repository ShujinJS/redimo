// Styling
import "./nav.component.style.input.scss"

// Components
import TopNavComponent from "./top-nav-component/top.nav.component";
import BottomNavComponent from "./bottom.nav.component/bottom.nav.component";

function NavComponent(props){

    let {currentUser} = props;

    return (
        <nav className="nav-container">
            <TopNavComponent className="top-nav-container"/>
            <BottomNavComponent currentUser={currentUser} siteLogo={props.siteLogo} userLogo={props.userLogo} className="bot-nav-container"/>   
        </nav>
    )
}

export default NavComponent;