//fill list with products
fetchProducts = function () {
    $.ajax({
            method: 'GET',
            url: 'http://localhost:8080/products',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    ).done(function (data) {
        for (let i=0; i<data.length; i++){
            $('<option/>').val(data[i].id).text("ID: "+data[i].id+" - "+data[i].name).appendTo('#productDropdown')
        }
    });
}
fetchProducts();
$("#productDropdown").change(getProduct);
//get product from list and insert into form
function getProduct (e) {
    e.preventDefault();
    const id = $("#productDropdown").val();
    $.ajax({
            method: 'GET',
            url: 'http://localhost:8080/products/'+ id,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    ).done(function (data) {
        $('#id').val(data.id);
        $('#name').val(data.name);
        $('#price').val(data.price);
        $('#category').val(data.category);
        $('#description').html(data.description);
        $('#tagline').val(data.tagline);
        $('#picture').val(data.picture);

    });
}

// Update product on submit
$(document).ready('body').on( 'click', '.submit', function(e){
    e.preventDefault();
    const id = $("#productDropdown").val();
    let product = {
        "id": $("#id").val(),
        "name": $("#name").val(),
        "price": $("#price").val(),
        "category": $('#category').val(),
        "description": $("#description").val(),
        "tagline": $("#tagline").val(),
        "picture": $("#picture").val()
    };
    $.ajax ({
        method: "PUT",
        url: "http://localhost:8080/products/" + id,
        data: JSON.stringify(product),
        contentType: "application/json; charset=utf-8",
        xhrFields: {
            withCredentials: true,
        },
        success: function () {
            alert("Success! The Product was updated");
            //window.location.href= '../html/productManager.html';
        },
        error: function () {
            console.log("Error during Product Update")
        },
    });
});