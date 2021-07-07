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

const closeAllNavs = () => {
  closeNav()
  closeNav3()
  closeNav4()
  closeNav5()
  closeNav6()
}

const openNav5 = () => {
  closeAllNavs()
  $('#iconbtn-4').css("background-color","yellow")
  $('#tooltip-4').text("").css("padding","0px")
}

const closeNav5 = () => {
  $('#iconbtn-4').css("background-color","transparent")
  $('#tooltip-4').text("Settings").css("padding","5px")
}

const openNav6 = () => {
  closeAllNavs()
  $('#iconbtn-5').css("background-color","yellow")
  $('#tooltip-5').text("").css("padding","0px")
}

const closeNav6 = () => {
  $('#iconbtn-5').css("background-color","transparent")
  $('#tooltip-5').text("Settings").css("padding","5px")
}

function openNav() {
  // closeAllNavs()
  $('#iconbtn-1').css("background-color","yellow")
  $('#tooltip-1').text("").css("padding","0px")
  if ($('#mySidebar1').css('left') == "0px"){
    closeAllNavs()
  } else if (window.innerWidth < 450){
    $('#mySidebar1').width(window.innerWidth);
    $('#mySidebar1').css('left',0)
  } else {
    $('#mySidebar1').css('left',0)
  }
}

function closeNav(){
  $('#iconbtn-1').css("background-color","transparent")
  $('#tooltip-1').text("Settings").css("padding","5px")
  $('#mySidebar1').css('left',-500)
}

function openNav2() {
  if ($('#mySidebar1').css('left') == "4000px"){
    closeNav2()
  } else if (window.innerWidth < 450){
    $('#mySidebar2').width(window.innerWidth);
    $('#mySidebar2').css('left',0)
  } else {
    $('#mySidebar2').css('left', window.innerWidth - $('#mySidebar2').width()-30)
  }
}

function closeNav2() {
  $('#mySidebar2').css('left',4000)
}

function openNav3() {
  closeAllNavs()
  $('#tooltip-2').text("").css("padding","0px")
  $('#iconbtn-2').css("background-color","yellow")
  if ($('#mySidebar3').css('left') == "0px"){
    closeAllNavs()
  } else if (window.innerWidth < 450){
    $('#mySidebar3').width(window.innerWidth);
    $('#mySidebar3').css('left',0)
  } else {
    $('#mySidebar3').css('left',0)
  }
}

function closeNav3(){
  $('#iconbtn-2').css("background-color","transparent")
  $('#mySidebar3').css('left',-500)
  $('#tooltip-2').text("Land Acknowledgement").css("padding","5px")
}

function openNav4() {
  closeAllNavs()
  $('#tooltip-3').text("").css("padding","0px")
  $('#iconbtn-3').css("background-color","yellow")
  if ($('#mySidebar4').css('left') == "0px"){
    closeAllNavs()
  } else if (window.innerWidth < 450){
    $('#mySidebar4').width(window.innerWidth);
    $('#mySidebar4').css('left',0)
  } else {
    $('#mySidebar4').css('left',0)
  }
}

function closeNav4(){
  $('#mySidebar4').css('left',-500)
  $('#iconbtn-3').css("background-color","transparent")
  $('#tooltip-3').text("Save Map").css("padding","5px")
}
