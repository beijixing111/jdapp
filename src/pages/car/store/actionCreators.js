import * as constants from './constants';
import { fromJS } from 'immutable';

export const changValue = (shopid, id, value) => ({
  type: constants.INPUT_CHANGE,
  shopid,
  id,
  value
});

export const allChecked = () => ({
  type: constants.ALL_CHECKED,
});

export const singleChecked = (shopid, item) => ({
  type: constants.SINGLE_CHECkED,
  shopid,
  item
});