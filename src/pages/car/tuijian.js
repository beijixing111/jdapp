import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import goodsImg01 from '../../static/images/goods_01.jpg';
import goodsImg02 from '../../static/images/goods_02.jpg';

const miaoshadata = [{
  id: 1,
  title: '京东秒杀',
  goods: [{
    id: 1,
    text: '甜鸭梨 6-8个 净重约1.8kg 新鲜水果',
    imgsrc: goodsImg01,
    price: 10,
    desc: '甜鸭梨 甜鸭梨 甜鸭梨 '
  }, {
    id: 2,
    text: '潮汕绿豆饼 10个 ',
    imgsrc: goodsImg01,
    price: 30.00,
    desc: '2.5kg/件，潮汕绿豆饼'
  }]
}, {
  id: 2,
  title: '可能你还想要',
  goods: [{
    id: 1,
    text: '麻花 6-8个 净重约1.8kg',
    imgsrc: goodsImg02,
    price: 10,
    desc: '麻花麻花麻花麻花麻花'
  }, {
    id: 2,
    text: '潮汕绿豆饼 10个 净重约2.5kg',
    imgsrc: goodsImg02,
    price: 30.00,
    desc: '2.5kg/件，潮汕绿豆饼'
  }]
}];

export default class Tuijian extends Component {
  render() {
    return (
      <div className="tuijian">
        <div className="tuijian-content">
			    {miaoshadata.map(outItem => (
			      <div key={outItem.id}>
			        <div className="title">
			          <span>{outItem.title}</span>
			        </div>
			        <div className="tuijian-list">
			          <ul>
			            {outItem.goods.map((item => (
			              <li key={item.id}>
			                <Link to={`/${item.id}`}>
			                  <div className="goods-pic">
			                    <img src={item.imgsrc} alt=""/>
			                  </div>
			                  <p className="desc">{item.text}</p>
			                  <div className="price-line">
			                    <span className="price">￥<em>{item.price}</em></span>
			                    <span className="mark">满减</span>
			                    <span className="plus">￥{(item.price - 2)} <i className="plus-mark">plus</i></span>
			                  </div>
			                </Link>
			              </li>
			            )))}
			          </ul>
			        </div>
			      </div>
			    ))}
			  </div>
      </div>
    );
  }
}