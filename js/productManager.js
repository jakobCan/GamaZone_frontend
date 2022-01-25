$(document).ready(function () {
    var table = $('#dataTable').DataTable({
        "ajax": {
            "url": "http://localhost:8080/products",
            "type": "GET",
            "dataSrc": ""
        },
        "columns": [
            { "data": "name" },
            { "data": "price" },
            { "data": "category" },
            { "data": "description" },
            { "data": "tagline" },
            { "data": 'imageURL',
                "render": function (data, type, row, meta) {
                    return '<img src="' + data + '" alt="' + data + '" height="20" width="20"/>';
                }
            },
        ],
        "columnDefs": [ {
            "targets": 6,
            "data": null,
            "defaultContent": "<button>Update</button>"
        } ],
        "columnDefs": [ {
            "targets": 7,
            "data": null,
            "defaultContent": "<button>Delete</button>"
        } ]
    });
    $('#dataTable tbody').on( 'click', 'button', function () {
        var data = table.row( $(this).parents('tr') ).data();
        alert( data[0] + "is deleted");
    } );
});