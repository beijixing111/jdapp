import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';

import Navbar from '../../components/navbar';
import Tabbar from '../../components/tabbar';
import { Link } from 'react-router-dom';
import Util from '../../util';
import EmptyCar from './emptycar';
import Tuijian from './tuijian';
import Goods from './cargoods';
import './index.scss';

class Car extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginState: Util.getSessionItem('loginState')
    }
  }
  carComponent() {
    const { loginState, goods } = this.state;
    if (!loginState) {
      return <EmptyCar islogin={false} />;
    } else {
      return <Goods  />
    }
  }


  render() {

    return (
      <div className="car-container">
        <Navbar left=" " center="购物车"  />
        <div className="car-content" style={{paddingBottom: '1rem'}}> 
          {this.carComponent()}
          <Tuijian />
        </div> 
      </div>
    )
  }
}


export default Tabbar(connect(null, null)(Car));