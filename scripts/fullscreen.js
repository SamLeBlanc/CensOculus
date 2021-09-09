$(window).load(function () {
  $("#iconbtn-12").click(function() {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      .catch((err) => console.error(err))
    } else {
      document.documentElement.requestFullscreen();
    }
    updateFull();
  });
})
