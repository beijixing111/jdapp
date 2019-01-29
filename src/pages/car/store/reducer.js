import { fromJS } from 'immutable';
import * as constants from './constants';

import goodsImg01 from '../../../static/images/goods_01.jpg';
import goodsImg02 from '../../../static/images/goods_02.jpg';
import goodsImg03 from '../../../static/images/58b3cfe4N833584e7.jpg';

import Format from '../../../util/format';
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
  hideTabbar: false
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
  return state.merge({
    goodslist: fromJS(goodslistArr),
    total: fromJS(returnTotal(goodslistArr))
  });
}

const delGoods = (state, action) => {
  let goodslist = state.get('goodslist').toJS();
  let ShopNum = state.get('checkedShopNum');
  console.log(action);
  let item = action.item.toJS();
  let carNum = 0;
  goodslist = goodslist.map(shop => {
    if (shop.shopid == action.shopid) {
      let goodsArr = shop.goods.filter((_item) => {
        shop.checkedNum += (_item.checked && _item.id == item.id) ? -1 : 0;
        return _item.id != item.id;
      });
      shop.goods = goodsArr;
    }
    if (shop.goods.length == 0) {
      ShopNum += (shop.checked ? -1 : 0);
      return null;
    }
    carNum += shop.goods.length;
    return shop;
  });
  goodslist = goodslist.filter(shop => {
    return shop != null;
  });
  console.log(goodslist);
  return state.merge({
    goodslist: fromJS(goodslist),
    total: fromJS(returnTotal(goodslist)),
    carNum: fromJS(carNum),
    checkedShopNum: fromJS(ShopNum),
    allchecked: carNum != 0 ? state.get('allchecked') : false
  });
};

const allChecked = state => {
  let goodslist = state.get('goodslist').toJS();
  let checked = !state.get('allchecked');
  goodslist = goodslist.map(shop => {
    shop.checked = checked;
    shop.checkedNum = shop.checked ? shop.goods.length : 0;
    shop.goods = shop.goods.map((item) => {
      item.checked = shop.checked;
      return item;
    });
    return shop;
  });
  return state.merge({
    allchecked: checked,
    goodslist: fromJS(goodslist),
    total: fromJS(returnTotal(goodslist)),
    checkedShopNum: checked ? goodslist.length : 0
  });
};

const returnTotal = (goodslist) => {
  let totalMoney = 0;
  let totalNumber = 0;
  goodslist.map(shop => {
    shop.goods.map(item => {
      if (item.checked) {
        totalMoney += Number(item.price) * Number(item.goodsNum);
        totalNumber += Number(item.goodsNum);
      }
    });
  });
  return {
    totalMoney: Format.fromatToFixed(totalMoney, 2),
    totalNumber: totalNumber,
  };
};

const singleChecked = (state, action) => {
  let goodslist = state.get('goodslist').toJS();
  let item = action.item ? action.item.toJS() : null;
  let shopNum = state.get('checkedShopNum');
  console.log(shopNum);
  let isallchecked = false;
  let less = 0; //子类单选 减一变量
  goodslist = goodslist.map((shop, index) => {
    if (shop && shop.shopid == action.shopid) {
      if (!item) {
        shop.checked = !shop.checked;
      } else {
        less = shop.checked ? -1 : 0;
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
      // shopNum += (shop.checked && index == 0 ?  )
      shopNum += (shop.checked ? 1 : (!item ? -1 : less));
    }
    return shop;
  });
  isallchecked = shopNum == goodslist.length ? true : false;
  // console.log(goodslist, shopNum);
  return state.merge({
    goodslist: fromJS(goodslist),
    allchecked: isallchecked,
    checkedShopNum: shopNum,
    total: fromJS(returnTotal(goodslist))
  });
};

//清空购物车
const clearCar = () => {
  return fromJS({
    goodslist: [],
    carNum: 0,
    allchecked: false,
    total: {
      totalMoney: 0,
      totalNumber: 0
    },
    checkedShopNum: 0,
    hideTabbar: false
  });
};

//增加商品到购物车
const addGoodsToCar = (state, info) => {
  let goodslist = state.get('goodslist').toJS();
  let shopgoodsObj = info.shopgoods.toJS();
  let chooseArr = info.chooseArr.toJS();
  let goodsinfo = {
    shopid: shopgoodsObj.shopid,
    shopname: shopgoodsObj.shopname,
    checked: true,
    checkedNum: 1,
    goods: [{
      id: shopgoodsObj.goods.id,
      checked: true,
      text: shopgoodsObj.goods.text.substr(0, 16),
      imgsrc: goodsImg03,
      price: shopgoodsObj.goods.price[chooseArr[0]],
      desc: shopgoodsObj.goods.text.substr(0, 12) + ' ' + shopgoodsObj.goods.types[chooseArr[0]] + '斤，' + shopgoodsObj.goods.goodsNum + '件',
      goodsNum: shopgoodsObj.goods.goodsNum
    }]
  }
  let allchecked = goodslist.length == 0 ? true : false;
  let isexist = false;
  let carNum = state.get('carNum');
  goodslist = goodslist.map(shop => {
    if (shop.shopid == shopgoodsObj.shopid) {
      isexist = true;
      shop.goods = shop.goods.map(item => {
        if (item.id == shopgoodsObj.goods.id) {
          shop.checkedNum += item.checked ? 0 : 1;
          if (Number(item.price) == Number(shopgoodsObj.goods.price[chooseArr[0]])) {
            item.goodsNum += shopgoodsObj.goods.goodsNum;
          } else {
            item.goodsNum = shopgoodsObj.goods.goodsNum;
          }
          item.checked = true;
          item.price = shopgoodsObj.goods.price[chooseArr[0]];
          item.desc = shopgoodsObj.goods.text.substr(0, 12) + ' ' + shopgoodsObj.goods.types[chooseArr[0]] + '斤，' + shopgoodsObj.goods.goodsNum + '件';
        } else {
          carNum += 1;
        }
        return item;
      });
      console.log(shop.goods);
      if (shop.checkedNum == shop.goods.length) {
        shop.checked = true;
      }
    }
    return shop;
  });
  if (!isexist) {
    goodslist.push(goodsinfo);
    carNum += 1;
  }
  return state.merge({
    goodslist: fromJS(goodslist),
    carNum: carNum,
    allchecked: allchecked,
    total: fromJS(returnTotal(goodslist)),
    checkedShopNum: 0
  });
}

export default (state = defaultState, action) => {
  console.log(action);
  switch (action.type) {
    case constants.INPUT_CHANGE:
      return changeInputValue(state, action);
    case constants.DEL_GOODS:
      return delGoods(state, action);
    case constants.ALL_CHECKED:
      return allChecked(state);
    case constants.SINGLE_CHECkED:
      return singleChecked(state, action);
    case constants.CLEAR_CAR:
      return clearCar(state);
    case constants.TOGGLE_TABBAR:
      return state.set("hideTabbar", action.flag);
    case constants.ADD_GOODS:
      return addGoodsToCar(state, action.info);
    default:
      return state;
  }
}