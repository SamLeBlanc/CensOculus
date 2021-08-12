// // These methods pertain to customizing the map based on custom user values
// // Users can provide custom colors or scales (linear or quantile) to create a more unique map
// // The provided values are checked here for validity and format before being applied in other methods

let customColors = Array(7).fill(null);
let customRanges = {
    "linearMin" : null,
    "linearMax" : null,
    "quantileQ0" : null,
    "quantileQ1" : null,
    "quantileQ2" : null,
    "quantileQ3" : null,
    "quantileQ4" : null,
};

// Determines which custom sclaing method to call based on settings
const getCustomRange = () => SETTINGS['Scale'] == 'Linear' ? customL() : customQ();

// Determines if an array is strictly increasing
// Neccesary for painting layer, or else you get a Mapbox error
const isAscending = arr => {
  return arr.every((x, i) => {
    return i === 0 || x > arr[i - 1];
  });
}

// Receives and checks user input regarding a custom linear scale
// If the input is invalid it will ask again
const customL = () => {
  let str = prompt("~ Custom Linear Scaling ~\n\nPlease enter the *min* and *max* for your custom linear scale. \nThe *two* values must be entered in *strictly increasing* order.\nFor percentages, enter values between 0 and 1.", "min , max");
  if (str == null) return;
  let X = str.split(",").map(Number);
  if (X.constructor === Array && X.length === 2 && isAscending(X)){   // ensuring the user input is in proper format
    customRanges["linearMin"] = X[0];   // set the custom values in dictionary
    customRanges["linearMax"] = X[1];
    update();
  } else {
    alert('Invalid, please try again 😘')
    customL();
  }
}

// same as customL() except for quantile values
const customQ = () => {
  let str = prompt("~ Custom Quantile Scaling ~\n\nPlease enter a range of five quantile values to scale over.\nThe range must be entered as a list of *five* decimals, from 0 to 1 inclusive, and must be in *strictly increasing* order.\nThe numbers represent the data quantiles, where 0 is the min, 1 is the max and 0.5 is the median. Examples are listed below.\n\nDefault: Min, Q1, Med, Q3, Max: 0, 0.25, 0.5, 0.75, 1\nAccentuate Low Values: 0, 0.1, 0.3, 0.6, 1\nAccentuate High Values: 0, 0.4, 0.7, 0.9, 1", "");
  if (str == null) return;
  let X = str.split(",").map(Number).map(i => customRound(i,3));
  if (X.constructor === Array && X.length === 5 && isAscending(X)){   // ensuring the user input is in proper format
    customRanges["quantileQ0"] = QSummary[X[0]];  // set the custom values in dictionary
    customRanges["quantileQ1"] = QSummary[X[1]];
    customRanges["quantileQ2"] = QSummary[X[2]];
    customRanges["quantileQ3"] = QSummary[X[3]];
    customRanges["quantileQ4"] = QSummary[X[4]];
    update();
  } else {
    alert('Invalid, please try again 😘')
    customQ();
  }
}
