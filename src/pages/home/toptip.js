import React from 'react';
import Logo from '../../static/images/logo.png';

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

export default Toptip;