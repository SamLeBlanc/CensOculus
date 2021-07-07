const updateTitle = () => {
  let titleSize = window.innerWidth < 450 ? "45px" : "75px";
  $('#title').css('font-size',titleSize)
  $('#title').css('color',`#${randomTitleColor()}`)
  $('#title').css('-webkit-text-stroke',`1.5px ivory`);
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