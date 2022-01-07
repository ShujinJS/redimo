import {useState, useEffect, useContext} from "react";

// Styling
import './App.css';
import "./components/theme/theme.component.style.scss";

// ContextAPI
import { MainContext } from "./context/main-context/main.context";


// Logos
import siteLogo from "./sitelogo.png";
import userLogo from "./logos/userlogo.png";


// Routing
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

// Components
import ThemeComponent from "./components/theme/theme.component";
import NavComponent from "./components/nav-component/nav.component";
import SideNavComponent from "./components/nav-component/side-nav-component/side.nav.component";
import FooterComponent from "./components/footer-component/footer.component";

// Pages
import LoginPage from "./pages/AuthPage/login/login.component";
import RegisterPage from "./pages/AuthPage/register/register.component";



// Firebase
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

function App() {

  // Kullanıcı bilgisi geldiğinde sayfayı render'la, state'e kaydet
  let unsubscribeFromAuth = null;
  let [currentUser, setCurrentUser] = useState(null);
  console.log(currentUser)

  // ContextAPI Theme
  const mainContext = useContext(MainContext);
  const darkMode = mainContext.state.darkMode;
  const sideNavToggled = mainContext.state.sideNavToggled;

  useEffect(() => {
    document.title = "Redimo | Shopping";
    
    auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });

      } else {
        setCurrentUser(currentUser = userAuth)
      }
      
      return () => {
        unsubscribeFromAuth();
      }
    })

  }, []);

  return (
    <Router>
      <div className={`sidenav-holder ${sideNavToggled ? "toggled-on-sidenav" : "toggled-off-sidenav"}`}>
        <SideNavComponent currentUser={currentUser} siteLogo={siteLogo}/>
      </div>
      <NavComponent currentUser={currentUser} siteLogo={siteLogo} userLogo={userLogo}/>

      <Routes>
        <Route path="/login" element={<LoginPage userLogo={userLogo}/>}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route>
      </Routes>
      <FooterComponent/>
      {/* <ThemeComponent/> */}
    </Router>
  );
}

export default App;
