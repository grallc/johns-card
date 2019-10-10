$(document).ready(function(){
  $('#cardNumber').on('input', function(e) {
    let value = $('#cardNumber').val();

    if(value.length == 0) {
      $('#credit-card-type').hide();
    } if(value.charAt(0) == '4') {
      $('#credit-card-type').show();
      $('#credit-card-type').attr('src', 'assets/images/visa.png')
    } else if(value.charAt(0) == '5') {
      $('#credit-card-type').show();
      $('#credit-card-type').attr('src', 'assets/images/master-card.png')
    } else if(value.charAt(0) == '6') {
      $('#credit-card-type').show();
      $('#credit-card-type').attr('src', 'assets/images/discover.png')
    } else if(value.length >= 2 && value.charAt(0) == '3' && value.charAt(1) == '7') {
      $('#credit-card-type').show();
      $('#credit-card-type').attr('src', 'assets/images/amex.png')
    } else {
      $('#credit-card-type').hide();
    }
  });

  $(":input").inputmask({ "placeholder": "" });
});

function checkCreditCard(creditCardNumber) {
  let messages = [];
  if(creditCardNumber.length == 16) {
    messages.put();
  }
}