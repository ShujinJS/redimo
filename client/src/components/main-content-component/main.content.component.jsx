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
import CategoriesPage from '../../pages/CategoriesPage/categories.page';
import MoviesPage from '../../pages/MoviesPage/movies.page';
import BooksPage from '../../pages/BooksPage/books.page';
import ClothesPage from '../../pages/ClothesPage/clothes.page';
import CollectionsPage from '../../pages/CollectionsPage/collections.page';
import ProductDetailPage from '../../pages/ProductDetailPage/product.detail.page';
import CartPage from '../../pages/CartPage/cart.page';

export default function MainContentComponent() {
    return (
        <Routes>
            <Route path="/productdetail/:id" element={<ProductDetailPage/>}></Route>
            <Route path="/login" element={<LoginPage userLogo={userLogo}/>}></Route>
            <Route path="/register" element={<RegisterPage/>}></Route>
            <Route path="/categories" element={<CategoriesPage/>}/>
            <Route path="/movies" element={<MoviesPage/>}/>
            <Route path="/books" element={<BooksPage/>}/>
            <Route path="/clothing" element={<ClothesPage/>}/>
            <Route path="/collections" element={<CollectionsPage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/newproduct" element={<HomePage/>}/>
        </Routes>
    )
}
