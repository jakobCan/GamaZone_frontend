

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

    $(document).ready('#dataTable tbody ').on( 'click', 'button', function () {
        //deleteProductById(JSON.stringify(productdata))
        alert("Product with ID \'" + id + "\' was deleted");
        //var data = table.row( $(this).parents('tr') ).data();
        //var id = $(this).attr('id');
    } );
    function deleteProductById(id) {

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
    }
});


