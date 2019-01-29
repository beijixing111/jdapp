import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators as loginActionCreators } from '../login/store';
import Util from '../../util';
import Navbar from '../../components/navbar';
import './index.scss';

class Personset extends Component {

  render() {
    const { loginStatus, handleLogOut } = this.props;
    if (!loginStatus) {
      return <Redirect to="/home" />;
    }
    return (
      <div>
      	<Navbar left='我的' center='设置' {...this.props} />
      	<div className="set-container">
					<button className="loginout-btn" onClick={this.props.handleLogOut}>退&nbsp;&nbsp;出</button>
      	</div>
      </div>
    );
  }
}

const mapState = state => ({
  loginStatus: state.getIn(['login', 'loginStatus'])
});

const mapDispatch = dispatch => ({
  handleLogOut() {
    dispatch(loginActionCreators.loginOut());
  }
})

export default connect(mapState, mapDispatch)(Personset);