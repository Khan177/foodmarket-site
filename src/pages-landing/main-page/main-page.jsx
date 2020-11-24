import React, {useEffect, useState} from 'react';
import "./main-page.css";
import Stocks from "../../components-landing/stock/stock";
import { Spin } from "antd";
import CategoryCard from '../../components-landing/category-card/category-card';
import { CategoryService } from '../../services/category.service';
import { ProductsService } from '../../services/items.service';
import { useDispatch } from "react-redux";
import { setAllProducts } from '../../store/actions';

const MainPage = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        CategoryService.get().then((res) => {
            setCategories(res.data);
        }).then(() => {
            setLoading(false);
        })
        ProductsService.get().then((res) => {
            dispatch(setAllProducts(res.data));
        })
    },[])

    return(
        <div className="main-page">
            <Stocks/>
            {loading ? <Spin/> : <CategoryCard categories={categories} goTo={ "categories" } />}
        </div>
    )
}

export default MainPage;