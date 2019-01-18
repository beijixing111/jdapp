import React, { Component } from 'react';
import Navbar from '../../components/navbar';
// import Util from '../../util';
import Toast from '../../components/toast';
import './index.scss';

class Findpw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      focused: false
    };
  }
  handleSubmit = () => {
    if (!this.state.account) {
      Toast.info('请先填写账号！');
    }
  }

  render() {
    return (
      <div>
				<Navbar backClick={ () => this.props.history.goBack()} left='返回' center='忘记密码' />
				<div className="findpw-container">
					<div className={this.state.focused ? 'findpw-item focused' : 'findpw-item'}>
						<label htmlFor="account" className="label">账号</label>
						<input 
							id="account"
							type="text" 
							value={this.state.account}
							placeholder="用户名/邮箱/手机号"  
							onChange={e => this.setState({account: e.target.value})} 
							onFocus={e => this.setState({focused: true}) }
							onBlur={e => this.setState({focused: false}) } 
						/>
						<i className="clear"
							style={{display: this.state.account.length>0 ? 'flex' : 'none'}}
							onClick={() => this.setState({account: ''})}
						>×</i> 
					</div>
					<button type="button" className="find-btn" onClick={this.handleSubmit}>点击完成验证</button>
					
				</div>
			</div>
    );
  }
}

export default Findpw;