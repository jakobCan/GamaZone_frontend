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
            { "data": 'picture',
                "render": function (url,type,full){
                    return '<img height="50%" width="50%" src="'+full[6]+'"/>';
                }
            },
        ],
        "columnDefs": [ {
            "targets": 6,
            "data": null,
            "defaultContent": "<button>Edit</button>"
        }, {
            "targets": 7,
            "data": null,
            "defaultContent": "<button>Delete</button>"
        }]

    });
    $('#dataTable tbody').on( 'click', 'button', function () {
        //var data = table.row( $(this).parents('tr') ).data();
        alert( data[0] + "is deleted");
    } );

});