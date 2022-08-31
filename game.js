var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;
var buttonColours = ["red", "blue", "green", "yellow"];



function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
}
$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  var currentLevel = userClickedPattern.length - 1;
  checkAnswer(currentLevel);
});

function playSound(name) {
  var colourAudio = new Audio("sounds/" + name + ".mp3");
  colourAudio.play();
}

function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){$("."+currentColour).removeClass("pressed")},100);
}
// keyboard key detection

$(".startButton").click(function(){
  if(!gameStarted){
    $("#level-title").text("Level "+level);
    nextSequence();
    gameStarted = true;
  }
});

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },2000 );
    startOver();
  }
}

function startOver(){
  gamePattern = [];
  level = 0;
  gameStarted = false;
}
