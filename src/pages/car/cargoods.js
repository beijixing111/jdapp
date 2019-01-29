import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import ModalWarp from '../../components/modal';
import Toast from '../../components/toast';
import { Modal, Button } from 'antd-mobile';
import EmptyCar from './emptycar';
import Check from '../../util/check';
import Util from '../../util';

const alert = Modal.alert;

class Goods extends Component {
  constructor(props) {
    super(props);
  }

  handleNumFocus() {
    let body = document.querySelector('.App');
    body.scrollTop = body.scrollHeight;
  }
  handleNumBlur(shopid, id, v) {
    // v = parseInt(v) && !isNaN(v) ? parseInt(v) : 1;
    // this.returnGoodsArr(shopid, id, v);
    // IOS键盘收起后，页面滚动对应位置
    window.scroll(0, 0);
  }

  componentDidMount() {

  }
  componentWillUnmount() {

  }

  render() {
    const { goodslist, allchecked, total, checkedShopNum, } = this.props;
    console.log(this.props);
    const goodslistWarp = goodslist.map((shop) => {
      if (!shop) {
        return null;
      }
      let shopid = shop.get('shopid');
      const shopgoods = shop.get('goods').map(item => (
        <div className="goods-info" key={item.get('id')}>
          <i onClick={() =>{this.props.handleSingleChecked(shopid, item)}} className={"select " + (item.get('checked') ? 'active' : '')}></i>
          <Link className="goods-img" to={`/detail/${item.get('id')}`}>
            <img src={item.get('imgsrc')} alt="商品图片"/>
          </Link>
          <div className="box-info">
            <div className="name">
              <i className="mark">生鲜</i>{item.get('text')}
            </div>
            <div className="iddist">{item.get('desc')}</div>
            <div className="goods-line">
              <p className="price">￥{item.get('price')}</p>
              <div className="num-more">
                <span className={"minus " + (item.get('goodsNum') <= 1 ? 'disabled' : '')} onClick={() => this.props.handleClickMinus(shopid,item)}>
                </span>
                <div className="input-wrap">
                  <input type="text" type="tel" value={item.get('goodsNum')} max="200" 
                    onChange={(e) => this.props.handleChange(shopid, item.get('id'), e.target.value)}
                    onBlur={(e) =>this.props.handleNumBlur(shopid, item.get('id'), e.target.value)}
                    onFocus={()=>this.handleNumFocus()}
                  />
                </div>
                <span className={"plus " + (item.get('goodsNum') >= 200 ? 'disabled' : '')} onClick={() => this.props.handleClickAdd(shopid,item)}></span>
              </div>
            </div>
            <div className="sub-line">
              <span className="m_action_item" onClick={() => this.props.handleClickFollow(shopid, item)}>移入关注</span>
              <span className="del" onClick={() => this.props.handleClickDel(shopid, item)}>删除</span>
            </div>
          </div>
        </div>
      ));
      return (
        <div className="goods-item" key={shopid}>
          <div className="shop-line">
            <i className={'select shop-active ' + (shop.get('checked') ? 'active' : '')}
              onClick={() => this.props.handleSingleChecked(shopid)}
            ></i>
            <div className="shop-name">
              <i>YJ</i><span className="name-text">{shop.get('shopname')}</span>
            </div>
            <div className="tip-txt">
              <p><span>还差9.3元免运费</span><Link to="/10000">去凑单</Link></p>
            </div>
          </div>
          {shopgoods} 
        </div>);
    });
    return (
      <div >
        {goodslist.size != 0 ?
          <ModalWarp> 
            <div className="bottom-nav" style={{ bottom : this.props.hideTabbar ? '0' : '1rem' }}>
              <div className="all-check" onClick={this.props.handleAllChecked}>
                <i className={'active-icon select ' + (allchecked ? 'active' : '')}></i>
                <span>全选</span>
              </div>
              {allchecked ? <div className="clearcar" onClick={this.props.handleClearCar}>清空</div> : null}
              <div className="total-box">
                <div className="total-wrapper">
                  <p className="total-ji"><b>总计：</b>￥{total.get('totalMoney')}元</p>
                  <p>总额￥{total.get('totalMoney')}元 立减￥0.00元</p>
                </div>
                <div className="go-pay">去结算({total.get('totalNumber')})</div>
              </div>
            </div>
          </ModalWarp> : null
        }
        
        <div className="goods-wrapper">
          {goodslist.size != 0 ? goodslistWarp : <EmptyCar islogin={true} />} 
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  goodslist: state.getIn(['car', 'goodslist']),
  allchecked: state.getIn(['car', 'allchecked']),
  total: state.getIn(['car', 'total']),
  checkedShopNum: state.getIn(['car', 'checkedShopNum']),
  carNum: state.getIn(['car', 'carNum']),
  hideTabbar: state.getIn(['car', 'hideTabbar'])
});

const mapDispatch = (dispatch) => ({
  handleChange(shopid, id, value) {
    value = value > 200 ? 200 : value;
    value = value < 1 ? '' : value;
    dispatch(actionCreators.changValue(shopid, id, value));
  },
  handleNumBlur(shopid, id, value) {
    value = parseInt(value) && !isNaN(value) ? parseInt(value) : 1;
    dispatch(actionCreators.changValue(shopid, id, value));
    window.scroll(0, 0);
  },
  handleClickAdd(shopid, item) {
    dispatch(actionCreators.changValue(shopid, item.get('id'), item.get('goodsNum') + 1));
  },
  handleClickMinus(shopid, item) {
    if (item.get('goodsNum') == 1) {
      return Toast.info('不能再少了哦！');
    }
    dispatch(actionCreators.changValue(shopid, item.get('id'), item.get('goodsNum') - 1));
  },
  handleClickDel(shopid, item) {
    alert('提示', '确定要删除此商品么？', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' }, {
        text: '确定',
        onPress: () => {
          dispatch(actionCreators.removeGoods(shopid, item));
        }
      }
    ]);
  },
  handleAllChecked() {
    dispatch(actionCreators.allChecked());
  },
  handleSingleChecked(shopid, item) {
    dispatch(actionCreators.singleChecked(shopid, item));
  },
  handleClearCar() {
    alert('提示', '确定要清空购物车么？', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' }, {
        text: '确定',
        onPress: () => {
          dispatch(actionCreators.clearCar());
        }
      }
    ]);
  },
  handleClickFollow(shopid, item) {
    return Toast.info('暂时没有关注功能哦！');
  }
});

export default connect(mapState, mapDispatch)(Goods);