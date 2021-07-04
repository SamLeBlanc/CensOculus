function setUpAll(){   // setup function called on first page load
  // required for custom color choice on swatch click
  $('#cpick-0').on('change', () => addCustomColor(0) );
  $('#cpick-1').on('change', () => addCustomColor(1) );
  $('#cpick-2').on('change', () => addCustomColor(2) );
  $('#cpick-3').on('change', () => addCustomColor(3) );
  $('#cpick-4').on('change', () => addCustomColor(4) );
  $('#cpick-5').on('change', () => addCustomColor(5) );
  $('#cpick-6').on('change', () => addCustomColor(6) );
}

function openNav() {
  closeNav3()
  closeNav4()
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

function openNav3() {
  closeNav()
  closeNav4()
  if ($('#mySidebar3').css('left') == "0px"){
    closeNav3()
  } else if (window.innerWidth < 450){
    $('#mySidebar3').width(window.innerWidth);
    $('#mySidebar3').css('left',0)
  } else {
    $('#mySidebar3').css('left',0)
  }
}

function closeNav3(){
  $('#mySidebar3').css('left',-500)
}

function openNav4() {
  closeNav()
  closeNav3()
  if ($('#mySidebar4').css('left') == "0px"){
    closeNav4()
  } else if (window.innerWidth < 450){
    $('#mySidebar4').width(window.innerWidth);
    $('#mySidebar4').css('left',0)
  } else {
    $('#mySidebar4').css('left',0)
  }
}

function closeNav4(){
  $('#mySidebar4').css('left',-500)
}
