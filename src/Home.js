import React from 'react'
import './Home.css'
import Product from './Product'

function Home() {
    return (
        <div className="home">
            <div className="home_container">
                <img className="home_img" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB28684220_.jpg"/>

                <div className="home__row">
                <Product 
                    title="The Lean Startup"
                    price={20.65}
                    rating={3}
                    image="https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg"/>
                    
                    <Product 
                    title="mixer"
                    price={100}
                    rating={5}
                    image="https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"/>
                </div>

                <div className="home__row">
                   <Product 
                    title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
                    price={75.25}
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


                <div className="home__row">
                    <Product 
                    title="The Lean Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
                    price={8562}
                    rating={4}
                    image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"/>
                </div>
            </div>    

        </div>
    )
}

export default Home









// import React from 'react'
// import './Home.css'
// import Product from './Product'

// function Home() {
//     return (
//         <div className="home">
//             <img className="home_img" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB28684220_.jpg"/>

//             {/* <div> */}
//                 <Product />
//                 <Product />
//             {/* </div> */}

//         </div>
//     )
// }

// export default Home