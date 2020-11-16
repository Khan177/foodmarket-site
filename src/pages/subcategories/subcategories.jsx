import React, { useState, useEffect } from 'react';
import { CategoryService, SubCategoryService } from "../../services/category.service";
import { withRouter } from "react-router-dom";
import { Button, Table, Spin } from "antd";

const Subcategories = ({ history }) => {

    const [subcategories, setSubcategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        SubCategoryService.get().then((res) => {
            setSubcategories(res.data);
            CategoryService.get().then((res) => {
                setCategories(res.data);
            }).then(() => setLoading(false))
        })
    },[])

    const columns = [
        {
            title: "Подкатегория",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Категория",
            dataIndex: "categoryId",
            key:"_id2",
            render: (id) => (categories.filter(category => category._id === id)[0].name)
        },
        {
            title: "Действие",
            dataIndex: "_id",
            key:"_id",
            render: (id) => (
                <div>
                    <Button type="primary" onClick={() => {
                        history.push(`/subcategories/${ id }`)
                    } }>
                        Изменить
                    </Button>
                    <Button danger type="primary" onClick={() => {
                        setLoading(true);
                        SubCategoryService.delete(id).then((res) => {
                            SubCategoryService.get().then(res => {
                                setSubcategories(res.data);
                                setLoading(false);
                            })
                        });
                    } }>
                        Удалить
                    </Button>
                </div>
            )
        },
    ]

    return(
        !loading ? <div className="section">
            <Button style={{ marginBottom: "10px" }} type="primary" onClick={() => history.push("/subcategories/new")}>
                Создать
            </Button>
            <Table dataSource={ subcategories } columns={ columns } />
        </div> : <Spin/>
    )
}

export default withRouter(Subcategories);