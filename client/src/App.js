import {useState, useEffect, useContext} from "react";
// Styling
import './App.css';
import "./components/theme/theme.component.style.scss";
// Logos
import siteLogo from "./sitelogo.png";
import userLogo from "./logos/userlogo.png";
// ContextAPI
import { MainContext } from "./context/main-context/main.context";
// Components
import ThemeComponent from "./components/theme/theme.component";
import NavComponent from "./components/nav-component/nav.component";
import SideNavComponent from "./components/nav-component/side-nav-component/side.nav.component";
import MainContentComponent from "./components/main-content-component/main.content.component";
import FooterComponent from "./components/footer-component/footer.component";


function App() {

    // ContextAPI
    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;
    const sideNavToggled = mainContext.state.sideNavToggled;
    const { user, logout } = useContext(MainContext);

  useEffect(() => {
    document.title = "Redimo | Shopping";

  }, []);

  return (
    
    <>
      <div className={`sidenav-holder ${sideNavToggled ? "toggled-on-sidenav" : "toggled-off-sidenav"}`}>
        <SideNavComponent siteLogo={siteLogo}/>
      </div>
      <NavComponent siteLogo={siteLogo} userLogo={userLogo}/>
      <MainContentComponent/>
      <FooterComponent/>
      {/* <ThemeComponent/> */}
    </>



  );
}

export default App;
