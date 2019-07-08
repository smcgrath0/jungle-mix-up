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
  eventTarget = event.target;
  numberOfCards = numberOfCards + 1;
  debugger;

  if ($(eventTarget).hasClass("lfzcard")){
    $(eventTarget).removeClass("lfzcard");
  }else{
    $(eventTarget).addClass("lfzcard");
  }
  if (firstCardClicked === null){
    firstCardClicked = $(eventTarget);
  }else{
    secondCardClicked = $(eventTarget);
  }
  if (numberOfCards == 2) {
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
  } else {
    debugger;
    var time = setTimeout(cantClick, 2000);
    clearTimeout(time);
    var time2 = setTimeout(canClick, 1000, card1, card2);
  }
  firstCardClicked = secondCardClicked = null;
  numberOfCards = 0;
  ++attempts;
}

function cantClick(){
  $("main").css("pointer-events","none");
}

function canClick(card1, card2){
  $("main").css("pointer-events", "auto");
  $(card1).addClass("lfzcard");
  $(card2).addClass("lfzcard");
}

function calculateAccuracy(){
  //adds a game_played when get all matches or resets game

  // games_played = ;
  accuracy = matches/attempts;
}

function resetStats(){
  if (matches == 8) {
    ++games_played;
    matches = attempts = 0;
    displayStats();
    $(".card > div").addClass("lfzcard");
  }

}
function displayStats(){
  $("aside > div:nth-child(3)").text(games_played);
  $("aside > div:nth-child(5)").text(attempts);
  $("aside > div:nth-child(7)").text(accuracy.toFixed(3) + "%");
}
