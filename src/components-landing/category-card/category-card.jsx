import React from 'react';
import { withRouter } from "react-router-dom";
import './category-card.css';

const CategoryCard = ({ categories, goTo }) => {

    return(
        <div className="categories-container">
            {
                categories.map((category) => <Card name={ category.name } image={ category.image } id={ category._id } goTo={goTo}/>)
            }
        </div>
    )
}

const Card = withRouter(({ name, image, id, history, goTo }) => {
    return(
        <div className="category-cardd" onClick={
            () => {
                history.push(`/${goTo}/${id}`)
            }
        }>
            <img className="card-image" style={{ position: 'absolute', top: 0, left: 0, width: '100%' }} src={image} alt=""/>
            <div className="card-name">
                { name }
            </div>
        </div>
    )
})

export default CategoryCard;