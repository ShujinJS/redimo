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
import { useMutation, gql } from "@apollo/client";

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
        }
    }
`

export default function FormGroupRegister(props){

    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;

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
        birthdate: ""
    });

    let {
        username,
        name,
        lastname,
        email,
        password,
        confirmedPassword,
        birthdate
    } = newUser;

    const [registerAUser, { loading, error, data }] = useMutation(REGISTER_USER, {
        variables: {
            input: {
                name: name,
                lastname: lastname,
                username: username,
                email: email,
                password: password,
                birthdate: birthdate
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
                birthdate: ""
            })

        } catch (err) {
            throw `${err.message} meydana geldi!`
            
        }
    }

    if(data) routeChange();



    return (
        
        <div id="registerFormHolder" className={`${darkMode ? "sidenav-bg-dark font-dark" : "sidenav-bg-light font-light"}`}>
            <form onSubmit={handleSubmit} className={`auth-form ${darkMode ? "font-dark nav-bg-dark" : "font-light bg-light"}`}> 

                <div className="form-header">
                    <h2>Hoş Geldiniz</h2>
                    <span>Hemen bir hesap açabilirsiniz</span>
                </div>

                <div className="form-input-group-holder">
                    <div className="input-group">
                        <div className={`input-holder ${darkMode ? "form-input-dark" : "form-input-light"}`}>
                            <input onChange={handleChange}
                            type={inputTypeA}
                            value={name} 
                            name="name"
                            className="input-style input-btn" 
                            placeHolder={placeholderA}/>
                        </div>
                        <div className={`input-holder ${darkMode ? "form-input-dark" : "form-input-light"}`}>
                            <input onChange={handleChange} name="lastname" 
                            type={inputTypeB}
                            value={lastname}
                            className="input-style input-btn" placeHolder={placeholderB}/>
                        </div>
                    </div>

                    <div className="input-group">
                        <div className={`input-holder ${darkMode ? "form-input-dark" : "form-input-light"}`}>
                            <input onChange={handleChange} name="username" 
                            type={inputTypeC} 
                            value={username}
                            className="input-style input-btn" placeHolder={placeholderC}/>
                        </div>
                        <span className="notifier">{placeholderC} giriniz</span>
                    </div>

                    <div className="input-group">
                        <div className={`input-holder ${darkMode ? "form-input-dark" : "form-input-light"}`}>
                            <input onChange={handleChange} 
                            name="email" 
                            type={inputTypeD} 
                            value={email}
                            className="input-style input-btn" placeHolder={placeholderD}/>
                        </div>
                    </div>

                    <div className="input-group">
                        <div className={`input-holder ${darkMode ? "form-input-dark" : "form-input-light"}`}>
                            <input onChange={handleChange} 
                            name="password" 
                            type={inputTypeE} 
                            value={password}
                            className="input-style input-btn" placeHolder={placeholderE}/>
                            </div>
                        <span className="notifier">{placeholderE} giriniz</span>
                    </div>

                    <div className="input-group">
                        <div className={`input-holder ${darkMode ? "form-input-dark" : "form-input-light"}`}>
                            <input onChange={handleChange} name="confirmedPassword" 
                            type={inputTypeF} 
                            value={confirmedPassword}
                            className="input-style input-btn" placeHolder={placeholderF}/>
                            </div>
                        <span ref={alertRef}className="notifier">Parolanızı Doğrulayın</span>
                    </div>

                    <div className="input-group">
                        <div className={`input-holder ${darkMode ? "form-input-dark" : "form-input-light"}`}>
                            <input onChange={handleChange} 
                            name="birthdate" 
                            type={inputTypeG} 
                            value={birthdate}
                            className="input-style input-btn" placeHolder={placeholderG}/>
                        </div>
                    </div>
                </div>

                <input onClick={handleSubmit} name="birthDate" type="submit" value="KAYDOL" className={`input-style submit-btn ${darkMode ? "submit-btn-dark" : "submit-btn-light"}`}/>

                <div className="group-holder">
                    <span>Hesabınız var mı?</span>
                    <button onClick={routeChange} className={`auth-btn ${darkMode ? "logo-dark nav-bg-dark" : "logo-light bg-light"}`}>
                        GİRİŞ YAP</button>
                </div>

            </form>
        </div>

    )

}