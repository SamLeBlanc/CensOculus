function abbreviateNumber(number){
  number = Math.round(number)
  var SI_SYMBOL = ["", "K", "M"];
  // what tier? (determines SI symbol)
  var tier = Math.min(Math.log10(Math.abs(number)) / 3 | 0, 2);

  // if zero, we don't need a suffix
  if(tier == 0) return number;

  // get suffix and determine scale
  var suffix = SI_SYMBOL[tier];
  var scale = Math.pow(10, tier * 3);

  // scale the number
  var scaled = number / scale;
  var decimal = (scaled <= 10) ? 1 : 0;

  // format number and add suffix
  return scaled.toFixed(decimal) + suffix;
}

function formatPercent(number){
  return (100*number).toFixed(1).concat('%')
}

function numberWithCommas(x) {
  return Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
