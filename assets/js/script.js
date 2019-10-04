$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var numberOfCards = 0;
var matches = null;
var attempts = 0;
var games_played = 0;
var accuracy = 0;
var animalsArray = ["tiger", "elephant", "panda", "parrot", "monkey", "kangaroo", "panther", "frog", "tiger", "elephant", "panda", "parrot", "monkey", "kangaroo", "panther", "frog"];

function initializeApp() {
  $(".card > div").addClass("jungleCard");
  $(".startGameScreen").css("display", "block");
  $("#playButton").on("click", () => {
    $(".startGameScreen").css("display", "none");
  })
  animalsArray = shuffle(animalsArray);

  for (var i = 0; i < animalsArray.length; i++) {
    $(".container > .card:nth-child(" + (i + 1) + ") > div").addClass(animalsArray[i])
  }

  $(".card").on("click", handleCardClick);
  $(".playAgain").on("click", resetGameBoard);
}

function shuffle(array) {
  var currentIndex = array.length;
  var tempValue, randomIndex;

  while (1 <= currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    --currentIndex;
    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }
  return array;
}

function handleCardClick(event, eventTarget) {
  console.log(event);
  eventTarget = $(event.target);
  numberOfCards = numberOfCards + 1;
  if (eventTarget.hasClass("jungleCard")) {
    eventTarget.removeClass("jungleCard");
    eventTarget.css("transform","scale(1.05)");
  } else {
    eventTarget.addClass("jungleCard");
  }
  if (firstCardClicked === null) {
    firstCardClicked = eventTarget;
    $(this).off("click");
  } else if (secondCardClicked === null && firstCardClicked != eventTarget) {
    secondCardClicked = eventTarget;
    $(this).off("click");
  }
  if (secondCardClicked != null && firstCardClicked != null) {
    match(firstCardClicked, secondCardClicked);
  }

  calculateAccuracy();
  displayStats();

  if (matches == 8) {
    resetStats();
    $(".endGameScreen").css("display", "flex");
  }
}

function match(card1, card2) {

  if (card1.hasClass(card2.attr('class'))) {
    ++matches;
  } else {
    var time2 = setTimeout(canClick, 1000, card1, card2);
  }
  firstCardClicked = secondCardClicked = null;
  numberOfCards = 0;
  ++attempts;
}

function canClick(card1, card2) {
  $(card1).css("transform","scale(1)");
  $(card2).css("transform","scale(1)");
  $(card1).hover(()=> {
    $(card1).css({"transform":"scale(1.05)", "transition-duration":"1s"})
  }, ()=> {
    $(card1).css({"transform":"scale(1)", "transition-duration":"1s"})
  })
  $(card2).hover(()=> {
    $(card2).css({"transform":"scale(1.05)", "transition-duration":"1s"})
  }, ()=> {
    $(card2).css({"transform":"scale(1)", "transition-duration":"1s"})
  })
  $(card1).addClass("jungleCard");
  $(card2).addClass("jungleCard");
  card1.on("click", handleCardClick);
  card2.on("click", handleCardClick);
  $("main").css("pointer-events", "auto");
}

function calculateAccuracy() {
  accuracy = matches / attempts * 100;
}

function resetStats() {
  ++games_played;
  displayStats();
  matches = attempts = 0;
}

function resetGameBoard() {
  console.log(animalsArray);
  resetStats();
  $(".endGameScreen").css("display", "none");
  $(".card > div").removeClass();
  $(".card > div").addClass("jungleCard back");

  animalsArray = shuffle(animalsArray);
  for (var i = 0; i < animalsArray.length; i++) {
    if ($(".card:nth-child(" + (i + 1) + ")").attr("onClick") != undefined) {
      $(".card:nth-child(" + (i + 1) + ")").on("click", handleCardClick);
    }
    $(".container > .card:nth-child(" + (i + 1) + ") > div").addClass(animalsArray[i])
  }
}

function displayStats() {
  $("aside > div:nth-child(3)").text(games_played);
  $("aside > div:nth-child(5)").text(attempts);
  $("aside > div:nth-child(7)").text(accuracy.toFixed(2) + "%");
}
