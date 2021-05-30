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
      type: 'histogram',
      histnorm: 'probability',
      xbins: {end: max, size: 10000, start: 0}
    }
  ];
  datasets[1] = Object.assign({}, datasets[0]);
  datasets[1].x = filteredSalaries;

  const [width, setWidth] = React.useState(
    window.innerWidth * (window.innerWidth < 992 ? 0.9 : 0.675)
  );

  window.addEventListener('resize', () => {
    setWidth(window.innerWidth * (window.innerWidth < 992 ? 0.9 : 0.675));
  });

  let layout = {
    title: 'A Fancy Plot',
    width: width
  }

  return (
    <Plot
      data={datasets}
      layout={layout}
    />
  );
}

export default Chart;