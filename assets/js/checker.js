
function isNumeric(num) {
  return !isNaN(num);
}

function luhn(creditCardNumber) {
  let even = 0;
  let odd = 0;
  for (let x = 15; x >= 0; x--) {
    if (x % 2 == 0) {
      let newNumber = creditCardNumber.charAt(x) * 2;
      if (newNumber > 9) newNumber = newNumber - 9;
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
      messages.failure.push(
        "Your credit card number does not fill the Luhn Algorithm"
      );
    }
  } else {
    messages.failure.push(
      `Your credit card number is ${creditCardNumber.length}-numbers long (Expected 16).`
    );
  }

  return messages;
}
