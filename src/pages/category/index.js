import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Tabbar from '../../components/tabbar';
import './index.scss';

// 左侧导航
import submenu from './submenu';
// 右侧内容
import ChancelCont from './chancelcont';

const Submenu = () => (
  <ul>
		{submenu.map((item, i) => (
			<li key={item.id}>
				<NavLink activeClassName="active" to={`/category/${item.id}`}>{item.title}</NavLink>
			</li>
		))}
	</ul>
);

class Category extends Component {
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
						<Submenu />
					</div>
					<div className="right-wrapper">
						{/*{ !this.props.match ? <ChancelCont /> : this.props.children}*/}
						{this.props.children}
					</div>
      	</div>
      </div>
    )
  }
}

export default Tabbar(Category);