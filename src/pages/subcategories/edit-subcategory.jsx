import React, { useState, useEffect, useRef } from "react";
import { matchPath, withRouter } from "react-router-dom";
import { CategoryService, SubCategoryService } from "../../services/category.service";
import { Form, Input, Button,  Select, Spin } from 'antd';
import { UploadOutlined } from "@ant-design/icons";

const EditSubcategory = ({ history }) => {

    const id = matchPath(history.location.pathname, { path: '/subcategories/:id' }).params.id;

    const [categories, setCategories] = useState(null);
    const [error, setError] = useState(false);
    const [subcategory, setSubcategory] = useState({name: "", category: "", image: "", file: ""});
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(id!=="new")
            CategoryService.get().then((res1) => {
                setCategories(res1.data);
                SubCategoryService.getById(id).then(res2 => {
                    setSubcategory(res2.data);
                })
                .then(() => setLoading(false))
            })
        else
            CategoryService.get().then((res1) => {
                setCategories(res1.data)}).then(() => setLoading(false));
            
    },[])

    const { Option } = Select;

    const submitForm = () => {

        if(id == "new" && subcategory.name && subcategory.file && subcategory.categoryId || id!="new" && subcategory.name && subcategory.categoryId){
            setLoading(true);
            let formData = new FormData();
            Object.keys(subcategory).forEach((v) => formData.append(v, subcategory[v]));
            if(id === "new")
                SubCategoryService.post(formData).then(res => {
                    history.push("/subcategories");
                })
            else
                SubCategoryService.put(id,formData).then(res => {
                    history.push("/subcategories");
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
                    <Input defaultValue={subcategory.name} onChange={(e) => {
                        setSubcategory({ ...subcategory, name: e.target.value });
                        setError(false);
                        }}/>
                </Form.Item>
                <Form.Item rules={[{required: true, message: "Обязательно поле!"}]} label="Категория" name="category">
                    <Select defaultValue={subcategory.categoryId && categories.filter(cat => subcategory.categoryId == cat._id)[0].name || ""} onChange={val => {
                        setSubcategory({...subcategory, categoryId: val});
                        setError(false);
                        }}>
                        {
                            categories.map(category => <Option value={category._id}>{category.name}</Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item  rules={[{required: true}]} label="Изображение" name="file">
                    { subcategory.image && <img  style={{maxWidth: "200px"}} src={ subcategory.image } alt={ subcategory.name } /> }
                    <input style={{ display: 'none' }} id="fileInput" type="file" onChange={(e) => {
                        setSubcategory({...subcategory,file:e.target.files[0]}) ;
                        setError(false);
                        }}/>
                    <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                        <UploadOutlined /> Загрузить файл
                    </label>
                    { subcategory.file && subcategory.file.name }
                </Form.Item>
                <Form.Item>
                    <Button type="primary" style={{ marginRight: "15px" }} onClick={() => submitForm()}>
                        Сохранить
                    </Button>
                    <Button type="primary" danger onClick={() => {
                        history.push("/subcategories")
                    }}>
                        Отменить
                    </Button>
                </Form.Item>
            </Form>
            { error && "Заполните все обязательные поля!" }
        </div> : <Spin/>
    )
}

export default withRouter(EditSubcategory);