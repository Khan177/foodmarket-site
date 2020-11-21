import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "../header/header";
import Orders from "../../pages/orders/orders";
import Categories from "../../pages/categories/categories";
import Subcategories from "../../pages/subcategories/subcategories";
import EditCategory from "../../pages/categories/edit-category";
import EditSubcategory from "../../pages/subcategories/edit-subcategory";
import Products from "../../pages/products/products";
import EditProducts from "../../pages/products/edit-product";
import "./main.css";
import Addresses from "../../pages/addresses/addresses";
import EditAddress from "../../pages/addresses/edit-address";

const Main = () => (
    <div>
        <Header/>
        <main>
            <Switch>
                <Redirect exact path="/admin" to="/admin/orders"/>
                <Route exact path="/admin/addresses" component={ Addresses }/>
                <Route exact path="/admin/addresses/:id" component={ EditAddress }/>
                <Route exact path="/admin/orders" component={ Orders }/>
                <Route exact path="/admin/categories" component={ Categories }/>
                <Route exact path="/admin/categories/:id" component={ EditCategory }/>
                <Route exact path="/admin/subcategories" component={ Subcategories }/>
                <Route exact path="/admin/subcategories/:id" component={ EditSubcategory }/>
                <Route exact path="/admin/products" component={ Products }/>
                <Route exact path="/admin/products/:id" component={ EditProducts }/>
            </Switch>
        </main>
    </div>
)

export default Main;