// This method is the current (not very good) solution of finding the quartiles in the data

// QSummary gives the quartile values at each percentage point from 0 to 100
// Thus to find the median, try QSummary[50], min is QSummary[0] and max is QSummary[100]

// This is a work around currently so it does not always work perfectly, but I will fix in the future

let QSummary;
const getQuartileValues = () => {
  QSummary = [];
  let variable = SETTINGS['Variable'];
  let data = queryRenderedFeatures();
  let values = spinConversions(variable, data);
  [...Array(1000).keys()].forEach(k =>
    QSummary.push(d3.quantile(values.filter( v => !Number.isNaN(v)), k/1000))
  );
  QSummary[0] = d3.min(values.filter( v => !Number.isNaN(v)));
  QSummary[1000] = d3.max(values.filter( v => !Number.isNaN(v)));
  QSummary = QSummary.sort((a, b) => a - b);
}

const spinConversions = (variable, data) => {
  if (variable.endsWith('P')) {
    v = data.map(d => percentConversion(d, variable));
  } else if (variable.endsWith('D')){
    v = data.map(d => densityConversion(d, variable));
  } else {
    v = data.map(d => d[variable]);
  }
  return v.sort((a, b) => a - b);
}
