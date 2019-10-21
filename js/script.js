
//Declarations: This is where I will declare all options that are set at page load
//Highlight the name field when the page is reloaded
$('#name').focus();

//Hide "other" text input until selected in Job Role menu
$('#other-title').hide();

//When "Other" option is selected from "Job Role" menu
$('#title').change(function() {
  if ($('#title').val() === 'other'){
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
});

//Hide all t-shirt color options except colorSelect until a design is selected
$('[value="colorSelect"]').show();
$('[value="cornflowerblue"]').hide();
$('[value="darkslategrey"]').hide();
$('[value="gold"]').hide();
$('[value="tomato"]').hide();
$('[value="steelblue"]').hide();
$('[value="dimgrey"]').hide();

//if js puns is selected, show first 3 colors + colorSelect
$('#design').change(function() {
if ($('#design').val() === 'js puns') {
//  $('#colors-js-puns').show();
    $('[value="colorSelect"]').show();
    $('[value="cornflowerblue"]').show();
    $('[value="darkslategrey"]').show();
    $('[value="gold"]').show();
    $('[value="tomato"]').hide();
    $('[value="steelblue"]').hide();
    $('[value="dimgrey"]').hide();
}
//if heart js is selected, show second 3 colors + colorSelect
else  if ($('#design').val() === 'heart js'){
//  $('#colors-js-puns').show();
    $('[value="colorSelect"]').show();
    $('[value="tomato"]').show();
    $('[value="steelblue"]').show();
    $('[value="dimgrey"]').show();
    $('[value="cornflowerblue"]').hide();
    $('[value="darkslategrey"]').hide();
    $('[value="gold"]').hide();
}
//if a selection is not made or is changed to 'Select Theme' revert to original settings
else {
  $('[value="colorSelect"]').show();
  $('[value="cornflowerblue"]').hide();
  $('[value="darkslategrey"]').hide();
  $('[value="gold"]').hide();
  $('[value="tomato"]').hide();
  $('[value="steelblue"]').hide();
  $('[value="dimgrey"]').hide();
}
});

let selectedBoxes = $('.activities input');

//Create element to display total cost and append it to "".activity"
const activityElement = $('<span></span>');
$('.activities').append(activityElement);
let totalActivityCost = 0;

//Set listener
$('.activities').change(  (event) => {
    let clicked = $(event.target);
    //let clickedCost = parseInt($(clicked).attr('data-cost').match(/\d+/g));
    let clickedCost = ($(clicked).attr('data-cost').replace(/[$,]+/, ''));

//Add cost
    if (clicked.prop('checked') === true) {
       //cost of individual activity
        let activityCost =  parseInt(clickedCost);
         totalActivityCost += activityCost;
//Subtract cost
    } else {
        activityCost =  parseInt(clickedCost);
        totalActivityCost = totalActivityCost - activityCost;
    }

    activityElement.text('Total: $' + totalActivityCost);

//Find date and time of selected activity
let $dateTime = $(clicked).attr('data-day-and-time');

//Disable any activity with a conflicting time of the selected activity
$(selectedBoxes).each(function (){
  if ($(this).attr('data-day-and-time') === $dateTime && clicked != $(this)){
    if ($(clicked).prop('checked') === true) {
        $(this).attr('disabled', true);
        $(clicked).attr('disabled', false);
    } else {
        $(this).attr('disabled', false);
        $(clicked).attr('disabled', false);
    }
  }
})
});

//hide all payment fields except Select Payment but disable the option from the dropdown.
$('#payment option:contains("Select Payment Method")').prop('disabled', true);
$('#credit-card').show();
$('#paypal').hide();
$('#bitcoin').hide();

$('#payment').change(function() {
// If Credit Card is selected, hide other payment fields
if ($('#payment').val() === 'Credit Card') {
    $('#credit-card').show();
    $('#paypal').hide();
    $('#bitcoin').hide();
}
// If PayPal is selected, hide other payment fields
else  if ($('#payment').val() === 'PayPal'){
    $('#credit-card').hide();
    $('#paypal').show();
    $('#bitcoin').hide();
}
// If Bitcoin is selected, hide other payment fields
else  if ($('#payment').val() === 'Bitcoin'){
    $('#credit-card').hide();
    $('#paypal').hide();
    $('#bitcoin').show();
}
});

//Validation

// Functions for validation
function validName (){
    // Name field cannot  be blank
    if ($('#name').val().length < 1) {
        return false;
    }

}
function validEmail () {
    const regEx = /^[^@]+@[^@.]+\.[a-z]+$/i;
    const validEmailVar = regEx.test($('#mail').val());
    // E-mail field cannot  be blank
    if ($('#mail').val().length < 1) {
        return false;
    }
    // E-mail address must be valid
    else if (!validEmailVar){
        return false;
    }
}
function validActivities () {
  //At least one sctivity must be checked
    if ($('.activities input:checked').length === 0 ){
        return false;
    }
}

// Validation section of credit card
function validCCNumber () {
    // Credit card number field should contain from 13 to 16 numbers
    const regExccNum = /^\d{13,16}$/;
    const validccNum = regExccNum.test($('#cc-num').val());
    if (!validccNum) {
        return false;
    }
}

function validCCZip () {
    // Credit card ZIP code field should contain 5 numbers
    const regExzip = /^\d{5}$/;
    const validZip = regExzip.test($('#zip').val());
    if (!validZip) {
        return false;
    }
}

function validCvv () {
    // Credit card ZIP code field should contain 5 numbers
    const regExCvv = /^\d{3}$/;
    const validCvv = regExCvv.test($('#cvv').val());
    if (!validCvv) {
        return false;
    }
}
// Validation on submit button
$('form').submit(function(event) {

    if (validName() === false){
        event.preventDefault();
        $('#name').css('border-color', 'red');
    }else {
      $('#name').css('border-color', '');
    }

    if (validEmail() === false){
        event.preventDefault();
        $('#mail').css('border-color', 'red');

    }else {
      $('#mail').css('border-color', '');
    }

    if (validActivities() === false){
        event.preventDefault();
        $('.activities').css('background-color', 'red');
    }else {
      $('.activities').css('background-color', '');
    }

    // Validation of Credit Card fields only if Credit Card is chosen as payment method
    if ($('#payment').val() === 'Credit Card'){

        if (validCCNumber() === false){
            event.preventDefault();
            $('#cc-num').css('border-color', 'red');
        }else {
          $('#cc-num').css('border-color', '');
        }

        if (validCCZip() === false){
            event.preventDefault();
            $('#zip').css('border-color', 'red');
        }else {
          $('#zip').css('border-color', '');
        }

        if (validCvv() === false){
            event.preventDefault();
            $('#cvv').css('border-color', 'red');
        }else {
          $('#cvv').css('border-color', '');
        }
    }
});
