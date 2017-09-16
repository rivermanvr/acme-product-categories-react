import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class AppContainer extends Component {

  render () {
    return (
      <div>Hello - React</div>
    )
  }
}

ReactDOM.render(
  <AppContainer />,
  document.getElementById('root')
);
