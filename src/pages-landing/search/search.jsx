import React, { useState, useEffect } from 'react';
import { withRouter, matchPath } from "react-router-dom";
import { Spin } from "antd";
import ProductCard from "../category/product-card"
import { useSelector } from 'react-redux';

const Search = ({ history }) => {
    const [ products, setProducts ] = useState([]);
    const [subcategory, setSubcategory] = useState({name: "Поиск"});
    const allProducts = useSelector(state => state.allProducts);
    const name = useSelector(state => state.searchName);

    useEffect(() => {
        !name && history.push("/");
        setProducts(allProducts.filter(prod => prod.name.toLowerCase().includes(name.toLowerCase())))
    },[name])
    return(
        <div className="subcategory-landing">
            <h1 style={{ textAlign: 'center', backgroundColor: 'rgba(235, 87, 87, 0.7)', padding: '2% 0', color: 'white', fontWeight: 'bold' }}>{ subcategory.name }</h1>
            <ProductCard products={products}/>
        </div>
    )
}

export default withRouter(Search);