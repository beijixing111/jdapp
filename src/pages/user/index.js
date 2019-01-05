import React, { Component } from 'react'
import Tabbar from '../../components/tabbar';
import { Redirect, Link } from 'react-router-dom';
import Util from '../../util';
import Navbar from '../../components/navbar';
import './index.scss';

class User extends Component {
  render() {
    if (!Util.getSessionItem('loginState')) {
      return <Redirect to="/login" />
      // return this.props.history.push('/login');
    }
    return (
      <div>
      	<Navbar left=' ' center='我的' right={<Link to="/personset">设置</Link>} />
      	<div className="mine-container">
					<p>欢迎，北极星</p>
      	</div>
      </div>
    )
  }
}

export default Tabbar(User);