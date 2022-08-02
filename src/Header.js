import React,{useState,useEffect} from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { Link } from 'react-router-dom';
// import {useStateValue} from './StateProvider';
import {  useHistory } from 'react-router'; 

import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { ArrowBackIosOutlined, CameraAlt } from '@material-ui/icons';

import {useSelector,useDispatch} from 'react-redux'
import Dropdown from './Dropdown'
import { logout_action, profileReset_action,registerReset_action } from './Reducers/actions/userActions';
import axios from 'axios';

import {ImgProductDetails_action} from './Reducers/actions/productActions'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

// import { makeStyles } from "@material-ui/core/styles";

function Header() {
    // const useStyles = makeStyles((theme) => ({
    //     root: {
    //       "& > *": {
    //         margin: theme.spacing(1)
    //       }
    //     },
    //     input: {
    //       display: "none"
    //     }
    //   }));
    //   const classes = useStyles();

    let history = useHistory()
    var fileTypes = [".jpg", ".png", ".jpeg"];

    const [open, setopen] = useState(false) //Dropdown toggle
    const [openCamera, setopenCamera] = useState(false) // Img search dropdown
    const [Imgvalue, setImgvalue] = useState(false) 

    const [keyword, setkeyword] = useState('')
   
    const [file, setfile] = useState('')
    const [Imgpath, setImgpath] = useState('')
    const [ImgSearchData, setImgSearchData] = useState('')
    

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


    useEffect(() => {
       
            
        if(Imgvalue==true)        
            {
                const Data = new FormData()
                Data.append('file',file)

                
                //  axios.post("https://httpbin.org/anything",Data)
                axios.post("http://localhost:4000/uploadImg/add",Data)
                .then(
                    res=>
                    {
                        console.log("dATA IS headre ",res.data)
                        setImgpath(res.data)
                        console.log(3);
                        
                    }
                    )

                if(Imgpath!="")
                {
                    const ImageSearchData={
                        "img_path":Imgpath
                    }
                    console.log("check_Image_Seacrh_Data header:",ImageSearchData)
                    axios.post("http://localhost:7080/image_search",ImageSearchData)
                    .then(
                            res=>
                            {
                                console.log("Image_Data Header ",res.data)
                                console.log(4);
                                setImgvalue(false)
                                setImgSearchData(res.data)
                            }
                        )
                //     setMessage(true)
                }
           }
        
          
    }, [file,Imgpath,Imgvalue])


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


    const uploadImgHandler=async(e)=>
    {
        const file2=e.target.files[0]
        setfile(file2)
        console.log(file);
        setImgvalue(true);

        // const Data = new FormData()
        // Data.append('file',file)


        console.log("SEARCH2");
    }


    const searchImgHandler=()=>
    {
        
        console.log("SEARCH3",ImgSearchData);
        dispatch(ImgProductDetails_action(ImgSearchData))

        history.push(`/himg`)

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
                <CameraAlt  className="header_searchIcon_Img" onChange={searchImgHandler} />
                <ArrowDropDownIcon className="arrow_iconCamera" onClick={()=>setopenCamera(!openCamera)}/>
                     {/* <input type="file" id="file" accept={fileTypes} onChange={searchImgHandler}/> */}
                     <>{openCamera? 
                                        <Dropdown >            
                                            Upload<input type="file" id="file" accept={fileTypes} onChange={uploadImgHandler}/>
                                            {/* <input
                                                accept="image/*"
                                                className={classes.input}
                                                id="contained-button-file"
                                                multiple
                                                type="file"
                                            />
                                            <label htmlFor="contained-button-file">
                                                <Button variant="contained" color="primary" component="span">
                                                Upload
                                                </Button>
                                            </label> */}

                                            <p onClick={searchImgHandler} style={{cursor: 'pointer'}}>Search</p>
                                        </Dropdown>
                                        :
                                        null
                                    }</>
                {/* </CameraAlt> */}


                     {/* <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                    />

                    <label htmlFor="icon-button-file">
                        <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        >
                        <PhotoCamera />
                        </IconButton>
                    </label> */}

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
                    <div className='dropdowncontainer'>
                            <div className='drop'>
                                 {/* <div className="header_rightSubpart" > */}
                                <span className="lineOne">{userInfo.name}</span>
                                <ArrowDropDownIcon className="arrow_icon" onClick={()=>setopen(!open)}/>

                            </div>
                            {userInfo.isAdmin?
                               <>
                                    {open? 
                                        <Dropdown >            
                                            <Link to="/admin/userlist"  style={{ textDecoration: 'none', color : 'black' }}><p >Users</p></Link>

                                            <Link to="/admin/product"  style={{ textDecoration: 'none', color : 'black' }}><p>Products</p></Link>

                                            <Link to="/admin/orderlist"  style={{ textDecoration: 'none', color : 'black' }}><p>Orders</p></Link> 

                                            <p onClick={logoutHandler} style={{cursor: 'pointer'}}>Logout</p>
                                        </Dropdown>
                                        :
                                        null
                                    }
                               </>    
                            :
                               <>
                                    {open? 
                                        <Dropdown >           
                                            <Link to="/seller/product" style={{ textDecoration: 'none', color : 'black' }}><p>Products</p></Link>

                                            <Link to="/seller/orderlist" style={{ textDecoration: 'none', color : 'black' }}><p>Orders</p></Link> 

                                            <p onClick={logoutHandler} style={{cursor: 'pointer'}}>Logout</p>
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
                                <div className='dropdowncontainer'>
                                    <div className='drop'>
                                        {/* <div className="header_rightSubpart" > */}
                                            <span className="lineOne">{userInfo.name}</span>
                                        <ArrowDropDownIcon className="arrow_icon" onClick={()=>setopen(!open)}/>

                                    </div>

                                    {open? 
                                            <Dropdown >            
                                                <Link to="/profile_brad" style={{ textDecoration: 'none', color : 'black' }}><p>Profile</p></Link>
                                                <p onClick={logoutHandler} style={{cursor: 'pointer'}}>Logout</p>
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
