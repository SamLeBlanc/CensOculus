function setUpAll(){   // setup function called on first page load
  // required for custom color choice on swatch click
  $('#cpick-0').on('change', () => addCustomColor(0) );
  $('#cpick-1').on('change', () => addCustomColor(1) );
  $('#cpick-2').on('change', () => addCustomColor(2) );
  $('#cpick-3').on('change', () => addCustomColor(3) );
  $('#cpick-4').on('change', () => addCustomColor(4) );
  $('#cpick-5').on('change', () => addCustomColor(5) );
  $('#cpick-6').on('change', () => addCustomColor(6) );

  $("#b-name").keypress(function (e) {
      if(e.which === 13 && !e.shiftKey) {
          e.preventDefault();
          var newcont = $("#newcont").val();
          $("#b-name").text(newcont);
      }
  });
}


$(document).on("dblclick", "#b-name", function(){
    var current = $(this).text();
    $("#b-name").html(`<textarea class="form-control" id="newcont" rows="1" cols="50" style="width:345px; height:30px; font-size:25px; font-weight:bold; font-family: 'Lato', sans-serif;">${current}</textarea>`);
    $("#newcont").focus();
    $("#newcont").select();
    $("#newcont").focus(function() {
        console.log('in');
    }).blur(function() {
         var newcont = $("#newcont").val();
         $("#b-name").text(newcont);
    });
})

const updateTack = () => {
  if (tack) {
    $('#iconbtn-6').css('border','solid 3px #e72cdc')
  } else {
    $('#iconbtn-6').css('border','solid 3px transparent')
  }
  tack =! tack;
}

const updateAcc = () => {
  if (acc) {
    $('#iconbtn-7').css('border','solid 3px #e72cdc')
  } else {
    $('#iconbtn-7').css('border','solid 3px transparent')
  }
  acc =! acc;
}

const closeAllNavs = () => Array.from({length: 5}, (_, i) => i + 1).forEach(n => closeNav(n));

const unHighlightButtons = () => {
  [1,2,3,4,5].forEach( f => {
    $(`#iconbtn-${f}`).css("background-color","transparent")
  });
}

const openNav = n => {
  show = $(`#mySidebar${n}`).css('left') == "-500px" ? true : false;
  closeAllNavs()
  unHighlightButtons()
  tall = $(`#mySidebar${n}`).height() >= window.innerHeight-140 ? true : false;
  mobile = window.innerWidth < 450 ? true : false;
  console.log(show,tall,mobile)
  if (!show) return
  $(`#mySidebar${n}`).css('left',0);
  $(`#iconbtn-${n}`).css("background-color","#EF6CE6")
  $(`#mySidebar${n}`).css('overflow-y',"hidden");
  if (tall) {
    $(`#mySidebar${n}`).css('height',window.innerHeight-140);
    $(`#mySidebar${n}`).css('overflow-y',"scroll");
  }
  if (mobile){
    $(`#mySidebar${n}`).css('transition','0s')
    $(`#mySidebar${n}`).width(window.innerWidth - 20);
    $(`#mySidebar${n}`).css('border-radius',0)
    $(`#mySidebar${n}`).css('top', 50)
  }
}

const closeNav = n => {
  $(`#mySidebar${n}`).css('left',-500)
  $(`#iconbtn-${n}`).css("background-color","transparent")
}

function openNav0() {
  if ($('#mySidebar0').css('left') != `${window.innerWidth + 200}px` && Object.keys(heldDistricts).length == 0){
    closeNav0()
  } else if (window.innerWidth < 450){
    $('#mySidebar0').width(window.innerWidth - 20);
    $('#mySidebar0').css('top',window.innerHeight - $('#mySidebar0').height() - 30);
    $('#mySidebar0').css('left',0)
    $('#mySidebar0').css('border-radius',0)
  } else {
    $('#mySidebar0').css('left', window.innerWidth - $('#mySidebar0').width()-30)
  }
}

function closeNav0() {
  $('#mySidebar0').css('left',window.innerWidth + 200)
}
