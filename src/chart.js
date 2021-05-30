import React from 'react';
import Plot from 'react-plotly.js';
import lodash from 'lodash';
import queryString from 'query-string';

function Chart(props) {
  React.useEffect(() => {
    if (props.chartNeedsUpdate) {
      props.setUpdate(false);
    }
  });

  let search = window.location.search;
  let filters = queryString.parse(search);

  for (let filterKey of Object.keys(filters)) {
    // If the data does not contain a demographic category matching the filter, ignore it.
    // This can only happen if the user is modifying the url in order to change the chart
    if (!props.data[0][filterKey]) {
      delete filters[filterKey];
    }
  }

  let filtered = lodash.filter(props.data, filters);
  let filteredSalaries = lodash.map(filtered, 'Base Salary');

  let baseline = lodash.map(props.data, 'Base Salary');
  let max = Math.max(baseline);

  let datasets = [
    {
      x: baseline,
      name: 'All ' + (props.role === 'All Roles' ? 'Roles' : props.role + 's'),
      type: 'histogram',
      histnorm: 'probability',
      xbins: {end: max, size: 10000, start: 0}
    }
  ];
  datasets[1] = Object.assign({}, datasets[0]);
  datasets[1].x = filteredSalaries;
  datasets[1].name = 'Selected Demographic';

  const [width, setWidth] = React.useState(
    window.innerWidth * (window.innerWidth < 992 ? 0.9 : 0.675)
  );

  const [listenerAdded, setListenerAdded] = React.useState(false);

  if (!listenerAdded) {
    setListenerAdded(true);
    // Resize Observer from https://thewebdev.info/2021/02/21/how-to-watch-the-javascript-window-resize-event/#:~:text=How%20to%20Watch%20the%20JavaScript%20Window%20Resize%20Event%3F,Handler.%20...%203%20ResizeObserver.%20...%204%20Conclusion.%20
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setWidth(width * (width < 992 ? 0.9 : 0.675));
      }
    });
    ro.observe(document.querySelector('html'));
  }

  let identity = '';
  for (let key in filters) {
      if (filters[key] !== 'All') {
          identity += ' ' + filters[key];
      }
  }

  let layout = {
    title: 'Salaries of' + identity + ' Employees at ' + props.company,
    width: width
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