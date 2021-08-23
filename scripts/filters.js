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
const resetFilter = () => {
  map.setPaintProperty(`${SETTINGS['Geo']}-fills`, 'fill-opacity', parseFloat($('#tileopacity-v').val())); // reset tile opacity to the same value for all tiles
  $('#to-label').text($('#tileopacity-v').val()); // needed? not sure
  $('#filter-value').val('')
}
