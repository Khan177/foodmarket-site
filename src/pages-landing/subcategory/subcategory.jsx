import React, { useState, useEffect } from 'react';
import { ProductsService } from '../../services/items.service';
import { withRouter, matchPath } from "react-router-dom";
import { Spin } from "antd";
import { SubCategoryService } from '../../services/category.service';
import ProductCard from "../category/product-card";
import "./subcategory.css"

const Subcategory = ({ history }) => {
    const [ products, setProducts ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [subcategory, setSubcategory] = useState({});

    const id = matchPath(history.location.pathname, { path: '/subcategories/:id' }).params.id;

    useEffect(() => {
        ProductsService.get().then((res) => {
            setProducts(res.data.filter(prod => prod.subcategoryId == id));
            SubCategoryService.getById(id).then((res) => {
                setSubcategory(res.data);
            }).then(() => {
            setLoading(false);
        })
        })
    },[])
    return(
        loading ? <Spin/>:
        <div className="subcategory-landing">
            <h1 style={{ textAlign: 'center', backgroundColor: 'rgba(235, 87, 87, 0.7)', padding: '2% 0', color: 'white', fontWeight: 'bold' }}>{ subcategory.name }</h1>
            <ProductCard products={products}/>
        </div>
    )
}

export default withRouter(Subcategory);