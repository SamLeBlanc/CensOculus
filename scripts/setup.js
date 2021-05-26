function setUpAll(){   // setup function called on first page load
  // required for custom color choice on swatch click
  $('#cpick-0').on('change', function() { addCustomColor(0) });
  $('#cpick-1').on('change', function() { addCustomColor(1) });
  $('#cpick-2').on('change', function() { addCustomColor(2) });
  $('#cpick-3').on('change', function() { addCustomColor(3) });
  $('#cpick-4').on('change', function() { addCustomColor(4) });
}
