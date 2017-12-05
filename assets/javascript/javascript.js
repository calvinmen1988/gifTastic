//intial topics of gifs.
var topics = ["dogs", "cats", "parrot", "iguana", "elephant", "horse", "goat"];


//function for displaying buttons and adding new buttons
function renderButtons() {
    $("#buttonPanel").empty();
        for (var i = 0; i < topics.length; i++) {
                var button = $("<button>"); // goes through buttons and checks if it exists
                    button.addClass("topicsButton");
                    button.attr("data-topics", topics[i]);
                    button.text(topics[i]);
                
                $("#buttonPanel").append(button); // add buttons if none are present
    }
}

//on click event for the user form to add more buttons based on topics
    $("add-topics").on("click", function (event) {
        event.preventDefault();
            var input = $("#topics-input").val().trim(); //takes input
                topics.push(topics); //pushes to topics array
    $("#topics-input").val("");

    renderButtons(); //displays buttons

});


// Get the topic name from the button clicked
function fetchTopicsGifs() {
    var topicsName = $(this).attr("data-topics");
    var topicsStr = topicsName.split(" ").join("+")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicsStr +
        "&rating=pg-13&limit=10&api_key="; //need key

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    //check gifPanel for content. If none, it will populate.
    
        .done(function ( results ) {
            var dataArray = results.data;
            $("#gifPanel").empty();
            for (var i = 0; i < dataArray.length; i++) {
                var newDiv = $("<div>");
                    newDiv.addClass("topicsGif");

                    var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
                        newDiv.append(newRating);

                    var newImg = $("<img>");
                        newImg.attr("src", dataArray[i].images.fixed_height_still.url);
                        newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
                        newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
                        newImg.attr("data-state", "still");
                        newDiv.append(newImg);

            $("#gifPanel").append(newDiv); //append new gifs to gifPanel

            }
            console.log(respond);
        });
}


// functionality for animated gifs. Pause and go
function animateTopicsGif() {
    var state = $(this).find("img").attr("data-state");

        if (state === "still") {
            $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
            $(this).find("img").attr("data-state", "animate");
        } else {
            $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
            $(this).find("img").attr("data-state", "still");
        }
    }

    
// Render the original buttons when the HTML has finished loading
$(document).ready(function() {
    renderButtons();
  });

