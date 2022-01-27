$.ajax ({
    method: "GET",
    url: 'http://localhost:8080/products/{productId}',//
    dataType: 'json',
    success: function () {

    }
});

$('#updateProduct').click(function(e){
    e.preventDefault();

    const name = $('#name').val();
    const price = $('#price').val();
    const category = ('#category').val();
    const description = $('#description').val();
    const tagline = $('#tagline').val();
    const picture = $('#photoURL').val();


    $.ajax ({
        method: "PUT",
        url: "http://localhost:8080/admin/products/{productId}",
        data: JSON.stringify({
            name: name,
            price: parseInt(price),
            category: category,
            description: description,
            tagline: tagline,
            picture: picture
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",

        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            sessionStorage.setItem('type', data.type);
            window.location.href= '../Webshop/productOverview.html';
            alert("The Product was updated");
        },
        error: function (data) {
            console.log("Error Product Update")
        },
    });
});
