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

function isNumeric(num) {
  return !isNaN(num);
}

function luhn(creditCardNumber) {
  let even = 0;
  let odd = 0;
  for (let x = 15; x >= 0; x--) {
    if (x % 2 == 0) {
      let newNumber = creditCardNumber.charAt(x) * 2;
      let length = newNumber.toString().length;
      if (length == 2) {
        let newNumber2 = 0;
        for (let y = 0; y < length; y++) {
          newNumber2 = newNumber2 + parseInt(newNumber.toString().charAt(y));
        }
        newNumber = newNumber2;
      }
      even += newNumber;
    } else {
      odd += parseInt(creditCardNumber.charAt(x));
    }
  }
  return {
    correct: (even + odd) % 10 == 0
  };
}

function checkCreditCard(creditCardNumber) {
  let messages = {
    success: [],
    failure: []
  };

  if (isNumeric(creditCardNumber)) {
    messages.success.push(
      "Your credit card only contains numerical characters"
    );
  } else {
    messages.failure.push(
      `Your credit card contains non-numerical characters (Expected numerical only)`
    );
  }

  if (creditCardNumber.length == 16) {
    messages.success.push("Your credit card number is 16-numbers long.");
    if (luhn(creditCardNumber).correct) {
      messages.success.push("Your credit card number fills the Luhn Algorithm");
    } else {
      messages.failure.push("Your credit card number does not fill the Luhn Algorithm");
    }
  } else {
    messages.failure.push(
      `Your credit card number is ${creditCardNumber.length}-numbers long (Expected 16).`
    );
  }

  return messages;
}
