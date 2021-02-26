import React from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { Link } from 'react-router-dom';
import {useStateValue} from './StateProvider';


function Header() {

    const [{basket},dispatch]= useStateValue();

    return (

        <div className="header">
            {/* <h1> HI all in j=header</h1> */}
                <Link to="/" >
                    {/* <h2 >LOGO</h2> */}
                    
                    {/* <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"/> */}
                    <img src="https://www.logodesign.net/logo/peace-bird-in-water-drop-3572ld.png"/>

                </Link>    
            
            <div className="header_search" >
                <input className="header_input" placeholder="Search here"/>
                <SearchOutlinedIcon className="header_searchIcon"/>
            </div>
            
            <div className="header_rightnav"> 
                <Link to="/register" >
                    <div className="header_rightSubpart" >
                      <span className="lineOne">Hello Guests</span>
                       <span className="lineTwo">Sign In</span>
                    </div>
                </Link>
                <div className="header_rightSubpart" >
                    <span className="lineOne">Returns &</span>
                    <span className="lineTwo">Orders</span>           
                </div>
                {/* <div className="header_rightSubpart" >
                    <span className="lineOne">Logo</span>
                    <span className="lineTwo">Cart</span>
                </div> */}

                <Link to="/checkout">
                    <div className="shopping_cart">
                        <ShoppingCartIcon className="shoppingIcon"/>
                        <span className="lineTwo basketCount">{basket.length}</span>

                    </div>
                </Link>    
            </div>
           
        </div>
    )
}

export default Header;
