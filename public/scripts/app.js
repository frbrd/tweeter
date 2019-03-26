/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

const request = (options, cb) => {
  $.ajax(options)
    // function that will received the data back from the request
    .done(response => {
      // calling the callback function with that data
      cb(response);
    })
    // Any error with the request
    .fail(err => {
      console.log(`Error: ${err}`);
    })
    // This will get executed in any case
    .always(() => {
      console.log('Request completed');
    })
};

function createTweetElement (data) {

  const $articleOfTweet = $("<article>");
  const $header = $("<header>");
  const $nameDiv = $("<div>");
  const $footer = $("<footer>");
  const $interactDiv = $("<div>");

  $($header)
  .appendTo($articleOfTweet);

  $("<p>")
  .addClass("little-tweet")
  .text(data.content.text)
  .appendTo($articleOfTweet);

  $($nameDiv)
  .addClass("left-side-tweet-header")
  .appendTo($header);

  $("<img>")
  .attr("id", "avatarImg")
  .appendTo($nameDiv);

  $("<h6>")
  .addClass("authorName")
  .text(data.user.name)
  .appendTo($nameDiv);

  $("<p>")
  .addClass("tweeter-handle")
  .text(data.user.handle)
  .appendTo($header);

  $("<span>")
  .attr("id", "daysAgo")
  .text(data.created_at)
  .appendTo($footer);

  $($interactDiv)
  .addClass("reactIcons")
  .appendTo($footer);

  $("<span>")
  .addClass("glyphicon")
  .addClass("glyphicon-flag")
  .appendTo($interactDiv);

  $("<span>")
  .addClass("glyphicon")
  .addClass("glyphicon-retweet")
  .appendTo($interactDiv);

  $("<span>")
  .addClass("glyphicon")
  .addClass("glyphicon-thumbs-up")
  .appendTo($interactDiv);

  $($footer)
  .appendTo($articleOfTweet);

  $('#posted-tweets').prepend($articleOfTweet); 
}

function renderTweets(data) {
  for (let tweet of data) {
    createTweetElement(tweet);
  }
}

$(document).ready(function() {
  $("#over-error-message").hide();
  $("#none-error-message").hide();
  $(".new-tweet").hide();

  let textarea = $("#main-textarea-input");
  
  $("form").on("submit", function (event) {
    event.preventDefault();

    const serializedData = $(this).serialize();
    const resetCounter = $(this).find(".counter");

    resetCounter.text(140);
    
    if (textarea.val().length === 0) {
      // alert("Invalid!");
      $("#none-error-message").slideDown("slow");
      $("#over-error-message").slideUp("slow");        

    } else if (textarea.val().length > 140) {
      // alert("Invalid!");
      $("#over-error-message").slideDown("slow");
      $("#none-error-message").slideUp("slow"); 
    } else {

      $("#over-error-message").hide();
      $("#none-error-message").hide();
      textarea.val("");
      

      const options = {
        url: "/tweets",
        method: "post",
        data: serializedData
      }

      request(options, createTweetElement); 
    }
  });
  

  function loadTweets() {
    $.ajax("/tweets", { method: 'GET' })
      .then(function (tweets) {
        console.log('Success: ', tweets);
        renderTweets(tweets);
      });
  };



  loadTweets();

  $("#compose-btn").click(function(){
    $(".new-tweet").slideToggle("slow");
    $("#main-textarea-input").focus();
  });

});






