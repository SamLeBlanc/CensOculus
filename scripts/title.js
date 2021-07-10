const updateTitle = () => {
  let mobile = window.innerWidth < 450 ? true : false;
  let titleSize = mobile ? "50px" : "65px";
  $('#title').css('font-size',titleSize)
  $('#title').css('color',`#${randomTitleColor()}`)
  $('#title').css('-webkit-text-stroke',`1.5px ivory`);
  $('#nav-buttons').css('top','50px')
}

const randomTitleColor = () => {
  while(true) {
    let t = Math.floor(Math.random()*16777215).toString(16);
    if (t){
      if (parseInt(t.slice(0,2)) + parseInt(t.slice(2,4)) + parseInt(t.slice(4,6)) > 50 ){
        return t
      }
    }
  }
}
