import * as constants from './constants';

export const toggleChooseGoods = (flag) => ({
  type: constants.TOGGLE_LAYER_CHOOSE,
  flag
});


export const switchGuige = (index, value) => ({
  type: constants.SWITCH_GUIGE,
  index,
  value
});

export const changDetailValue = (shopid, id, value) => ({
  type: constants.INPUT_CHANGE,
  shopid,
  id,
  value
});