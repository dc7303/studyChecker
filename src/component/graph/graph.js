import React, { Component } from 'react';
import Chart from 'react-google-charts';
import PropTypes from 'prop-types';

import DBHandler from '../../lowDB/lowDB';
import { defaultFuncProps } from '../../js/error';
import { calChartOptions } from '../../js/options/chartOption';
import { msToFormatDate } from '../../js/timeModule';

const defaultProps = {
  currentDay: '',
  setCurrentDay: defaultFuncProps('setCurrentDay')
};
const propTypes = {
  currentDay: PropTypes.string,
  setCurrentDay: PropTypes.func
};

const chartEvents = [
  {
    eventName: 'select',
    callback({ chartWrapper }) {
      const date = msToFormatDate(
        chartWrapper.getChart().getSelection()[0].date
      );
      const selectData = DBHandler.getStudiedAndRest(date);
      alert(selectData);
    }
  }
];

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
            options={calChartOptions}
            data={this.calChartData}
            rootProps={{ 'data-testid': '1' }}
            chartEvents={chartEvents}
          />
        </div>
      </div>
    );
  }
}

Graph.propTypes = propTypes;
Graph.defaultProps = defaultProps;

export default Graph;
