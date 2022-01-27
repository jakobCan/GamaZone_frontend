$(document).ready(function () {
    var table = $('#dataTable').DataTable({
        "ajax": {
            "url": "http://localhost:8080/user",
            "type": "GET",
            "dataSrc": ""
        },
        "columns": [
            { "data": "userId" },
            { "data": "username" },
            { "data": "email" },
            { "data": "firstName" },
            { "data": "lastName" },
            { "data": "password" },
            { "data": 'role',
            },
        ],
        "columnDefs": [ {
            "targets": 7,
            "data": null,
            "defaultContent": "<button>Edit</button>"
        }, {
            "targets": 8,
            "data": null,
            "defaultContent": "<button>Delete</button>"
        }]
    });
    $('#dataTable tbody').on( 'click', 'button', function () {
       // var data = table.row( $(this).parents('tr') ).data();
        alert( data[0] + " is deleted");
    } );
});