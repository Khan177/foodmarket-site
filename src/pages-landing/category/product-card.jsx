import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { addToSelected, incrementSelected, decrementSelected } from "../../store/actions";
import { Button } from 'antd';
import './category.css';

const ProductCard = ({products}) => {

    return(
        <div className="products-container">
            {
                products.map((product) => <Card productt={ product }/>)
            }
        </div>
    )
}

const Card = withRouter(({ productt }) => {

    const dispatch = useDispatch();
    const state = useSelector(state => state);

    const [product, setProduct] = useState({ ...productt, count: 1});

    return(
        <div className="products-landing">
            <div>
                <img className="products-card-image" src={product.image} alt=""/>
            </div>
            <div className="product-info">
                <div className="product-name">
                    <h3 style={{ fontWeight: 'bold' }}>{product.name}</h3>
                </div>
                <div className="product-count">
                    <span>Кол-во: <MinusOutlined onClick={() => setProduct({...product,count:Math.max(product.count-1, 1)})} className="product-icon"/><span style={{ padding: '0 5px' }}>{product.count}</span><PlusOutlined onClick={() => setProduct({...product, count: product.count+1})} className="product-icon"/></span>
                </div>
                <div className="product-price">
                <b><span>Цена: </span><span>{`${product.price} тг.`}</span></b>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '10px 0'}}>
            { state.selectedItems.filter(item => item._id == productt._id).length ? <span style={{ color: '#6FCF97' }}>В корзине</span> : <button className="product-button" onClick={() => dispatch(addToSelected(product))}>В корзину</button>}
            </div>
        </div>
    )
})

export default ProductCard;