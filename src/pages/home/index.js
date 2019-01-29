import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Tabbar from '../../components/tabbar';
import Util from '../../util';
import Toptip from './toptip';
import SliderArt from './slider';
import Submenu from './submenu';
import Jdnotice from './jdnotice';
import Floor from './floor';
import portImg from '../../static/images/xuanchuan_01.png';


import "./home.scss";

const Searchwrap = () => (
  <div className="search-content">
    <div className="res-list">
      搜索结果展示
    </div>
  </div>
);

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadTip: true,
      searchVal: '',
      headerTop: 0,
      focused: false
    };
  }

  handleCloseToptip() {
    console.log(12333);
    this.setState({
      downloadTip: false
    });
  }
  handleSearchChange = (e) => {
    this.setState({
      searchVal: e.target.value
    });
  }

  componentDidMount() {
    this.bindEvents();
    this.headerTop = document.querySelector('.header').offsetHeight;
    if (this.state.downloadTip) {
      this.setState({
        headerTop: this.headerTop
      });
    }
  }

  handleFocus = () => {
    if (this.state.focused) {
      return;
    }
    this.setState({
      downloadTip: false,
      headerTop: 0,
      focused: true
    });
  }
  handleClickBack = () => {
    this.setState({
      downloadTip: true,
      headerTop: this.headerTop,
      focused: false
    });
  }

  bindEvents() {
    var pageScroll = document.querySelector('.page-content');
    var types = JSON.parse(Util.getSessionItem('scrollType'));
    if (!!types && 'home' in types) {
      var scrollVal = Util.getSessionItem('home_scrollTop');
      pageScroll.scrollTop = scrollVal;
    }
    pageScroll.addEventListener("scroll", () => {
      var isshow = true;
      if (this.state.focused) {
        return false;
      }
      var headerTop;
      if (pageScroll.scrollTop > 20) {
        isshow = !isshow;
        headerTop = 0;
      } else {
        headerTop = this.headerTop;
      }
      this.setState({
        downloadTip: isshow,
        headerTop
      });
      Util.setSessionItem('home_scrollTop', pageScroll.scrollTop);
    });

  }

  componentWillUnmount() {
    // window.removeEventListener("scroll", () => {});
  }

  render() {
    // console.log(this.props);
    const { loginStatus } = this.props;
    return (
      <React.Fragment>
        {this.state.downloadTip ? <Toptip closeToptip={() => this.handleCloseToptip()} />: null }
        <div className={this.state.downloadTip? 'header' : 'header after'}
            style={{top: this.state.downloadTip ? this.state.headerTop : 0}} 
          >
          <div className="fenlei">
            { this.state.focused ? 
              <i className="iconfont icon-fanhui" onClick={this.handleClickBack}></i> :
              <Link to="/category" className="iconfont icon-fenlei1"></Link>
            }
          </div>
          <div className="search-container">
            <div className="search-box">
              <i className="jd-icon-logo">JD</i>
              <i className="iconfont icon-sousuo-copy jd-icon-search"></i>
              <div className="jd-header-input">
                <input type="text" maxLength="20" 
                  name="keyword" autoComplete="off"
                  value={this.state.searchVal}
                  onFocus={this.handleFocus}
                  placeholder='海澜之家，男人的衣柜'
                  onChange={this.handleSearchChange}
                />
              </div>
            </div>
          </div>
          <div className="login-btn">
            { this.state.focused ? 
              <button type="button" className="btn">搜索</button> :
              ( !loginStatus ? 
                <Link className="login-text" to="/login">登录</Link> :
                <Link className="login-text" to="/user" >
                  <i className="iconfont icon-yonghu" style={{fontSize: "0.34rem"}}></i>
                </Link> 
              )
            }
          </div>
        </div>
        
        {this.state.focused ? <Searchwrap /> : null}
        <div className="page-content"> 
          <div className="huandengpic">
            <SliderArt />
          </div>
          <div className="jingpin">
            <img src={portImg} alt="" />
          </div>
          {/*子导航栏*/}
          <Submenu />
          <Jdnotice />
          <Floor />  
          <Floor />  
        </div>
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  loginStatus: state.getIn(['login', 'loginStatus'])
});

export default Tabbar(connect(mapState, null)(Home));