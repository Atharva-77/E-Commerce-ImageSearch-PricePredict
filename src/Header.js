import React,{useState} from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { Link } from 'react-router-dom';
// import {useStateValue} from './StateProvider';
import {  useHistory } from 'react-router'; 

import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { ArrowBackIosOutlined } from '@material-ui/icons';

import {useSelector,useDispatch} from 'react-redux'
import Dropdown from './Dropdown'
import { logout_action, profileReset_action,registerReset_action } from './Reducers/actions/userActions';



function Header() {
    let history = useHistory()

    const [open, setopen] = useState(false) //Dropdown toggle
    const [keyword, setkeyword] = useState('')

    const userLogin=useSelector(state => state.userLogin)
    const {userInfo}=userLogin

    // console.log((userInfo));
    // const [{basket},dispatch]= useStateValue();
    
    const dispatch=useDispatch()
    const cartList = useSelector(state => state.cartList)
    const {basketItems}=cartList

    let total_item=0
    {basketItems.map((item) => (

         total_item+=item.qty
        
    ))}



    const logoutHandler=()=>
    {
        console.log("Logout clicked");
        dispatch(logout_action())
        dispatch(profileReset_action())
        dispatch(registerReset_action())
        
    }

    const searchHandler=()=>
    {
        if(keyword.trim())
        {
            console.log(keyword+keyword.trim());
            history.push(`/search/${keyword.trim()}`)
        }
        else
        history.push(`/`)
        console.log("SEARCH");
    }

    return (

        <div className="header">
            {/* <h1> HI all in j=header</h1> */}
                <Link to="/" >
                    {/* <h2 >LOGO</h2> */}
                    
                    {/* <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"/> */}
                    <img src="https://www.logodesign.net/logo/peace-bird-in-water-drop-3572ld.png"/>

                </Link>    
            
            
            
            {/*  SEARCH HERE*/}
            <div className="header_search" >
                <input className="header_input"
                        onChange={(e)=>setkeyword(e.target.value)}

                         placeholder="Search here"/>
                {/* <button onClick={searchHandler}>Search Here</button> */}
                <SearchOutlinedIcon className="header_searchIcon" onClick={searchHandler}/>
            </div>
            



            <div className="header_rightnav"> 
                {/* <Link to="/register" >
                    <div className="header_rightSubpart" >
                      <span className="lineOne">Hello Guests</span>
                       <span className="lineTwo">Sign In</span>
                    </div>
                    
                </Link> */}


                {/* ADMIN */}
                {!(typeof(userInfo)=='undefined') && userInfo.length!=0 && (userInfo.isAdmin||userInfo.isSeller)?
                    <div>
                            <div>
                                 {/* <div className="header_rightSubpart" > */}
                                <span className="lineOne">{userInfo.name}</span>
                                <ArrowDropDownIcon className="arrow_icon" onClick={()=>setopen(!open)}/>

                            </div>
                            {userInfo.isAdmin?
                               <>
                                    {open? 
                                        <Dropdown >            
                                            <Link to="/admin/userlist"><p >Users</p></Link>
                                            <Link to="/admin/product"><p>Products</p></Link>
                                            <Link to="/admin/orderlist"><p>Orders</p></Link> 

                                            <p onClick={logoutHandler}>Logout</p>
                                        </Dropdown>
                                        :
                                        null
                                    }
                               </>    
                            :
                               <>
                                    {open? 
                                        <Dropdown >           
                                            <Link to="/seller/product"><p>Products</p></Link>
                                            <Link to="/seller/orderlist"><p>Orders</p></Link> 

                                            <p onClick={logoutHandler}>Logout</p>
                                        </Dropdown>
                                        :
                                        null
                                    }
                               </> 

                            }
                            {/* {open? 
                                    <Dropdown >            
                                        <Link to="/admin/userlist"><p >Users</p></Link>
                                        <Link to="/admin/product"><p>Products</p></Link>
                                        <Link to="/admin/orderlist"><p>Orders</p></Link> 

                                        <p onClick={logoutHandler}>Logout</p>
                                    </Dropdown>
                                    :
                                    null
                            }  */}
                        
                    </div>
                :
                    <div>
                            {!(typeof(userInfo)=='undefined') && userInfo.length!=0 ?
                                <div>
                                    <div>
                                        {/* <div className="header_rightSubpart" > */}
                                            <span className="lineOne">{userInfo.name}</span>
                                        <ArrowDropDownIcon className="arrow_icon" onClick={()=>setopen(!open)}/>

                                    </div>

                                    {open? 
                                            <Dropdown >            
                                                <Link to="/profile_brad"><p>Profile</p></Link>
                                                <p onClick={logoutHandler}>Logout</p>
                                            </Dropdown>
                                            :
                                            null
                                    } 
                                { console.log("here1")}
                                    
                                </div>    
                            :
                            
                                <Link to="/register_brad" >
                                    <div className="header_rightSubpart" >
                                        <span className="lineOne">Hello Guests</span>
                                        <span className="lineTwo">Sign In</span>
                                    </div>
                                    { console.log("here2")}
                                    
                                </Link>
                            
                            }
                    
                    
                    </div>
                }
            
             




   
                {/* <ArrowDropDownIcon className="arrow_icon" onClick={()=>setopen(!open)}/>
                
                 {open? 
                <Dropdown >            
                    <p>Atharva</p>
                    <p>Nilesh</p>
                    <p>Shirode</p>
                </Dropdown>
                :
                  null} */}
                
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

                        <span className="lineTwo basketCount">
                            {total_item}
                            {/* {basketItems.length} */}

                        </span>

                    </div>
                </Link>    
            </div>
           
        </div>
    )
}

export default Header;
