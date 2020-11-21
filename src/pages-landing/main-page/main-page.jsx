import React, {useEffect, useState} from 'react';
import "./main-page.css";
import Stocks from "../../components-landing/stock/stock";
import { Spin } from "antd";
import CategoryCard from '../../components-landing/category-card/category-card';
import { CategoryService } from '../../services/category.service';

const MainPage = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        CategoryService.get().then((res) => {
            setCategories(res.data);
        }).then(() => {
            setLoading(false);
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