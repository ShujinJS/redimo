import { useState, useContext } from "react";
// Styling
import "./login_form.component.style.scss";
import "../../../../components/theme/theme.component.style.scss";
import "../../../../scss/authentication/authentication.common.style.scss";
// Context API
import { MainContext } from "../../../../context/main-context/main.context";
// Routing
import { useNavigate } from "react-router-dom";
// Apollo
// import { useMutation, gql } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "graphql-tag";
//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope, faUser } from  "@fortawesome/free-solid-svg-icons";

const LOGIN_USER = gql`
mutation ($input: LoginInput) {
    loginUser(input: $input) {
        email
        username
        token
        address
    }
}
`

export default function FormGroup(props){

    let {imageUrl, inputTypeA, placeholderA, inputTypeB, placeholderB} = props;

    let [ signInValues={email: "", password: ""}, setSignInValues] = useState({email: "", password: ""});

    let {email, password} = signInValues;

    // ContextAPI Theme
    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;
    const siteLanguage = mainContext.state.siteLanguage;

    // Routing
    const navigate = useNavigate();
    const routeChange = () => {
        let path = `/register`;
        navigate(path);
    }

    const routeChangeToHome = () => {
        let path = `/`;
        navigate(path);
    }

    const [errors, setErrors ] = useState([]);
    const [loginUser, { loading, error, data }] = useMutation(LOGIN_USER, {
        update(proxy, { data: { loginUser: userData }}) {
            mainContext.login(userData);
            routeChangeToHome();
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors);
        },

        variables: {
            input: {
                email: email,
                password: password,
            }
        }
    })

    let handleSubmit = async event => {
        event.preventDefault();

        try {
            loginUser();
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
                    <h2>{siteLanguage == "TR" ? "Hoş Geldiniz" : "Welcome"}</h2>
                    <span>{siteLanguage == "TR" ? "Hesabınızla oturum açabilirsiniz" : "You can login with your account"}</span>
                </div>
                <div className="input-group">
                    <div className={`input-holder ${darkMode ? "form-input-dark" : "form-input-light"}`}>
                        <FontAwesomeIcon icon={faEnvelope}/>
                        <input name={inputTypeA} type={inputTypeA} value={signInValues.email} onChange={handleChange} className="input-style input-btn" placeHolder={siteLanguage == "TR" ? "E-posta" : "E-mail"} required/>
                    </div>
                        <span className="notifier">{siteLanguage == "TR" ? "E-postanızı giriniz" : "Enter your e-mail"}</span>
                </div>
                <div className="input-group">
                    <div className={`input-holder ${darkMode ? "form-input-dark" : "form-input-light"}`}>
                        <FontAwesomeIcon icon={faLock}/>
                        <input name={inputTypeB} type={inputTypeB} value={signInValues.password} onChange={handleChange} className="input-style input-btn" placeHolder={siteLanguage == "TR" ? "Parola" : "Password"} required/>
                        </div>
                        <span className="notifier">{siteLanguage == "TR" ? "Parolanızı giriniz" : "Enter your password"}</span>
                </div>

                {/* <div id="userSelections">
                    <div>
                        <label>Beni Hatırla</label>
                        <input type="checkbox"/>
                    </div>
                    <a className={`${darkMode ? "logo-dark" : "logo-light"}`}>Parolamı Unuttum</a>
                </div> */}

                <input className={`input-style submit-btn ${darkMode ? "submit-btn-dark" : "submit-btn-light"}`} type="submit" value={siteLanguage == "TR" ? "GİRİŞ YAP" : "LOGIN"}/>

                <div className="group-holder">
                    <span>{siteLanguage == "TR" ? "Hesabınız yok mu?" : "You don't have an account?"}</span>
                    <button onClick={routeChange} className={`auth-btn ${darkMode ? "logo-dark nav-bg-dark" : "logo-light bg-light"}`}>{siteLanguage == "TR" ? "KAYDOL" : "REGISTER"}</button>
                </div>
            </form>
            <div>
                {errors ? errors.map(function(error){
                    <span>{error.message}</span>
                }) : ""}
            </div>
        </div>

    )

}