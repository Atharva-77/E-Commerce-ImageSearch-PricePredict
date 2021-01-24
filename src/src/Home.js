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
                    title="The Lean Startup"
                    price={20.65}
                    rating={4}
                    image="https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg"/>
                </div>

                <div className="home__row">
                   <Product 
                    title="The Lean Startup"
                    price={20.65}
                    rating={1}
                    image="https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg"/>
                    
                    <Product 
                    title="The Lean Startup"
                    price={20.65}
                    rating={2}
                    image="https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg"/>
                    
                    <Product 
                    title="The Lean Startup"
                    price={20.65}
                    rating={5}
                    image="https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg"/>

                </div>


                <div className="home__row">
                    <Product 
                    title="The Lean Startup"
                    price={20.65}
                    rating={4}
                    image="https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg"/>
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
