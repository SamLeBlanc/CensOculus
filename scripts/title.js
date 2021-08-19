// Methods pertaining to the title

// Esnure the title is proper size based on desktop/mobile, and that the sidebar-buttons are properly places
const updateTitle = () => {
  let mobile = window.innerWidth < 450 ? true : false;
  let titleSize = mobile ? "50px" : "65px";
  $('#title').css('font-size',titleSize)
  savedTitleColor = randomTitleColor()
  setTitleHoverColors(savedTitleColor)
  $('#title').css('color',`#${savedTitleColor}`)
  $('#title').css('-webkit-text-stroke',`1.5px ivory`);
  if (mobile) $('#sidebar-buttons').css('top','50px')
}

// Give the title a random (bright) color,
const randomTitleColor = () => {
  while(true) {
    let t = Math.floor(Math.random()*16777215).toString(16);
    if (parseInt(t.slice(0,2)) + parseInt(t.slice(2,4)) + parseInt(t.slice(4,6)) > 50 ) return t;
  }
}

const setTitleHoverColors = savedTitleColor => {
  $("#author-name").hover(function(){
    $(this).css("color", `#${savedTitleColor}`);
    }, function(){
    $(this).css("color", "white");
  });

  $("#-author-tour").hover(function(){
    $(this).css("color", `#${savedTitleColor}`);
    }, function(){
    $(this).css("color", "white");
  });
}
