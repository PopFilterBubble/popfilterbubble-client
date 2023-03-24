import React, { Component } from 'react';
// import icon from '../../assets/img/logo.png';

class Greetings extends Component {
  state = {
    name: 'dev',
  };

  render() {
    return (
      <div>
        <p>Hello, {this.state.name}!</p>
        {/* <img src={icon} alt="extension icon" /> */}
      </div>
    );
  }
}

export default Greetings;
