//make an array of starting buttons
var animalButtons = ["wolf", "elephant", "dog", "sloth", "jaguar",]



//document ready function
$( document ).ready(function() {
    console.log( "ready!" );

    //write a fumction to make new buttons for the animal inputs
    function renderButtons() {
        $("#buttons-view").empty();

        // Looping through the array of animals
        for (var i = 0; i < animalButtons.length; i++) {
          var a = $("<button>");
          // Adding a class of animal to our button
          a.addClass("animal");
          // Adding a data-attribute
          a.attr("data-name", animalButtons[i]);
          // Providing the initial button text
          a.text(animalButtons[i]);
          // Adding the button to the buttons-view div
          $("#animalbuttons").append(a);
        }
      }
      renderButtons()




    //write a click function for the animal buttons



    //ajax call
    //store my API key in a variable
    //make a query variable
    























});