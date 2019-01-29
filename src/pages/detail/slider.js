import React, { Component } from 'react';
import { Carousel, WingBlank } from 'antd-mobile';

import sliderPic from '../../static/images/58b3cfe4N833584e7.jpg';

class Slider extends Component {
  render() {
    return (
      <WingBlank> 
        <Carousel>
          <div style={{ display: 'block', width: '100%', height: this.props.imgHeight }} >
            <img
              src={sliderPic} 
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
           </div>
           <div style={{ display: 'block', width: '100%', height: this.props.imgHeight }} >
            <img
              src={sliderPic} 
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
           </div>
           <div style={{ display: 'block', width: '100%', height: this.props.imgHeight }} >
            <img
              src={sliderPic} 
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
           </div>
        </Carousel>  
      </WingBlank>
    );
  }
}

export default Slider;