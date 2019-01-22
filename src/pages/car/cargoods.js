import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import ModalWarp from '../../components/modal';
import Toast from '../../components/toast';
import { Modal, Button } from 'antd-mobile';
import EmptyCar from './emptycar';
import Format from '../../util/format';
import Check from '../../util/check';
import Util from '../../util';

const alert = Modal.alert;

class Goods extends Component {
  constructor(props) {
    super(props);
  }
  returnGoodsArr(shopid, id, v) {
    let value = v > 200 ? 200 : v;
    value = value < 1 ? '' : value;
    let goodslistArr = this.props.goodslist.map((shop) => {
      if (shop && shop.shopid == shopid) {
        shop.goods = shop.goods.map((item) => {
          if (item.id == id) {
            item.goodsNum = value;
          }
          return item;
        });
      }
      return shop;
    });
    this.setState({
      goodslist: goodslistArr,
      total: this.totalSum(goodslistArr)
    });
  }
  // changeValue(shopid, id, v) {
  //   this.returnGoodsArr(shopid, id, v);
  // }
  handleClickMinus(shopid, item) {
    // if (item.goodsNum - 1 == 0) {
    //   Toast.info('不能再少了哦！');
    // }
    // let v = item.goodsNum - 1 < 1 ? 1 : item.goodsNum - 1;
    // this.returnGoodsArr(shopid, item.id, v);
  }
  // handleClickAdd(shopid, item) {
  //   if (item.goodsNum + 1 > 200) {
  //     Toast.info('不能再加了哦！');
  //   }
  //   let v = item.goodsNum + 1 > 200 ? 200 : item.goodsNum + 1;
  //   this.returnGoodsArr(shopid, item.id, v);
  // }
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

  handleClickDel(shopid, item) {
    let _this = this;
    alert('提示', '确定要删除此订单么？', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' }, {
        text: '确定',
        onPress: () => {
          let carNum = 0;
          let goodslistArr = _this.props.goodslist.map(shop => {
            if (shop && shop.shopid == shopid) {
              let goodsArr = shop.goods.filter((_item) => {
                return _item.id != item.id;
              });
              shop.goods = goodsArr;
            }
            if (shop.goods.length == 0) {
              return null;
            }
            carNum += shop.goods.length;
            return shop;
          });
          console.log(goodslistArr);
          goodslistArr = goodslistArr.filter(shop => {
            return shop != null;
          });
          // if()
          console.log(_this.totalSum(goodslistArr));
          this.checkedShopNum = goodslistArr.length != 0 ? this.checkedShopNum : 0;
          _this.setState({
            allchecked: (goodslistArr.length != 0 ? this.state.allchecked : false),
            goodslist: goodslistArr,
            total: _this.totalSum(goodslistArr),
            carNum: carNum
          });

        }
      }
    ]);
  }

  handleClearCar = () => {
    this.setState({
      allchecked: false,
      goodslist: [],
      total: {
        totalMoney: 0,
        totalNumber: 0
      },
      carNum: 0
    });
  }
  componentDidMount() {

  }
  componentWillUnmount() {

  }

  render() {
    const { goodslist, allchecked, total, checkedShopNum } = this.props;
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
                    onBlur={(e) =>this.handleNumBlur(shopid, item.get('id'), e.target.value)}
                    onFocus={()=>this.handleNumFocus()}
                  />
                </div>
                <span className={"plus " + (item.get('goodsNum') >= 200 ? 'disabled' : '')} onClick={() => this.props.handleClickAdd(shopid,item)}></span>
              </div>
            </div>
            <div className="sub-line">
              <span className="m_action_item" onClick={() => this.props.handleClickFollow(shopid, item)}>移入关注</span>
              <span className="del" onClick={() => this.handleClickDel(shopid, item)}>删除</span>
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
      <div>
        {goodslist.length != 0 ?
          <ModalWarp> 
            <div className="bottom-nav">
              <div className="all-check" onClick={this.props.handleAllChecked}>
                <i className={'active-icon select ' + (allchecked ? 'active' : '')}></i>
                <span>全选</span>
              </div>
              {allchecked ? <div className="clearcar" onClick={this.handleClearCar}>清空</div> : null}
              <div className="total-box">
                <div className="total-wrapper">
                  <p className="total-ji"><b>总计：</b>￥{total.get('totalMoney')}元</p>
                  <p>总额￥{total.totalMoney}元 立减￥0.00元</p>
                </div>
                <div className="go-pay">去结算({total.get('totalNumber')})</div>
              </div>
            </div>
          </ModalWarp> : null
        }
        
        <div className="goods-wrapper">
          {goodslist.length != 0 ? goodslistWarp : <EmptyCar islogin={true} />} 
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
  carNum: state.getIn(['car', 'carNum'])
});

const mapDispatch = (dispatch) => ({
  handleChange(shopid, id, value) {
    dispatch(actionCreators.changValue(shopid, id, value));
  },
  handleClickAdd(shopid, item) {
    dispatch(actionCreators.changValue(shopid, item.get('id'), item.get('goodsNum') + 1));
  },
  handleClickMinus(shopid, item) {
    if (item.get('goodsNum') - 1 == 0) {
      return Toast.info('不能再少了哦！');
    }
    dispatch(actionCreators.changValue(shopid, item.get('id'), item.get('goodsNum') - 1));
  },
  handleAllChecked() {
    dispatch(actionCreators.allChecked());
  },
  handleSingleChecked(shopid, item) {
    dispatch(actionCreators.singleChecked(shopid, item));
  },

  handleClearCar() {
    // dispatch()
  },
  handleClickFollow(shopid, item) {
    return Toast.info('暂时没有关注功能哦！');
  }
});

export default connect(mapState, mapDispatch)(Goods);