$(document).ready(function() {
  $("#checker-form").on("submit", function() {
    $("#info-list").html('');  
    const cardNumber = $("#cardNumber")
      .val()
      .replace(/\s/g, "");
    const check = checkCreditCard(cardNumber);

    check.success.forEach(function(successMessage) {
      $("#info-list").append(successMessage);
    });

    check.failure.forEach(function(failureMessage) {
      $("#info-list").append(failureMessage);
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
