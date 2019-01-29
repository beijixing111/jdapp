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

var CarScrollTop = 0;
var text = 0;
class Car extends Component {

  constructor(props) {
    super(props);
  }

  carComponent() {
    const { loginStatus } = this.props;
    if (!loginStatus) {
      return <EmptyCar islogin={false} />;
    } else {
      return <Goods  />
    }
  }

  componentDidMount() {
    this.bindEvents();
  }
  bindEvents() {
    let scrollwraper = document.querySelector('#scrollwraper');
    //IOS有影响
    // scrollwraper.addEventListener('scroll', () => this.props.toggleTabbar(scrollwraper.scrollTop));
  }
  render() {
    console.log(this.props);
    return (
      <div className="car-container">
        <Navbar left=" " center="购物车" />
        <div className="car-content" id="scrollwraper" style={{paddingBottom: (this.props.carNum != 0 && this.props.loginStatus ? '1rem' : 0)}}> 
          {this.carComponent()}
          <Tuijian />
        </div> 
      </div>
    )
  }
}

const mapState = state => ({
  loginStatus: state.getIn(['login', 'loginStatus'])
});

const mapDispatch = (dispatch) => ({
  toggleTabbar(scrollTop) {
    console.log(scrollTop, CarScrollTop);
    // if (scrollTop > CarScrollTop) {
    //   console.log('向上滚(划)动');
    //   dispatch(actionCreators.toggleTabbar(true));
    // } else {
    //   console.log('向下滚(划)动'); 
    //   dispatch(actionCreators.toggleTabbar(false));
    // }
    if (scrollTop <= 0 || scrollTop < CarScrollTop) {
      dispatch(actionCreators.toggleTabbar(false));
    } else {
      dispatch(actionCreators.toggleTabbar(true));
    }
    CarScrollTop = text = scrollTop;
  }
});

export default Tabbar(connect(mapState, mapDispatch)(Car));