import React from 'react';
import classes from "./Product.module.css";
import Rating from "@mui/material/Rating";
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';

function ProductCard({ product }) {
  if (!product) return null; // Prevents crash

  const { image, title, rating, price } = product;
  return (
    <div className={classes.card_container}>
      <a href="">
        <img src={image} alt={title} />
      </a>
      <div>
        <h3>{title}</h3>
        <div className={classes.rating}>
          <Rating value={rating?.rate || 0} precision={0.1} readOnly />
          <small>{rating?.count || 0}</small>
        </div>
      </div>
      <div>
        <CurrencyFormat amount={price} />
      </div>
      <button className={classes.button}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;

