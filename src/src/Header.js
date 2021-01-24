import React from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
function Header() {
    return (
        <div className="header">
            {/* <h1> HI all in j=header</h1> */}
    
                <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"/>
    
            
            <div className="header_search" >
                <input className="header_input" placeholder="Search here"/>
                <SearchOutlinedIcon className="header_searchIcon"/>
            </div>
            
            <div className="header_rightnav"> 
                <div className="header_rightSubpart" >
                    <span className="lineOne">Hello Guests</span>
                    <span className="lineTwo">Sign In</span>
                </div>

                <div className="header_rightSubpart" >
                    <span className="lineOne">Returns &</span>
                    <span className="lineTwo">Orders</span>           
                </div>
                {/* <div className="header_rightSubpart" >
                    <span className="lineOne">Logo</span>
                    <span className="lineTwo">Cart</span>
                </div> */}
                 <div className="shopping_cart">
                    <ShoppingCartIcon className="shoppingIcon"/>
                    <span className="lineTwo basketCount">0</span>

                 </div>
            </div>
           
        </div>
    )
}

export default Header;
