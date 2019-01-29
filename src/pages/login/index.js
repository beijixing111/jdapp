import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../../components/navbar';

import { connect } from 'react-redux';
import { actionCreators } from './store';

import Toast from '../../components/toast/';
import Util, { check } from '../../util';
import './index.scss';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      accountTip: false,
      password: '',
      passwordTip: false,
      highlight: false,
    };
  }
  shouldComponentUpdate(newProps, newState) {
    return true;
  }
  handleAccount = (e) => {
    let account = e.target.value;
    this.setState({
      account: account,
      accountTip: account.length > 0 ? true : false
    });
    this.isHighLight(account, this.state.password);
  }
  handlePassword = (e) => {
    let password = e.target.value;
    this.setState({
      password: password,
      passwordTip: password.length > 0 ? true : false
    });
    this.isHighLight(this.state.account, password);
  }

  handlePwdFocus = () => {
    let body = document.querySelector('.App');
    body.scrollTop = body.scrollHeight;
  }
  handlePwdBlur = () => {
    // IOS键盘收起后，页面滚动对应位置
    window.scroll(0, 0);
  }

  isHighLight(a, p) {
    if (a.length > 0 && p.length > 0) {
      this.setState({
        highlight: true
      });
    } else {
      this.setState({
        highlight: false
      });
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }
  render() {
    const { loginStatus } = this.props;
    if (loginStatus) {
      return <Redirect to="/user" />;
    }
    return (
      <div className=" ">
      	<Navbar center='京东登录' {...this.props} />
      	<div className="login-content">
					<div className="login-item">
						<input type="text" placeholder="用户名 / 邮箱 / 手机号码" 
							value={this.state.account} autoComplete="new-pwd"
							onChange={this.handleAccount}
						/>
						<i className="clear" 
							style={{"display": this.state.accountTip ? 'flex' : 'none'}}
							onClick={() => this.setState({account: '', accountTip: false, highlight: false})}
						>×</i>
					</div>
					<div className="login-item mar">
						<input type="password" placeholder="请输入密码" 
							value={this.state.password} autoComplete="new-pwd"
							onChange={this.handlePassword}
              onFocus={this.handlePwdFocus}
              onBlur={this.handlePwdBlur}
						/>
						<i className="clear rig" 
							style={{"display": this.state.passwordTip ? 'flex' : 'none'}}
							onClick={() => this.setState({password: '', passwordTip: false, highlight: false })}
						>×</i>
						<Link to="/findpw" className="forget-pw">忘记密码</Link>
					</div>
					<button type="button" className={this.state.highlight? 'login-btn highlight' : 'login-btn'} onClick={() => this.props.handleLoginIn(this.state.account, this.state.password)}>登&nbsp;&nbsp;录</button>
      	</div> 
        {/*<a  target="_blank" href="http://ddrest.yzsh58.com/apk/app-debug.apk">下载点点APP</a>*/}
        <div className="test">
          <p><a href="sms:18688886666">发短信给18888886666</a></p>
          <p><a href="tel:186 8888 6666">打电话给188 8888 6666</a></p>
          <p><a href="mailto:815888888@qq.com">给815888888@qq.com发邮件</a></p>
          <p><a target="_blank" href="https://itunes.apple.com/cn/app/id1449805747?mt=8">去app store</a></p>
        </div>
        
      </div>
    );
  }
}

const mapState = state => ({
  loginStatus: state.getIn(['login', 'loginStatus'])
});

const mapDispatch = dispatch => ({
  handleLoginIn(account, password) {
    if (!account && !password) {
      return; //Toast.info('请先填写信息哦！');
    } else {
      if (!check.checkPhone(account)) {
        return Toast.info('手机号码格式不正确！');
      }
      if (!password || password.length < 6) {
        return Toast.info('密码不能为空且长度不能小于6位！');
      }
      dispatch(actionCreators.loginIn({ account, password }));
    }

  }
});

export default connect(mapState, mapDispatch)(Login);