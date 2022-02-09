import "./register.component.style.scss";

import FormGroupRegister from "./register_form/register_form.component";

export default function RegisterPage(props){
    let {userLogo} = props;
    let config = {
        inputTypeA: "text",
        placeholderA: "Ad",
        inputTypeB: "text",
        placeholderB:"Soyad",
        inputTypeC: "text",
        placeholderC:"Kullanıcı adı",
        inputTypeD: "email",
        placeholderD:"E-posta",
        inputTypeE: "password",
        placeholderE:"Parola",
        inputTypeF: "password",
        placeholderF:"Parola Doğrula",
        inputTypeG: "text",
        placeholderG: "Doğum Tarihi"
    }

    return (
        <section>
            <div id="bg">
                <FormGroupRegister imageUrl={userLogo} config={config}/>
            </div>
        </section>
    )
}