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
import ClientHome from './Views/ClientHome';
import About from './Views/About'
import Product from './Views/Product'
import PrivateRoute from "./Components/PrivateRoute";
import ClientRoute from "./Components/ClientRoute";


function App() {
  return (
    <div>
      <Router>
        <Nav />
        {/*<Aside/>*/}
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          <Header />
          <Aside />
          <div className="content">
            <div className="container">

              <AuthProvider>
                <Switch>
                  <PrivateRoute exact path="/product/:id">
                      product with parameter
                    <Product />
                  </PrivateRoute>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/home" component={Home} />
                  <ClientRoute exact path="/clienthome" component={ClientHome} />
                  <PrivateRoute exact path="/product" component={Product} />
                  <PrivateRoute path="/about" component={About} />
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
