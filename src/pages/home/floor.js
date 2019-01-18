import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import titleImg from '../../static/images/aishenghuo.png';
import nianhuoImg from '../../static/images/nianhuojie.png';
import iphoneImg from '../../static/images/iphone.jpg';
import computerImg from '../../static/images/computer.png';

const nianhuoArr = [{
  id: 1,
  title: '玩3C',
  desc: '大牌手机电脑 享折扣钜惠'
}, {
  id: 2,
  title: '京东家电',
  desc: '家电狂欢 京彩有你'
}, {
  id: 3,
  title: '京东超市',
  desc: '超市大放价 抢超值好货'
}, {
  id: 4,
  title: '爱家',
  desc: '家居日用 部分满199减100'
}];


class Floor extends Component {

  render() {
    return (
      <div className="floor">
				<div className="fls-tit">
					<img src={titleImg} alt=""/>
				</div>
				<div className="floor-container">
					{nianhuoArr.map((item) => (
						<div className="graphic-separation" key={item.id}>
							<Link to={`/detail/${item.id}`}>
								<div className="graphic-text">
									<p className="year-wrap">
										<span>{item.title}</span>
										<img src={nianhuoImg} alt=""/>
									</p>
									<p className="red">{item.desc}</p>
								</div>
								<div className="graphic-img">
									<img src={iphoneImg} alt=""/>
									<img src={computerImg} alt=""/>
								</div>
							</Link> 
						</div>
					))}
				</div>
			</div>
    );
  }
}

export default Floor;