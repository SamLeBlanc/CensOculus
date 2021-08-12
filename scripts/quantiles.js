// This method is the current (not very good) solution of finding the quantiles in the data

// QSummary gives the quantile values at each percentage point from 0 to 100
// Thus to find the median, try QSummary['50']

// This is a work around currently so it does not always work perfectly, but I will fix in the future

let QSummary = {};
function getQuantileValues(){
  variable = SETTINGS['Variable'];
  data = LORAX[SETTINGS['Concept']].filter(d => d["SIZE"] == SETTINGS['Geo'].toUpperCase() );
  if (!variable.endsWith('P')){
    values = data.map(d => d[variable] );
  }
  else {
    var cat = variable.slice(0,-1);
    var cat_total = `${variable.slice(0,4)}001`;
    values = data.map(d => (d[cat] / d[cat_total]) )
  }
  values = values.sort((a, b) => a - b);
  [...Array(100).keys()].forEach(k => QSummary[k/100] =
    d3.quantile(
    values.filter( v => !Number.isNaN(v)),
    k/100))
  QSummary['1'] = d3.max(values.filter( v => !Number.isNaN(v)))
}
