import React from 'react';
import classes from "./Product.module.css";
import Rating from "@mui/material/Rating";
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
function ProductCard({product}) {
    const {image,title,rating,price}=product;
    return (
        <div className={`${classes.card_container}`}>
           <a href=''>
            <img src={image} alt=''/>
           </a>
           <div>
            <h3>{title}</h3>
            <div className={classes.rating}>
                <Rating value={5} precision={0.1}/>
            {/* count */}
            <small>{Rating.count}</small>
            </div>
           </div>
           <div>
             {/* price */}
             <CurrencyFormat amount={price}/>
           </div>
           <button className={classes.button}>add to cart</button>
        </div>
    );
}

export default ProductCard;
