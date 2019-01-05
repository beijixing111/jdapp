import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Tabbar from '../../components/tabbar';
import Util from '../../util';

import "./home.scss";
import Logo from '../../static/images/logo.png';

function checkWebp() {
  try {
    return (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0);
  } catch (err) {
    return false;
  }
}


const Toptip = (props) => {
  return (
    <div className="top-wrapper">
      <div className="close" onClick={props.closeToptip}>
        <div className="close-img"></div>
      </div>
      <div className="logoimg">
        <img src={Logo} alt="logo"/>
      </div>
      <div className="download-text">打开京东App,购物更轻松</div>
      <div className="btn-open">立即打开</div>
    </div>
  );
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadTip: true

    };
  }

  handleCloseToptip() {
    console.log(12333);
    this.setState({
      downloadTip: false
    });
  }

  componentDidMount() {
    this.bindEvents();
  }
  scrollTypeMethod() {



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
      if (pageScroll.scrollTop > 20) {
        isshow = !isshow;
      }
      this.setState({
        downloadTip: isshow
      });
      Util.setSessionItem('home_scrollTop', pageScroll.scrollTop);
    });

  }

  componentWillUnmount() {
    // window.removeEventListener("scroll", () => {});
  }

  render() {
    return (
      <div className="page-content">
        {this.state.downloadTip ? <Toptip closeToptip={() => this.handleCloseToptip()} />: null }
        <p>Home</p> 
        <p>Home</p> 
        <p>Home</p> 
        <p>Home</p> 
        <p>Home</p> 
        <p>Home</p> 
        <p>Home</p> 
        <p>Home</p> 
        <p>Home</p> 
        <p>Home</p> 
        <p>Home</p> 
        <p>Home</p> 
        <p>Home</p> 
        <p>Home</p> 
        <p>Home</p>
        <p><Link to="/detail" style={{color: "blue"}}>Detail</Link></p> 
        <p>Home</p> 
        <p>Home</p> 
        
      </div>
    )
  }
}

export default Tabbar(Home);