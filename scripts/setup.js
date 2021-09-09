//// Methods pertaining to the initial setup of the sidebars and such
// Not relating to Mapbox map setup function, which can be found in main()

// Setup function called on first page load
const setUpAll = () => {
  $('#accumulate').prop('checked', false);
  updateTitle(); // color and re-size title
  highlightAllNavButtons(); // color all left sidebar buttons
  customColorSetup(); // allow custom colors to be picked from legend
  reTitleLens(); // allow Lens to be re-titled with double click
  dragSetup(); // allow some divs to be dragged
  // legendSetup(); // position the legend in the proper location
  geoControlsSetup(); // position the geo-locate and search bar
  realmSetup();
  setLegendPadding();
  gistGet()
  // doubleSliderCSS();
}

// Change the CSS of jQuery double slider
const doubleSliderCSS = () => {
  $(document).ready( () => $(".ui-widget-header").css("background-color","green") );
}

// Required for custom color choice on legend swatch click
const customColorSetup = () => {
  $('#cpick-0').on('change', () => addCustomColor(0) );
  $('#cpick-1').on('change', () => addCustomColor(1) );
  $('#cpick-2').on('change', () => addCustomColor(2) );
  $('#cpick-3').on('change', () => addCustomColor(3) );
  $('#cpick-4').on('change', () => addCustomColor(4) );
  $('#cpick-5').on('change', () => addCustomColor(5) );
  $('#cpick-6').on('change', () => addCustomColor(6) );
}

// Allows for the custom naming of the Lens by clicking the title
// Lots of BS here, move along if there is literally ANYTHING else better to fix
const reTitleLens = () => {
  $(document).on("dblclick", "#lens-name", function(){
      var current = $(this).text();
      $("#lens-name").html(`<textarea class="form-control" id="newcont" rows="1" cols="50" style="width:345px; height:30px; font-size:25px; font-weight:bold; font-family: 'Lato', sans-serif;">${current}</textarea>`);
      $("#newcont").focus();
      $("#newcont").select();
      $("#newcont").focus(function() {
          console.log('in');
      }).blur(function() {
           var newcont = $("#newcont").val();
           $("#lens-name").text(newcont);
      });
  })
  $("#lens-name").keypress(function (e) {
      if (e.which === 13 && !e.shiftKey) {
          e.preventDefault();
          var newcont = $("#newcont").val();
          $("#lens-name").text(newcont);
      }
  });
}

// Ensures that the draggable divs are actually draggable
const dragSetup = () => {
  $( () => $( "#drag-1" ).draggable() );
  $( () => $( "#drag-2" ).draggable() );
}

// Position the geocontrol box (Search +  GeoLocate)
const geoControlsSetup = () => {
  $('#geo-controls').css('top',0)
  $('#geo-controls').css('left',550)
}

const setLegendPadding = () => {
  if (navigator.userAgent.search("Firefox") > -1){
    $('#LL1').css('padding-top','0px');
    $('#LL2').css('padding-top','6px');
  }
}
