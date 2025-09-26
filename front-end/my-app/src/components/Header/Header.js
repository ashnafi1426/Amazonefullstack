// Header.js
import React from 'react'
import {Link } from 'react-router-dom';
import classes from "./Header.module.css"
import LowerHeader from './LowerHeader';
import {SlLocationPin} from "react-icons/sl"
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
function Header() {
  return (
    <section>
        <div className={classes.header_container}>
            <div className={classes.logo_container}>
                <Link to='/'>
                    <img src='https://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='Amazon Logo'/>
                </Link>
            </div>
            <div className={classes.delivery}>
                <SlLocationPin size={18}/>
                <div>
                    <p>Deliver to</p>
                    <span>Ethiopia</span>
                </div>
            </div>
            <div className={classes.search}>
                <select name="" id="">
                    <option value="">All</option>
                </select>
                <input type='text' name='' id='' placeholder='Search Amazon'/>
                <BsSearch size={20} />
            </div>
            <div className={classes.language_selector}>
                <img src='https://cdn.britannica.com/33/4833-050-F6E415FE/Flag-United-States-of-America.jpg' alt='Ethiopia flag'/>
                <span>EN</span>
            </div>
            <div className={classes.account_container}>
                <Link to='/SignIn'>
                    <p>Hello, sign in</p>
                    <span>Account & Lists</span>
                </Link>
            </div>
            <div className={classes.returns_container}>
                <Link to='/orders'>
                    <p>Returns</p>
                    <span>& Orders</span>
                </Link>
            </div>
            {/* Cart */}
            <Link to='/cart'>
            <div className={classes.cart_container}>
                <BiCart size={30}/>
                <span className={classes.cart_count}>0</span>
                <span className={classes.cart_text}>Cart</span>
              </div>
            </Link>
        </div>
        <LowerHeader/>
    </section>
  )
  
}
export default Header
