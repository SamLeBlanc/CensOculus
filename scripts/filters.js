// // These methods set a filter that hides geographies (opacity 0)
// Based on the feature state, areas will be hidden if the value does not fit the data criteria (>,<,=,...)
// At the moment, only one filter can be applied at a time

const applyFilter = () => {
  let operation = $('#filter-operation').find(':selected').val();
  let filter_val = parseFloat($('#filter-value').val());
  if (isNaN(filter_val)) {
    operation = ">=";
    filter_val = 0;
  }
  let opacity = parseFloat($('#tileopacity-v').val());
  let order = operation == '>=' ? [0, opacity] : [opacity, 0];
  let filter_variable = $('#variable-select-1').find(':selected').val();
  VVV = true;
  setFeatStates()
  map.setPaintProperty(`${SETTINGS['Geo']}-fills`, 'fill-opacity',
    ['interpolate',
    ['linear'], ['feature-state', filter_variable ],
      filter_val, order[0],
      filter_val + 0.0001, order[1],
    ]);
}

// Reset the filter
const resetFilter = () => {
  map.setPaintProperty(`${SETTINGS['Geo']}-fills`, 'fill-opacity', parseFloat($('#tileopacity-v').val()));
  $('#to-label').text($('#tileopacity-v').val()); // needed? not sure
  $('#filter-value').val('')
}
