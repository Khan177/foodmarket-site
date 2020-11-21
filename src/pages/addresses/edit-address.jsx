import React, { useState, useEffect, useRef } from "react";
import { matchPath, withRouter } from "react-router-dom";
import { AddressesService } from "../../services/address.service";
import { Form, Input, Button, Spin } from 'antd';

const EditAddress = ({ history }) => {

    const id = matchPath(history.location.pathname, { path: '/admin/addresses/:id' }).params.id;

    const [address, setAddress] = useState({name: "", price: ""});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if(id!=="new")
            AddressesService.getById(id).then(res => {
                setAddress(res.data);
            })
            .then(() => setLoading(false))
        else setLoading(false)
    },[])

    const submitForm = () => {
        if(address.name && address.price){
            setLoading(true);
            if(id === "new")
                AddressesService.post(address).then(res => {
                    history.push("/admin/addresses");
                })
            else
                AddressesService.put(id,address).then(res => {
                    history.push("/admin/addresses");
                })
        }
        else{
            setError(true);
        }
    }

    return(
        !loading ? <div className="section">
            <Form>
                <Form.Item rules={[{required: true, message: "Обязательно поле!"}]} label="Район" name="name">
                    <Input defaultValue={address.name} onChange={(e) => {
                        setAddress({...address, name: e.target.value});
                        setError(false);    
                    }}/>
                </Form.Item>
                <Form.Item rules={[{required: true, message: "Обязательно поле!"}]} label="Цена доставки" name="dist">
                    <Input defaultValue={address.price} onChange={(e) => {
                        setAddress({...address, price: e.target.value});
                        setError(false);    
                    }}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" style={{ marginRight: "15px" }} onClick={() => submitForm()}>
                        Сохранить
                    </Button>
                    <Button type="primary" danger onClick={() => {
                        history.push("/admin/addresses")
                    }}>
                        Отменить
                    </Button>
                </Form.Item>
            </Form>
            { error && "Заполните все обязательные поля!" }
        </div>: <Spin/>
    )
}

export default withRouter(EditAddress);