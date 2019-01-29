import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Slider from './slider';
import ModalWarp from '../../components/modal';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { actionCreators as carActionCreators } from '../car/store';
import Toast from '../../components/toast';
import Util from '../../util';

import './index.scss';

import sliderPic from '../../static/images/58b3cfe4N833584e7.jpg';

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navbarIndex: 0,
      partsArr: ['item', 'comment', 'guess', 'detail'],
    }
    this.pageSrcoll = null;
  }

  handleBack = () => {
    console.log(this.props);
    if (this.props.history.length > 1) {
      let types = {};
      types.home = 'detail';
      Util.setSessionItem('scrollType', JSON.stringify(types));
      this.props.history.goBack();
    } else {
      this.props.history.push('/');
    }
  }
  handleSwitch = (i) => {
    let parts = this.state.partsArr;
    this.setState({
      navbarIndex: i
    });
    let Navbar_hei = document.querySelector('.detail-navbar').offsetHeight;
    let scrollTop = document.getElementById(parts[i]).offsetTop;
    let pageSrcoll = document.querySelector('.page-content');
    pageSrcoll.scrollTop = scrollTop - (Navbar_hei - 1);
    console.log(document.getElementById(parts[i]).offsetTop);
    // var offsetTop
  }
  bindEvents() {
    this.pageSrcoll = document.querySelector('.page-content');
    console.log(this.pageSrcoll);
    this.pageSrcoll && this.pageSrcoll.addEventListener('scroll', () => this.scrollEvent());

  }
  scrollEvent() {
    let parts = this.state.partsArr;
    let Navbar_hei = document.querySelector('.detail-navbar').offsetHeight;
    let scrollTopArr = parts.map(item => {
      let offsetTop = document.getElementById(item).offsetTop;
      return (offsetTop - (Navbar_hei - 1));
    });
    let index = this.state.navbarIndex;
    let scrollTop = this.pageSrcoll.scrollTop;
    // console.log(scrollTopArr);
    for (var i = 0; i < scrollTopArr.length; i++) {
      if (scrollTop >= scrollTopArr[i]) {
        if (scrollTopArr[i + 1] && scrollTop < scrollTopArr[i + 1]) {
          index = i;
        } else {
          index = scrollTopArr.length - 1;
        }
      }
    }
    this.setState({
      navbarIndex: index
    });
  }
  componentDidMount() {
    this.bindEvents();
  }
  componentWillUnmount() {
    this.pageSrcoll.removeEventListener('scroll', this.scrollEvent);
  }
  render() {
    // console.log(this.props);
    const { shopgoods, chooseArr, loginStatus, carNum } = this.props;
    const goodsinfo = shopgoods.get('goods');
    const NarbarCenter = () => (
      <div className="center-item">
        {["商品","评价","推荐", "详情"].map((item, index) => (
          <a key={index} href="javascript:" className={index == this.state.navbarIndex ? 'cur' : ''}  onClick={() => this.handleSwitch(index)}>{item}</a>
        ))}
      </div>
    );

    return (
      <div className="detail-container">
        <div className="detail-navbar">
          <div className="left" onClick={this.handleBack}>
            <i className="iconfont icon-fanhui"></i>
          </div>
          <div className="center">
            <NarbarCenter />
          </div>
          <div className="right"></div>
        </div>
        <div className="page-content">
          <div className="part part-main" id="item">
            <Slider  />
            <div className="goods-info">
              <div className="price">
                <div className="num"><i>￥</i>{goodsinfo.get('price').get(chooseArr.get(0))}</div>
              </div>
              <div className="title after">{goodsinfo.get('text')}</div>
              <div className="sect after">
                <div className="le">支付</div> 
                <div className="info">
                  <p>【京东支付】 首单随机立减5至99元</p>
                </div>
              </div>
              <div className="sect after">
                <div className="le">领卷</div> 
                <div className="info">
                  <span className="juan">满29减2</span>
                  <span className="juan">满39减3</span>
                </div>
              </div>
              <div className="sect">
                <div className="le">促销</div>
                <div className="rig"></div>
                <div className="info">
                  <p>部分促销仅支持单独购买</p>
                </div>
              </div>
            </div>
          </div>
          <div className="part" style={{padding: 0}}>
            <div className="sect after" onClick={this.props.handleClickOpenChoose}>
              <div className="le">已选</div>
              <div className="rig"><i>···</i></div>
              <div className="info">
                <span>{goodsinfo.get('types').get(chooseArr.get(0))}斤,{goodsinfo.get('goodsNum')}件</span>
              </div>
            </div>
            <div className="sect after">
              <div className="le">送至</div>
              <div className="rig">
                <i>···</i>
              </div>
              <div className="info">
                <span>北京朝阳区三环到四环之间</span>
              </div>
            </div>
            <div className="sect after">
              <div className="le">运费</div>
              <div className="rig">
                <i>···</i>
              </div>
              <div className="info">
                <span>在线支付运费10元</span>
              </div>
            </div>
          </div>
          <div className="part part-comment" id="comment">
            <p>评价</p>
          </div>
          <div className="part part-guess" id="guess">
            <p>推荐</p>
            <p><Link to="/detail/single">1233</Link> </p>
          </div>
          <div className="part part-detail" id="detail">  
            <p>详情</p>
          </div>  
        </div>
        <ModalWarp>
          <div className="detail-bottom-layer" onClick={this.props.handleClickCloseChoose} style={{transform: this.props.isShow ? 'translateY(0)' : 'translateY(105%)'}}>
            <div className="layer-main" onClick={e => e.stopPropagation()}>
              <div className="layer-header">
                <img className="img" src={sliderPic} />
                <div className="info">
                  <p><i>￥</i>{goodsinfo.get('price').get(chooseArr.get(0))}</p>
                  <p><em>已选</em><span>{goodsinfo.get('types').get(chooseArr.get(0))}斤，{goodsinfo.get('goodsNum')}件</span></p>
                </div>
              </div>
              <div className="layer-body">
                <div className="art">
                  <p>规格</p>
                  <ul className="ul">
                    {goodsinfo.get('types').map((item, index) => (
                      <li key={index} className={chooseArr.get(0) == index ? 'active' : ''}
                        onClick={() => this.props.handleSwitchClick(0, index)}
                      >{item}斤</li>
                    ))}
                  </ul>
                </div>
                {/*<div className="art">
                  <p>尺码</p>
                  <ul className="ul">
                    <li>S</li>
                  </ul>
                </div>*/}
                <div className="art">
                  <p>数量</p>
                  <div className="num-more">
                    <span className={goodsinfo.get('goodsNum') <= 1 ? "minus disabled" : "minus"} 
                      onClick={() => this.props.handleClickMinus(shopgoods.get('shopid'), goodsinfo.get('id'), goodsinfo.get('goodsNum'))}>
                    </span>
                    <div className="input-wrap">
                      <input type="text" type="tel" value={goodsinfo.get('goodsNum')} max="200" 
                        onBlur={(e) => this.props.handleInputBlur(shopgoods.get('shopid'), goodsinfo.get('id'), e.target.value)}
                        onChange={(e)=> this.props.handleChangeInput(shopgoods.get('shopid'), goodsinfo.get('id'), e.target.value)} 
                      
                      />
                    </div>
                    <span className={goodsinfo.get('goodsNum') >= 200 ? "plus disabled" : "plus"} 
                      onClick={() => this.props.handleClickAdd(shopgoods.get('shopid'), goodsinfo.get('id'), goodsinfo.get('goodsNum'))}>
                    </span>
                  </div>
                </div>
              </div>
              <div className="btns">
                <button className="btn" type="button" 
                  onClick={
                    () => this.props.handleClickSureGoods({
                      shopgoods,
                      chooseArr,
                    }) 
                  }>确认
                </button>
              </div>
            </div>
          </div>
        </ModalWarp>
        <ModalWarp> 
          <div className="detail-bottom-nav">
            <div className="left">
              <div className="col contact">联系客服</div>
              <div className="col">进店</div>
              <div className="col">
                <Link to="/car">
                  {(loginStatus && carNum !== 0) ? <i>{carNum}</i> : null}
                  <p className="iconfont icon-gouwuche"></p>
                  <p className="car">购物车</p>
                </Link>
              </div>
            </div>
            <div className="rig">
              <div className="btn addcar" onClick={this.props.handleClickOpenChoose}>加入购物车</div>
              <div className="btn like" onClick={this.props.handleClickOpenChoose}>立刻购买</div>
            </div>
          </div>
        </ModalWarp>     
			</div>
    );
  }
}

