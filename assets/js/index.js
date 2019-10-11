$(document).ready(function() {
  $(":input").inputmask({ placeholder: "" });
  $("#cardNumber").on("input", function(e) {
    let value = $("#cardNumber").val();

    if (value.charAt(0) == "4") {
      $("#credit-card-type").show();
      $("#credit-card-type").attr("src", "assets/images/visa.png");
    } else if (value.charAt(0) == "5") {
      $("#credit-card-type").show();
      $("#credit-card-type").attr("src", "assets/images/master-card.png");
    } else if (value.charAt(0) == "6") {
      $("#credit-card-type").show();
      $("#credit-card-type").attr("src", "assets/images/discover.png");
    } else if ( value.length >= 2 && value.charAt(0) == "3" && value.charAt(1) == "7") {
      $("#credit-card-type").show();
      $("#credit-card-type").attr("src", "assets/images/amex.png");
    } else {
      $("#credit-card-type").hide();
    }
  });

  $("#submit").on("click", function(e) {
    const cardNumber = $("#cardNumber")
      .val()
      .replace(/\s/g, "");
    const check = checkCreditCard(cardNumber);
    if (check.failure && check.failure.length > 0) {
      $("#transfer-error").show();
      $("#check-link-error").attr("href", `check.html?pin=${cardNumber}`);
      $("#transfer-success").hide();
    } else {
      $("#check-link-success").attr("href", `check.html?pin=${cardNumber}`);
      $("#transfer-success").show();
      $("#transfer-error").hide();
    }
    e.preventDefault();
  });


});
