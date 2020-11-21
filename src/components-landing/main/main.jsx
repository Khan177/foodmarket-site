import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../header/header";
import MainPage from "../../pages-landing/main-page/main-page";
import "./main.css";
import AboutUs from "../../pages-landing/about-us/about-us";
import Category from "../../pages-landing/category/category"
import Footer from "../footer/footer";
import Subcategory from "../../pages-landing/subcategory/subcategory";
import { useSelector } from "react-redux";
import Selected from "../../pages-landing/selected/selected";
import HeaderMobile from "../header/header-mobile";

const Main = () => {
    const showSelected = useSelector(state => state.showSelected)
    return(
    <div style={{position: 'relative'}}>
        { window.innerWidth > 1200 ? <Header/> : <HeaderMobile/>}
        <main style={{minHeight: '70vh'}}>
            <Switch>
                <Route exact path="/" component={ MainPage }/>
                <Route exact path="/about-us" component={ AboutUs }/>
                <Route exact path="/categories/:id" component={ Category }/>
                <Route exact path="/subcategories/:id" component={ Subcategory }/>
                <Route exact path="/selected" component={ Selected }/>
            </Switch>
        </main>
        <Footer/>
    </div>
)
    }
export default Main;