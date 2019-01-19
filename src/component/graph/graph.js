import React, { Component } from 'react';

const defaultProps = {};

const propTypes = {};

class Graph extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header">
        <h1>Layout Test </h1>
        <h3>header</h3>
      </div>
    );
  }
}

Graph.propTypes = propTypes;
Graph.defaultProps = defaultProps;

export default Graph;
