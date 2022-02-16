// // // Methods pertaining to the title size and coloring
// On page reload, the title color is randomly(ish) generated
// The hover color of the subtitles is set to be the same as the main title

let savedTitleColor = 'FFFFFF'; // white

// Ensure the title is proper size based on desktop/mobile device, and the sidebar-buttons are properly placed
const updateTitle = () => {
  // Check if device is mobile based on screen size, set title size accordingly
  let mobile = window.innerWidth < 450 ? true : false;
  let titleSize = mobile ? "50px" : "65px";
  $('#title').css('font-size',titleSize)
  // Get random(ish) title color and save for use in subtitle hover effect
  savedTitleColor = randomTitleColor()
  setTitleHoverColors(savedTitleColor)
  $('#title').css('color',`#${savedTitleColor}`)
  $('#title').css('-webkit-text-stroke',`1.5px ivory`); // title outline
  if (mobile) $('#sidebar-buttons').css('top','50px') // adjust sidebar buttons if on mobile
}

// Get title color as a random (bright-ish) color,
const randomTitleColor = () => {
  while(true) {
    // get color from random 16 bit integer
    let color = Math.floor(Math.random()*16777215).toString(16);
    // ensure the color is not too dark based on RGB components
    if (parseInt(color.slice(0,2)) + parseInt(color.slice(2,4)) + parseInt(color.slice(4,6)) > 65 ) return color;
  }
}

// Set the hovered color for author and tour buttons to the randomTitleColor (so they match)
const setTitleHoverColors = savedTitleColor => {
  $("#author-name").hover(function(){
    $(this).css("color", `#${savedTitleColor}`);
    }, function(){
    $(this).css("color", "white");
  });

  $("#tour-link").hover(function(){
    $(this).css("color", `#${savedTitleColor}`);
    }, function(){
    $(this).css("color", "white");
  });

  $("#github-icon").hover(function(){
    $(this).css("color", `#${savedTitleColor}`);
    }, function(){
    $(this).css("color", "white");
  });
}
