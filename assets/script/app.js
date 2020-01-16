//make an array of starting buttons
var animalButtons = ["wolf", "elephant", "dog", "sloth", "jaguar", "african painted dog"]

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
            //writes a for loop that will create a div with an image for each of the results
            for (var i = 0; i < results.length; i++) {
                var favButton= $("<button>");
                favButton.addClass("favorite")
                favButton.attr("data-still", results[i].images.fixed_height_still.url)
                favButton.attr("data-animate", results[i].images.fixed_height.url)
                favButton.text("Favorite")
                var gifDiv = $("<div>");
                gifDiv.addClass("pictureframe")
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                //add a data-state=still to the images
                animalImage.attr("data-state", "still")
                //add another attribute that stores the animated link
                animalImage.attr("data-animate", results[i].images.fixed_height.url)
                //add another attribte that stores the still link
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                //add a class to the animal Image
                animalImage.addClass("animalimage")
                //Add both p and animalImage to the gifDiv
                gifDiv.prepend(favButton);
                gifDiv.prepend(p);
                gifDiv.prepend(animalImage);
                //prepend the gifDiv to the gifdisplay element
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
    $(document).on("click", ".animalimage", function () {
        console.log("click")
        //create a variable to store the data-state for comparison  
        var state = $(this).attr("data-state")
        //write the if
        if (state == "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
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
    //Make the favorite button add the gif to a different favorite
    $(document).on("click", ".favorite",function(){
        var favorite = $("<img>").attr("src", $(this).attr("data-still"))
        favorite.attr("data-state", "still");
        favorite.attr("data-animate", $(this).attr("data-animate"));
        favorite.attr("data-still", $(this).attr("data-still"));
        favorite.addClass("animalimage");
        console.log(favorite);
        var favDiv = $("<div>");
        favDiv.prepend(favorite);
        $(".favoritesdiv").prepend(favDiv);

    });
    //call the renderbuttons func to scan the array and add the new animal
    renderButtons();
});