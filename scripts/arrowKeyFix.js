//// Stack Overflow code for adjusting Arrow Key behavior **PLEASE DON'T CHANGE**
// Adjusts the behavior of arrow keys when dealing with html dropdown select lists
// Ensures that left/right arrow keys won't change selection, which causes chaos during the tour

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
