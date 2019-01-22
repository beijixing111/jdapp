import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Tabbar from './components/tabbar';
import RouterMap from './router';
import './static/font/iconfont.css';
import store from './store';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
    		<div className="App">
	        <RouterMap />
	      </div>
    	</Provider>
    );
  }
}

export default App;