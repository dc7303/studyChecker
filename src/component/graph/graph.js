import React, { Component } from 'react';
import Chart from 'react-google-charts';

const defaultProps = {};

const propTypes = {};

class Graph extends Component {
  constructor(props) {
    super(props);
  }

  options = {
    calendar: {
      height: 200,
      width: 1200,
      dayOfWeekLabel: {
        fontName: 'Times-Roman',
        fontSize: 12,
        color: 'orange',
        bold: false,
        italic: false
      },
      focusedCellColor: {
        stroke: 'red',
        strokeOpacity: 0.8,
        strokeWidth: 3
      },
      monthLabel: {
        fontSize: 12,
        color: 'orange',
        bold: true,
        italic: false
      },
      monthOutlineColor: {
        stroke: 'red',
        strokeOpacity: 0.5,
        strokeWidth: 2
      }
    },
    colorAxis: {
      minValue: 0,
      maxValue: 100000,
      colors: ['white', 'green']
    },
    noDataPattern: {
      backgroundColor: '#9da7b7',
      color: '#9da7b7'
    }
  };

  render() {
    return (
      <div className="header">
        <div>
          <Chart
            chartType="Calendar"
            loader={<div>Loading Chart</div>}
            data={[
              [
                { type: 'date', id: 'Date' },
                { type: 'number', id: 'Won/Loss' }
              ],
              [new Date(2012, 3, 13), 70000],
              [new Date(2012, 3, 14), 10000],
              [new Date(2012, 3, 15), 30000],
              [new Date(2012, 3, 16), 45612],
              [new Date(2012, 3, 17), 144400]
            ]}
            options={this.options}
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
