$(document).ready(function() {
  $("#submit").on("click", function() {
    $("#info-list").html('');  
    const cardNumber = $("#cardNumber")
      .val()
      .replace(/\s/g, "");
    const check = checkCreditCard(cardNumber);

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

    $("#number").text(cardNumber);

    if (check.failure.length > 0) {
      $("#check-failure").show();
      $("#check-success").hide();
    } else {
      $("#check-failure").hide();
      $("#check-success").show();
    }
  });

});
