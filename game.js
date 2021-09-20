var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

function nextSequence()
{
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  ++level;
  $("#level-title").text("Level "+level);
}

function playSound(name)
{
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour)
{
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){
    $("."+currentColour).removeClass("pressed");
  },100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
}

function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    if(currentLevel+1===level)
    {
      setTimeout(nextSequence,1000);
      userClickedPattern = [];
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

$(".btn").click(function(){
  var userChoosenColour = this.id;
  userClickedPattern.push(userChoosenColour);
  animatePress(userChoosenColour);
  playSound(userChoosenColour);
  checkAnswer(userClickedPattern.length-1);
  //console.log(userClickedPattern);
});

$(document).keypress(function(e){
  if(gameStarted===false)
  {
    nextSequence();
    gameStarted = true;
  }
});
