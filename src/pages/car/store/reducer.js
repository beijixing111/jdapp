import { fromJS } from 'immutable';
import * as constants from './constants';

import goodsImg01 from '../../../static/images/goods_01.jpg';
import goodsImg02 from '../../../static/images/goods_02.jpg';

const goodslistArr = [{
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
}]

const defaultState = fromJS({
  goodslist: goodslistArr,
  carNum: 4,
  allchecked: false,
  total: {
    totalMoney: 0,
    totalNumber: 0
  },
  checkedShopNum: 0,
});

const changeInputValue = (state, action) => {
  console.log(action);
  let goodslist = state.get('goodslist').toJS();
  console.log(goodslist);
  let goodslistArr = goodslist.map(shop => {
    if (shop.shopid == action.shopid) {
      let shopArr = shop.goods.map((item) => {
        if (item.id == action.id) {
          item.goodsNum = action.value;
        }
        return item;
      });
    }
    return shop;
  });
  return state.set('goodslist', fromJS(goodslistArr));
}

const allChecked = state => {
  let goodslist = state.get('goodslist').toJS();
  let total = state.get('total').toJS();
  let checked = !state.get('allchecked');
  goodslist = goodslist.map(shop => {
    shop.checked = checked;
    shop.goods = shop.goods.map((item) => {
      item.checked = shop.checked;
      if (item.checked) {
        total.totalNumber += item.goodsNum;
        total.totalMoney += item.goodsNum * item.price;
      }
      return item;
    });
    return shop;
  });
  if (!checked) {
    total.totalNumber = 0;
    total.totalMoney = 0;
  }
  return state.merge({
    allchecked: !state.get('allchecked'),
    goodslist: fromJS(goodslist),
    total: fromJS(total)
  });
};

const singleChecked = (state, action) => {
  let goodslist = state.get('goodslist').toJS();
  let item = action.item ? action.item.toJS() : null;
  let shopNum = state.get('checkedShopNum');
  console.log(shopNum);
  let isallchecked = false;
  goodslist = goodslist.map(shop => {
    if (shop && shop.shopid == action.shopid) {
      if (!item) {
        shop.checked = !shop.checked;
      }
      shop.goods = shop.goods.map(_item => {
        if (!item) {
          _item.checked = shop.checked;
          shop.checkedNum += _item.checked ? 1 : (shop.checkedNum > 0 ? -1 : 0);
        } else {
          if (_item.id == item.id) {
            _item.checked = !_item.checked;
            shop.checkedNum += _item.checked ? 1 : (shop.checkedNum > 0 ? -1 : 0);
          }
        }
        return _item;
      });
      shop.checked = (shop.checkedNum == shop.goods.length ? true : false);

      if (shop.checked && shop.shopid == action.shopid) {
        console.log(12323);
        shopNum += 1;
      } else {
        shopNum += 0;
      }

    }

    console.log(shopNum);
    return shop;
  });
  isallchecked = shopNum == goodslist.length ? true : false;
  console.log(goodslist);
  return state.merge({
    goodslist: fromJS(goodslist),
    allchecked: isallchecked,
    checkedShopNum: shopNum
  });
};

export default (state = defaultState, action) => {
  console.log(action);
  switch (action.type) {
    case constants.INPUT_CHANGE:
      return changeInputValue(state, action);
    case constants.ALL_CHECKED:
      return allChecked(state);
    case constants.SINGLE_CHECkED:
      return singleChecked(state, action);
    default:
      return state;
  }
}