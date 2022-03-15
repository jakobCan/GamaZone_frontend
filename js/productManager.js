

$(document).ready(function () {
    var table = $('#dataTable').DataTable({
        "ajax": {
            "url": "http://localhost:8080/products",
            "type": "GET",
            "dataSrc": ""
        },
        "columns": [
            {"data": "id"},
            {"data": "name"},
            {"data": "price"},
            {"data": "category"},
            {"data": "description"},
            {"data": "tagline"},
            {
                "data": 'picture',
                "render": function (url, type, full) {
                    return '<img height="50%" width="50%" src="../images/Planets/planet-1519089_1280.jpg"/>';
                }
            },

        ],
        "columnDefs": [
            {
                "targets": 7,
                "data": null,
                "render": function (data, type, full) {
                    return `<button id=${data.id} class='editButton'>Edit</button>`;
                },
            },
            {
                "targets": 8,
                "data": null,
                "render": function (data, type, full) {
                    return `<button id=${data.id} class='deleteButton'>Delete</button>`;
                },
            }]
    });


    $(document).ready('body').on( 'click', '.deleteButton', function (ev) {
        const { id, ...data} = ev.target;
        //console.log(data);
        //console.log(id)
        deleteProductById(id);
        alert
    } );

    $(document).ready('body').on( 'click', '.editButton', function (ev) {
        const { id, ...data} = ev.target;
        console.log(id)
    } );

    function deleteProductById(id) {

        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/products/" + id,
            dataType: "json",
            statusCode: {
                200: function() {
                    //console.log("product deleted with " + id)
                    alert("product deleted with id=" + id)
                    location.reload()
                },
                500: function () {console.log("product not deleted")
                }
            }
        })

    }



});


/* let productdata = {
     "id": $("#id").val(),
     "name": $("#name").val(),
     "price": $("#price").val(),
     "category": $('#category').val(),
     "description": $("#description").val(),
     "tagline": $("#tagline").val(),
     "picture": $("#photoURL").val()
 };*/