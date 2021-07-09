var QUARTILE_RANGE = [0, 0.25, 0.5, 0.75, 1];
var LINEAR_RANGE = [null,null];
var customColors = [null, null, null, null, null, null, null]
let customRanges = {
    "linearMin" : null,
    "linearMax" : null,
    "quantileQ0" : null,
    "quantileQ1" : null,
    "quantileQ2" : null,
    "quantileQ3" : null,
    "quantileQ4" : null,
};



const getCustomRange = () => SETTINGS['Scale'] == 'Linear' ? customL() : customQ();

// Determines whether an array is strictly increasing
// Returns true if array is strictly increasing
// (neccesary for correctly making a color scale in Mapbox)
function isAscending(arr) {
  return arr.every(function (x, i) {
    return i === 0 || x > arr[i - 1];
  });
}

// Determines whether an array has values between 0 and 1 inclusive
// Returns true if array min >= 0 AND max <= 1
function inZeroOne(arr){
  var min = arr.reduce(function(a, b) {
    return Math.min(a, b);
  });
  var max = arr.reduce(function(a, b) {
    return Math.max(a, b);
  });
  return (min >= 0 && max <= 1)
}

const ERR = () => {

}

function customL(){
  var str = prompt("~ Custom Linear Scaling ~\n\nPlease enter the *min* and *max* for your custom linear scale. \nThe *two* values must be entered in *strictly increasing* order.\nFor percentages, enter values between 0 and 1.", "min , max");
  if(str == null) return
  X = str.split(",").map(Number);
  if (X.constructor === Array && X.length === 2 && isAscending(X)){
    LINEAR_RANGE = X;
    customRanges["linearMin"] = X[0];
    customRanges["linearMax"] = X[1];
    update()
  } else {
    alert('Invalid, please read the instructions more carefully 😘')
    customL()
  }
}

function customQ(){
  var str = prompt("~ Custom Quantile Scaling ~\n\nPlease enter a range of five quantile values to scale over. \
  The range must be entered as a list of *five* decimals, from 0 to 1 inclusive, and must be in *strictly increasing* order. \
  The numbers represent the data quantiles, where 0 is the min, 1 is the max and 0.5 is the median. Examples are listed below.\
  \n\nDefault: Min, Q1, Med, Q3, Max: [0, 0.25, 0.5, 0.75, 1]\nAccentuate Low Values: [0, 0.1, 0.3, 0.6, 1]\nAccentuate High Values: [0, 0.4, 0.7, 0.9, 1]", "[  ,  ,  ,  ,  ]");
  if(str == null) return
  X = str.split(",").map(Number);
  if (X.constructor === Array && X.length === 5 && isAscending(X)){
    LINEAR_RANGE = X;
    customRanges["quantileQ0"] = X[0];
    customRanges["quantileQ1"] = X[1];
    customRanges["quantileQ2"] = X[2];
    customRanges["quantileQ3"] = X[3];
    customRanges["quantileQ4"] = X[4];
    update()
  } else {
    alert('Invalid, please read the instructions more carefully 😘')
    customQ()
  }
}
