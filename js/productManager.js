

$(document).ready(function () {
    var table = $('#dataTable').DataTable({
        "ajax": {
            "url": "http://localhost:8080/products",
            "type": "GET",
            "dataSrc": ""
        },
        "columns": [
            { "data": "id" },
            { "data": "name" },
            { "data": "price" },
            { "data": "category" },
            { "data": "description" },
            { "data": "tagline" },
            { "data": 'picture',
                "render": function (url,type,full){
                    return '<img height="50%" width="50%" src="../images/Planets/planet-1519089_1280.jpg"/>';
                }
            },
        ],
        "columnDefs": [
            {
            "targets": 7,
            "data": null,
            "defaultContent": "<button>Edit</button>"
        },
            {
            "targets": 8,
            "data": null,
            "defaultContent": "<button>Delete</button>"
        }]

    });

    let productdata = {
        "name": $("#name").val(),
        "price": $("#price").val(),
        "category": $('#category').val(),
        "description": $("#description").val(),
        "tagline": $("#tagline").val(),
        "picture": $("#photoURL").val()
    };

    $('#dataTable tbody ').on( 'click', 'button', function () {
        deleteProductById(JSON.stringify(product.id))
        alert("Product with ID \'" + id + "\' was deleted");
        //var data = table.row( $(this).parents('tr') ).data();
        //var id = $(this).attr('id');
    } );

});


