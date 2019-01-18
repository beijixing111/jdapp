import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ModalWarp from '../../components/modal';
import Toast from '../../components/toast';
import { Modal, Button } from 'antd-mobile';
import EmptyCar from './emptycar';
import Format from '../../util/format';
import Check from '../../util/check';
import Util from '../../util';

import goodsImg01 from '../../static/images/goods_01.jpg';
import goodsImg02 from '../../static/images/goods_02.jpg';

const alert = Modal.alert;

const goodslistS = [{
  shopid: 1,
  shopname: '遇见水果店',
  checked: false,
  checkedNum: 0,
  goods: [{
    id: 1,
    checked: false,
    text: '甜鸭梨 6-8个 净重约1.8kg 新鲜水果',
    imgsrc: goodsImg01,
    price: 29.90,
    desc: '2.1kg/件，烟台红富士12个（160-190g）',
    goodsNum: 1
  }, {
    id: 2,
    checked: false,
    text: '甜西瓜 1个 净重约8kg 新鲜水果',
    imgsrc: goodsImg01,
    price: 30.00,
    desc: '5kg/件，甘肃甜西瓜1个',
    goodsNum: 1
  }]
}, {
  shopid: 2,
  shopname: '开心麻花店',
  checked: false,
  checkedNum: 0,
  goods: [{
    id: 1,
    checked: false,
    text: '麻花 6-8个 净重约1.8kg',
    imgsrc: goodsImg02,
    price: 10,
    desc: '麻花麻花麻花麻花麻花',
    goodsNum: 1
  }, {
    id: 2,
    checked: false,
    text: '潮汕绿豆饼 10个 净重约2.5kg',
    imgsrc: goodsImg02,
    price: 30.00,
    desc: '2.5kg/件，潮汕绿豆饼',
    goodsNum: 1
  }]
}];


