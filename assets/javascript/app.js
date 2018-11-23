$(document).ready(function() {

    // Variables
    var city = ["New York", "Shanghai", "Beijing", "Tokyo", "London", "Paris", "Berlin"];


    // Function
    function displayGifButtons(){
        $("#gifButtonsView").empty(); 
        for (var i = 0; i < city.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("city");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name",city[i]);
            gifButton.text(city[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    // Function to add a new city button
        $("#addGif").on("click", function(event){
            event.preventDefault();

        var city = $("#city-input").val().trim();
        if (city == ""){
          return false;
        }
        city.push(city);
    
        displayGifButtons();

    });

    function displayGifs(){
        var city = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + city + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL); 
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {
            console.log(response); 
            $("#gifsView").empty(); 
            var results = response.data; 
            if (results === ""){
              alert("We couldn't find any Gifs! :(");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); 
                // gifDiv.addClass("gifDiv");

                // rating of gif
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.prepend(gifRating);
                // pulling gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 

                //image state
                gifImage.attr("data-state", "still"); 
                gifImage.addClass("image");
                gifDiv.prepend(gifImage);
                // pulling still image of gif
                // adding div of gifs to gifsView div
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    // Calling Functions & Methods
    displayGifButtons(); 


    // pausing Gifs
    $(document).on("click", ".city", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).data('state');
        if ( state === 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    
});