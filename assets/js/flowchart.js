$(document).ready(function() {
  $("#large-button").on("click", function() {
    $("#flowchart-image").attr("src", "assets/images/flowchart-large.png");
    $(this).addClass("active");
    $("#compact-button").removeClass("active");
  });

  $("#compact-button").on("click", function() {
    $("#flowchart-image").attr("src", "assets/images/flowchart-compact.png");
    $(this).addClass("active");
    $("#large-button").removeClass("active");
  });
});
