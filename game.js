var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var highScore = 0;
var newScore = 0;

$(document).keydown(function(){
  if(!started){
    $("#level-title").html("Level "+level);
    $(".restart-button").html("Restart Game");
    nextSequence();
    started = true;
  }
});

$(".restart-button").click(function(){
  if(!started){
    $("#level-title").html("Level "+level);
    $(".restart-button").html("Restart Game");
    $(".restart-button").fadeOut(50).fadeIn(50);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(event){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});

$(".topnav .info-button").hover(function(){
  $(this).addClass("hover");
  $(".info-info").slideDown();
  }, function(){
  $(this).removeClass("hover");
  $(".info-info").slideUp();
  }
  );

$(".topnav .info-button").click(function(){
  $(".info-info").slideToggle();
})


function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").html("Level "+level);
  var randomNumber = Math.floor((Math.random()*4));

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $('#'+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/"+randomChosenColour+".mp3");
  playSound(randomChosenColour);

}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence()
      }, 1000);
      newScore++;
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Game Over, Press Any Key/below button to Restart");
    startOver();

  }
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
   $("#"+currentColour).removeClass("pressed");}, 100);
  }

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
  if (newScore>highScore){
    highScore = newScore;
  }
  else{
    highScore = highScore;
  }
  $(".bottomnav .high-score").html("High Score = "+ highScore);
  newScore = 0;
}
