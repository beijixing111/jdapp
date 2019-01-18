import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, WingBlank } from 'antd-mobile';

const noticeinfo = [{
  id: 1,
  text: '华为员工：宁买iPhone也不用华为Meta实情'
}, {
  id: 2,
  text: 'Win10/Office正版跳楼价，简直不要钱！'
}];

class Jdnotice extends Component {

  render() {
    return (
      <div className="scroll_news">
				<div className="notice-logo"></div>
				<div className="news-wrapper">
					<WingBlank>
						<Carousel className="my-carousel"
							vertical
							dots={false}
							dragging={false}
							swiping={false}
							autoplay
							infinite
							speed={300}
							autoplayInterval={2000}
							resetAutoplay={false}
						>
							{noticeinfo.map((item,i) => (
								<div className="text-font" key={item.id} dangerouslySetInnerHTML={{__html: '<i class="red">'+(i%2 == 0 ? 'hot':'热门') + '</i>' +item.text}}></div>
							))}
						</Carousel>
					</WingBlank>
				</div>
				<div className="more"> 
					<Link to="/moreinfo">更多</Link>
				</div> 
    	</div>

    );
  }
}

export default Jdnotice;