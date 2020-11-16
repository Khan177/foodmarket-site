import React, { useState, useEffect } from "react";
import "./orders.css";
import { OrdersService } from "../../services/orders.service";
import { Table, Button, Tag, Select, Spin } from "antd";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [currentOrderProducts, setCurrentOrderProducts] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        OrdersService.get().then((res) => {
            setOrders(res.data);
            setFilteredOrders(res.data.filter(order => !order.status))
        }).then(() => setLoading(false));
    },[])

    const handleOrderStatusChange = (id) => {
        OrdersService.put(id);
    }

    const Option = { Select }

    const columns = [
        {
            title: "Имя",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Телефон",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Сумма",
            dataIndex: "totalPrice",
            key: "totalPrice",
        },
        {
            title: "Способ оплаты",
            dataIndex: "paymentInfo",
            key: "paymentInfo",
        },
        {
            title: "Продукты",
            dataIndex: "products",
            key: "products",
            render: (products) => <Button type="link" onClick={() => setCurrentOrderProducts(products)}>Список</Button>,

        },
        {
            title: "Статус",
            dataIndex: "status",
            key: "status",
            render: (status) => status ? <Tag color="red"> Закрытый </Tag> : <Tag color="blue">Новый</Tag> 
        },
        {
            title: "Переключить статус",
            dataIndex: "_id",
            key: "_id",
            render: (id) => <Button type="primary" onClick={() => handleOrderStatusChange(id)}>Переключить статус</Button>
        }
    ]

    return(
        loading ? <Spin/> : <div style={{ textAlign: "left" }}>
            <Select 
                style={{width: 120, marginBottom: 15}}
                defaultValue={ 0 } 
                onChange={(status) => setFilteredOrders(orders.filter(order => order.status == status))}
            >
                <Option value={ "0" }>
                    Новые
                </Option>
                <Option value={ "1" }>
                    Закрытые
                </Option>
            </Select>
            <Table columns={ columns } dataSource={ filteredOrders } />
        </div>
    )
}

export default Orders;