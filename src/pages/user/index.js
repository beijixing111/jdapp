import React, { Component } from 'react'
import Tabbar from '../../components/tabbar';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Util from '../../util';
import './index.scss';

import avatarImg from '../../static/images/avatar.png';

const Navbar = () => (
  <div className="navbar">
    <div className="left" ></div>
    <div className="center">我的</div>
    <div className="right">
      <Link to="/personset">设置</Link>
      <Link to="/message" className="iconfont icon-buoumaotubiao14">
        <em className="num">99</em>
      </Link>
    </div>
  </div>
);

class User extends Component {
  render() {
    const { loginStatus } = this.props;
    if (!loginStatus) {
      return <Redirect to="/login" />
    }
    return (
      <div className="mine-container">
      	<Navbar />
      	<div className="mine-content">
					<div className="header-con">
            <div className="topinfo">
              <div className="headimg">
                <Link to="/personset" className="avatar">
                  <img src={avatarImg} alt=""/>
                </Link>
              </div>
              <div className="userinfo">
                <div className="mobile">188*****231</div>
                <div className="username">用户名：北极星</div>
                <div className="lab clearfix">
                  <Link to="/jdxiangzhi" className="link-item">京享值2837<i className="iconfont icon-jiantou_up"></i></Link>
                  <Link to="/jdxiaobai" className="link-item">小白信用90.1<i className="iconfont icon-jiantou_up"></i></Link>
                </div>
              </div>
            </div>
          </div>
          <div className="order-menu">
            <div className="line-box">
              <Link to="/order/1">
                <div className="icon"></div>
                <div className="text">待付款</div>
              </Link> 
            </div>
            <div className="line-box">
              <Link to="/order/2">
                <div className="icon"></div>
                <div className="text">待收货</div>
              </Link> 
            </div>
            <div className="line-box">
              <Link to="/order/3">
                <div className="icon"></div>
                <div className="text">退换／售后</div>
              </Link> 
            </div>
            <div className="line-box">
              <Link to="/order/0">
                <div className="icon"></div>
                <div className="text">全部订单</div>
              </Link> 
            </div>
          </div>
          <div className="order-menu">
            <div className="line-box">
              <div className="icon"></div>
              <div className="text">待付款</div>
            </div>
            <div className="line-box">
              <div className="icon"></div>
              <div className="text">待收货</div>
            </div>
            <div className="line-box">
              <div className="icon"></div>
              <div className="text">退换／售后</div>
            </div>
            <div className="line-box">
              <div className="icon"></div>
              <div className="text">全部订单</div>
            </div>
          </div>

      	</div> 
      </div>
    )
  }
}

const mapState = state => ({
  loginStatus: state.getIn(['login', 'loginStatus'])
});

export default Tabbar(connect(mapState, null)(User));