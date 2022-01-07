import {useState, useEffect, useRef} from "react";

import "./register_form.component.style.scss";

// Routing
import {Link} from "react-router-dom"

// Components
// import DatePick from "./date_picker/date_picker.component";

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope, faUser, faCamera } from  "@fortawesome/free-solid-svg-icons";
import { auth, createUserProfileDocument } from "../../../../firebase/firebase.utils";

export default function FormGroupRegister(props){

    let {imageUrl, config} = props;

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
        placeholderF
    } = config;

    const alertRef = useRef();

    useEffect(() => {
        const passAlertRef = alertRef.current;
    }, [])

    let [newUser, setNewUser] = useState({
        displayName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmedPassword: "",
        birthDate: ""
    });

    let {
        displayName,
        firstName,
        lastName,
        email,
        password,
        confirmedPassword,
        birthDate
    } = newUser;

    let handleSubmit = async event => {
        event.preventDefault();



       if(password!==confirmedPassword) {
            alert("Parola Eşleşmiyor!");
            console.log(password)
            console.log(confirmedPassword)
            console.log(email)
            console.log(firstName)
            console.log(lastName)

           return;
       }

       try {
            // İlgili methodla, kullanıcının girdiği email ve password datasıyla birlikte yeni bir user oluşturuluyor
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, {displayName});

            // Formu temizlemek için
            setNewUser({
                displayName: "",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmedPassword: "",
                birthDate: ""
            })

       } catch (error) {
            throw `${error.message} meydana geldi!`
       }

       console.log(email)
        
    }

    let handleChange = event => {
        const {value, name} = event.target;
        // ...newUser ile diğer property'ler gönderilmeli, aksi durumda sadece dinamik property set edilecek, diğerleri silinecek.
        setNewUser({...newUser, [name]: value})
        console.log(name, value)
        console.log(newUser)
    }

    return (
        
        <div id="registerFormHolder">
            <form onSubmit={handleSubmit}> 
                <div id="userAvatar">
                    <img src={imageUrl}/>
                    <div className="image-picker">

                    </div>
                </div>
                <div className="form-header">
                    <h2>Hoş Geldiniz</h2>
                    <span>Hemen bir hesap açabilirsiniz</span>
                </div>

                <div className="input-group-b">
                    <div className="input-holder-b">
                        <input onChange={handleChange}
                         type={inputTypeA}
                         value={firstName} 
                         name="firstName"
                         className="input-style input-btn" 
                         placeHolder={placeholderA}/>
                    </div>
                    <div className="input-holder-b">
                        <input onChange={handleChange} name="lastName" 
                        type={inputTypeB}
                        value={lastName}
                        className="input-style input-btn" placeHolder={placeholderB}/>
                    </div>
                </div>

                <div className="input-group">
                    <div className="input-holder">
                        <input onChange={handleChange} name="displayName" 
                        type={inputTypeC} 
                        value={displayName}
                        className="input-style input-btn" placeHolder={placeholderC}/>
                    </div>
                    <span className="notifier">{placeholderC} giriniz</span>
                </div>

                <div className="input-group">
                    <div className="input-holder">
                        <input onChange={handleChange} 
                        name="email" 
                        type={inputTypeD} 
                        value={email}
                        className="input-style input-btn" placeHolder={placeholderD}/>
                    </div>
                </div>

                <div className="input-group">
                    <div className="input-holder">
                        <input onChange={handleChange} 
                        name="password" 
                        type={inputTypeE} 
                        value={password}
                        className="input-style input-btn" placeHolder={placeholderE}/>
                        </div>
                    <span className="notifier">{placeholderE} giriniz</span>
                </div>

                <div className="input-group">
                    <div className="input-holder">
                        <input onChange={handleChange} name="confirmedPassword" 
                        type={inputTypeF} 
                        value={confirmedPassword}
                        className="input-style input-btn" placeHolder={placeholderF}/>
                        </div>
                    <span ref={alertRef}className="notifier">Parolanızı Doğrulayın</span>
                </div>

                <div className="date-input">
                    <p>Doğum Tarihiniz</p>
                    {/** 
                     * <DatePick/>
                    */}
                </div>

                <input id="submitBtn" className="input-style" name="birthDate" type="submit" value="KAYDOL"/>
                <div className="group-holder">
                    <span>Hesabınız var mı?</span>
                    <Link to="login">
                        <button className="signInBtn">
                        GİRİŞ YAP</button>
                    </Link>
                </div>
            </form>
        </div>

    )

}