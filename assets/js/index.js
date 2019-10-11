$(document).ready(function() {
  $(":input").inputmask({ placeholder: "" });
  $("#cardNumber").on("input", function(e) {
    let value = $("#cardNumber").val();

    if (value.length == 0) {
      $("#credit-card-type").hide();
    }
    if (value.charAt(0) == "4") {
      $("#credit-card-type").show();
      $("#credit-card-type").attr("src", "assets/images/visa.png");
    } else if (value.charAt(0) == "5") {
      $("#credit-card-type").show();
      $("#credit-card-type").attr("src", "assets/images/master-card.png");
    } else if (value.charAt(0) == "6") {
      $("#credit-card-type").show();
      $("#credit-card-type").attr("src", "assets/images/discover.png");
    } else if (
      value.length >= 2 &&
      value.charAt(0) == "3" &&
      value.charAt(1) == "7"
    ) {
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

  const path = window.location.pathname;
  const page = path.split("/").pop();
  if (page === "check.html" || page === "check") {
    const urlParams = new URLSearchParams(window.location.search);
    const pinParam = urlParams.get("pin");
    if (pinParam != null) {
      const check = checkCreditCard(pinParam);
      $("#no-card").hide();
      $("#check-body").show();

      check.success.forEach(function(successMessage) {
        $("#info-list").append("<li class='list-group-item d-flex justify-content-between align-items-center'>" + successMessage +  "<i class='fa fa-check' aria-hidden='true'></i></li>");
      });

      check.failure.forEach(function(failureMessage) {
        $("#info-list").append("<li class='list-group-item d-flex justify-content-between align-items-center'>" + failureMessage +  "<i class='fa fa-times' aria-hidden='true'></i></li>");
      });
    }
  }
});

function isNumeric(num) {
  return !isNaN(num);
}

function checkCreditCard(creditCardNumber) {
  let messages = {
    success: [],
    failure: []
  };

  if (creditCardNumber.length == 16) {
    messages.success.push("Your credit card number is 16-numbers long.");
  } else {
    messages.failure.push(
      `Your credit card number is ${creditCardNumber.length}-numbers long (Expected 16).`
    );
  }

  if (isNumeric(creditCardNumber)) {
    messages.success.push(
      "Your credit card only contains numerical characters"
    );
  } else {
    messages.failure.push(
      `Your credit card contains non-numerical characters (Expected numerical only)`
    );
  }
  return messages;
}
