import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
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
import Search from "../../pages-landing/search/search";
import Draggable from "react-draggable";
import { ShoppingCartOutlined } from "@ant-design/icons";

const Main = ({history}) => {
    const showSelected = useSelector(state => state.showSelected)
    return(
    <div style={{position: 'relative'}}>
        { window.innerWidth > 1200 ? <Header/> : <HeaderMobile/>}
        <Draggable><div onClick={() => {  history.push('/selected') }} style={{ width: '50px', height: '50px', backgroundColor: '#6FCF97', borderRadius: '50%', display: 'flex', cursor: 'pointer', alignItems: 'center', justifyContent: 'center'}}><ShoppingCartOutlined style={{fontSize: '30px', color: 'white'}}/></div></Draggable>
        <main style={{minHeight: '70vh'}}>
            <Switch>
                <Route exact path="/" component={ MainPage }/>
                <Route exact path="/about-us" component={ AboutUs }/>
                <Route exact path="/categories/:id" component={ Category }/>
                <Route exact path="/subcategories/:id" component={ Subcategory }/>
                <Route exact path="/selected" component={ Selected }/>
                <Route exact path="/search" component={ Search }/>
            </Switch>
        </main>
        <Footer/>
    </div>
)
    }
export default withRouter(Main);