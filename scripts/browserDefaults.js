// // // Methods for modifying default browser behavior **PLEASE DON'T CHANGE**

//// Stack Overflow code for adjusting Arrow Key behavior **PLEASE DON'T CHANGE**
// Adjusts the behavior of arrow keys when dealing with html dropdown select lists
// Ensures that left/right arrow keys won't change dropdown selection, which causes chaos during the tour
// Maybe a bad idea to change deafult functionality here, but I don't have a better idea
const ensurePreventDefault = select => {
  let selectedIndex, scrollTop;
  const saveState = () => {
    selectedIndex = select.selectedIndex;
    scrollTop = select.scrollTop;
  }
  saveState();
  if (!select.multiple && !select.size) {
    select.addEventListener('change', saveState);
  }
  // use setTimeout to wait a frame and see if the selected index was changed
  setTimeout( () => {
    select.removeEventListener('change', saveState);
    if (select.selectedIndex !== selectedIndex) {
      select.selectedIndex = selectedIndex;
      select.scrollTop = scrollTop;
    }
  });
}
document.addEventListener('keydown', event => {
  switch (event.which || event.keyCode) {
    case 37: // left arrow
    case 39: // right arrow
      event.preventDefault();
      ensurePreventDefault(this);
      break;
  }
});


//// Actively prevents letters/symbols from being entered when filtering by GEOID
// Only allows numbers to be inputted in text box, GEOIDs consist solely of numbers
// Also from StackOverflow, again, **PLEASE DON'T CHANGE**
(function($) {
  $.fn.inputFilter = function(inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  };
}(jQuery));
$(document).ready(function() {
  $("#filter-custom").inputFilter(function(value) { // for GEOID filter
    return /^\d*$/.test(value);    // Allow digits only, using a RegExp
  });
});
