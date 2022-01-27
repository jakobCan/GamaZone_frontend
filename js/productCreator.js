$(function() {
    $('#product').submit(function(e) {
        e.preventDefault();
        let product = {
            "name": $("#name").val(),
            "price": $("#price").val(),
            "category": $('#category').val(),
            "description": $("#description").val(),
            "tagline": $("#tagline").val(),
            "picture": $("#photoURL").val()
        };
        console.log(product)
        $.ajax({
            type: "POST",
            url: 'http://localhost:8080/products/create',
            contentType: "application/json",
            data: JSON.stringify(product),
            success: function (data) {
                alert("Congrats! " + product.name + "  was added to your database");
                window.location.href= '../html/productCreator.html';
            },
            error: function (data) {
                console.log("Error")
                alert('Something went wrong?... Try again!');
                window.location.href= '../html/productCreator.html';
            },

        })
    })
})