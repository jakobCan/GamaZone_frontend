//get id from last webpage
//var url = (window.location).href;
//var id = url.substring(url.lastIndexOf('='));

// Product to be changed
$.ajax ({
    method: "GET",
    url: 'http://localhost:8080/products/' + id,
    dataType: 'json'
}).done(function(data) {
    document.getElementById('id').value = data.id
    document.getElementById('name').value = data.name;
    document.getElementById('price').value = data.price;
    document.getElementById('category').value = data.category;
    document.getElementById('description').value = data.description;
    document.getElementById('tagline').value = data.tagline;
    document.getElementById('picture').value = data.picture;
});


// Update product
$(document).ready('.editButton').click(function(e){
    e.preventDefault();

    $.ajax ({
        method: "PUT",
        url: "http://localhost:8080/products/" + id,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        xhrFields: {
            withCredentials: true,
        },
        success: function () {
            window.location.href= '../frontendWebshop/productOverview.html';
            alert("The Product was updated");
        },
        error: function () {
            console.log("Error on Product Update")
        },
    });
});