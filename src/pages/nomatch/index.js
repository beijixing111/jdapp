import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import './index.scss';

export default class extends Component {
  render() {
    return (
      <div>
				<Navbar backClick={ () => this.props.history.goBack()} left='返回' center='' />
				<div className="notfound-container"> 
        	<div className="notfound-img"></div> 
        	<p><i>页面失联了~休息一会儿吧，</i><Link to="/home">返回首页</Link></p>
        </div>
      </div>
    )
  }
}