import React, { Component } from 'react';
import Navbar from '../../components/navbar';
import Util from '../../util';
import { Link } from 'react-router-dom';
import './index.scss';

class Detail extends Component {

  constructor(props) {
    super(props);
  }

  handleBack = () => {
    console.log(this.props);
    this.props.history.goBack();
    var types = {};
    types.home = 'detail';
    Util.setSessionItem('scrollType', JSON.stringify(types));
  }

  render() {
    console.log(this.props);
    return (
      <div>
				<Navbar backClick={this.handleBack} center="详情页" />
        <div className="pag">
          <Link to="/detail/single">1233</Link>
          <div>{this.props.children}</div>
        </div>
			</div>
    );
  }
}

export default Detail;