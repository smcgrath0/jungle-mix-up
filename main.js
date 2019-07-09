$(document).ready(initializeApp);


var firstCardClicked = null;
var secondCardClicked = null;
var numberOfCards = 0;
var matches = null;
var attempts = 0;
var games_played = 0;
var accuracy = 0;
function initializeApp(){
  $(".card > div").addClass("lfzcard");
  $(".card").on("click", handleCardClick);
}

function handleCardClick(event, eventTarget){
  console.log(event);
  eventTarget = $(event.target);
  numberOfCards = numberOfCards + 1;

  if (eventTarget.hasClass("lfzcard")){
    eventTarget.removeClass("lfzcard");
  }else{
    eventTarget.addClass("lfzcard");
  }
  if (firstCardClicked === null){
    firstCardClicked = eventTarget;
    $(this).off("click");
  }else if (secondCardClicked === null && firstCardClicked != eventTarget){
    secondCardClicked = eventTarget;
    $(this).off("click");

  }
  if (secondCardClicked != null && firstCardClicked != null) {
    match(firstCardClicked, secondCardClicked);
  }

  calculateAccuracy();
  displayStats();
  resetStats();
}

function match(card1, card2){
  if (firstCardClicked.css("background-image") === secondCardClicked.css("background-image")) {
    console.log("cards match");
    ++matches;
  }else {
    var time2 = setTimeout(canClick, 1000, card1, card2);
  }
  firstCardClicked = secondCardClicked = null;
  numberOfCards = 0;
  ++attempts;
}

function canClick(card1, card2){
  $(card1).addClass("lfzcard");
  $(card2).addClass("lfzcard");
  card1.on("click", handleCardClick);
  card2.on("click", handleCardClick);
  $("main").css("pointer-events", "auto");
}

function calculateAccuracy(){
  accuracy = matches/attempts*100;
}

function resetStats(){
  if (matches == 8) {
    ++games_played;
    matches = attempts = 0;
    displayStats();
    $(".endGameScreen").css("display", "block");
    $("#playAgain").on("click", resetGameBoard);
  }
}

function resetGameBoard(){
  $(".endGameScreen").css("display", "none");
  $(".card > div").addClass("lfzcard");
  $(".card").on("click", handleCardClick);
}

function displayStats(){
  $("aside > div:nth-child(3)").text(games_played);
  $("aside > div:nth-child(5)").text(attempts);
  $("aside > div:nth-child(7)").text(accuracy.toFixed(2) + "%");
}
