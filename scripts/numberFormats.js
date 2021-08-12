// // These methods are mainly just for formatting numbers in special ways

// Rounds number to desired decimal places, but keeps it in float format
// Definitely a better way to do this but it works
const customRound = (num,d) => Math.round((num + Number.EPSILON) * 10**(d-1)) / 10**(d-1);

// Find and create the desired number format based off user settings
const formatNumber = num => {
  if (SETTINGS['Variable'].endsWith("P")) return formatPercent(num);
  return (SETTINGS['NumFormat'] == 'short') ? abbreviateNumber(num) : numberWithCommas(num);
}

// Format float to *string* percentage, with one decimal place
const formatPercent = number => `${(100*number).toFixed(1)}%`;

// Round and format float to include commas (e.g. 9888777 => 9,888,777)
const numberWithCommas = num => Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// Format number with scale suffix (e.g. 1256 => 1.2K or 23,690,100 => 24M)
const abbreviateNumber = num => {
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

// Convert meters sqaured into miles sqaured
const metersSq2MilesSq = metersSq => {
  let milesSq = metersSq / 2590000;
  if (milesSq < 2) return customRound(milesSq, 3)
  else if (milesSq < 30) return customRound(milesSq, 2)
  else return customRound(milesSq, 1)
}
