// // These methods pertain to finding and converting *colors* that will be applied to map tiles
// // Not to be confused with the *painting* methods where the colors are actually applied to the Mapbox layers
// // Instead, here the colors are merely curated to later be applied to the map
// // Also here are methods for using custom values as they apply to colors, and also updating the legend

// Reverses the order of the current color scheme
const reverseColorScheme = () => COLOR_DICT[SETTINGS['Scheme']] = COLOR_DICT[SETTINGS['Scheme']].reverse();

// Calculates the five step color intervals needed to color the data in a linear manner
// Returns an array of five values that anchor the colors for painting later
const colorLinear = () => {
  let fiveStep = {};
  if (customRanges["linearMin"] != null) {    // If the user has provided custom linear scaling use those values
    fiveStep[0] = customRanges["linearMin"];  // Custom Min
    fiveStep[4] = customRanges["linearMax"];  // Custom Max
  } else {                                    // else, use the deault linear scaling which goes from the Min to the Max
    fiveStep[0] = QSummary[0];    // Default Min
    fiveStep[4] = QSummary[1];    // Default Max
  }
  let range = fiveStep[4] - fiveStep[0];
  fiveStep[1] = fiveStep[0] + range*0.25;     // calculating intermediate values along a linear scale
  fiveStep[2] = fiveStep[0] + range*0.5;
  fiveStep[3] = fiveStep[0] + range*0.75;
  return fiveStep
}

// Same as colorLinear but instead goes off of the quantile values from the QSummary
const colorQuantile = () => {
  let fiveStep = {};
  if (customRanges["quantileQ0"] != null) {     // If the user has provided a custom quantile range (default: [Min, Q1, Med, Q3, Max])
    fiveStep[0] = customRanges["quantileQ0"];   // Custom Min
    fiveStep[1] = customRanges["quantileQ1"];   // Custom Q1
    fiveStep[2] = customRanges["quantileQ2"];   // Custom Q2
    fiveStep[3] = customRanges["quantileQ3"];   // Custom Q3
    fiveStep[4] = customRanges["quantileQ4"];   // Custom Max
  } else {
    fiveStep[0] = QSummary[0];      // Default Min
    fiveStep[1] = QSummary[0.25];   // Default Q1
    fiveStep[2] = QSummary[0.5];    // Default Median
    fiveStep[3] = QSummary[0.75];   // Default Q3
    fiveStep[4] = QSummary[1];      // Defualt Max
  }
  return fiveStep
}

// Ensure that all values in fiveStep are non-equal (which would throw an error from Mapbox styling)
const fiveStepAdjustment = arr => {
  for (i=0; i < arr.length; i++){
    arr[i] += ((i-2) * .0000001);
  }
  return arr
}

// Add color based on user input from clicking the colors in legend
const addCustomColor = i => {
  customColors[i] = $(`#cpick-${i}`).val();
  update();
}

// Check for any added custom colors from user, else the default color scheme will be used
const getCustomColors = colors => {
  customColors.forEach((element, i) => {
    if (element != null) colors[i] = customColors[i]
  });
  return colors
}

// Update the legend to have the appropriate colors and labels showing
// Must have 'arr' and 'colors' from updatePaint() method
const updateLegend = (arr, colors) => {
  var colors = COLOR_DICT[SETTINGS['Scheme']]
  $(`#leg-square-5`).css("border", `solid 5px ${customColors[5]}`)
  $(`#leg-square-6`).css("border", `solid 5px ${customColors[6]}`)
  for (i = 0; i < 5; i++){
    if (colors[i].includes('#')){
      var col = hexToRgb(colors[i])
      colors[i] = `rgba(${col.r}, ${col.g}, ${col.b}, 1)`
    }
    $(`#leg-square-${i}`).css("background", colors[i])
    $(`#leg-label-${i}`).text(formatNumber(Math.max(arr[i],0)))
  }
}

// Convert hex color to object with RGB color values
const hexToRgb = hex => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
