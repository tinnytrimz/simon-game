var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;


$("#start-button").click(function() {
  if (!started) {

    $("#level-title").text("Level" + level);
    $("#start-button").text("Start");
    nextSequence();
    started = true;
  }
});

// Getting hold of all class btn then when a user clicks on a particular button, it'll give back the button id and adds it to the userclicked array
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


// The nextSequence function when called sets the userClickedPattern to an empty array, then increases the level by 1, chnages the h1 to the level, creates a random number between 0-3, use the random number to generate an item from the buttonColours and adds it to the gamePattern and plays the corresponding sound
function nextSequence() {

  userClickedPattern = [];
  level++
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

// Function to use button id to play its coreesponding sound in the sounds folder
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Set a Timeout to remove the class "pressed" after 100 milliseconds
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
   }, 100);
}


// Creating a functionto check the simon game narative
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }

  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Click to Restart!!!");
    $("#start-button").text("Restart");
    startOver();
  }
}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
