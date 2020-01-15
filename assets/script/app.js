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
    //invoke the renderButtons function to display the beginning array of buttons
    renderButtons()



    //write a click function for the animal buttons
$("button").on("click", function(){
    var animal = $(this).attr("data-name");
    // console.log($(this).attr("data-name"))
    console.log(animal)


    
    //
    //make a query variable
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?&api_key=WVMqS6EHSAlJ5cuOAPbH2Gw4XKYJtLpz&q="+animal+"&limit=10&offset=0&rating=G&lang=en";

    //ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response){
        console.log(response)
        var results = response.data;

        for(var i = 0; i <results.length; i++){
            var gifDiv = $("<div>");
            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height.url);
            gifDiv.prepend(animalImage);

            $("#gifdisplay").prepend(gifDiv);

        }
    })

});




















});