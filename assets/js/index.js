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

  $("#submit").on("click", function (e) {
    const cardNumber = $("#cardNumber").val().replace(/\s/g, '');
    const check = checkCreditCard(cardNumber);
    $("#check-link").attr('href', `check.html?pin=${cardNumber}`);
    if(check.failure && check.failure.length > 0) {
      $('#transfer-error').show();
      $('#transfer-success').hide();
    } else {
      $('#transfer-success').show();
      $('#transfer-error').hide();
    }
    e.preventDefault();
  });


  const path = window.location.pathname;
  const page = path.split("/").pop();
  if (page === "check.html" || page === "check") {
    const urlParams = new URLSearchParams(window.location.search);
    const pinParam = urlParams.get("pin");
    if (pinParam != null) {
      $("#no-card").hide();
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
    messages.success.push("Your credit card number is 16-numbers long");
  } else {
    messages.failure.push(
      `Your credit card number is ${creditCardNumber.length}-numbers long`
    );
  }

  if (isNumeric(creditCardNumber)) {
    messages.success.push("Your credit card only contains numerical characters");
  } else {
    messages.failure.push(`Your credit card contains non-numerical characters`);
  }
  return messages;
}
