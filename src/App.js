import './App.css';
import Header from'./Header';
import Home from'./Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Checkout from './Checkout';
import Register from './Register';
import Login from './Login';
import Seller from './Seller'

function App() {
  return (
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

              <Route path="/seller">
                  <Seller />
               </Route>

              <Route path="/checkout"> 
                 <Header />        
                 <Checkout />
              </Route>

              <Route path="/">
                <Header />
                <Home />
              </Route>
          </Switch>
      </Router>
      
    </div>
  );
}

export default App;
