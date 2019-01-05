import React, { Component } from 'react'
import Tabbar from '../../components/tabbar';
import Util from '../../util';
import Navbar from '../../components/navbar';
import './index.scss';

class Personset extends Component {


  constructor(props) {
    super(props);
  }
  handleLoginOut = () => {
    Util.delSessionItem("loginState");
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
      	<Navbar left='我的' center='设置' {...this.props} />
      	<div className="set-container">
					<button className="loginout-btn" onClick={this.handleLoginOut}>退&nbsp;&nbsp;出</button>
      	</div>
      </div>
    );
  }
}

export default Personset;