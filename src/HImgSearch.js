

import React,{useEffect} from 'react'
import './HImgSearch.css'
import Product from './Product'
import {ImgProductDetails_action} from './Reducers/actions/productActions'
import { useSelector,useDispatch } from 'react-redux'
import { useParams } from 'react-router';

function HImgSearch() {
    // const {keyword}=useParams()
    // console.log("Keyword",keyword);
    const dispatch=useDispatch()
    
    // let val=["60489349fd2b1f47438301fc","60489439fd2b1f47438301fe","606c6b3c61213d6c76682505"]
   
    // useEffect(() => {
    //     dispatch(ImgProductDetails_action(val))
    // }, [dispatch])

 
    const Imageproduct = useSelector(state => state.Imageproduct)
    const {loading,Imgproducts,error}=Imageproduct
    // console.log("Home wala prods",products);
    // console.log("PRODUCTS LEN SEARCH",Imgproducts.length,Imgproducts);


    return (
        <div className="home">  

           

            <div className="home_container">
                {loading?<h2>Loading...</h2>
                        :error  ?<h2>{error}</h2>
                                :  <div className="home__row">
                                    {
                                        Imgproducts.map((i)=>(
                                            <Product 
                                                id={i._id}
                                                title={i.name}
                                                price={i.price}
                                                rating={i.Avgrating}
                                                imageURL={i.imageURL}
                                                imageFile={i.imageFile}
                                            />
                                            ))
                                    } 
                                   </div>
                 }

                 {Imgproducts.length==0?<h2>No Such Product</h2>:null}

                

                

            </div>    

        </div>
    )
}

export default HImgSearch









// // import React from 'react'
// // import './Home.css'
// // import Product from './Product'

// // function Home() {
// //     return (
// //         <div className="home">
// //             <img className="home_img" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB28684220_.jpg"/>

// //             {/* <div> */}
// //                 <Product />
// //                 <Product />
// //             {/* </div> */}

// //         </div>
// //     )
// // }

// // export default Home
