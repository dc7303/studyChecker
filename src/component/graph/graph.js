import React, { Component } from 'react';
import Chart from 'react-google-charts';
import PropTypes from 'prop-types';
import Dialog from 'react-dialog';

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

/**
 *
 */
const eventOption = dialogSetOpen => {
  return [
    {
      eventName: 'select',
      callback({ chartWrapper }) {
        dialogSetOpen(chartWrapper.getChart().getSelection()[0].date);
      }
    }
  ];
};

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      studiedData: [],
      restData: [],
      totalData: [],
      dialogTitle: ''
    };

    this.dialogSetOpen = this.dialogSetOpen.bind(this);
  }

  dialogSetOpen(msDate) {
    const date = msToFormatDate(msDate);
    const selectData = DBHandler.getStudiedAndRest(date);

    if (selectData !== undefined) {
      this.setState({
        dialogTitle: date,
        studiedData: selectData.studiedData,
        restData: selectData.restData,
        totalData: selectData.totalData
      });

      this.openDialog();
    }
  }

  openDialog = () => this.setState({ isDialogOpen: true });

  closeDialog = () => this.setState({ isDialogOpen: false });

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
            chartEvents={eventOption(this.dialogSetOpen)}
          />
        </div>
        <div className="header-dialog">
          {this.state.isDialogOpen && (
            <Dialog
              title={this.state.dialogTitle}
              modal={true}
              onClose={this.closeDialog}
              buttons={[
                {
                  text: 'Close',
                  onClick: () => this.closeDialog()
                }
              ]}
              position={{
                x: 200,
                y: 0
              }}
            >
              <div>
                <div className="header-dialog-studied">
                  <div>
                    <h3>Studied</h3>
                  </div>
                  <h1>{this.state.studiedData}</h1>
                </div>
                <div className="header-dialog-rest">
                  <div>
                    <h3>Rest</h3>
                  </div>
                  <h1>{this.state.restData}</h1>
                </div>
                <div className="header-dialog-total">
                  <h1>total : {this.state.totalData}</h1>
                </div>
              </div>
            </Dialog>
          )}
        </div>
      </div>
    );
  }
}

Graph.propTypes = propTypes;
Graph.defaultProps = defaultProps;

export default Graph;
