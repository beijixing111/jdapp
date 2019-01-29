import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import './index.scss';

export default class extends Component {
  render() {
    return (
      <div>
				<Navbar left='返回' center='' {...this.props} />
				<div className="notfound-container"> 
        	<div className="notfound-img"></div> 
        	<p><i>页面失联了~休息一会儿吧，</i>
            { this.props.history.length > 1 ? <a href='javascript:void(0)' onClick={() => this.props.history.goBack()}>返回上一页</a> : 
              <Link to="/home">返回首页</Link>
            }
          </p>
        </div>
      </div>
    )
  }
}