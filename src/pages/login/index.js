import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Util from '../../util';
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
  isHighLight(a, p) {
    console.log(a.length, p.length);

    if (a.length > 0 && p.length > 0) {
      console.log(a, p);
      this.setState({
        highlight: true
      });
    } else {
      console.log(1223);
      this.setState({
        highlight: false
      });
    }
  }
  handleSubmit = () => {
    let account = this.state.account;
    let password = this.state.password;

    console.log(account, password);
    if (!account && !password) {
      return;
    } else {
      Util.setSessionItem('loginState', true);
      this.props.history.push('/user');
    }
  }
  render() {
    return (
      <div>
      	<Navbar left={<Link to="/home">返回</Link>} center='京东登录' />
      	<div className="login-content">
					<div className="login-item">
						<input type="text" placeholder="用户名/邮箱/手机号码" 
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
						/>
						<i className="clear rig" 
							style={{"display": this.state.passwordTip ? 'flex' : 'none'}}
							onClick={() => this.setState({password: '', passwordTip: false, highlight: false })}
						>×</i>
						<Link to="/findpw" className="forget-pw">忘记密码</Link>
					</div>
					<button type="button" className={this.state.highlight? 'login-btn highlight' : 'login-btn'} onClick={this.handleSubmit}>登&nbsp;&nbsp;录</button>
      	</div>
      </div>
    );
  }
}

export default Login;