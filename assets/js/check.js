$(document).ready(function() {
  const path = window.location.pathname;
  const page = path.split("/").pop();
  if (page === "check.html" || page === "check") {
    const urlParams = new URLSearchParams(window.location.search);
    const pinParam = urlParams.get("pin");
    if (pinParam != null) {
      const check = checkCreditCard(pinParam);
      $("#no-card").hide();
      $("#check-body").show();
      $("#number").text(pinParam);

      check.success.forEach(function(successMessage) {
        $("#info-list").append(
          "<li class='list-group-item d-flex justify-content-between align-items-center'>" +
            successMessage +
            "<i class='fa fa-check' aria-hidden='true'></i></li>"
        );
      });

      check.failure.forEach(function(failureMessage) {
        $("#info-list").append(
          "<li class='list-group-item d-flex justify-content-between align-items-center'>" +
            failureMessage +
            "<i class='fa fa-times' aria-hidden='true'></i></li>"
        );
      });

      if(check.failure.length > 0) {
        $("#check-failure").show();
        $("#check-success").hide();
      } else {
        $("#check-failure").hide();
        $("#check-success").show();
      }
    }
  }
});