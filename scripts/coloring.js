// // // Methods for finding and converting *colors* that will be applied to Mapbox vector tiles

// Not to be confused with the *painting* methods (in scipts/painting.js) where the colors are actually applied (painted) to the Mapbox layers
// Instead, here the colors are merely curated to later be applied to the map
// Also here are methods for using custom values as they apply to map coloring

// Reverses the color order of the current color scheme
const reverseColorScheme = () => COLOR_DICT[SETTINGS['Scheme']] = COLOR_DICT[SETTINGS['Scheme']].reverse();

// Calculates the five step color stops needed to color the tiles in a *Linear* manner
// Returns an array of five values that anchor the colors for painting later on
const colorLinear = () => {
  let large = (LORAX['P1'].filter( d => d.SIZE == SETTINGS["Geo"].toUpperCase()).length > 5000) ? true : false; // check if layer has >5000 tiles
  let fiveStep = {}; // color stops
  // First, set minimum and maximum values (index 0 and 4) that will define the five-color ramp
  if (customRanges["linearMin"] != null) {    // If the user has provided custom linear scaling use those values
    fiveStep[0] = customRanges["linearMin"];
    fiveStep[4] = customRanges["linearMax"];
  } else {                                    // else, use the deault linear scaling which goes from the min value to the max values
    fiveStep[0] = large ? QSummary[10] : QSummary[1]; // adjusted to (crudely) ignore outliers for large datasets
    fiveStep[4] = large ? QSummary[980] : QSummary[999];
  }
  // Then, calculate the three intermediate values based on a linear scaling
  let range = fiveStep[4] - fiveStep[0];
  fiveStep[1] = fiveStep[0] + range * 0.25;
  fiveStep[2] = fiveStep[0] + range * 0.5;
  fiveStep[3] = fiveStep[0] + range * 0.75;
  return fiveStep
}

// Same as colorLinear, but uses *Quartile* values instead
const colorQuartile = () => {
  let large = (LORAX['P1'].filter( d => d.SIZE == SETTINGS["Geo"].toUpperCase()).length > 5000) ? true : false; // check if layer has >5000 tiles
  let fiveStep = {}; // define empty list to hold color stops
  if (customRanges["quartileQ0"] != null) {     // If the user has provided a custom quartile stops, use those
    fiveStep[0] = customRanges["quartileQ0"];
    fiveStep[1] = customRanges["quartileQ1"];
    fiveStep[2] = customRanges["quartileQ2"];
    fiveStep[3] = customRanges["quartileQ3"];
    fiveStep[4] = customRanges["quartileQ4"];
  } else {                                      // else use the defaullt quartile stops (default: [Min, Q1, Med, Q3, Max])
    fiveStep[0] = large ? QSummary[10] : QSummary[1]; // adjusted to (crudely) ignore outliers for large datasets
    fiveStep[1] = QSummary[250];
    fiveStep[2] = QSummary[500];
    fiveStep[3] = QSummary[750];
    fiveStep[4] = large ? QSummary[980] : QSummary[999];
  }
  return fiveStep
}

// Same as colorLinear, but uses *Logarithmic* values instead
const colorLog = () => {
  let large = (LORAX['P1'].filter( d => d.SIZE == SETTINGS["Geo"].toUpperCase()).length > 5000) ? true : false; // check if layer has >5000 tiles
  let exponent = SETTINGS["Variable"].endsWith("P") ? 1 : 0; // intial exmponent value, dependent on whether variable is percentage based ("..P") or not
  let delta = SETTINGS["Variable"].endsWith("P") ? -0.005 : 0.005 // jitter up or down
  let q0 = large ? QSummary[20] : QSummary[3]; // set min and max value for log scale. again, crudely
  let q4 = large ? QSummary[980] : QSummary[999];
  let q1 = q2 = q3 = q4_alt = 0; // set intial quartile values
  // Next, we programatically calculate the exponent value, which allows dyanmic logarithmic scaling
  let attempts = 0;
  while (attempts < 5000) {
    if ( q4_alt > q4 ) return { 0:q0, 1:q1, 2:q2, 3:q3, 4:q4 };
    exponent += delta;  // keep trying exponents until the values are properly spaced out log-wise
    q1 = q0 ** exponent;
    q2 = q1 ** exponent;
    q3 = q2 ** exponent;
    q4_alt = q3 ** exponent;
    attempts++;
  }
  console.log('Unable to color logarithmicly')
  return colorQuartile() // if no valid log sequence is returned (idk why it wouldn't be), use Quartile coloring instead
}

// Ensure that all values in fiveStep (color stop values) are non-equal (which would throw an error from Mapbox styling)
const fiveStepAdjustment = arr => {
  arr = arr.sort(function(a, b){return a-b}) // sort in ascending order
  return arr.map((e, i) => e + ((i-2) * .0000001)) // 'stretch' array very slightly to ensure all unqiue values
}

// Check for any added custom colors from user, else the default color scheme will be used
const getCustomColors = colors => {
  customColors.forEach((element, i) => {
    if (element != null) colors[i] = customColors[i]
  });
  return colors
}
