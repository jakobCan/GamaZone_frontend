$(function() {
    $('#product').submit(function(e) {
        e.preventDefault();
        // generate correct file name for picture to be uploaded
        // get file from input
        let picture = $('#singleFileUploadInput').get(0).files[0];
        // get name for SpaceObject from input
        let nameInput = $('#name').val();
        // split file type extension from file name
        let fileType = picture.name
            .split(".")
            .pop();
        // combine name from input with file extension
        let fileName = nameInput
            .concat('.', fileType);
        // append file with correct file name and extension
        let formData = new FormData();
        formData.append('file', picture, fileName);
        // send uploaded picture to backend
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
                console.log(response);
                saveDownloadUri(response.fileDownloadUri);
            },
            error: function (error) {
                console.log(error);
            }
        });
    })
})

function saveDownloadUri(downloadPath){

    let product = {
        "name": $("#name").val(),
        "price": $("#price").val(),
        "category": $('#category').val(),
        "description": $("#description").val(),
        "tagline": $("#tagline").val(),
        "picture": downloadPath
    };
    console.log(product)

    $.ajax({
        type: "POST",
        url: 'http://localhost:8080/products/create',
        xhrFields: {
            withCredentials: true
        },
        contentType: "application/json",
        data: JSON.stringify(product),
        success: function (data) {
            console.log(data);
            alert("Congrats! " + product.name + "  was added to your database");
            window.location.href= '../html/productCreator.html';
        },
        error: function (data) {
            console.log("Error")
            alert('Something went wrong?... Try again!');
            window.location.href= '../html/productCreator.html';
        },
    })
}
