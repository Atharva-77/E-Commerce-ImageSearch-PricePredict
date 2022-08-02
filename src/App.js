import './App.css';
import Header from'./Header';
import Home from'./Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Checkout from './Checkout';
// import Register from './Register';
// import Login from './Login';
import Seller from './Seller'
import ProductDetails from './ProductDetails'

import {Provider} from 'react-redux'
import store from './Store'

import Login_brad from './Login_brad';
import Register_brad from './Register_brad';
import ProfileDetails from './ProfileDetails';
import Shipping from './Shipping';
import Payment from './Payment';
import PlaceOrder from './PlaceOrder';
import OrderScreen from './OrderScreen';
import Admin_UserList from './Admin_UserList';
import Admin_EditUser from './Admin_EditUser';
import Admin_Product from './Admin_Product';
import Admin_EditProduct from './Admin_EditProduct';
import Admin_CreateProduct from './Admin_CreateProduct';
import Admin_Order_List from './Admin_Order_List';
import ASeller_Product from './ASeller_Product';
import ASeller_EditProduct from './ASeller_EditProduct';
import ASeller_CreateProduct from './ASeller_CreateProduct';
import ASeller_OrderList from './ASeller_OrderList';
import HImgSearch from './HImgSearch';


function App() {
  return (
<Provider store={store} >
    <div className="app">
      <Router >
         
          {/*Common part to both router*/}
          <Switch >
            

              <Route path="/login_brad">
                  <Login_brad />
              </Route>

              <Route path="/register_brad">
                  <Register_brad />
              </Route>

              <Route path="/profile_brad">
                  <ProfileDetails />
              </Route>

              {/* <Route path="/seller">
                  <Seller />
               </Route> */}

               <Route path="/shipping">
                 <Shipping />
              </Route>

              <Route path="/payment">
                 <Payment />
              </Route>



             {/* Admin routes */}
              <Route path="/admin/userlist">
                 <Admin_UserList />
              </Route>

              <Route path="/admin/profile/:id">
                 <Admin_EditUser />
              </Route>

              <Route path="/admin/product">
                 <Admin_Product />
              </Route> 

              <Route path="/admin/prod/edit/:id">
                 <Admin_EditProduct />
              </Route>

              <Route path="/admin/createProduct">
                 <Admin_CreateProduct />
              </Route>

              <Route path="/admin/orderlist">
                 <Admin_Order_List />
              </Route>
              {/* Admin Over */}




              {/* Seller Routes */}
              <Route path="/seller/product">
                 <ASeller_Product />
              </Route> 

              <Route path="/seller/prod/edit/:id">
                 <ASeller_EditProduct />
              </Route>

              <Route path="/seller/createProduct">
                 <ASeller_CreateProduct />
              </Route>

              <Route path="/seller/orderlist">
                 <ASeller_OrderList />
              </Route>
               {/* Seller Over */}


              <Route path="/placeorder/:id">
                 <OrderScreen />
              </Route>

              <Route path="/placeorder">
                 <PlaceOrder />
              </Route>


              <Route path="/checkout/:id?"> 
              {/* or <Route path="/checkout/">  */}
                 <Header />        
                 <Checkout />
              </Route>


              <Route path="/product/:id"> 
                 <Header />        
                 <ProductDetails />
              </Route>

              <Route path="/himg"> 
                 <Header />        
                 <HImgSearch />
              </Route>

              <Route path="/search/:keyword">
                <Header />
                {/* <h2>YO</h2> */}
                <Home />
              </Route>

              <Route path="/">
                <Header />
                <Home />
              </Route>

          </Switch>
      </Router>
      
    </div>
    </Provider>

  );
}

export default App;
