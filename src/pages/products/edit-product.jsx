import React, { useState, useEffect, useRef } from "react";
import { matchPath, withRouter } from "react-router-dom";
import { SubCategoryService } from "../../services/category.service";
import {ProductsService} from "../../services/products.service"
import { Form, Input, Button,  Select, Spin } from 'antd';
import { UploadOutlined } from "@ant-design/icons";

const EditProduct = ({ history }) => {

    const id = matchPath(history.location.pathname, { path: '/products/:id' }).params.id;

    const [subcategories, setSubcategories] = useState([]);
    const [product, setProduct] = useState({name: "", subcategoryId: "", image: "", price: "", file: ""});
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false);

    useEffect(() => {
        if(id!=="new")
            SubCategoryService.get().then((res1) => {
                setSubcategories(res1.data);
                ProductsService.getById(id).then(res2 => {
                    setProduct(res2.data);
                })
                .then(() => setLoading(false))
            })
        else
            SubCategoryService.get().then((res1) => {
                setSubcategories(res1.data)}).then(() => setLoading(false));
            
    },[])

    const { Option } = Select;

    const submitForm = () => {
        if(id == "new" && product.name && product.subcategoryId && product.price && product.file || id != "new" && product.name && product.subcategoryId && product.price ){
            setLoading(true);
            let formData = new FormData();
            Object.keys(product).forEach((v) => formData.append(v, product[v]));
            if(id === "new")
                ProductsService.post(formData).then(res => {
                    history.push("/products");
                })
            else
                ProductsService.put(id,formData).then(res => {
                    history.push("/products");
                })
        }
        else{
            setError(true);
        }
    }


    return(
        !loading ? <div className="section">
            <Form>
                <Form.Item rules={[{required: true, message: "Обязательно поле!"}]} label="Название" name="name">
                    <Input defaultValue={product.name} onChange={(e) => {
                        setError(false);
                        setProduct({ ...product, name: e.target.value })
                    }}/>
                </Form.Item>
                <Form.Item rules={[{required: true, message: "Обязательно поле!"}]} label="Цена" name="price">
                    <Input defaultValue={product.price} onChange={(e) => {
                        setProduct({ ...product, price: e.target.value })
                        setError(false);
                        }}/>
                </Form.Item>
                <Form.Item rules={[{required: true, message: "Обязательно поле!"}]} label="Подкатегория" name="category">
                    <Select defaultValue={product.subcategoryId && subcategories.filter(cat => product.subcategoryId == cat._id)[0].name || ""} onChange={val => {
                        setProduct({...product, subcategoryId: val});
                        setError(false);
                        }}>
                        {
                            subcategories.map(category => <Option value={category._id}>{category.name}</Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item  rules={[{required: true}]} label="Изображение" name="file">
                    { product.image && <img  style={{maxWidth: "200px"}} src={ product.image } alt={ product.name } /> }
                    <input style={{ display: 'none' }} id="fileInput" type="file" onChange={(e) => {
                        setProduct({...product,file:e.target.files[0]});
                        setError(false)
                        }}/>
                    <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                        <UploadOutlined /> Загрузить файл
                    </label>
                    { product.file && product.file.name }
                </Form.Item>
                <Form.Item>
                    <Button type="primary" style={{ marginRight: "15px" }} onClick={() => submitForm()}>
                        Сохранить
                    </Button>
                    <Button type="primary" danger onClick={() => {
                        history.push("/products")
                    }}>
                        Отменить
                    </Button>
                </Form.Item>
            </Form>
            { error && "Заполните все обязательные поля!" }
        </div> : <Spin/>
    )
}

export default withRouter(EditProduct);