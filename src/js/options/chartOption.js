/**
 * calendar Chart option
 */
export const calChartOoptions = {
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