const mapState = state => ({
  isShow: state.getIn(['detail', 'isShow']),
  shopgoods: state.getIn(['detail', 'shopgoods']),
  chooseArr: state.getIn(['detail', 'chooseArr']),
  carNum: state.getIn(['car', 'carNum']),
  loginStatus: state.getIn(['login', 'loginStatus'])
});

const mapDispatch = dispatch => ({
  handleClickOpenChoose() {
    dispatch(actionCreators.toggleChooseGoods(true));
  },
  handleClickCloseChoose() {
    dispatch(actionCreators.toggleChooseGoods(false));
  },
  handleClickSureGoods(info) {
    dispatch(carActionCreators.addGoods(info));
    dispatch(actionCreators.toggleChooseGoods(false));
    Toast.info('加入购物车成功！');
  },
  handleSwitchClick(index, value) {
    dispatch(actionCreators.switchGuige(index, value));
  },
  handleChangeInput(shopid, id, value) {
    value = value > 200 ? 200 : value;
    value = value < 1 ? '' : value;
    dispatch(actionCreators.changDetailValue(shopid, id, value));
  },
  handleInputBlur(shopid, id, value) {
    value = parseInt(value) && !isNaN(value) ? parseInt(value) : 1;
    dispatch(actionCreators.changDetailValue(shopid, id, value));
    window.scroll(0, 0);
  },
  handleClickAdd(shopid, id, value) {
    value = parseInt(value);
    if (value >= 200) {
      return Toast.info('亲，该商品最多可购买200件哦！');
    } else {
      dispatch(actionCreators.changDetailValue(shopid, id, value + 1));
    }
  },
  handleClickMinus(shopid, id, value) {
    if (value == 1) {
      return Toast.info('亲，不能再少了哦！');
    } else {
      dispatch(actionCreators.changDetailValue(shopid, id, value - 1));
    }
  }
});

export default connect(mapState, mapDispatch)(Detail);