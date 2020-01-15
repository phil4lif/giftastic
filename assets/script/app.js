//make an array of starting buttons
var animalButtons = ["wolf", "elephant", "dog", "sloth", "jaguar",]

//document ready function
$(document).ready(function () {
    console.log("ready!");
    //write a function to display the gifs
    function displayGifs() {
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?&api_key=WVMqS6EHSAlJ5cuOAPbH2Gw4XKYJtLpz&q=" + animal + "&limit=10&offset=0&rating=G&lang=en";

        //ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            console.log(response.data);
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                //add a data-still=still to the images
                animalImage.attr("data-state","still")
                animalImage.attr("data-animate", results[i].images.fixed_height.url)
                //add a class to the animal Image
                animalImage.addClass("animalimage")
                gifDiv.prepend(p);
                gifDiv.prepend(animalImage);

                $("#gifdisplay").prepend(gifDiv);

            }
        })

    };
    //write a fumction to create buttons named for each item in the animalButtons array
    function renderButtons() {
        $("#animalbuttons").empty();
        // Looping through the array of animals
        for (var i = 0; i < animalButtons.length; i++) {
            var a = $("<button>");
            // Adding a class of animal to our button
            a.addClass("animal");
            // Adding a data-attribute
            a.attr("data-name", animalButtons[i]);
            // Providing the  button text
            a.text(animalButtons[i]);
            // Adding the button to the buttons-view div
            $("#animalbuttons").append(a);
        }
    }
    //create a function for clicking on the images that will start the gif if it is still, and stops the gif if it is not still
    $(document).on("click",".animalimage", function(){
        console.log("click")
        //create a variable to store the data-state for comparison  
        var state = $(this).attr("data-state")
        //write the if
        if (state == "still"){
            $(this).attr("src", $(this).attr("data-animate") );
            $(this).attr("data-state", "animate");
        }





    })
    //write a function to take the value of the input and add it to the page
    //on click for the input button
    $("#submit").on("click", function (event) {
        event.preventDefault();
        //grab the inut from the textbox and store it in a new variable
        var newAnimal = $("#input").val().trim();
        //add the new animal inpput to the animalButtons array
        animalButtons.push(newAnimal);
        console.log(animalButtons);
        renderButtons();
    })

    $(document).on("click", ".animal", displayGifs);
    //call the renderbuttons func to scan the array and add the new animal
    renderButtons();
});