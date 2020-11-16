import React, { useState, useEffect, useRef } from "react";
import { matchPath, withRouter } from "react-router-dom";
import { CategoryService } from "../../services/category.service";
import { Form, Input, Button, Spin } from 'antd';
import { UploadOutlined } from "@ant-design/icons";

const EditCategory = ({ history }) => {

    const id = matchPath(history.location.pathname, { path: '/categories/:id' }).params.id;

    const [category, setCategory] = useState({name: "", image: ""});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if(id!=="new")
            CategoryService.getById(id).then(res => {
                setCategory(res.data);
            })
            .then(() => setLoading(false))
        else setLoading(false)
    },[])

    const submitForm = () => {
        if(id != "new" && category.name || id == "new" && category.name && category.file){
            setLoading(true);
            let formData = new FormData();
            Object.keys(category).forEach((v) => formData.append(v, category[v]));
            if(id === "new")
                CategoryService.post(formData).then(res => {
                    history.push("/categories");
                })
            else
                CategoryService.put(id,formData).then(res => {
                    history.push("/categories");
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
                    <Input defaultValue={category.name} onChange={(e) => {
                        setCategory({...category, name: e.target.value});
                        setError(false);    
                    }}/>
                </Form.Item>
                <Form.Item rules={[{required: true}]} label="Изображение" name="file">
                    { category.image && <img style={{maxWidth: "200px"}} src={category.image } alt={ category.name } /> }
                    <input style={{ display: 'none' }} id="fileInput" type="file" onChange={(e) => {
                        setCategory({...category,file: e.target.files[0]});
                        setError(false);
                        }}/>
                    <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                        <UploadOutlined /> Загрузить файл
                    </label>
                    { category.file && category.file.name }
                </Form.Item>
                <Form.Item>
                    <Button type="primary" style={{ marginRight: "15px" }} onClick={() => submitForm()}>
                        Сохранить
                    </Button>
                    <Button type="primary" danger onClick={() => {
                        history.push("/categories")
                    }}>
                        Отменить
                    </Button>
                </Form.Item>
            </Form>
            { error && "Заполните все обязательные поля!" }
        </div>: <Spin/>
    )
}

export default withRouter(EditCategory);