import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => (
    <header className="admin-header">
        <img style={{ width: '200px' }} src="/assets/logo.png" alt=""/>
        <nav>
            <Link to="/admin/orders">
                <Button size="large">
                    Заказы
                </Button>
            </Link>
            <Link to="/admin/addresses">
                <Button size="large">
                    Районы
                </Button>
            </Link>
            <Link to="/admin/categories">
                <Button  size="large">
                    Категории
                </Button>
            </Link>
            <Link to="/admin/subcategories">
                <Button  size="large">
                    Подкатегории
                </Button>
            </Link>
            <Link to="/admin/products">
                <Button size="large">
                    Товары
                </Button>
            </Link>
        </nav>
    </header>
);

export default Header;