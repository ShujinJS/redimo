import { useState, useEffect, useRef, useContext } from "react";
// Styling
import "./register_form.component.style.scss";
import "../../../../components/theme/theme.component.style.scss";
import "../../../../scss/authentication/authentication.common.style.scss";
// ContextAPI
import { MainContext } from "../../../../context/main-context/main.context";
// Routing
import { useNavigate } from "react-router-dom"
// Apollo
// import { useMutation, gql } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "graphql-tag"
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope, faUser, faCamera } from  "@fortawesome/free-solid-svg-icons";
import { auth, createUserProfileDocument } from "../../../../firebase/firebase.utils";


const REGISTER_USER = gql`
    mutation ($input: RegisterInput) {
        registerUser(input: $input) {
            name
            lastname
            username
            email
            password
            birthdate
            token
        }
    }
`

export default function FormGroupRegister(props){

    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;
    const siteLanguage = mainContext.state.siteLanguage;

    // Routing
    const navigate = useNavigate();
    const routeChange = () => {
        let path = `/login`;
        navigate(path);
    }

    let {config} = props;

    let {
        inputTypeA, 
        placeholderA, 
        inputTypeB, 
        placeholderB, 
        inputTypeC, 
        placeholderC,
        inputTypeD, 
        placeholderD,
        inputTypeE, 
        placeholderE,
        inputTypeF, 
        placeholderF,
        inputTypeG,
        placeholderG
    } = config;

    // Parola Doğrulama İfadesi
    const alertRef = useRef();
    const passAlertRef = alertRef.current;

    useEffect(() => {
    }, [])

    let [newUser, setNewUser] = useState({
        username: "",
        name: "",
        lastname: "",
        email: "",
        password: "",
        confirmedPassword: "",
        birthdate: "",
        address: ""
    });

    let {
        username,
        name,
        lastname,
        email,
        password,
        confirmedPassword,
        birthdate,
        address
    } = newUser;

    const [errors, setErrors] = useState([])

    const [registerAUser, { loading, error, data }] = useMutation(REGISTER_USER, {
        update(proxy, { data: { registerAUser: userData }}) {
            mainContext.login(userData);
            routeChange();
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors);
        },

        variables: {
            input: {
                name: name,
                lastname: lastname,
                username: username,
                email: email,
                password: password,
                birthdate: birthdate,
                address: address
            }
        }
    })

    let handleChange = event => {
        const {value, name} = event.target;
        // ...newUser ile diğer property'ler gönderilmeli, aksi durumda sadece dinamik property set edilecek, diğerleri silinecek.
        setNewUser({...newUser, [name]: value})

    }

    let handleSubmit = async event => {
        event.preventDefault();

        // Parolalar Eşleşmiyorsa uyarı ver
        if(password!==confirmedPassword) {
            passAlertRef.innerHTML = "Parola Eşleşmedi!"
            passAlertRef.style.color = "red";
            return;
        }

        // Parolalar eşleşiyorsa kullanıcıyı kaydet, formu sıfırla, login ekranına götür
        try {
            registerAUser();
            // Formu temizlemek için
            setNewUser({
                username: "",
                name: "",
                lastname: "",
                email: "",
                password: "",
                confirmedPassword: "",
                birthdate: "",
                address: ""
            });
            routeChange();


        } catch (err) {
            throw `${err.message} meydana geldi!`
            
        }
    }

    



    return (
        
        <div id="registerFormHolder" className={`${darkMode ? "sidenav-bg-dark font-dark" : "sidenav-bg-light font-light"}`}>
            <form onSubmit={handleSubmit} className={`auth-form ${darkMode ? "font-dark nav-bg-dark" : "font-light bg-light"}`}> 

                <div className="form-header">
                    <h2>{siteLanguage == "TR" ? "Hoş Geldiniz" : "Welcome"}</h2>
                    <span>{siteLanguage == "TR" ? "Hemen bir hesap açabilirsiniz!" : "You can create an account right away!"}</span>
                </div>

                <div className="form-input-group-holder">
                    <div className="input-group">
                        <div className={`input-holder ${darkMode ? "form-input-dark" : "form-input-light"}`}>
                            <input onChange={handleChange}
                            type={inputTypeA}
                            value={name} 
                            name="name"
                            className="input-style input-btn" 
                            placeHolder={siteLanguage == "TR" ? "Ad" : "Name"}/>
                        </div>
                        <div className={`input-holder ${darkMode ? "form-input-dark" : "form-input-light"}`}>
                            <input onChange={handleChange} 
                            name="lastname" 
                            type={inputTypeB}
                            value={lastname}
                            className="input-style input-btn" 
                            placeHolder={siteLanguage == "TR" ? "Soyad" : "Lastname"}/>
                        </div>
                    </div>

                    <div className="input-group">
                        <div className={`input-holder ${darkMode ? "form-input-dark" : "form-input-light"}`}>
                            <input onChange={handleChange} 
                            name="username" 
                            type={inputTypeC} 
                            value={username}
                            className="input-style input-btn" 
                            placeHolder={siteLanguage == "TR" ? "Kullanıcı adı" : "Username"}/>
                        </div>
                        <span className="notifier">{siteLanguage == "TR" ? "Kullanıcı adınızı giriniz" : "Enter your username"}</span>
                    </div>

                    <div className="input-group">
                        <div className={`input-holder ${darkMode ? "form-input-dark" : "form-input-light"}`}>
                            <input onChange={handleChange} 
                            name="email" 
                            type={inputTypeD} 
                            value={email}
                            className="input-style input-btn" 
                            placeHolder={siteLanguage == "TR" ? "E-posta" : "E-mail"}/>
                        </div>
                    </div>

                    <div className="input-group">
                        <div className={`input-holder ${darkMode ? "form-input-dark" : "form-input-light"}`}>
                            <input onChange={handleChange} 
                            name="password" 
                            type={inputTypeE} 
                            value={password}
                            className="input-style input-btn" 
                            placeHolder={siteLanguage == "TR" ? "Parola" : "Password"}/>
                            </div>
                        <span className="notifier">{siteLanguage == "TR" ? "Parolanızı giriniz" : "Enter your password"}</span>
                    </div>

                    <div className="input-group">
                        <div className={`input-holder ${darkMode ? "form-input-dark" : "form-input-light"}`}>
                            <input onChange={handleChange} 
                            name="confirmedPassword" 
                            type={inputTypeF} 
                            value={confirmedPassword}
                            className="input-style input-btn" 
                            placeHolder={siteLanguage == "TR" ? "Parola doğrula" : "Confirm password"}/>
                            </div>
                        <span ref={alertRef}className="notifier">{siteLanguage == "TR" ? "Parolanızı doğrulayın" : "Confirm your password"}</span>
                    </div>

                    <div className="input-group">
                        <div className={`input-holder ${darkMode ? "form-input-dark" : "form-input-light"}`}>
                            <input onChange={handleChange} 
                            name="birthdate" 
                            type={inputTypeG} 
                            value={birthdate}
                            className="input-style input-btn" 
                            placeHolder={siteLanguage == "TR" ? "Doğum tarihi" : "Birth date"}/>
                        </div>
                    </div>

                    <div className="input-group">
                        <div className={`input-holder ${darkMode ? "form-input-dark" : "form-input-light"}`}>
                            <input onChange={handleChange} 
                            name="address" 
                            type="text" 
                            value={address}
                            className="input-style input-btn" 
                            placeHolder={siteLanguage == "TR" ? "Adres" : "Address"}/>
                        </div>
                    </div>
                </div>

                <input onClick={handleSubmit} type="submit" value={siteLanguage == "TR" ? "KAYDOL" : "REGISTER"} className={`input-style submit-btn ${darkMode ? "submit-btn-dark" : "submit-btn-light"}`}/>

                <div className="group-holder">
                    <span>{siteLanguage == "TR" ? "Hesabınız var mı?" : "Do you have an account?"}</span>
                    <button onClick={routeChange} className={`auth-btn ${darkMode ? "logo-dark nav-bg-dark" : "logo-light bg-light"}`}>
                    {siteLanguage == "TR" ? "GİRİŞ YAP" : "LOGIN"}</button>
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