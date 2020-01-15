//make an array of starting buttons
var animalButtons = ["wolf", "elephant", "dog", "sloth", "jaguar",]



//document ready function
$(document).ready(function () {
    console.log("ready!");

    //write a fumction to create buttons named for each item in the animalButtons array
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
    //invoke the renderButtons function to display the 
    renderButtons()



    //write a click function for the animal buttons



    
    //
    //make a query variable, store my API key in a variable
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=WVMqS6EHSAlJ5cuOAPbH2Gw4XKYJtLpz&q=sloth&limit=10&offset=0&rating=G&lang=en";

    //ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response){
        console.log(response)
    })






















});