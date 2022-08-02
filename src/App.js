import './App.css';
import Header from'./Header';
import Home from'./Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Checkout from './Checkout';
import Register from './Register';
import Login from './Login';
import Seller from './Seller'
import ProductDetails from './ProductDetails'

import {Provider} from 'react-redux'
import store from './Store'

import Login_brad from './Login_brad';
import Register_brad from './Register_brad';
import ProfileDetails from './ProfileDetails';


function App() {
  return (
<Provider store={store} >
    <div className="app">
      <Router >
         
          {/*Common part to both router*/}
          <Switch >
              <Route path="/register">
                 <Register />
              </Route>

              <Route path="/login">
                  <Login />
              </Route>

              <Route path="/login_brad">
                  <Login_brad />
              </Route>

              <Route path="/register_brad">
                  <Register_brad />
              </Route>

              <Route path="/profile_brad">
                  <ProfileDetails />
              </Route>

              <Route path="/seller">
                  <Seller />
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
