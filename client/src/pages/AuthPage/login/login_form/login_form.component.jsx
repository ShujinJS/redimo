import { useState, useContext } from "react";
// Styling
import "./login_form.component.style.scss";
import "../../../../components/theme/theme.component.style.scss";
import "../../../../scss/authentication/authentication.common.style.scss";
// Context API
import { MainContext } from "../../../../context/main-context/main.context";
// Routing
import { useNavigate } from "react-router-dom"
// Firebase
import { auth, signInWithGoogle } from "../../../../firebase/firebase.utils";
//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope, faUser } from  "@fortawesome/free-solid-svg-icons";


export default function FormGroup(props){

    let {imageUrl, inputTypeA, placeholderA, inputTypeB, placeholderB} = props;

    let [ signInValues={email: "", password: ""}, setSignInValues] = useState({email: "", password: ""});

    let {email, password} = signInValues;

    // ContextAPI Theme
    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;

    // Routing
    const navigate = useNavigate();
    const routeChange = () => {
        let path = `/register`;
        navigate(path);
    }

    let handleSubmit = async event => {
        event.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password);
            setSignInValues({email: "", password: ""});
        } catch (error) {
            throw `${error.message} meydana geldi!`
        }

    }

    let handleChange = event => {
        const {value, name} = event.target;
        setSignInValues({ ...signInValues, [name]: value })
        console.log(value)
    }

    return (
        
        <div id="formHolder" className={`${darkMode ? "font-dark nav-bg-dark" : "font-light bg-light"}`}>
            <form onSubmit={handleSubmit} className={`auth-form ${darkMode ? "font-dark nav-bg-dark" : "font-light bg-light"}`}>
                <div id="imgBgTop" className={`${darkMode ? "bg-light" : "bg-dark"}`}>
                </div>
                <div id="imgBg" className={`${darkMode ? "sec-dark" : "sec-light"}`}> 
                </div>
                <img id="userAvatar"src={imageUrl}/>
                <div>
                    <h2>Hoş Geldiniz</h2>
                    <span>Hesabınızla oturum açabilirsiniz</span>
                </div>
                <div className="input-group">
                    <div className={`input-holder ${darkMode ? "form-input-dark" : "form-input-light"}`}>
                        <FontAwesomeIcon icon={faEnvelope}/>
                        <input name={inputTypeA} type={inputTypeA} value={signInValues.email} onChange={handleChange} className="input-style input-btn" placeHolder={placeholderA} required/>
                    </div>
                        <span className="notifier">{placeholderA} giriniz</span>
                </div>
                <div className="input-group">
                    <div className={`input-holder ${darkMode ? "form-input-dark" : "form-input-light"}`}>
                        <FontAwesomeIcon icon={faLock}/>
                        <input name={inputTypeB} type={inputTypeB} value={signInValues.password} onChange={handleChange} className="input-style input-btn" placeHolder={placeholderB} required/>
                        </div>
                        <span className="notifier">{placeholderB} giriniz</span>
                </div>
                <div id="userSelections">
                    <div>
                        <label>Beni Hatırla</label>
                        <input type="checkbox"/>
                    </div>
                    <a className={`${darkMode ? "logo-dark" : "logo-light"}`}>Parolamı Unuttum</a>
                </div>

                <input className={`input-style submit-btn ${darkMode ? "submit-btn-dark" : "submit-btn-light"}`} type="submit" value="Giriş Yap"/>

                <div className="sign-in-btn-group">
                    <button onClick={signInWithGoogle} className="sign-in-btn google-btn"></button>
                </div>

                <div className="group-holder">
                    <span>Hesabınız yok mu?</span>
                    <button onClick={routeChange} className={`auth-btn ${darkMode ? "logo-dark nav-bg-dark" : "logo-light bg-light"}`}>KAYDOL</button>
                </div>
            </form>
        </div>

    )

}