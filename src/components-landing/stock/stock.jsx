import React from 'react';

import { Carousel } from 'antd';
import "./stock.css";

const Stocks = () => {

    const stocks = [
        {
            title: 'Акция',
            image: '/assets/stock.png',
            text: 'Условия акции, описание, скидки и прочие бонусы при выполнении условий.'
        },
        {
            title: 'Акция',
            image: 'stock.png',
            text: 'Условия акции, описание, скидки и прочие бонусы при выполнении условий.'
        },
        {
            title: 'Акция',
            image: 'stock.png',
            text: 'Условия акции, описание, скидки и прочие бонусы при выполнении условий.'
        },
        {
            title: 'Акция',
            image: 'stock.png',
            text: 'Условия акции, описание, скидки и прочие бонусы при выполнении условий.'
        },
    ];

    return(
        <div className="stocks-temp">
            <Carousel autoplay>
                {
                    stocks.map(stock => (
                        <div className="stock-div">
                            <div style={{ width:'50%', display: 'flex',justifyContent: 'center', flexDirection: 'column', position:'relative', height: '100%' }} >
                                <div style={{ backgroundColor: 'black', position: 'absolute', width: '100%', height: '100%', opacity: 0.6, borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}></div>
                                <h1 style={{ color: 'white', zIndex: 1, padding: '0 20%' }}>{stock.title}</h1>
                                <p style={{ zIndex: 1, padding: '0 20%' }}>{stock.text}</p>
                            </div>
                            <div style={{ width:'50%' }} ></div>
                        </div>)
                    )
                }
            </Carousel>
        </div>
    )
}

export default Stocks;