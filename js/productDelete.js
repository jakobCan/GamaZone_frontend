/*$.ajax ({
    method: "GET",
    url: 'http://localhost:8080/products/{Id}',//
    dataType: 'json',
    success: function () {

    }
});*/
/*function deleteProductById(id) {

    // Getting value from the first cell -> the product ID
    var currentRow = $(this).closest("tr");
    var id = currentRow.find("td:eq(0)").text(); // get current row 1st TD value

    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/admin/"+parseInt(id),
        dataType: "json",
        statusCode: {
            200: function() {
                console.log("product deleted")
                location.reload()
            },
            500: function () {console.log("product not deleted")
            }
        }
    })
}*/

/*$('#updateProduct').click(function(e){
    e.preventDefault();

    const name = $('#name').val();
    const price = $('#price').val();
    const category = ('#category').val();
    const description = $('#description').val();
    const tagline = $('#tagline').val();
    const picture = $('#photoURL').val();


    $.ajax ({
        method: "DELETE",
        url: "http://localhost:8080/admin/"+id,
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
            window.location.href= '../html/productManager.html';
            alert("The Product was updated");
        },
        error: function (data) {
            console.log("Error Product Update")
        },
    });
});*/
