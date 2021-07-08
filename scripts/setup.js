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
  console.log('close all')
  closeNav1()
  closeNav3()
  closeNav4()
  closeNav5()
  closeNav6()
}

const unHighlightButtons = () => {
  [1,2,3,4,5].forEach( f => {
    $(`#iconbtn-${f}`).css("background-color","transparent")
  });
}

const openNav1 = () => {
  let check = $('#mySidebar1').css('left') == "-500px" ? true : false;
  closeAllNavs()
  unHighlightButtons()
  $('#mySidebar1').css('height',window.innerHeight-140);
  // $('#tooltip-1').text("").css("padding","0px")
  if (check) {
    $('#mySidebar1').css('left',0);
    $('#iconbtn-1').css("background-color","yellow")
    if (window.innerWidth < 450){
      $('#mySidebar1').width(window.innerWidth - 20);
    }
  }
}

const closeNav1 = () => {
  $('#mySidebar1').css('left',-500)
  $('#iconbtn-1').css("background-color","transparent")
  // $('#tooltip-1').text("Settings").css("padding","5px")
}

function openNav2() {
  if ($('#mySidebar1').css('left') == "4000px"){
    closeNav2()
  } else if (window.innerWidth < 450){
    $('#mySidebar2').width(window.innerWidth - 20);
    $('#mySidebar2').css('left',0)
  } else {
    $('#mySidebar2').css('left', window.innerWidth - $('#mySidebar2').width()-30)
  }
}

function closeNav2() {
  $('#mySidebar2').css('left',4000)
}

const openNav3 = () => {
  let check = $('#mySidebar3').css('left') == "-500px" ? true : false;
  closeAllNavs()
  unHighlightButtons()

  // $('#tooltip-1').text("").css("padding","0px")
  if (check) {
    $('#mySidebar3').css('left',0);
    $('#iconbtn-2').css("background-color","yellow")
    if (window.innerWidth < 450){
      $('#mySidebar3').width(window.innerWidth - 20);
    }
  }
}

const closeNav3 = () => {
  $('#mySidebar3').css('left',-500)
  $('#iconbtn-2').css("background-color","transparent")
  // $('#tooltip-1').text("Settings").css("padding","5px")
}

const openNav4 = () => {
  let check = $('#mySidebar4').css('left') == "-500px" ? true : false;
  closeAllNavs()
  unHighlightButtons()
  // $('#tooltip-1').text("").css("padding","0px")
  if (check) {
    $('#mySidebar4').css('left',0);
    $('#iconbtn-3').css("background-color","yellow")
    if (window.innerWidth < 450){
      $('#mySidebar4').width(window.innerWidth - 20);
    }
  }
}

const closeNav4 = () => {
  $('#mySidebar4').css('left',-500)
  $('#iconbtn-3').css("background-color","transparent")
  // $('#tooltip-1').text("Settings").css("padding","5px")
}

const openNav5 = () => {
  let check = $('#mySidebar5').css('left') == "-500px" ? true : false;
  closeAllNavs()
  unHighlightButtons()
  // $('#tooltip-1').text("").css("padding","0px")
  if (check) {
    $('#mySidebar5').css('left',0);
    $('#iconbtn-4').css("background-color","yellow")
    if (window.innerWidth < 450){
      $('#mySidebar5').width(window.innerWidth - 20);
    }
  }
}

const closeNav5 = () => {
  $('#mySidebar5').css('left',-500)
  $('#iconbtn-4').css("background-color","transparent")
  // $('#tooltip-1').text("Settings").css("padding","5px")
}

const openNav6 = () => {
  let check = $('#mySidebar6').css('left') == "-500px" ? true : false;
  closeAllNavs()
  unHighlightButtons()

  // $('#tooltip-1').text("").css("padding","0px")
  if (check) {
    $('#mySidebar6').css('left',0);
    $('#iconbtn-5').css("background-color","yellow")
    if (window.innerWidth < 450){
      $('#mySidebar6').width(window.innerWidth - 20);
    }
  }
}

const closeNav6 = () => {
  $('#mySidebar6').css('left',-500)
  $('#iconbtn-5').css("background-color","transparent")
  // $('#tooltip-1').text("Settings").css("padding","5px")
}
