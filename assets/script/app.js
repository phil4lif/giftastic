//make an array of starting buttons
var animalButtons = ["wolf", "elephant", "dog", "sloth", "jaguar", "african painted dog"]
var favoritesArr = [];
//document ready function
$(document).ready(function () {
    console.log("ready!");
    // console.log(localStorage)
    // $(".favoritesdiv").prepend(JSON.parse(localStorage.getItem("favorites")));
    // // console.log(localStorage.getItem("name"));
    // $(".favoritesdiv").prepend("Hello World");
    // $(".favoritesdiv").prepend(localStorage.getItem("name"));
    //http://api.giphy.com/v1/gifs?api_key=WVMqS6EHSAlJ5cuOAPbH2Gw4XKYJtLpz&ids=35HUEK51PR76evL4Hp,1fgKK9mUcG4E7faggJ
    //write a function to display the gifs
    function loadFavorites() {
        var localData = JSON.parse(localStorage.getItem("favorites"))
        if (localData.length > 0) {
            favoritesArr = localData;

            var favoriteString = ""
            for (var i = 0; i < favoritesArr.length; i++) {
                favoriteString = favoriteString + favoritesArr[i] + ","
            }
            var queryURL = "http://api.giphy.com/v1/gifs?api_key=WVMqS6EHSAlJ5cuOAPbH2Gw4XKYJtLpz&ids=" + favoriteString
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response)
                var results = response.data;
                console.log(results)
                for (var i = 0; i < results.length; i++) {
                    // var animalImage = $("<img>");
                    // animalImage.attr("src", results[i].images.fixed_height_still.url);
                    // //add a data-state=still to the images
                    // animalImage.attr("data-state", "still")
                    // animalImage.attr("data-id", results[i].id)

                    // //add another attribute that stores the animated link
                    // animalImage.attr("data-animate", results[i].images.fixed_height.url)
                    // //add another attribte that stores the still link
                    // animalImage.attr("data-still", results[i].images.fixed_height_still.url); 
                    // $(".favoritesdiv").prepend(animalImage);

                    

                    var favorite = $("<img>").attr("src", results[i].images.fixed_height_still.url);
                    favorite.attr("data-state", "still");
                    favorite.attr("data-animate", results[i].images.fixed_height.url);
                    favorite.attr("data-still", results[i].images.fixed_height_still.url);
                    favorite.attr("data-id", results[i].id);
                    favorite.addClass("animalimage");
                    console.log(favorite);
                    var favDiv = $("<div>");
                    favDiv.prepend(favorite);

                    //make a variable to go to local storage
                    // var favString = JSON.stringify(favorite);
                    // console.log(favString);
                    $(".favoritesdiv").prepend(favDiv);

                }
            })

        }
    }
    
    function displayGifs() {
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?&api_key=WVMqS6EHSAlJ5cuOAPbH2Gw4XKYJtLpz&q=" + animal + "&limit=10&offset=0&rating=g&lang=en";

        //ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            console.log(response.data);
            //writes a for loop that will create a div with an image for each of the results
            for (var i = 0; i < results.length; i++) {
                var favButton = $("<button>");
                favButton.addClass("favorite")
                favButton.attr("data-still", results[i].images.fixed_height_still.url)
                favButton.attr("data-animate", results[i].images.fixed_height.url)
                favButton.attr("data-id", results[i].id)
                favButton.text("Favorite")
                var gifDiv = $("<div>");
                gifDiv.addClass("pictureframe")
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                //add a data-state=still to the images
                animalImage.attr("data-state", "still")
                animalImage.attr("data-id", results[i].id)

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
        $("#input").val(" ")
        renderButtons();
    })

    $(document).on("click", ".animal", displayGifs);
    //Make the favorite button add the gif to a different favorite
    $(document).on("click", ".favorite", function () {
        var favorite = $("<img>").attr("src", $(this).attr("data-still"))
        favorite.attr("data-state", "still");
        favorite.attr("data-animate", $(this).attr("data-animate"));
        favorite.attr("data-still", $(this).attr("data-still"));
        favorite.attr("data-id", $(this).attr("data-id"));
        favorite.addClass("animalimage");
        // console.log(favorite);
        var favDiv = $("<div>");
        favDiv.prepend(favorite);
        console.log($(this).attr("data-id"))
        //make a variable to go to local storage
        // var favString = JSON.stringify(favorite);
        // console.log(favString);
        $(".favoritesdiv").prepend(favDiv);
        // favoritesArr.push()
        // console.log($(this).val())
        favoritesArr.push($(this).attr("data-id"))
        localStorage.setItem("favorites", JSON.stringify(favoritesArr));
        // console.log(JSON.stringify(favorite));
        // console.log(localStorage);

    });
    //call the renderbuttons func to scan the array and add the new animal
    renderButtons();
    loadFavorites();
});
