import React from 'react'
import './main.content.component.style.scss'
// Logos
import siteLogo from "../../logos/sitelogo.png";
import userLogo from "../../logos/userlogo.png";
// Routing
import { Routes, Route } from "react-router-dom";
// Pages
import LoginPage from '../../pages/AuthPage/login/login.component'
import RegisterPage from '../../pages/AuthPage/register/register.component'
import HomePage from '../../pages/HomePage/home.page';
import MoviesPage from '../../pages/MoviesPage/movies.page';
import ProductDetailPage from '../../pages/ProductDetailPage/product.detail.page';

export default function MainContentComponent() {
    return (
        <Routes>
            <Route path="/productdetail/:id" element={<ProductDetailPage/>}></Route>
            <Route path="/movies" element={<MoviesPage/>}/>
            <Route path="/login" element={<LoginPage userLogo={userLogo}/>}></Route>
            <Route path="/register" element={<RegisterPage/>}></Route>
        </Routes>
    )
}
