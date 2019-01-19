import React, { Component } from 'react';

import Counter from './component/counter';

const defaultProps = {};

const propTypes = {};

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Counter />
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
