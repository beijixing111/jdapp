import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// import createBrowserHistory from "history/createBrowserHistory";
// const customHistory = createBrowserHistory();

import Home from './pages/home';
import Category from './pages/category';
import Categorysub from './pages/category/chancelcont';
import Car from './pages/car';
import User from './pages/user';
import Detail from './pages/detail';
// import Single from './pages/detail/single';
import Login from './pages/login';
import Findpw from './pages/findpw';
import Personset from './pages/personset';
import Nomatch from './pages/nomatch';

export default () => (
  <Router >  
    <>
      <Route exact path='/' render={() => <Redirect to="/home" />} ></Route> 
      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/category' component={Category}/> 
        {/*<Route path='/category' 
          render={ () => (
            <Category>  
              <Route exact path='/category/' render={() => <Redirect to="/category/1" />} />
              <Route exact path='/category/:id' component={Categorysub} />
            </Category>
          )
        } /> */}
        <Route path='/car' component={Car} />
        <Route path='/user' component={User} />
        <Route path='/detail/:id' component={Detail} /> 
        <Route path='/login' component={Login} />
        <Route path='/findpw' component={Findpw} />
        <Route path='/personset' component={Personset} />
        <Route component={Nomatch} />
      </Switch>
    </>
  </Router>
);