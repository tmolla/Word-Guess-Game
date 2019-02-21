
//Define class to represent Animals
class Animal {
  constructor(type, soundsLike, looksLike, hint){
    this.type = type;
    this.soundsLike = soundsLike;
    this.looksLike = looksLike;
    this.hint = hint;
  };

  showYourself() {
    return(this.looksLike);
  };

  whatIsYourType() {
    return((this.type).toUpperCase());
  };

  WhatDoYouSoundLike(){
    return(this.soundsLike);
  };
  giveMeHint(){
    return(this.hint);
  }
};

//Create global Varialbes
var Animals = [];
var selectedAnimalName = ""
var winCounter = 0;
var lossCounter = 0;
var attemptCounter = 9;
var letterFound = false;
var selectedIndex = ""
var gameOver = true


//Function to reset game after each win or loss to restart the game. 
function InitializeGame(flag){
  //Display the button to play again
  $("#buttons").empty();
  $("#letter-guessed").empty();
  var cmdBtn = $("<button>");
  cmdBtn.addClass("cmd-button");
  cmdBtn.attr("style","background:lightblue");
  cmdBtn.attr("id","cmd");
  
  if (flag == "Replay"){
    cmdBtn.text("Click to Play Again");
  }
  else{ //game is starting first time

    //Create animals
    Animal[0] = new Animal("HUMAN", "assets/audio/Human.mp3", "assets/images/human.jpeg", "You may be one!");
    Animal[1] = new Animal( "Rooster","assets/audio/Rooster.mp3","assets/images/Rooster.jpeg","Early bird");
    Animal[2] = new Animal( "Duck","assets/audio/Duck.mp3","assets/images/Duck.jpeg","I am a bird and love water");
    Animal[3] = new Animal( "Lion","assets/audio/Lion.mp3","assets/images/Lion.jpeg","I am a king");
    Animal[4] = new Animal( "Dog","assets/audio/Dog.mp3","assets/images/Dog.png","I could be your best friend");
    Animal[5] = new Animal( "Pig","assets/audio/Human2.mp3","assets/images/pig.png","Breakfast will not be the same without me");
    Animal[6] = new Animal( "Cow","assets/audio/Cow.mp3","assets/images/Cow.png","I love grass");
    Animal[7] = new Animal( "Turkey","assets/audio/Turkey.mp3","assets/images/Turkey.jpeg","I am a bird named after a country");
    Animal[8] = new Animal( "Raccoon","assets/audio/Raccoon.mp3","assets/images/Raccoon.jpeg", "I look like a bandit");
    Animal[9] = new Animal( "Monkey","assets/audio/Monkey.mp3","assets/images/Monkey.jpeg","I could be your ancesstor");
    Animal[10] = new Animal( "Elk","assets/audio/Elk.mp3","assets/images/Elk.jpeg","I have massive horn that look like tree branches");
    Animal[11] = new Animal( "Frog","assets/audio/Frog.mp3","assets/images/Frog.jpeg","I live in a water or land and hop everywhere");

    //set counters to initial state
    $("#attempt").text("Guess Remaining: " + attemptCounter.toString())
    $("#loss").text("Loss: " + lossCounter.toString())
    $("#win").text("Win: " + winCounter.toString())
    cmdBtn.text("Click to Start Game");
  }
  
  //add the play button 
  $("#buttons").append(cmdBtn);
  $("cmd-button").focus();
  gameOver = true;
}
    
$(document).on("click", ".cmd-button", function() {
  $("#buttons").empty();
  selectedIndex = Math.floor(Math.random() * 12);
  selectedAnimalName = Animal[selectedIndex].type.toUpperCase();
  for (var i = 0; i < selectedAnimalName.length; i++) {
    var letterBtn = $("<p>");
    letterBtn.addClass("letter-button letter letter-button-color");
    letterBtn.attr("data-letter", selectedAnimalName[i]);
    letterBtn.attr("data-found", false);
    letterBtn.text("_");
    $("#buttons").prepend(letterBtn);
  }
  $(".text-muted").text("Hint: " + Animal[selectedIndex].giveMeHint())
  gameOver = false;
});

$(document).ready(function() {
  
  InitializeGame("Start")

  $(document).on("keyup", function(event) {
    if (!gameOver){
      // Captures the key press, converts it to lowercase, and saves it to a variable.
      letterFound = false;
      $('#buttons').children().each(function() {
        if (event.key.toUpperCase() == ($(this).attr('data-letter'))) {
          $(this).text($(this).attr('data-letter'))
          $(this).attr("data-found", true);
          letterFound = true
        }
        else{
        }
      });  
      if (!letterFound){
        if (!($("#letter-guessed").text().indexOf(event.key.toUpperCase()) > -1)){
          var Attempted_letters = $("#letter-guessed").text().concat(" ");
          Attempted_letters = Attempted_letters.concat(event.key.toUpperCase());
          $("#letter-guessed").text(Attempted_letters)
        }

        attemptCounter -= 1;
        if (attemptCounter <= 0){
          lossCounter += 1 ;
          attemptCounter = 3;
          $("#loss").text("Loss: " + lossCounter.toString())
          gameOver = true;
          InitializeGame("Replay")
        }
        $("#attempt").text("Guess Remaining: " + attemptCounter.toString())
      };
      // check to see if game is over
      success = true;
      $('#buttons').children().each(function() {
        if ($(this).attr('data-found')!= "true") {
          success = false;
          return(success); // if jquery gets false it breaks out of the loop
        }
      });
      
      if (success){  // check if successful - all letters are guessed correctly
        //display new statsstats
        winCounter +=1; 
        attemptCounter = 3;
        $("#win").text("Win: " + winCounter.toString())
        $("#attempt").text("Guess Remaining: " + attemptCounter.toString())

        //Display animal image
        $("img").attr("src", Animal[selectedIndex].showYourself());

        //$(".mp3").removeAttr("src");
        $(".mp3").attr("src", Animal[selectedIndex].WhatDoYouSoundLike());
        $(".mp3")[0].play()
        $("#buttons").empty();
        InitializeGame("Replay")
        gameOver = true;
      }
    }
  });
});