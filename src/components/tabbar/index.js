import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Util from '../../util';
import './index.scss';

const tabbarArr = [{
  img: 'icon-home',
  text: '首页',
  link: '/home'
}, {
  img: 'icon-fenlei',
  text: '分类',
  link: '/category'
}, {
  img: 'icon-gouwuche',
  text: '购物车',
  link: '/car'
}, {
  img: 'icon-yonghu',
  text: '我的',
  link: '/user'
}];


const Tabbar = (WrappedComponent) => class Tabbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carNum: 4
    };
  }

  componentDidMount() {
    let carNum = Util.getSessionItem('carNum') ? Util.getSessionItem('carNum') : this.state.carNum;
    this.setState({
      carNum: carNum
    });
  }

  // itemChange = (i) => {
  //   this.setState({
  //     index: i
  //   });
  // }
  render() {
    //const url = window.location.href;
    // <Link to={item.link} key={i} className={"tabbar-item " + (url.indexOf(item.link) > -1 ? 'active' : '')}  >
    //               <div className={"iconfont " + item.img}></div>
    //               <div className="tabbar-text">{item.text}</div>
    //             </Link>

    return (
      <React.Fragment>
        <div className="tabbar-children">
          <WrappedComponent {...this.props} />
        </div> 
        <div className="tabbar" >
          <div className="tabbar-content">
            {
              tabbarArr.map((item, i) => (
                <NavLink to={item.link} key={i} className="tabbar-item" activeClassName="active" >
                  {(item.link == '/car' && this.state.carNum != 0) ? <i>{this.state.carNum}</i> : null}
                  <div className={"iconfont " + item.img}></div>
                  <div className="tabbar-text">{item.text}</div>
                </NavLink>
              ))
            }
          </div> 
        </div> 
      </React.Fragment>
    )
  }
}

export default Tabbar;