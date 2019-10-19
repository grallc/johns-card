$(document).ready(function () {
  $(':input').inputmask({ placeholder: '' })
  $('#cardNumber').on('input', function (e) {
    const value = $('#cardNumber').val()
    if (value.charAt(0) == '4') {
      $('#credit-card-type').removeClass("hidden");
      $('#credit-card-type').attr('src', 'assets/images/visa.png')
    } else if (value.charAt(0) == '5') {
      $('#credit-card-type').removeClass("hidden");
      $('#credit-card-type').attr('src', 'assets/images/master-card.png')
    } else if (value.charAt(0) == '6') {
      $('#credit-card-type').removeClass("hidden");
      $('#credit-card-type').attr('src', 'assets/images/discover.png')
    } else if (value.length >= 2 && value.charAt(0) == '3' && value.charAt(1) == '7') {
      $('#credit-card-type').removeClass("hidden");
      $('#credit-card-type').attr('src', 'assets/images/amex.png')
    } else {
      $('#credit-card-type').addClass("hidden");
    }
  })
})
