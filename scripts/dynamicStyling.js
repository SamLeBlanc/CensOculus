const onHoverStart_style = () => {
  $('#move').css('padding',"5px")
  map.getCanvas().style.cursor = "crosshair";
}

const onHoverFinish_style = () => {
  $('#move').text("").css('padding',"0px");
  $("#flog_img").attr("src","");
  map.getCanvas().style.cursor = "";
}
