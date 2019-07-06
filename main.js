$(document).ready(initializeApp);

function initializeApp(){
  $(".card > div").addClass("lfzcard");
  $(".card").on("click", handleCardClick)
}

function handleCardClick(event){
  console.log(event);
  if ($(event.target).hasClass("lfzcard")){
    $(event.target).removeClass("lfzcard");
  }else{
    $(event.target).addClass("lfzcard");
  }
}
