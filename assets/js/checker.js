function luhn(creditCardNumber) {
  let even = 0;
  let odd = 0;
  for (let x = creditCardNumber.length - 1; x >= 0; x--) {
    if ((16 - x) % 2 == 0) {
      let newNumber = creditCardNumber.charAt(x) * 2;
      if (newNumber > 9) newNumber = newNumber - 9;
      even += newNumber;
      console.log("even", even);
    } else {
      odd += parseInt(creditCardNumber.charAt(x));
      console.log("odd", odd);
    }
  }
  return { even, odd, total: even + odd, correct: (even + odd) % 10 === 0 };
}

function checkCreditCard(creditCardNumber) {
  const messages = { success: [], failure: [] };

  if (isNumeric(creditCardNumber)) {
    messages.success.push(
      generateMessage(
        "Your credit card only contains numerical characters <small>Expected numericals only</small>",
        true
      )
    );
  } else {
    messages.failure.push(
      generateMessage("Your credit card contains non-numerical characters")
    );
  }

  if (creditCardNumber.length >= 13 && creditCardNumber.length <= 16) {
    messages.success.push(
      generateMessage(
        `Your credit card number is ${creditCardNumber.length}-numbers long <small>Expected between 13 and 16</small>.`,
        true
      )
    );
  } else {
    messages.failure.push(
      generateMessage(
        `Your credit card number is ${creditCardNumber.length}-numbers long <small>Expected between 13 and 16</small>.`
      )
    );
  }

  const luhnCheck = luhn(creditCardNumber);
  if ((creditCardNumber.length < 13 || creditCardNumber.length > 16) || !luhnCheck.correct) {
    messages.failure.push(
      generateMessage(
        `Your credit card number does not fill the Luhn Algorithm <small>even (${
          luhnCheck.even
        }) + odd (${luhnCheck.odd}) / 10 = ${luhnCheck.total / 10}</small>`
      )
    );
  } else {
    messages.success.push(
      generateMessage("Your credit card number fills the Luhn Algorithm", true)
    );
  }
  return messages;
}

function isNumeric(num) {
  return !isNaN(num);
}

function generateMessage(message, isValid) {
  if (isValid) {
    return (
      "<li class='list-group-item d-flex justify-content-between align-items-center'>" +
      message +
      "<i class='fa fa-check' aria-hidden='true'></i></li>"
    );
  }
  return (
    "<li class='list-group-item d-flex justify-content-between align-items-center'>" +
    message +
    "<i class='fa fa-times' aria-hidden='true'></i></li>"
  );
}
