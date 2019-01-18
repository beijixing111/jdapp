import React, { Component } from 'react';
import Modal from './Modal';

const Toast = {};

Toast.info = (text, time) => {
  var flag = false;
  this.timeId = setTimeout(() => {
    flag = true;
  }, time * 1000);
  if (!flag) {
    return null;
  } else {
    return (
      <Modal>
				<div className="toast-layer">
					<div className="toast-tip">{text}</div>
				</div>
			</Modal>
    );
  }
}

export default Toast;