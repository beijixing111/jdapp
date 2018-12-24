import React, { Component } from 'react';

// import Tabbar from './components/tabbar';
import RouterMap from './router'; 
import './App.css';
import './static/iconfont.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RouterMap />
      </div>
    );
  }
}

export default App;
