import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import imgsrc from './images/1.png';

const category = [{
  'id': 1,
  'img': imgsrc,
  'text': '手机'
}, {
  'id': 2,
  'img': imgsrc,
  'text': '华为'
}, {
  'id': 3,
  'img': imgsrc,
  'text': '充电宝'
}, {
  'id': 4,
  'img': imgsrc,
  'text': '电热毯'
}, {
  'id': 5,
  'img': imgsrc,
  'text': '电暖气'
}, {
  'id': 6,
  'img': imgsrc,
  'text': '路由器'
}];

const CategoryList = () => (
  <ul>
		{category.map((item, i) => (
			<li key={item.id}>
				<Link to={`/chancel/${item.id}`}>
					<img src={item.img} alt="111"/>
					<span>{item.text}</span>
				</Link>
			</li>
		))}
	</ul>
)

class ChancelCont extends Component {



  componentDidMount() {

  }
  render() {
    let { match } = this.props;
    if (match.params.id !== "1") {
      return <div className="category-wrapper" style={{fontSize: 14,padding: '10px'}}>菜单{match.params.id}</div>;
    }
    return (
      <div className="category-wrapper">
				<div className="category-item">
					<div className="label">
						<span>热门分类</span>
						<em>
              <Link to="/paihang">排行榜></Link>
            </em>
					</div>
					<div className="wrapper-content">
						<CategoryList />
            <CategoryList />
            <CategoryList />
					</div>
				</div> 
			</div>
    );
  }
}

export default ChancelCont;