import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// import createBrowserHistory from "history/createBrowserHistory";
// const customHistory = createBrowserHistory();

import Home from './pages/home';
import Category from './pages/category';
import Car from './pages/car';
import User from './pages/user';
import Detail from './pages/detail';
import Login from './pages/login';
import Findpw from './pages/findpw';
import Personset from './pages/personset';

export default () => (
  <Router >  
    <>
      <Route exact path='/' render={() => <Redirect to="/home" />} ></Route> 
      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/category' component={Category} />
        <Route path='/car' component={Car} />
        <Route path='/user' component={User} />
        <Route path='/detail' component={Detail} />
        <Route path='/login' component={Login} />
        <Route path='/findpw' component={Findpw} />
        <Route path='/personset' component={Personset} />
      </Switch>
    </>
  </Router>
);