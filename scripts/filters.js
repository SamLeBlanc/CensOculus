// // Methods for setting a filter that hides geographies (actually, just paints them with zero opacity)
// Based on the feature state, areas will be hidden if the value does not fit the data criteria (>,<,=,...)
// EXAMPLE:
// At the moment, only one filter can be applied at a time0

const applyFilter = () => {
  let operation = $('#filter-operation').find(':selected').val(); // collect filter operation and value from sidebar
  let filter_val = parseFloat($('#filter-value').val());
  if (isNaN(filter_val)) { operation = ">="; filter_val = 0; }    // default values
  let opacity = parseFloat($('#tileopacity-v').val());
  let order = operation == '>=' ? [0, opacity] : [opacity, 0];    // change opacity ordering based on operation
  let filter_variable = $('#variable-select-1').find(':selected').val();
  VVV = true; setFeatStates(); // this line is used so that you can view by a different variable than the one being filtered (confusing!)
  map.setPaintProperty(`${SETTINGS['Geo']}-fills`, 'fill-opacity', // set the opacity for filtered out areas to zero (but they can still be hovered over)
    ['interpolate',
    ['linear'], ['feature-state', filter_variable ],
      filter_val, order[0],
      filter_val + 0.0001, order[1],
    ]);
}

// Reset the filter
// const resetFilter = () => {
//   setFillOpacity(); // reset tile opacity to the same value for all tiles
//   $('#to-label').text($('#tileopacity-v').val()); // needed? not sure
//   $('#filter-value').val('')
// }

const clearFilter = () => {
  map.setFilter(`${SETTINGS["Geo"]}-fills`, null);
}

const readFilteredIds = () => GEOID_FILTER.slice(2)
let GEOID_FILTER = ['in', `GEOID${SETTINGS["Year"]}`]

const filterByGeoid = geoid => {
  let year = SETTINGS["Year"];
  GEOID_FILTER = ['in', `GEOID${year}`];
  let ids = findFilteredIds(geoid)
  GEOID_FILTER = GEOID_FILTER.concat(ids)
  map.setFilter(`${SETTINGS["Geo"]}-fills`, GEOID_FILTER);
  createCountyFilterSelect(geoid)
}

const findFilteredIds = geoid => {
  let year = SETTINGS["Year"];
  return LORAX["P1"]
    .filter( d => d[`SIZE`] == SETTINGS["Geo"].toUpperCase())
    .filter( d => d[`GEOID${year}`].startsWith(geoid))
    .map( d => d[`GEOID${year}`])
}

const createCountyFilterSelect = geoid => {
  let year = SETTINGS["Year"];
  let str = "<option value='' selected disabled >Select a State</option>";
  if (geoid.length == 2){
    str = `<option value='' selected disabled >Select a County</option>`
    ALMANAC[10]
     .filter( d => d['SIZE'] == 'county')
     .filter( d => d[`GEOID${year}`].startsWith(geoid.substring(0, 2) ))
     .filter( d => d[`GEOID${year}`] != (geoid.substring(0, 2) ))
     .map( d => [d[`GEOID${year}`], d[`NAME${year}`]])
     .sort( (a, b) => a[1] > b[1] ? 1 : -1 )
     .forEach( d => str = str.concat(`<option value="${d[0]}" >${d[1]}</option>`));
  $('#county-filter-select').html(str)
  }
}
