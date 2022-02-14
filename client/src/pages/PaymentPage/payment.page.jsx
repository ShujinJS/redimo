import React, { useState, useEffect, useContext } from "react";
// Styling
import "./payment.page.style.scss";
// Components
import CheckoutForm from "../../components/check-out-form.component/checkoutform.component";
// Context API
import { MainContext } from '../../context/main-context/main.context';
// Redux
import { connect } from "react-redux";
import * as actions from "../../redux/_actions/actions";
// Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe("pk_test_51IBJzvKzA4mHj1eh50NieY3FhIyQCiOWNqVUi6jROlqRxRGG7lJZadHxJsAJcPlTyAleKOxhpO4ODQ0SA1haMAAC00yoTZRFrf");

function PaymentPage(props) {

    const { cartItems } = props;
    const [clientSecret, setClientSecret] = useState("");

    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;
    const siteLanguage = mainContext.state.siteLanguage;

    useEffect(() => {
        
        if(cartItems){
            fetch("/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: cartItems }),
              })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret));
        }

    }, [cartItems]);

    var cartTotal = 0;
    var shopTotal = 0;
    
    if(cartItems){
        cartItems.map(item => {
        let { price, discount } = item;
        
        let shopPrice = Number(price);
        let intPrice = Number(price).toFixed(2)
        // Decimal (xx,x)
        let newPrice = new Intl.NumberFormat().format(shopPrice);
        // İndirim varsa düşür
        let discountedPrice = Number(shopPrice - (shopPrice * (discount / 100))).toFixed(2);
        // Decimal (xx,x)
        let intDiscountedPrice = new Intl.NumberFormat().format(discountedPrice);
        let shopDiscountedPrice = Number(discountedPrice);
        // Virgülden sonra iki sayıya sabitle
        cartTotal = Number((cartTotal + shopDiscountedPrice).toFixed(2));
        // Noktayı virgüle çevir, virgülden sonra 2 sayıya sabitle
        shopTotal = Number((cartTotal + 9.90).toFixed(2))
        })
    };

    const appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div id="checkoutContainer" className={`${darkMode ? "nav-bg-dark" : "bg-light"}`}>
            <div id="checkoutTotalContainer">
                <span className={`${darkMode ? "font-dark" : "font-light"}`}>{siteLanguage == "TR" ? "Sipariş Tutarı" : "Order Total"}</span>
                <span className={`${darkMode ? "theme-btn-light" : "theme-btn-dark"}`}>{shopTotal} ₺</span>
                <span className="payment-danger">{siteLanguage == "TR" ? "Güvenliğiniz için gerçek kart bilgisi kullanmayınız! " : "For your safety do not use your real card informations!"}</span>
                <span className={`${darkMode ? "font-dark" : "font-light"}`}>{siteLanguage == "TR" ? "Ödeme başarılı sonuçlanır: " : "Payment succeeds: "}</span>
                <span className={`${darkMode ? "theme-btn-light" : "theme-btn-dark"}`}>4242 4242 4242 4242</span>
                <span className={`${darkMode ? "font-dark" : "font-light"}`}>{siteLanguage == "TR" ? "Ödeme reddedilir: " : "Payment is declined: "}</span>
                <span className={`${darkMode ? "theme-btn-light" : "theme-btn-dark"}`}>4000 0000 0000 9995</span>

            </div>
            <div id="checkoutCartContainer">
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )}
            </div>
        </div>
    )
}

function mapStateToProps ( state ) {
    let { cartItems } = state.cartReducer;
    return { cartItems };
}

const mapDispatchToProps = {
    showToastAction: actions.toastActions.showToastAction,
    closeToastAction: actions.toastActions.closeToastAction
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage);