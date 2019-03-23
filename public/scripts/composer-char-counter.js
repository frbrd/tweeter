/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // --- our code goes here ---
  console.log("testing if we are ready");

  var textArea = document.getElementById('main-textarea-input');

  // function callback() {
  //   console.log(this);
  // }

  $('#main-textarea-input').on('input', function() {
    var characterCount = $(this).val().length;
    var countBackwards = 140 - characterCount;

    var counterElement = $(this).siblings(".counter");
    $(counterElement).text(countBackwards);
    if (characterCount > 140) {
      $(counterElement).addClass("tooLong");
    } else {
      $(counterElement).removeClass("tooLong");
    }
  })
    // // Add listener
    // textArea.addEventListener('click', callback);
  })