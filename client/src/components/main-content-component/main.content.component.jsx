import React, { useContext } from 'react'
import './main.content.component.style.scss'
// Logos
import siteLogo from "../../logos/sitelogo.png";
import userLogo from "../../logos/userlogo.png";
// Routing
import { Routes, Route } from "react-router-dom";
// Pages
import LoginPage from '../../pages/AuthPage/login/login.component'
import RegisterPage from '../../pages/AuthPage/register/register.component'
import CategoriesPage from '../../pages/CategoriesPage/categories.page';
import MoviesPage from '../../pages/MoviesPage/movies.page';
import BooksPage from '../../pages/BooksPage/books.page';
import ClothesPage from '../../pages/ClothesPage/clothes.page';
import CollectionsPage from '../../pages/CollectionsPage/collections.page';
import ProductDetailPage from '../../pages/ProductDetailPage/product.detail.page';
import CartPage from '../../pages/CartPage/cart.page';
import PaymentPage from '../../pages/PaymentPage/payment.page';
// Components
import ToastComponent from '../toast-component/toast.component';
// ContextAPI
import { MainContext } from '../../context/main-context/main.context';
import SpinnerComponent from '../spinner-component/spinner.component';

export default function MainContentComponent() {

    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;

    return (
        <div id="mainContentContainer" className={`${darkMode ? "bg-dark" : ""}`}>
        <Routes>
            <Route path="/" exact element={<CollectionsPage/>}></Route>
            <Route path="/login" element={<LoginPage userLogo={userLogo}/>}></Route>
            <Route path="/register" element={<RegisterPage/>}></Route>
            <Route path="/categories" element={<CategoriesPage/>}/>
            <Route path="/movies" element={<MoviesPage/>}/>
            <Route path="/books" element={<BooksPage/>}/>
            <Route path="/clothing" element={<ClothesPage/>}/>
            <Route path="/collections" element={<CollectionsPage/>}/>
            <Route path="/collections/:id" element={<ProductDetailPage/>}></Route>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/checkout" element={<PaymentPage/>}/>
        </Routes>
        <ToastComponent/>
        <SpinnerComponent/>
        </div>

    )
}
