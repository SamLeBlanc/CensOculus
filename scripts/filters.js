const applyFilter = () => {
  let filter_val = parseFloat($('#filter-value').val());
  if (isNaN(filter_val)) {
    alert('Please make sure you entered a valid number in the value box 🙃');
    return;
  }
  let operation = $('#filter-operation').find(':selected').val();
  let opacity = parseFloat($('#tileopacity-v').val());
  let order = operation == '>=' ? [0, opacity] : [opacity, 0];
  let filter_variable = $('#variable-select-1').find(':selected').val();
  setFeatStates2(filter_variable)

  map.setPaintProperty(`${SETTINGS['Geo']}-fills`, 'fill-opacity',
    ['interpolate',
    ['linear'], ['feature-state', filter_variable ],
      filter_val, order[0],
      filter_val + 0.0001, order[1],
    ]);
}

const resetFilter = () => {
  map.setPaintProperty(`${SETTINGS['Geo']}-fills`, 'fill-opacity', parseFloat($('#tileopacity-v').val()));
  $('#to-label').text($('#tileopacity-v').val()); // needed? not sure
  $('#filter-value').val('')
}
