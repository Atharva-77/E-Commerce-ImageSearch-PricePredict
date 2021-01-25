import './App.css';
import Header from'./Header';
import Home from'./Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Checkout from './Checkout';

function App() {
  return (
    <div className="app">
      <Router >
         <Header /> {/*Common part to both router*/}
          <Switch >
              <Route path="/checkout">         
                 <Checkout />
              </Route>

              <Route path="/">
                <Home />
              </Route>
          </Switch>
      </Router>
      
    </div>
  );
}

export default App;
