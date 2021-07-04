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

const addCustomColor = i => {
  customColors[i] = $(`#cpick-${i}`).val()
  update()
}

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

function customL(){
  var str = prompt("Custom Linear Scaling. \nPlease enter the *min* and *max* values for your custom linear range. \
  The values must be entered as an *array* of length 2, and must be in STRICTLY INCREASING order. ", "[  ,  ]");
  if (str !== null){
    try {
      X = JSON.parse(str)
      B = (X.constructor === Array)
      L = (X.length === 2)
      A = isAscending(X)
      if (!(B == L == A == true)){
        alert('Invalid, please read the instructions more carefully 😘')
        customL()
      }
    }
    catch(err) {
      alert('Invalid, please read the instructions more carefully 😘')
      customL()
    }
  }
  try{
    LINEAR_RANGE = X;
    customRanges["linearMin"] = X[0];
    customRanges["linearMax"] = X[1];
    update()
  } catch { }
}

function customQ(){
  var str = prompt("Custom Quantile Scaling. \nPlease enter a range of five quantile values to scale over. \
  The range must be entered as an *array* of length 5, from 0 to 1 inclusive, and must be in STRICTLY INCREASING order. \
  The numbers represent the data quantiles, where 0 is the min, 1 is the max and 0.5 is the median.\
  \n\nDefault: Min, Q1, Med, Q3, Max: [0, 0.25, 0.5, 0.75, 1]\nAccentuate Low Values: [0, 0.1, 0.3, 0.6, 1]\nAccentuate High Values: [0, 0.4, 0.7, 0.9, 1]", "[  ,  ,  ,  ,  ]");
  console.log(str)
  if (str !== null){
    try {
      Q = JSON.parse(str)
      B = (Q.constructor === Array)
      L = (Q.length === 5)
      A = isAscending(Q)
      M = inZeroOne(Q)
      if (!(B == L == A == M == true)){
        alert('Invalid, please read the instructions more carefully 😘')
        customQ()
      }
    }
    catch(err) {
      alert('Invalid, please read the instructions more carefully 😘')
      customQ()
    }
  }
  try{
    QUARTILE_RANGE = Q;
    customRanges["quantileQ0"] = X[0];
    customRanges["quantileQ1"] = X[1];
    customRanges["quantileQ2"] = X[2];
    customRanges["quantileQ3"] = X[3];
    customRanges["quantileQ4"] = X[4];
    update()
  } catch { }
}
