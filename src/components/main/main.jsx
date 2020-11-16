import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Orders from "../../pages/orders/orders";
import Categories from "../../pages/categories/categories";
import Subcategories from "../../pages/subcategories/subcategories";
import EditCategory from "../../pages/categories/edit-category";
import EditSubcategory from "../../pages/subcategories/edit-subcategory";
import Products from "../../pages/products/products";
import EditProducts from "../../pages/products/edit-product";
import "./main.css";

const Main = () => (
    <main>
        <Switch>
            <Redirect exact path="/" to="/orders"/>
            <Route exact path="/orders" component={ Orders }/>
            <Route exact path="/categories" component={ Categories }/>
            <Route exact path="/categories/:id" component={ EditCategory }/>
            <Route exact path="/subcategories" component={ Subcategories }/>
            <Route exact path="/subcategories/:id" component={ EditSubcategory }/>
            <Route exact path="/products" component={ Products }/>
            <Route exact path="/products/:id" component={ EditProducts }/>
        </Switch>
    </main>
)

export default Main;