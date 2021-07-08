const formatNumber = num => {   // find and create the desired number format
  if (SETTINGS['Variable'].endsWith("P")) return formatPercent(num);
  return (SETTINGS['NumFormat'] == 'short') ? abbreviateNumber(num) : numberWithCommas(num);
}

const customRound = (num,d) => Math.round((num + Number.EPSILON) * 10**(d-1)) / 10**(d-1);

const metersSq2MilesSq = metersSq => {
  let milesSq = metersSq / 2590000;
  if (milesSq > 30) return customRound(milesSq, 1)
  if (milesSq > 2) return customRound(milesSq, 2)
  else return customRound(milesSq, 3)
}

const formatDensity = (pop,area) => {
  let den = pop / area;
  if (den > 30) return numberWithCommas(customRound(den, 1))
  if (den > 2) return customRound(den, 2)
  else return customRound(den, 3)
}

const abbreviateNumber = num => {
  // format number to abbreviated version
  num = customRound(num, 1);
  let SI_SYMBOL = ["", "K", "M"];   // symbols: K => thousand, M => million
  let tier = Math.min(Math.log10(Math.abs(num)) / 3 | 0, 2);   // what tier? (determines SI symbol)
  if (tier == 0) return num;   // if zero, we don't need a suffix
  let suffix = SI_SYMBOL[tier];   // get suffix and determine scale
  let scale = Math.pow(10, tier * 3);
  let scaled = num / scale;   // scale the number
  let decimal = (scaled <= 10) ? 1 : 0;
  return scaled.toFixed(decimal) + suffix;   // format number and add suffix
}

// format float to string percentage
const formatPercent = number => `${(100*number).toFixed(1)}%`;

// format int to include commas (e.g. 9888777 => 9,888,777)
const numberWithCommas = num => Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

let QSummary = {};
function getQuantileValues(){
  concept = SETTINGS['Concept'];
  variable = SETTINGS['Variable'];
  geo = SETTINGS['Geo'];
  scale = SETTINGS['Scale'];
  data = LORAX[concept].filter(d => d["SIZE"] == geo.toUpperCase() );
  if (!variable.endsWith('P')){
    values = data.map(d => d[variable] );
  }
  else {
    var cat = variable.slice(0,-1);
    var cat_total = `${variable.slice(0,4)}001`;
    values = data.map(d => (d[cat] / d[cat_total]) )
  }
  values = values.sort((a, b) => a - b);

  if (scale == 'Quantile') QUARTILE_RANGE = [0, 0.25, 0.5, 0.75, 1, 0.05, 0.95]
  var quants = [];
  [...Array(101).keys()].forEach(k => QSummary[k/100] =
    d3.quantile(
    values.sort((a, b) => a - b)
          .filter( v => !Number.isNaN(v)),
    k/100))
  QUARTILE_RANGE.forEach((q) => quants.push(d3.quantile(values, q)));
  return quants
}
