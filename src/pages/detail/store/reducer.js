import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
  isShow: false,
  shopgoods: {
    shopid: 3,
    shopname: '海南金煌芒店',
    goods: {
      id: 1,
      text: '椰惠 海南金煌芒黄皮大芒果  一盒约5-8个左右 净果10斤 新鲜水果金煌芒果大水仙芒金黄芒5kg',
      imgsrc: '',
      price: ['20.00', '35.00'],
      desc: '一盒约5-8个左右 净果10斤',
      goodsNum: 1,
      types: ['10', '20'],
      total: 1000
    }
  },
  chooseArr: [0],

});

const returnChooseArr = (state, action) => {
  let chooseArr = state.get("chooseArr").toJS();
  console.log(action);
  chooseArr[action.index] = action.value;
  console.log();
  return state.set("chooseArr", fromJS(chooseArr));
};

//改变数量操作
const changeInputValue = (state, action) => {
  let shopgoods = state.get('shopgoods').toJS();
  console.log(shopgoods);
  shopgoods.goods.goodsNum = action.value;
  return state.set('shopgoods', fromJS(shopgoods));
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.TOGGLE_LAYER_CHOOSE:
      return state.set('isShow', action.flag);
    case constants.SWITCH_GUIGE:
      return returnChooseArr(state, action);
    case constants.INPUT_CHANGE:
      return changeInputValue(state, action);
    default:
      return state;
  }
}