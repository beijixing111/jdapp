import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, WingBlank } from 'antd-mobile';
import sliderPic from '../../static/images/huandengpic_01.jpg';

class SliderArt extends Component {
  state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
  }
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
  }
  render() {
    return (
      <WingBlank>
      {/*
            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            afterChange={index => console.log('slide to', index)}*/}
	    	<Carousel
	          autoplay={true}
	          infinite
	        >
	        <Link to="/home" style={{ display: 'block', width: '100%', height: this.state.imgHeight }} >
            <img
              src={sliderPic} 
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
           </Link>
           <Link to="/home" style={{ display: 'block', width: '100%', height: this.state.imgHeight }} >
            <img
              src={sliderPic} 
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
           </Link>
           <Link to="/home" style={{ display: 'block', width: '100%', height: this.state.imgHeight }} >
            <img
              src={sliderPic} 
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
           </Link>
	      </Carousel>  
	    </WingBlank>
    );
  }
}

export default SliderArt;