class Goods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allchecked: false,
      goodslist: JSON.parse(JSON.stringify(goodslistS)),
      total: {
        totalMoney: 0,
        totalNumber: 0
      },
      carNum: 4
    }
    this.checkedShopNum = 0;
  }
  returnGoodsArr(shopid, id, v) {
    let value = v > 200 ? 200 : v;
    value = value < 1 ? '' : value;
    let goodslistArr = this.state.goodslist.map((shop) => {
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
  changeValue(shopid, id, v) {
    this.returnGoodsArr(shopid, id, v);
  }
  handleClickMinus(shopid, item) {
    if (item.goodsNum - 1 == 0) {
      Toast.info('不能再少了哦！');
    }
    let v = item.goodsNum - 1 < 1 ? 1 : item.goodsNum - 1;
    this.returnGoodsArr(shopid, item.id, v);
  }
  handleClickAdd(shopid, item) {
    if (item.goodsNum + 1 > 200) {
      Toast.info('不能再加了哦！');
    }
    let v = item.goodsNum + 1 > 200 ? 200 : item.goodsNum + 1;
    this.returnGoodsArr(shopid, item.id, v);
  }
  handleNumFocus() {
    let body = document.querySelector('.App');
    body.scrollTop = body.scrollHeight;
  }
  handleNumBlur(shopid, id, v) {
    v = parseInt(v) && !isNaN(v) ? parseInt(v) : 1;
    this.returnGoodsArr(shopid, id, v);
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
          let goodslistArr = _this.state.goodslist.map(shop => {
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
  handleClickFollow(shopid, item) {
    Toast.info('暂时没有关注功能哦！');
  }
  handleSingleChecked(shopid, item) {
    let goodslist = this.state.goodslist.map(shop => {
      if (shop && shop.shopid == shopid) {
        if (!item) {
          shop.checked = !shop.checked;
          shop.checkedNum = shop.checked ? shop.goods.length : 0;
        }
        shop.goods = shop.goods.map(_item => {
          if (!item) {
            _item.checked = shop.checked;
          } else {
            if (item.id == _item.id) {
              _item.checked = !_item.checked;
              if (_item.checked) {
                shop.checkedNum++;
              } else {
                shop.checkedNum--;
              }
            }
          }
          return _item;
        });
        shop.checked = shop.checkedNum == shop.goods.length ? true : false;
        this.checkedShopNum = shop.checked ? this.checkedShopNum + 1 : (this.checkedShopNum > 1 ? this.checkedShopNum - 1 : 0);
      }
      return shop;
    });
    console.log(goodslist, this.checkedShopNum);
    this.setState({
      allchecked: (this.checkedShopNum == goodslist.length ? true : false),
      goodslist: goodslist,
      total: this.totalSum(goodslist)
    });
  }
  handleAllChecked = () => {

    let goodslist = this.state.goodslist.map(shop => {
      // if (!shop.checked) {
      //   shop.checked = !shop.checked;
      // }
      if (!shop) { return shop; }
      shop.checked = !shop.checked;
      shop.goods = shop.goods.map(item => {
        item.checked = shop.checked;
        return item;
      });
      shop.checkedNum = shop.checked ? shop.goods.length : 0;
      return shop;
    });
    this.checkedShopNum = !this.state.allchecked ? goodslist.length : 0;
    this.setState({
      allchecked: !this.state.allchecked,
      goodslist: goodslist,
      total: this.totalSum(goodslist)
    });
  }

  totalSum() {
    let total = {
      totalMoney: 0,
      totalNumber: 0
    };
    this.state.goodslist.map(shop => {
      if (!shop) return shop;
      shop.goods.map(item => {
        if (item.checked) {
          total.totalMoney += item.price * item.goodsNum;
          total.totalNumber += item.goodsNum;
        }
      })
    });
    total.totalMoney = Format.fromatToFixed(total.totalMoney, 2);
    return total;
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
    this.checkedShopNum = 0;
  }
  componentDidMount() {
    if (Util.getSessionItem('carstate')) {
      var ss = JSON.parse(Util.getSessionItem('carstate'));
      this.setState({
        allchecked: ss.allchecked,
        goodslist: ss.goodslist,
        total: ss.total,
        carNum: ss.carNum
      });
      this.checkedShopNum = parseInt(Util.getSessionItem("checkedShopNum"));
    }
  }
  componentWillUnmount() {
    Util.setSessionItem('carstate', JSON.stringify(this.state));
    Util.setSessionItem('checkedShopNum', this.checkedShopNum);
    Util.setSessionItem('carNum', this.state.carNum);
  }

  render() {
    const { goodslist } = this.state;
    console.log(goodslist);
    const goodslistWarp = goodslist.map((shop) => {
      if (!shop) {
        return null;
      }
      let shopid = shop.shopid;
      const shopgoods = shop.goods.map(item => (
        <div className="goods-info" key={item.id}>
          <i onClick={() =>{this.handleSingleChecked(shopid, item)}} className={"select " + (item.checked ? 'active' : '')}></i>
          <Link className="goods-img" to={`/detail/${item.id}`}>
            <img src={item.imgsrc} alt="商品图片"/>
          </Link>
          <div className="box-info">
            <div className="name">
              <i className="mark">生鲜</i>{item.text}
            </div>
            <div className="iddist">{item.desc}</div>
            <div className="goods-line">
              <p className="price">￥{item.price}</p>
              <div className="num-more">
                <span className={"minus " + (item.goodsNum <= 1 ? 'disabled' : '')} onClick={() => this.handleClickMinus(shopid,item)}>
                </span>
                <div className="input-wrap">
                  <input type="text" type="tel" value={item.goodsNum} max="200" 
                    onChange={(e) => this.changeValue(shopid, item.id, e.target.value)}
                    onBlur={(e) =>this.handleNumBlur(shopid, item.id, e.target.value)}
                    onFocus={()=>this.handleNumFocus()}
                  />
                </div>
                <span className={"plus " + (item.goodsNum >= 200 ? 'disabled' : '')} onClick={() => this.handleClickAdd(shopid,item)}></span>
              </div>
            </div>
            <div className="sub-line">
              <span className="m_action_item" onClick={() => this.handleClickFollow(shopid, item)}>移入关注</span>
              <span className="del" onClick={() => this.handleClickDel(shopid, item)}>删除</span>
            </div>
          </div>
        </div>
      ));
      return (
        <div className="goods-item" key={shop.shopid}>
          <div className="shop-line">
            <i className={'select shop-active ' + (shop.checked ? 'active' : '')}
              onClick={() => this.handleSingleChecked(shop.shopid)}
            ></i>
            <div className="shop-name">
              <i>YJ</i><span className="name-text">{shop.shopname}</span>
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
              <div className="all-check" onClick={this.handleAllChecked}>
                <i className={'active-icon select ' + (this.state.allchecked ? 'active' : '')}></i>
                <span>全选</span>
              </div>
              {this.state.allchecked ? <div className="clearcar" onClick={this.handleClearCar}>清空</div> : null}
              <div className="total-box">
                <div className="total-wrapper">
                  <p className="total-ji"><b>总计：</b>￥{this.state.total.totalMoney}元</p>
                  <p>总额￥{this.state.total.totalMoney}元 立减￥0.00元</p>
                </div>
                <div className="go-pay">去结算({this.state.total.totalNumber})</div>
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

export default Goods;