import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => (
    <header>
        <img src="/assets/logo.png" alt=""/>
        <nav>
            <Link to="/orders">
                <Button size="large">
                    Заказы
                </Button>
            </Link>
            <Link to="/categories">
                <Button  size="large">
                    Категории
                </Button>
            </Link>
            <Link to="/subcategories">
                <Button  size="large">
                    Подкатегории
                </Button>
            </Link>
            <Link to="/products">
                <Button size="large">
                    Товары
                </Button>
            </Link>
        </nav>
    </header>
);

export default Header;