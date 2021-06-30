function setUpAll(){   // setup function called on first page load
  // required for custom color choice on swatch click
  $('#cpick-0').on('change', function() { addCustomColor(0) });
  $('#cpick-1').on('change', function() { addCustomColor(1) });
  $('#cpick-2').on('change', function() { addCustomColor(2) });
  $('#cpick-3').on('change', function() { addCustomColor(3) });
  $('#cpick-4').on('change', function() { addCustomColor(4) });
  $('#cpick-5').on('change', function() { addCustomColor(5) });
  $('#cpick-6').on('change', function() { addCustomColor(6) });
}

function openNav() {
  if ($('#mySidebar').width() > 20){
    closeNav()
  } else if (window.innerWidth < 450){
    $('#mySidebar').width(window.innerWidth);
  } else {
    $('#mySidebar').width(385);
  }
}

function closeNav(){
  $('#mySidebar').width(0);
}

function openNav2() {
  if (window.innerWidth < 450){
    $('#mySidebar2').width(window.innerWidth);
  } else {
    $('#mySidebar2').width(380);
    $('#mySidebar2').css('left',window.innerWidth - 400)
  }
}

function closeNav2() {
  $('#mySidebar2').css('left',window.innerWidth + 200)
}
