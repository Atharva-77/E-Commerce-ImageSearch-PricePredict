// import React from 'react'
// import './Home.css'
// import Product from './Product'

// function Home() {
//     return (
//         <div>
//             <h2>Home</h2>
//         </div>

//     )
// }

// export default Home

import React,{useEffect} from 'react'
import './Home.css'
import Product from './Product'
import {listProduct} from './Reducers/actions/productActions'
import { useSelector,useDispatch } from 'react-redux'

function Home() {
    const dispatch=useDispatch()

    useEffect(() => {
        dispatch(listProduct())
    }, [dispatch])

    const productList = useSelector(state => state.productList)
    const {loading,products,error}=productList
    // console.log("Home wala prods",products);


    return (
        <div className="home">  

           

            <div className="home_container">
                {/* 1.<img className="home_img" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB28684220_.jpg"/> */}
                {loading?<h2>Loading...</h2>
                        :error?<h2>{error}</h2>
                        :  <div className="home__row">
                        {
                            products.map((i)=>(
                                <Product 
                                    id={i._id}
                                    title={i.description}
                                    price={i.price}
                                    rating={i.Avgrating}
                                    image={i.image}
                                />
                                // console.log("i=",i.description,i.price,i.Avgrating,i.image);
                                ))
                        }
                          </div>}


               
                <Product 
                    title="The atharva Startup"
                    price={20.00}
                    rating={3}
                    image="https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg"/>
                  
                {/* </div> */}
                
                
                 {/* <div className="home__row">
                <Product 
                    title="The Lean Startup"
                    price={20.00}
                    rating={3}
                    image="https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg"/>
                    
                    <Product 
                    title="Mixer | Vidiem MG 541 A VSTAR Evo Plus 750 Watts Mixer Grinder"
                    price={100}
                    rating={5}
                    image="https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"/>
                </div> */}

                {/*<div className="home__row">
                   <Product 
                    title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
                    price={50}
                    rating={1}
                    image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"/>
                    
                    <Product 
                    title="The Lean Startup"
                    price={20.65}
                    rating={2}
                    image="https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg"/>
                    
                    <Product 
                    title="The Lean Apple pro"
                    price={20.65}
                    rating={5}
                    image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"/>

                </div>
 */}

                {/* <div className="home__row">
                    <Product 
                    title="The Lean Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
                    price={8562}
                    rating={4}
                    image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"/>
                </div> */}
            </div>    

        </div>
    )
}

export default Home









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
