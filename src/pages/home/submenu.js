import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import submenuPic from '../../static/images/submenu.png';

const submenu = [{
  id: 1,
  imgsrc: submenuPic,
  title: '京东超市',
}, {
  id: 2,
  imgsrc: submenuPic,
  title: '海囤全球',
}, {
  id: 3,
  imgsrc: submenuPic,
  title: '京东服饰',
}, {
  id: 4,
  imgsrc: submenuPic,
  title: '京东生鲜',
}, {
  id: 5,
  imgsrc: submenuPic,
  title: '京东到家',
}, {
  id: 6,
  imgsrc: submenuPic,
  title: '充值缴费',
}, {
  id: 7,
  imgsrc: submenuPic,
  title: '9.9元拼',
}, {
  id: 8,
  imgsrc: submenuPic,
  title: '领卷',
}, {
  id: 9,
  imgsrc: submenuPic,
  title: '赚钱',
}, {
  id: 10,
  imgsrc: submenuPic,
  title: '全部',
}];

class Submenu extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="submenu">
				<ul className="wrapper">
	      	{submenu.map((item) => (
						<li key={item.id}>
							<Link to="/">
								<div className="imgbox">
									<img src={item.imgsrc} alt="子菜单"/>
								</div>
								<div className="title">{item.title}</div>
							</Link>
						</li>
	      	))}
				</ul>
      </div>
    );
  }
}

export default Submenu;