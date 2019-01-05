import React, { Component } from 'react';
import './index.scss';

class Navbar extends Component {

  handlebackClick(props) {
    if (props.backClick) {
      return props.backClick();
    } else if (props.history) {
      props.history.goBack();
    } else {
      return;
    }
  }

  render() {
    const props = this.props;
    return (
      <div className="navbar">
				<div className="left" onClick={() => this.handlebackClick(props)}>
					{props.left != ' ' ? <i className="iconfont icon-fanhui"></i> : null }
					{!props.left ? '返回' : props.left }
				</div>
				<div className="center">{props.center}</div>
				<div className="right">{props.right ? props.right : null}</div>
			</div>
    );
  }

}


export default Navbar;