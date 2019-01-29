import * as constants from './constants';
import { fromJS } from 'immutable';

export const changValue = (shopid, id, value) => ({
  type: constants.INPUT_CHANGE,
  shopid,
  id,
  value
});

export const removeGoods = (shopid, item) => ({
  type: constants.DEL_GOODS,
  shopid,
  item
});

export const allChecked = () => ({
  type: constants.ALL_CHECKED,
});

export const singleChecked = (shopid, item) => ({
  type: constants.SINGLE_CHECkED,
  shopid,
  item
});

export const clearCar = () => ({
  type: constants.CLEAR_CAR
});

export const toggleTabbar = (flag) => ({
  type: constants.TOGGLE_TABBAR,
  flag
});

export const addGoods = (info) => ({
  type: constants.ADD_GOODS,
  info
});