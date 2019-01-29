import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Tabbar from '../../components/tabbar';
import './index.scss';

// 左侧导航
import submenu from './submenu';
// 右侧内容
import ChancelCont from './chancelcont';


class Category extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chancelId: 1
    }
  }

  handleSwitchCategory(id) {
    this.setState({
      chancelId: id
    });

  }

  render() {
    return (
      <div className="category-container">
        <div className="search-wrapper">
					<div className="search-box">
						<em className="iconfont icon-sousuo-copy"></em>
						<input type="text" name="keyword" 
							className="search"
							autoComplete="off" 
							placeholder="萝卜"
						/>
					</div>
					 
				</div>
      	<div className="category-content">
					<div className="submenu">
						<ul>
							{submenu.map((item, i) => (
								<li key={item.id}>
									<a href="javascript:void(0);" 
										className={this.state.chancelId == item.id ? 'active' : ''}  
										onClick={() => this.handleSwitchCategory(item.id)}
										>{item.title}</a>
								</li>
							))}
						</ul>
					</div>
					<div className="right-wrapper">
						{/*{this.props.children}*/}
						<ChancelCont chancelId={this.state.chancelId} /> 
					</div>
      	</div>
      </div>
    )
  }
}

export default Tabbar(Category);