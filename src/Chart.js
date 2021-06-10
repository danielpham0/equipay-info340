/*
 * This module handles the application's charts and all necessary data manipulation
 */
import React, {useEffect} from 'react';
import Plot from 'react-plotly.js';
import lodash from 'lodash';
import queryString from 'query-string';

/**
```
props = {
  className: // classes to be assigned to this component
  data: // The data corresponding to the current company
  chartNeedsUpdate: // a state variable for if the chart needs to update to reflect new filter selections
  setUpdate: // function to set the chartNeedsUpdate state variable of the to 'true'; this causes the chart to update with the current (changed) filters
  company: // The name of the current company, capitalized for display to the user
  role: // The name of the current role, capitalized for display to the user
}
```
 */
function Chart(props) {
  useEffect(() => {
    if (props.chartNeedsUpdate) {
      props.setUpdate(false);
    }
  });

  // The URL contains the filters for the chart
  let search = window.location.search;
  let filters = queryString.parse(search);
  if (props.role !== 'All Roles') {
    filters['Job Title'] = props.role.toUpperCase();
  }

  for (let filterKey of Object.keys(filters)) {
    // If the data does not contain a demographic category matching the filter, ignore it.
    // This can only happen if the user is directly modifying the url in order to change the chart
    if (!props.data[0][filterKey]) {
      delete filters[filterKey];
    }
  }

  let filteredTable = lodash.filter(props.data, filters);
  let filteredSalaries = lodash.map(filteredTable, 'Base Salary');

  // If there is a role selected, the baseline is only data from that role
  let baseline = filters['Job Title'] ?
    lodash.filter(props.data, {"Job Title": filters['Job Title']})
    : props.data;
  let baselineSalaries = lodash.map(baseline, 'Base Salary');

  let datasets = [
    {
      x: baselineSalaries,
      name: props.role === 'All Roles' ? props.role : 'All ' + props.role + 's',
      type: 'histogram',
      histnorm: 'probability',
      xbins: {size: 10000}
    }
  ];
  datasets[1] = Object.assign({}, datasets[0]);
  datasets[1].x = filteredSalaries;
  datasets[1].name = 'Selected Demographic';

  const [width, setWidth] = React.useState(
    // If the window is less than medium size, the chart should take up almost the full page width, otherwise it should leave room for the 'change chart' form to the side.
    window.innerWidth * (window.innerWidth < 992 ? 0.9 : 0.675)
  );

  // const [listenerAdded, setListenerAdded] = React.useState(false);

  useEffect(() => {
    // Resize Observer from https://thewebdev.info/2021/02/21/how-to-watch-the-javascript-window-resize-event/#:~:text=How%20to%20Watch%20the%20JavaScript%20Window%20Resize%20Event%3F,Handler.%20...%203%20ResizeObserver.%20...%204%20Conclusion.%20
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const htmlWidth = entry.contentRect.width;
        setWidth(htmlWidth * (htmlWidth < 992 ? 0.9 : 0.675));
      }
    });
    ro.observe(document.querySelector('html'));
    return () => {ro.disconnect()};
  }, []);

  // Build up the string identifying the demographic the data has been filtered down to
  let identity = '';
  for (let key in filters) {
      if (filters[key] !== 'All' && key !== 'Job Title') {
          identity += ' ' + filters[key];
      }
  }

  let title = 'Salaries of' + identity + ' ' + (filters['Job Title'] ? props.role : 'Employee') + 's at ' + props.company;
  // Break the title into separate lines if necessary to fit the width of the chart
  let charsPerLine = (width - 15) / 12; // Each character is roughly 12px wide on average
  let lastBreak = 0;
  for (let i = 0; i < title.length; i++) {
    if (i - lastBreak > charsPerLine && title[i] === ' ') {
      title = title.slice(0, i) + '<br>' + title.slice(i);
      lastBreak = i;
    }
  }
  let layout = {
    title: title,
    width: width,
  }
  // Put the legend below the plot if there isn't room to the right
  if (width < 425) {
    layout.legend = {x: -0.3, y: -0.25};
  }

  return (
    <Plot
      className={props.className}
      data={datasets}
      layout={layout}
    />
  );
}

export default Chart;
