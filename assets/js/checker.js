function isNumeric(num) {
  return !isNaN(num);
}

function luhn(creditCardNumber) {
  let even = 0;
  let odd = 0;
  for (let x = 15; x >= 0; x--) {
      if (x % 2 == 0) {
          let newNumber = creditCardNumber.charAt(x) * 2;
          if (newNumber > 9) newNumber -= 9;
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
          generateMessage("Your credit card only contains numerical characters", true)
      );
  } else {
      messages.failure.push(
          generateMessage(
              `Your credit card contains non-numerical characters (Expected numerical only)`
          )
      );
  }

  if (creditCardNumber.length == 16) {
      messages.success.push(
          generateMessage("Your credit card number is 16-numbers long.", true)
      );
  } else {
      messages.failure.push(
          generateMessage(`Your credit card number is ${creditCardNumber.length}-numbers long (Expected 16).`)
      );
  }

  if (creditCardNumber.length != 16 || !luhn(creditCardNumber).correct) {
      messages.failure.push(
          generateMessage("Your credit card number does not fill the Luhn Algorithm")
      );
  } else {
      messages.success.push(
          generateMessage("Your credit card number fills the Luhn Algorithm", true)
      );
  }

  return messages;
}

function generateMessage(message, isValid) {
  if (isValid)
      return (
          "<li class='list-group-item d-flex justify-content-between align-items-center'>" +
          message +
          "<i class='fa fa-check' aria-hidden='true'></i></li>"
      );
  return (
      "<li class='list-group-item d-flex justify-content-between align-items-center'>" +
      message +
      "<i class='fa fa-times' aria-hidden='true'></i></li>"
  );
}