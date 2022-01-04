import "./login.component.style.scss";

import FormGroup from "./login_form/login_form.component";

export default function LoginPage(props){
    let {userLogo} = props;

    return (
        <section>
            <div id="bg">
                <FormGroup imageUrl={userLogo} inputTypeA="email" placeholderA="E-posta" inputTypeB="password" placeholderB="Parola"/>
            </div>
        </section>
    )
}