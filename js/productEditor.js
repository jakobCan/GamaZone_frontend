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

    });
}

// Update product on submit
$(document).ready('body').on( 'click', '.submit', function(e){
    e.preventDefault();

    let picture = $('#singleFileUploadInput').get(0).files[0];
    if (typeof picture !== 'undefined'){

        let nameInput = $('#name').val();
        let fileType = picture.name
            .split(".")
            .pop();
        let fileName = nameInput
            .concat('.', fileType);
        let formData = new FormData();
        formData.append('file', picture, fileName);

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/uploadFile",
            xhrFields: {
                withCredentials: true
            },
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                //console.log(response);
                saveDownloadUri(response.fileDownloadUri);
            },
            error: function (error) {
                console.log(error);
            }
        });
    } else {
        let product = {
            "name": $("#name").val(),
            "price": $("#price").val(),
            "category": $('#category').val(),
            "description": $("#description").val(),
            "tagline": $("#tagline").val(),
            "picture": null
        };

        const id = $("#productDropdown").val();

        $.ajax ({
            method: "PUT",
            url: "http://localhost:8080/products/" + id,
            data: JSON.stringify(product),
            contentType: "application/json; charset=utf-8",
            xhrFields: {
                withCredentials: true,
            },
            success: function (data) {
                alert("Success! The Product was updated");
                //console.log(data)
                //window.location.href= '../html/productManager.html';
            },
            error: function () {
                console.log("Error during Product Update, please fill in all fields")
            },
        });
    }
});

function saveDownloadUri(downloadPath){

    let product = {
        "name": $("#name").val(),
        "price": $("#price").val(),
        "category": $('#category').val(),
        "description": $("#description").val(),
        "tagline": $("#tagline").val(),
        "picture": downloadPath
    };

    const id = $("#productDropdown").val();

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
}