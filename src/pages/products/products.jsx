import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Button, Table, Spin } from "antd";
import { ProductsService } from "../../services/products.service";
import { SubCategoryService } from "../../services/category.service";
import "./products.css";

const Products = ({ history }) => {

    const [products, setProducts] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        SubCategoryService.get().then((res) => {
            setSubcategories(res.data);
            ProductsService.get().then((res) => {
                setProducts(res.data);
            }).then(() => setLoading(false))
        })
    },[])

    const columns = [
        {
            title: "Продукт",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Подкатегория",
            dataIndex: "subcategoryId",
            key: "subcategoryId",
            render: (id) => subcategories.filter(cat => cat._id == id)[0].name
        },
        {
            title: "Цена",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Действие",
            dataIndex: "_id",
            key:"_id",
            render: (id) => (
                <div>
                    <Button type="primary" onClick={() => {
                        history.push(`/products/${ id }`)
                    } }>
                        Изменить
                    </Button>
                    <Button danger type="primary" onClick={() => {
                        setLoading(true);
                        ProductsService.delete(id).then((res) => {
                            ProductsService.get().then(res => {
                                setProducts(res.data);
                                setLoading(false);
                            })
                        });
                    } }>
                        Удалить
                    </Button>
                </div>
            )
        }
    ]
    return(
        !loading ? <div className="section">
            <Button style={{ marginBottom: "10px" }} type="primary" onClick={() => history.push("/products/new")}>
                Создать
            </Button>
            <Table dataSource={ products } columns={ columns } />
        </div> : <Spin/>
    )
}

export default withRouter(Products);