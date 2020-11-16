import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Button, Table, Spin } from "antd";
import { CategoryService } from "../../services/category.service";
import "./categories.css";

const Categories = ({ history }) => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        CategoryService.get().then(res => {
            setCategories(res.data);
        }).then(() => setLoading(false));
    },[])

    const columns = [
        {
            title: "Категория",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Действие",
            dataIndex: "_id",
            key:"_id",
            render: (id) => (
                <div>
                    <Button type="primary" onClick={() => {
                        history.push(`/categories/${ id }`)
                    } }>
                        Изменить
                    </Button>
                    <Button danger type="primary" onClick={() => {
                        setLoading(true);
                        CategoryService.delete(id).then((res) => {
                            CategoryService.get().then(res => {
                                setCategories(res.data);
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
        loading ? <Spin/> : <div className="section">
            <Button style={{ marginBottom: "10px" }} type="primary" onClick={() => history.push("/categories/new")}>
                Создать
            </Button>
            <Table dataSource={ categories } columns={ columns } />
        </div>
    )
}

export default withRouter(Categories);