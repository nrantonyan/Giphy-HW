$(document).ready(function () {

    var topics = [
        "Dave Chappelle",
        "Bill Burr",
        "Joe Rogan",
        "Joey Diaz",
        "Bert Kreishcer",
        "Tom Segura",
        "Chris Rock",
        "Jerry Seinfield",
        "Hannibal Buress",
        "Eric Andre",
    ]



    for (let i = 0; i < topics.length; i++) {
        var butt = $('<button>')
        butt.addClass("action");
        butt.attr("value", topics[i]);
        butt.text(topics[i]);
        $("#btns").append(butt);
    }
    
    function addButton() {
        $('#subAdd').on('click', function () {
            var add = $('#userAdd').val().trim();
            var butt = $('<button>')
            butt.attr('value', add);
            butt.text(add);
            $("#btns").append(butt);
            if (add == "") {
                return false;
            }
            $('#userAdd').val('');
            topics.push(add);
            display();
        });
    }

    function display() {
        var jif = $(this).attr('value');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + jif + "&api_key=5RBI0Pmf26bAURlFIdbf3OOYRt6LCarn&limit=10";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .done(function (response) {
                console.log(response); 
                $("#gifsView").empty();
                var results = response.data; 
                if (results == "") {
                    alert("There isn't a gif for this selected button");
                }
                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>"); 
                    gifDiv.addClass("gifDiv");
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    gifDiv.append(gifRating);
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url); 
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url); 
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);
          
                    $("#gifsView").prepend(gifDiv);
                }
            });
    }

    display();
    addButton();

    $(document).on("click",".action", display);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});
