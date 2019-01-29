import React, { Component } from 'react';
import './index.scss';

class Navbar extends Component {

  handlebackClick() {
    if (this.props.backClick) {
      return this.props.backClick();
    }
    if (this.props.history.length > 1) {
      return this.props.history.goBack();
    } else {
      return this.props.history.push('/');
    }
  }

  render() {
    const props = this.props;
    return (
      <div className="navbar">
				<div className="left" onClick={() => this.handlebackClick()}>
					{props.left !== ' ' ? <i className="iconfont icon-fanhui"></i> : null }
					{!props.left ? '返回' : props.left }
				</div>
				<div className="center">{props.center}</div>
				<div className="right" dangerouslySetInnerHTML={{__html: props.right ? props.right : null}}></div>
			</div>
    );
  }
}

export default Navbar;