import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Button, Table, Spin } from "antd";
import { AddressesService } from "../../services/address.service.js";
import "./addresses.css";

const Addresses = ({ history }) => {

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AddressesService.get().then(res => {
            setAddresses(res.data);
        }).then(() => setLoading(false));
    },[])

    const columns = [
        {
            title: "Район",
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
                        history.push(`/admin/addresses/${ id }`)
                    } }>
                        Изменить
                    </Button>
                    <Button danger type="primary" onClick={() => {
                        setLoading(true);
                        AddressesService.delete(id).then((res) => {
                            AddressesService.get().then(res => {
                                setAddresses(res.data);
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
            <Button style={{ marginBottom: "10px" }} type="primary" onClick={() => history.push("/admin/addresses/new")}>
                Создать
            </Button>
            <Table dataSource={ addresses } columns={ columns } />
        </div>
    )
}

export default withRouter(Addresses);