import React  from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Home from './pages/home';
import Category from './pages/category';
import Car from './pages/car';
import User from './pages/user';

export default () => (
  <Router>
    <>
      <Route exact  path='/' render={() => <Redirect to="/home" />} ></Route> 
      <Switch>
        <Route exact path='/home' component={Home} ></Route>
        <Route path='/category' component={Category} ></Route>
        <Route path='/car' component={Car} ></Route>
        <Route path='/user' component={User} ></Route>
      </Switch>
    </>
  </Router>
);
