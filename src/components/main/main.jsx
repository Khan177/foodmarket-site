import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Input, Button } from "antd";
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

const Main = () => {
    const [userToken,setUserToken] = useState(sessionStorage.getItem('token'));
    const [error, setError] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const signin = () => {
        if(name && password){
            if((name!="user" || password!="user") && (name!="admin" || password!="mysecretword"))
                setError(true);
            else{
                if(name == 'user' && password == "user"){
                    sessionStorage.setItem('token', "user");
                    setUserToken("user")
                }
                else{
                    sessionStorage.setItem('token', "mashallah");
                    setUserToken("mashallah")
                }
            }
        }
        else{
            setError(true);
        }
    }

    return (
        <div>
            {userToken && <Button onClick={() => { setUserToken(""); sessionStorage.removeItem('token') }}>Выйти</Button>}
            <Header/>
            {userToken && <main>
                <Switch>
                    <Redirect exact path="/admin" to="/admin/orders"/>
                    {userToken == 'mashallah' && <Route exact path="/admin/addresses" component={ Addresses }/>}
                    {userToken == 'mashallah' && <Route exact path="/admin/addresses/:id" component={ EditAddress }/>}
                    <Route exact path="/admin/orders" component={ Orders }/>
                    {userToken == 'mashallah' && <Route exact path="/admin/categories" component={ Categories }/>}
                    {userToken == 'mashallah' && <Route exact path="/admin/categories/:id" component={ EditCategory }/>}
                    {userToken == 'mashallah' && <Route exact path="/admin/subcategories" component={ Subcategories }/>}
                    {userToken == 'mashallah' && <Route exact path="/admin/subcategories/:id" component={ EditSubcategory }/>}
                    {userToken == 'mashallah' && <Route exact path="/admin/products" component={ Products }/>}
                    {userToken == 'mashallah' && <Route exact path="/admin/products/:id" component={ EditProducts }/>}
                </Switch>
            </main>}
            {!userToken && <div style={{marginTop: '20px',marginLeft: '50px',width: '50%'}}>
                    <Input style={{marginBottom: '20px'}} type="text" placeholder="Имя пользователя" onChange={(e) => {
                        setError(false);
                        setName(e.target.value);
                    }}/>
                    <Input style={{marginBottom: '20px'}} type="password" placeholder="Пароль" onChange={(e) => {
                        setError(false);
                        setPassword(e.target.value);
                    }}/>
                    {error && <p>Неверный логин или пароль!</p>}
                    <Button onClick={() => signin()}>Войти</Button>
                </div>}
        </div>
    )
}

export default Main;