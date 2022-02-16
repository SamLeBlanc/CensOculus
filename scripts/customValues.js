// // // Methods pertaining to customizing the map based on custom client-entered values
// Users can provide custom colors or number scales (linear, quartile, log) to create a personalized map
// The provided values are checked here for validity and formated before being applied elsewhere

// Set intial null values for custom colors and scaling
let customColors = Array(7).fill(null);
let customRanges = {
    "linearMin" : null,
    "linearMax" : null,
    "quartileQ0" : null,
    "quartileQ1" : null,
    "quartileQ2" : null,
    "quartileQ3" : null,
    "quartileQ4" : null
};

// Determines which custom sclaing method to call based on settings
const getCustomRange = () => SETTINGS['Scale'] == 'Linear' ? getCustomLinearScale() : getCustomQuartileScale();

// Determines if an array is strictly increasing
// Neccesary for painting layer, if array is not strictly increasing, Mapbox styling will throw error
const isAscending = arr => {
  return arr.every((x, i) => {
    return i === 0 || x > arr[i - 1];
  });
}

// Receives and checks user input regarding a custom linear scale
// If the input is invalid, it will ask for info again
const getCustomLinearScale = () => {
  let str = prompt("~ Custom Linear Scaling ~\n\nPlease enter the *min* and *max* for your custom linear scale. \nThe *two* values must be entered in *strictly increasing* order.\nFor percentages, enter values between 0 and 1.", "min , max");
  if (str == null) return;
  let vals = str.split(",").map(Number);
  if (vals.constructor === Array && vals.length === 2 && isAscending(vals)){   // ensuring the user input is in proper format
    customRanges["linearMin"] = X[0];   // set the custom values in dictionary
    customRanges["linearMax"] = X[1];
    update();
  } else {
    alert('Invalid, please try again 😘')
    getCustomLinearScale();
  }
}

// same as getCustomLinearScale() except for quartile values
const getCustomQuartileScale = () => {
  let str = prompt("~ Custom Quartile Scaling ~\n\nPlease enter a range of five quartile values to scale over.\nThe range must be entered as a list of *five* decimals, from 0 to 1 inclusive, and must be in *strictly increasing* order.\nThe numbers represent the data quartiles, where 0 is the min, 1 is the max and 0.5 is the median. Examples are listed below.\n\nDefault: Min, Q1, Med, Q3, Max: 0, 0.25, 0.5, 0.75, 1\nAccentuate Low Values: 0, 0.1, 0.3, 0.6, 1\nAccentuate High Values: 0, 0.4, 0.7, 0.9, 1", "");
  if (str == null) return;
  let vals = str.split(",").map(Number).map(i => customRound(i,3));
  if (vals.constructor === Array && vals.length === 5 && isAscending(vals)){   // ensuring the user input is in proper format
    customRanges["quartileQ0"] = QSummary[X[0]*1000];  // set the custom values in dictionary
    customRanges["quartileQ1"] = QSummary[X[1]*1000];
    customRanges["quartileQ2"] = QSummary[X[2]*1000];
    customRanges["quartileQ3"] = QSummary[X[3]*1000];
    customRanges["quartileQ4"] = QSummary[X[4]*1000];
    update();
  } else {
    alert('Invalid, please try again 😘')
    getCustomQuartileScale();
  }
}

// Add color based on user input from clicking the colors in legend
const addCustomColor = i => {
  customColors[i] = $(`#cpick-${i}`).val();
  update();
}
