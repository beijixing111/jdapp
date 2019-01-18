import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.querySelector('body');

export default class extends Component {

  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // console.log(this.el);
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}