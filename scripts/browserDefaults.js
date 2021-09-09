// // Methods for modifying default browser behavior. IDK where else to put them

//// Stack Overflow code for adjusting Arrow Key behavior **PLEASE DON'T CHANGE**
// Adjusts the behavior of arrow keys when dealing with html dropdown select lists
// Ensures that left/right arrow keys won't change selection, which causes chaos during the tour
// Maybe a bad idea to change deafult functionality here, but I don't have a better idea
// **PLEASE DON'T CHANGE**

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
      // Damn you, Firefox!
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


// // Prevents letters/symbols from being entered in GEOID filter
// Only allows numbers to be inputted in text box, GEOIDs consist solely of numbers
// Also from StackOverflow
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
