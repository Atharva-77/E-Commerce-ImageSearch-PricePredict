import React from 'react';
import { Link } from 'react-router-dom';

import './Seller.css' ;

function Seller() {
    return (
        <div className="seller">
            <Link to="/">
                {/* <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"/> */}
                <img className="logo" src="https://www.logodesign.net/logo/peace-bird-in-water-drop-3572ld.png"/>

            </Link>

            <div className="seller_details">
                {/* <form> */}
                <h1 className="heading">Fill Your Product Details</h1>
                
                <h2>Image Url</h2>
                <input placeholder="Enter Image Url"/>

                <h2>Product Category</h2>
                <input placeholder="Enter Product Category/Or make markdown"/>
                
                <h2>Product Title</h2>
                <input placeholder="Enter Product Title"/>

                <h2>Product Cost</h2>
                <input placeholder="Enter Product Cost"/>
                
                <h2>Product Details</h2>
                <input placeholder="Enter Product Details.Mkae this box bigger"/>
                

                <Link to="/">
                     <button className="seller_button">Post Your Product</button>
                </Link>
                {/* </form> */}
            </div>

        </div>
    )
}

export default Seller
