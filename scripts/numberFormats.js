function formatNumber(num){   // find and create the desired number format
  variable = $('#variable-select').find(":selected").val();
  var num_format = $('#numformat-select').find(":selected").val();
  if (variable.endsWith("P")) num = formatPercent(num);
  else if (num_format == 'short') num = abbreviateNumber(num);
  else if (num_format == 'comma') num = numberWithCommas(num);
  return num
}

function metersSq2MilesSq(metersSq){
  let milesSq = metersSq / 2590000
  if (milesSq > 30) return Math.round(milesSq)
  if (milesSq > 2) return Math.round((milesSq + Number.EPSILON) * 10) / 10
  else return Math.round((milesSq + Number.EPSILON) * 100) / 100
}

function formatDensity(pop,area){
  let den = pop / area;
  if (den > 30) return numberWithCommas(Math.round(den))
  if (den > 2) return Math.round((den + Number.EPSILON) * 10) / 10
  else return Math.round((den + Number.EPSILON) * 100) / 100
}

function abbreviateNumber(number){   // format number to abbreviated version
  number = Math.round(number)
  var SI_SYMBOL = ["", "K", "M"];   // symbols: K => thousand, M => million
  var tier = Math.min(Math.log10(Math.abs(number)) / 3 | 0, 2);   // what tier? (determines SI symbol)
  if(tier == 0) return number;   // if zero, we don't need a suffix
  var suffix = SI_SYMBOL[tier];   // get suffix and determine scale
  var scale = Math.pow(10, tier * 3);
  var scaled = number / scale;   // scale the number
  var decimal = (scaled <= 10) ? 1 : 0;
  return scaled.toFixed(decimal) + suffix;   // format number and add suffix
}

function formatPercent(number){   // format float to string percentage
  return (100*number).toFixed(1).concat('%')
}

function numberWithCommas(x) {   // format int to include commas (e.g. 9888777 => 9,888,777)
  return Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getQuantileValues(concept, variable, geo, scale){
  data = LORAX[concept].filter(function(d){ return d["SIZE"] == geo.toUpperCase() })
  if (!variable.endsWith('P')){
    values = data.map(function(d) { return d[variable] })
  }
  else {
    var cat = variable.slice(0,-1);
    var cat_total = variable.slice(0,4).concat("001");
    values = data.map(function(d) { return (d[cat] / (1 + d[cat_total])) })
  }
  values = values.sort(function(a, b){return a - b});

  if (scale == 'Quantile') QUARTILE_RANGE = [0, 0.25, 0.5, 0.75, 1, 0.05, 0.95]
  var quants = [];
  QUARTILE_RANGE.forEach((q) => quants.push(d3.quantile(values, q)));
  return quants
}
