import logo from './logo.svg';
import './App.css';
import HelloWorld from './Components/HelloWorldHook';
import Header from './Components/Header';
import Aside from './Components/Aside'
import Nav from './Components/Nav'
import Footer from './Components/Footer';

import Signup from './Components/Signup';
import Login from './Components/Login'
import Forgot from './Components/Forgot'
import { Container } from "react-bootstrap";
import { AuthProvider } from '../src/Contexts/AuthContext';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './Views/Home';
import About from './Views/About'
import Product from './Views/Product'


function App() {
  return (
    <div>
      <Router>
        <Nav />
        {/*<Aside/>*/}
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          <Header />
          <div className="content">
            <div className="container">

              <AuthProvider>
                <Switch>
                  <Route exact path="/product/:id">
                    product with parameter
                  <Product />
                  </Route>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route exact path="/product">
                    <Product />
                  </Route>
                  <Route path="/about">
                    <About />
                  </Route>
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
                  <Route path="/forgot" component={Forgot} />
                </Switch>
              </AuthProvider>

            </div>
          </div>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
