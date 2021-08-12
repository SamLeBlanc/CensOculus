// Called only once, the first time the map is loaded
const main = () => {
  idleLoadingIcon();            // shows that the map is loading
  collectSettings();            // collects inital settings
  loadDataFromCSV("P1");        // loads in dataregard total population (P1)
  loadFlagData();               // load in flag urls compiled from CRW flags
  getVariableLabelList();       // get list of Census variable names
  addSources();                 // add Mapbox source
  addFillLineExtrusionLayers(); // add Mapbox layers
}

// Called (just about) every time the map is changed in any way
// This is the main workhorse of the entire project
const update = () => {
  collectSettings();        // collects inital settings
  updateGeo();              // updates geography size (state, county, zip code, etc.)
  updateVariable();         // updates variable (data category) within the current concept
  updatePaint();            // updates layer paint (colors, opacity, etc.)
  updateFlagMode();         // updates if flag is mode is activated
  endLoadingIcon(2);        // ends secondary loading icon when map is ready
}


// Updates the layer paint on the visible map layer
// This includes, color, opacity, lines, extrusions, and visibility (different than opacity!)
const updatePaint = () => {
  let colors = COLOR_DICT[SETTINGS['Scheme']];                                        // returns array of 5 colors according to color scheme
  colors = getCustomColors(colors);                                                   // replace colors with custom ones if selected by user
  let fiveStep = ( SETTINGS['Scale'] == "Linear") ? colorLinear() : colorQuantile();  // returns the five-step sequence needed to paint each layer
  let fiveStep_values = Object.values(fiveStep).sort((a, b) => a - b);                // get values as an array, and sort
  fiveStep_values = fiveStepAdjustment(fiveStep_values);                              // ensure the values are in strictly increasing order
  updateLegend(fiveStep_values, colors);                                              // update legend to show proper values and colors
  setLinePaint();                                                                     // set Mapbox paint with data-driven styling
  setFillPaint(fiveStep_values, colors);                                              // set Mapbox paint with data-driven styling
  setExtrusionPaint(fiveStep_values, colors);                                         // set Mapbox paint with data-driven styling
  setLayerVisibility();                                                               // ensure proper layer visibility
}


// Updates the visible geography size
// Currently the availble geographies are: nation, state, county, csub (county subdivision), place, census tract, census group,
//    metro/micro statistical areas, urban areas, zip codes, and unified school districts

let hoversCreated = [];                 // used to identift id the geography has previously been loaded in
const updateGeo = () => {
  hideAllLayers();                      // hides all layers, as only one can be seen at a time
  clearAllHolds();                      // remove any held areas, thus holding a state is not equal to holding all counties in that state
  let geo = SETTINGS['Geo'];
  showCurrentLayer();                   // ensures the current desired layer is visible
  if (!hoversCreated.includes(geo)){    // if geography has not previously been loaded in
    setupHoverHoldStates(geo);          // then setup hover and hold feature states
    hoversCreated.push(geo);
  }
}

// Updates the selected variable (data category)
// The name variable is confusing (since everything is called a variable) but basically a variable is a single data category
// Variables collected by Census include counts of Black population, under 18s, those living in multi-generational households
// Each of these individually is a variable. In all, the Census tabulates something like 8000 variables
const updateVariable = () => {
  setFeatStates()       // set the feature state for variable. feature states for each variable are set seperately to minimize time/space limits
  getQuantileValues()   // calculte the quantile values (QSummary) for the new variable,
}

// Updates the selected concept
// The concept is a grouping of variables around a specific idea. some examples of concepts are race, age, urbanity, etc.
// When updating the conecpt, we must also update the list of variables within that concept
const updateConcept = () => {
  startLoadingIcon(2);
  let concept = SETTINGS['Concept'];
  if (!(concept in LORAX)) loadDataFromCSV(concept)   // if concept has not previously been loaded, then retrieve it
  getVariableListByConcept(concept)                   // get list of variables that pertain to each concept
  setTimeout(function(){                        // should use async/await here but I am bad at those
    createVariableDropdownSelect(VLbC[concept])       // set new list of variables as dropdown menu option for user to select
  }, 2000);
  setTimeout(function(){                        // should use async/await here but I am bad at those
    update()
  }, 3000);
}

////==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==
///==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==
//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==

LORAX = {}

let VVV = false;

let tack = true;
let acc = true;

let initialRun = true;

let startTime = 0;
let endTime = 0;

let hoveredId = null;
let heldDistricts = {};
let taggedDistricts = {};
