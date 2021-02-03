import './App.css';
import Header from'./Header';
import Home from'./Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Checkout from './Checkout';
import Register from './Register';

function App() {
  return (
    <div className="app">
      <Router >
         
          {/*Common part to both router*/}
          <Switch >
            <Router path="/register">
              <Register />
            </Router>

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
