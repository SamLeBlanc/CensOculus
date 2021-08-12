// // These methods pertain to dynamic CSS styling applied to the map
// // Using mostly jQuery, these methods move/hide/change the styling of objects around the map

// Update the cursor and format the move window when hovered over
const onHoverStart_style = () => {
  $('#move-window').css('padding',"5px")
  map.getCanvas().style.cursor = "crosshair";
}
const onHoverFinish_style = () => {
  $('#move-window').css('padding',"0px");
  map.getCanvas().style.cursor = "";
  $("#flog_img").attr("src","");
  $('#move-window').css({top:-400});
}

// Update more CSS when a hold starts or ends
const onHoldStart_style = () => {
  let offset = $('#sidebar0').width() + 20;
  let le = window.innerWidth - offset - $('#move-window').width() - 30;
  if (tack) $('#move-window').css({ left:le, top:10 });
}
const onHoldFinish_style = () => {
  let le = window.innerWidth - $('#move-window').width() - 30;
  if (tack && !initialRun) $('#move-window').css({ left:le, top:10  });
  initialRun = false;
}

// Determines if a div exists with jquery
const divExists = name => $(`#${name}`).length ? true : false;

// Close all left sidebars, nicknamed *navs*
const closeAllNavs = () => {
  Array.from({length: 10}, (_, i) => {
    if (divExists(`sidebar${i+1}`)) return i + 1
  }).forEach(n => closeNav(n));
  highlightAllNavButtons()
}

// control the highlighting (background change) of the sidebar buttons
const unHighlightNavButtons = () => {
  Array.from({length: 10}, (_, i) => {
    if (divExists(`sidebar${i+1}`)) $(`#iconbtn-${i+1}`).css("background-color","transparent")
  })
}
const highlightAllNavButtons = () => {
  Array.from({length: 10}, (_, i) => {
    if (divExists(`sidebar${i+1}`)) $(`#iconbtn-${i+1}`).css("background-color",$(`#sidebar${i+1}`).css('background-color'));
  })
}

// Open/close a sidebar (nav)
const openNav = n => {
  show = $(`#sidebar${n}`).css('left') == "-500px" ? true : false;
  closeAllNavs()
  highlightAllNavButtons()
  tall = $(`#sidebar${n}`).height() >= window.innerHeight-140 ? true : false;
  mobile = window.innerWidth < 450 ? true : false;
  if (!show) return;
  $(`#sidebar${n}`).css('left',0);
  unHighlightNavButtons()
  $(`#iconbtn-${n}`).css("background-color",$(`#sidebar${n}`).css('background-color'));
  $(`#sidebar${n}`).css('overflow-y',"hidden");
  if (tall) {
    $(`#sidebar${n}`)
    .css('height',window.innerHeight-140)
    .css('overflow-y',"scroll");
  }
  if (mobile){
    $(`#sidebar${n}`).width(window.innerWidth - 20);
    $(`#sidebar${n}`)
    .css('transition','0s')
    .css('border-radius',0)
    .css('top', 50);
  }
}
const closeNav = n => {
  $(`#sidebar${n}`).css('left',-500)
}

// Lens is the right sidebar, and has different methods for opening and closing
const openLens = () => {
  if ($('#sidebar0').css('left') != `${window.innerWidth + 200}px` && Object.keys(heldDistricts).length == 0){
    closeLens()
  } else if (window.innerWidth < 450){
    $('#sidebar0').width(window.innerWidth - 20);
    $('#sidebar0')
    .css('top',window.innerHeight - $('#sidebar0').height() - 30)
    .css('left',0)
    .css('border-radius',0);
  } else {
    $('#sidebar0').css('left', window.innerWidth - $('#sidebar0').width()-30)
  }
}
const closeLens = () => {
  $('#sidebar0').css('left',window.innerWidth + 200)
}

// Update the formatting of the two lower left sidebar buttons
const updateTack = () => {
  if (tack) $('#iconbtn-10').css('border','solid 5px #bebebe').css('margin','0px')
  else $('#iconbtn-10').css('border','solid 2px #bebebe').css('margin','3px')
  tack =! tack;
}
const updateAcc = () => {
  if (acc) $('#iconbtn-11').css('border','solid 5px #bebebe').css('margin','0px')
  else $('#iconbtn-11').css('border','solid 2px #bebebe').css('margin','3px')
  acc =! acc;
}