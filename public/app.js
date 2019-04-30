//Scrape
$('#scrape-btn').on('click', function () {
    $.ajax({
        method: 'GET',
        url: '/scrape',
    }).then(function(data) {
        alert("Scrape Complete!");
        window.location = '/';
        console.log( "ready!" );
    })
});


// save article
$('#save').on('click', function () {
    var thisID = $(this).attr('data-id');
    $.ajax({
        method: "POST",
        url: '/save' + thisID
    }).done(function(data) {
        window.location = '/'
        console.log('saved')
    })
});

// delete article
$(".delete").on("click", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/delete/" + thisId
    }).done(function(data) {
        window.location = "/saved"
    })
});

//Show new articles
$('#show-articles-btn').on('click', function () {
    $.ajax({
        method: 'GET',
        url: '/articles',
    }).then(function(data) {
        console.log(data)
        // for each 
        for (var i = 0; i < data.length; i++){

            $('#articles').append(`<p>${data[i].title}</p>`)
            $('#articles').append(`<p>${data[i].summary}</p>`)
            $('#articles').append(`<p>${data[i].link}</p>`)
            $('#articles').append(`<button>Save</button>`).attr('id = save')
            $('#articles').append(`<br></br>`)
            console.log( "ready!" );

            console.log(data)
            console.log(data[i].title)
            console.log(data[i].summary)
        }
        
    })
    
    console.log( "ready!" );
});

$(document).on('click','p', function () {
    $('notes').empty();
    var thisID = $(this).attr('data-id');

    $.ajax({
        method: 'GET',
        url: '/articles/' + thisID
    })
    // add note information
    .then(function(data) {
        console.log(data)

        if (data.note) {
            console.log(data.note.title);
        }
    });
});

