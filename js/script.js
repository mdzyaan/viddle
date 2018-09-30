// Search bar handler

$(document).ready(function(){
    var searchField = $("#query");
    var icon = $("#search-btn");

    //Focus Event   handler 
    $(searchField).on('focus', function(){
        $(this).animate({
            width: '100%'
        }, 400);
        $(icon).animate({
            right: '10px'
        }, 400);
    });
    //Blur Event   handler 
    $(searchField).on('blur', function(){
        if ($(searchField).val() == '') {
            $(searchField).animate({
                width: '100%'
            }, 400);
            $(icon).animate({
                right: '10px'
            }, 400);
        }
    }); 

    $("#search-form").submit(function(e){
        e.preventDefault();
    });
});


function search() {
    //clear results
    $("#results").html('');
    $("#buttons").html('');

    // Get form input 
    q = $("#query").val();
    //https://www.googleapis.com/youtube/v3/search?key={your_key_here}&channelId={channel_id_here}&part=snippet,id&order=date&maxResults=20

    // Run Get request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: "snippet",
            q: q,
            channelId: "UCbu2SsF-Or3Rsn3NxqODImw",
            type: "video",
            key : "AIzaSyBxOGCA4chXb0tq-bO8qsleU4J71MGEgjU",
            maxResults: 20},
           
            function(data){
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;

                console.log(data);

                $.each(data.items, function(i, item) {
                    var output = getOutput(item);

                    //Display results   
                    $("#results").append(output);
                } );

                var buttons = getButtons(prevPageToken , nextPageToken );
                // Display Button 
                $("#buttons").append(buttons);
            }
    );
}

function nextPage(    ) {

    var token = $("#next-button").data("token");
    var q = $("#next-button").data("query");
    //clear results
    $("#results").html('');
    $("#buttons").html('');

    // Get form input 
    q = $("#query").val();

    // Run Get request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: "snippet",
            q: q,
            pageToken: token,
            type: "video",
            key : "AIzaSyBxOGCA4chXb0tq-bO8qsleU4J71MGEgjU"},
           
            function(data){
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;

                console.log(data);

                $.each(data.items, function(i, item) {
                    var output = getOutput(item);

                    //Display results   
                    $("#results").append(output);
                } );

                var buttons = getButtons(prevPageToken , nextPageToken );
                // Display Button 
                $("#buttons").append(buttons);
            }
    );
}


function prevPage(    ) {

    var token = $("#prev-button").data("token");
    var q = $("#prev-button").data("query");
    //clear results
    $("#results").html('');
    $("#buttons").html('');

    // Get form input 
    q = $("#query").val();

    // Run Get request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: "snippet",
            q: q,
            pageToken: token,
            type: "video",
            key : "AIzaSyBxOGCA4chXb0tq-bO8qsleU4J71MGEgjU"},
           
            function(data){
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;

                console.log(data);

                $.each(data.items, function(i, item) {
                    var output = getOutput(item);

                    //Display results   
                    $("#results").append(output);
                } );

                var buttons = getButtons(prevPageToken , nextPageToken );
                // Display Button 
                $("#buttons").append(buttons);
            }
    );
}
// Build Output 

function getOutput(item) {
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;
    var output = `<li>
                    <div class="list-left">
                        <img src="${thumb}">
                    </div>
                    <div class="list-right">
                        <h3><a data-fancybox href="https://www.youtube.com/watch?v=${videoId}">${title}</a></h3>
                        <small>By <span class="cTitle">${channelTitle}</span>on ${videoDate}</small>
                        <p>${description}</p>
                    </div>
                </li>
                <div class="clearfix"></div>`;
    return output

}


//Build the Button

function getButtons(prevPageToken, nextPageToken) {
    if (!prevPageToken) {
        var btnOutput = '<div class="button-container">' +
        '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
        'onclick="nextPage();">Next Page</button></div>';
    }else {
        var btnOutput = '<div class="button-container">' +
        '<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"' +
        'onclick="prevPage();">Prev Page</button>' +
        '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
        'onclick="nextPage();">Next Page</button></div>';
    }

    return btnOutput;
}
















