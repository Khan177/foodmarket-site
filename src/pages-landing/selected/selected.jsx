import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux"
import { Button, Form, Input, Select } from "antd";
import {PlusOutlined, MinusOutlined, DeleteOutlined, CheckCircleOutlined} from "@ant-design/icons";
import { changeSelectedStage, clearSelected, decrementSelected, incrementSelected, removeFromSelected } from "../../store/actions";
import './selected.css';
import { OrdersService } from "../../services/orders.service";
import { AddressesService } from "../../services/address.service";

const Selected = () => {
    const products = useSelector(state => state.selectedItems);
    const [addresses, setAddresses] = useState([])
    const initial = {
        name: "",
        phone: "",
        dist: "Защита",
        street: "",
        house: "",
        paymentInfo: "",
        sdacha: "",
        delPrice: "",
    }

    useEffect(() => {
        AddressesService.get().then((res) => {
            setAddresses(res.data);
        })
    },[])

    const {Option} = Select;
    const [newOrder, setNewOrder] = useState(initial);
    const [paymentType, setPaymentType] = useState([false,false,false]);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const selectedStage = useSelector(state => state.selectedStage);
    const submitForm = () => {
        console.log(newOrder)
        if(paymentType[0]){
            setNewOrder({...newOrder, paymentInfo: "Оплата картой"});
        }
        else if(paymentType[2]){
            setNewOrder({...newOrder, paymentInfo: "Каспи перевод"});
        }
        else if(paymentType[1] && !newOrder.sdacha){
            setNewOrder({...newOrder, paymentInfo: "Оплата наличными" + newOrder.sdacha});
        }
        else{
            setError(true);
        }
        if(!newOrder.name || !newOrder.phone || !newOrder.dist || !newOrder.street || !newOrder.house || error){
            setError(true);
        }
        else{
            let totalPrice = 0;
            products.map((pro) => {
                totalPrice+=pro.count*Number(pro.price);
                return null;
            })
            OrdersService.post({...newOrder,totalPrice, products, address: `${newOrder.dist}, ${newOrder.street}, ${newOrder.house}`}).then((res) => {
                dispatch(changeSelectedStage(3));
                dispatch(clearSelected())
            })
        }
    }
    return(
        <div style={{padding: '0 5%', width: '100%'}}>
            {selectedStage == 1 &&
            <>
            <h1>
                    Корзина
                </h1>
                <div className="selected-products">
                    {
                        products.map((product) => <SelectedCard image={product.image} count={product.count} name={product.name} price={product.price} id={product._id} />)
                    }
                </div>
                <hr/>
                <div className="total-price">
                    <h1>{`Итого: ${products.map(prod => prod.price*prod.count).reduce((a,b) => a+b,0)}`}</h1>
                </div>
                <div className="selected-go-to-second">
                    <button className="selected-button1" disabled={products.length == 0} onClick={() => dispatch(changeSelectedStage(2))}>Оформить заказ</button>
                </div>
            </>
            }
            {
                selectedStage == 2 && 
                <>
                    <h1 style={{ fontWeight: 'bold', marginBottom: '30px' }}>
                        Доставка
                    </h1>
                    <div className="selected-second">
                        <div className="form-first">
                            <label htmlFor="name">Имя</label>
                            <input id="name" placeholder="Имя" onChange={(e) => {
                                setNewOrder({...newOrder, name: e.target.value});
                                setError(false);    
                            }}/>
                            <label htmlFor="phone">Телефон</label>
                            <input placeholder="Номер телефона"  id="phone" onChange={(e) => {
                                setNewOrder({...newOrder, phone: e.target.value});
                                setError(false);    
                            }}/>
                            <label htmlFor="dist">Адрес доставки</label>
                            <select id="dist" onChange={(val) => {
                                setNewOrder({...newOrder, dist: val.target.value.split(",")[0], delPrice: val.target.value.split(",")[1]})
                            }}>
                                {
                                    addresses.map((add) => <option value={[add.name, add.price]}>{add.name}</option>)
                                }
                            </select>
                            <input placeholder="Улица" id="street" onChange={(e) => {
                                setNewOrder({...newOrder, street: e.target.value});
                                setError(false);    
                            }}/>
                            <input placeholder="№" id="house" onChange={(e) => {
                                setNewOrder({...newOrder, house: e.target.value});
                                setError(false);    
                            }}/>

                        { error &&  <span  style={{ color: '#EB5757' }}>Заполните все поля!</span> }
                        </div>
                        <div className="form-second">
                            <div>
                                <h3 style={{fontSize: '1.5em'}}><b>Способ оплаты</b></h3>
                                <div>
 <input id="ff" type="radio" checked={paymentType[0]} onChange={() => setPaymentType([true,false,false])}/>
                                <label htmlFor="ff">Оплата картой</label>
                                </div>
                                <div>
                                    <input id="ss" type="radio" checked={paymentType[1]} onChange={() => setPaymentType([false,true,false])}/>
                                <label htmlFor="ss">Оплата наличными</label>
                                </div>
                                <div>
                                    <input id="tt" type="radio" checked={paymentType[2]} onChange={() => setPaymentType([false,false, true])}/>
                                <label htmlFor="tt"><span style={{ color: '#EB5757' }}>Kaspi</span> перевод</label>
                                </div>
                                { paymentType[1] && <div className="selected-second-sum">
                                <label htmlFor="sum">Сдача с суммы</label>
                                <input placeholder="Сумма" id="sum" onChange={(e) => {
                                    setNewOrder({...newOrder, sdacha: e.target.value,});
                                    setError(false);    
                                }}/>
                                </div>}
                            </div>
                        </div>
                    </div>
                            <h1>{`Cумма за доставку: ${newOrder.delPrice ? newOrder.delPrice : ""}`}</h1>
                    <div className="selected-buttons">
                    <Button size="large" style={{ marginRight: "15px", backgroundColor: '#6FCF97', color: 'white' }} onClick={() => submitForm()}>
                            Подтвердить заказ
                        </Button>
                        <Button size="large" style={{ marginRight: "15px", color: '#6FCF97', backgroundColor: 'white' }} onClick={() => dispatch(changeSelectedStage(1))}>
                            Назад к заказу
                        </Button>
                    </div>
                </>
            }
            {
                selectedStage == 3 &&
                <div  style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <h1 style={{fontWeight: 600}}>
                        Заказ принят!
                    </h1>
                    <h1 style={{fontWeight: 600}}>
                        Ожидайте.
                    </h1>
                    <CheckCircleOutlined style={{fontSize: '3em', color: '#6fcf97'}} />
                </div>
            }
        </div>
    )
}

const SelectedCard = ({ image, count, name, price, id }) => {
    const dispatch = useDispatch();
    return(
        <div className="selected-product">
            <div className="selected-photo">
                <img src={image} alt=""/>
            </div>
            <div className="selected-other-info">
                <span><b>{name}</b></span>
                <span><MinusOutlined onClick={() =>{
                    count == 1 ? dispatch(removeFromSelected(id)) : dispatch(decrementSelected(id))
                }}/> <span style={{ margin: '0 5px' }}><b>{count}</b></span> <PlusOutlined onClick={() => {
                    dispatch(incrementSelected(id))
                }}/></span>
                <span style={{color: '#EB5757'}}><b>{`${price} тг.`}</b></span>
                <span><DeleteOutlined className="delete-button" onClick={() => dispatch(removeFromSelected(id))}/></span>
            </div>
        </div>
    )
}

export default Selected;