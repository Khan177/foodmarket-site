import React, { useEffect, useState } from 'react';
import { CategoryService, SubCategoryService } from '../../services/category.service';
import { withRouter, matchPath } from "react-router-dom";
import { Spin } from "antd";
import CategoryCard from '../../components-landing/category-card/category-card';

const Category = ({ history }) => {

    const id = matchPath(history.location.pathname, { path: '/categories/:id' }).params.id;

    const [subcategories, setSubcategories] = useState([]);
    const [category, setCategory] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        SubCategoryService.get().then((res) => {
            setSubcategories(res.data.filter(subcat => subcat.categoryId == id));
            CategoryService.getById(id).then((res) => {
                setCategory(res.data);
            })
            .then(() => setLoading(false))
        })
    },[])

    return(
        loading ? <Spin/> : 
        <div className="category-section">
            <h1 style={{ textAlign: 'center', backgroundColor: 'rgba(235, 87, 87, 0.7)', padding: '2% 0', color: 'white', fontWeight: 'bold' }}>{ category.name }</h1>
            <CategoryCard categories={subcategories} goTo={"subcategories"}/>
        </div>
    )
}

export default withRouter(Category);