/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

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
})