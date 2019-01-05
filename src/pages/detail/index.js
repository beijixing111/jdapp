import React, { Component } from 'react';
import Navbar from '../../components/navbar';
import Util from '../../util';


class Detail extends Component {

  constructor(props) {
    super(props);
  }

  handleBack = () => {
    this.props.history.goBack();
    var types = {};
    types.home = 'detail';
    Util.setSessionItem('scrollType', JSON.stringify(types));
  }

  render() {
    return (
      <div>
				<Navbar 
					backClick={this.handleBack}
					center="详情页"  
				/>
			</div>
    );
  }
}

export default Detail;