
import React,{useEffect,useState} from 'react'
import './Home.css'
import Product from './Product'
import { listProduct } from './Reducers/actions/productActions'
import { useSelector,useDispatch } from 'react-redux'
import { useParams } from 'react-router';
import axios from 'axios';
import HPagination from './HPagination'

let x = 0;
function Home() {
    const [currentPage, setcurrentPage] = useState(1)
    const [postPerPage, setpostPerPage] = useState(5)
    let indexOfLastPost,indexOfFirstPost,currentPosts;

    const {keyword}=useParams()
    console.log("Keyword",keyword);
    const dispatch=useDispatch()

    const [featureVector, setfeatureVector] = useState('')
    const [productId, setproductId] = useState('')
    const [messagess, setmessagess] = useState(0)
    // console.log(setfeaturemessagessage)
   

    // const featureR = useSelector(state => state.featureR)
    // const {loadingF,feature,errorF}=featureR
    // console.log("line 23 FEATURE ",feature);


    // useEffect(() => {
    //     console.log("USEEFF FV 22",featureVector)
    //     if(feature.length==0)
    //     {
    //             dispatch(feature_action())
    //             x=1;
    //             console.log("outside messages",messagess);
    //     }
        

    // }, [])
  

    // useEffect(() => {
    //     console.log("line 59 messagess",messagess);
    //     console.log("line 46",feature.length) 
    //     console.log("line 42", x)  
    //     if(feature.length != 0 && x==1)
    //     {
    //         console.log("In messagess", messagess)
            
    //         const featureVectorData={
    //             "product_feature_data":feature
    //         }
    //         axios.post("https://ecommerce-imagesearch.herokuapp.com/feature_vector_db",featureVectorData)
    //         .then(
    //            res=>
    //            {
    //                console.log("Feature wala data")
    //                console.log(2);
    //            }
    //         )
    //         x=0;
    //     }
       
    // }, [feature])


    useEffect(() => {
        dispatch(listProduct(keyword))
    }, [dispatch,keyword])

    const productList = useSelector(state => state.productList)
    const {loading,products,error}=productList
    // console.log("Home wala prods",products);
    console.log("PRODUCTS LEN SEARCH",products.length);

   
    indexOfLastPost = currentPage * postPerPage;
    indexOfFirstPost = indexOfLastPost - postPerPage;
    currentPosts = products.slice(indexOfFirstPost,indexOfLastPost);
    const paginate_fun = (pageno)=>{setcurrentPage(pageno)}
    console.log("here",indexOfFirstPost,indexOfLastPost,currentPosts,paginate_fun);
   



    return (
        <div className="home">  

           

            <div className="home_container">
                {/* 1.<img className="home_img" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB28684220_.jpg"/> */}
                {loading?<h2>Loading...</h2>
                        :error  ?<h2>{error}</h2>
                                :  <div className="home__row">
                                    {
                                        currentPosts.map((i)=>(
                                            <Product 
                                                id={i._id}
                                                title={i.name}
                                                price={i.price}
                                                rating={i.Avgrating}
                                                imageURL={i.imageURL}
                                                imageFile={i.imageFile}
                                                countInStock={i.countInStock}
                                            />
                                            // console.log("i=",i.description,i.price,i.Avgrating,i.image);
                                            ))
                                    }

                                     <HPagination 
                                                postPerPage={postPerPage} 
                                                totalPost={products.length} 
                                                paginate={paginate_fun}/> 
                                   </div>

                 }
                 

                 {products.length==0?<h2>No Such Product</h2>:null}

                


               
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
