import React, { Component } from 'react';
import Chart from 'react-google-charts';
import PropTypes from 'prop-types';

import DBHandler from '../../lowDB/lowDB';
import { defaultFuncProps } from '../../js/error';
import { calChartOoptions } from '../../js/options/chartOption';

const defaultProps = {
  currentDay: '',
  setCurrentDay: defaultFuncProps('setCurrentDay')
};
const propTypes = {
  currentDay: PropTypes.string,
  setCurrentDay: PropTypes.func
};

class Graph extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    const dataOption = [
      { type: 'date', id: 'Date' },
      { type: 'number', id: 'Won/Loss' }
    ];

    this.calChartData = DBHandler.getCalendarChartData(
      this.props.currentDay,
      dataOption
    );
  }

  render() {
    return (
      <div className="header">
        <div className="header-top">
          <Chart
            chartType="Calendar"
            loader={<div>Loading Chart</div>}
            data={this.calChartData}
            options={calChartOoptions}
            rootProps={{ 'data-testid': '1' }}
          />
        </div>
      </div>
    );
  }
}

Graph.propTypes = propTypes;
Graph.defaultProps = defaultProps;

export default Graph;
