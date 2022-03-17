$(document).ready(function () {
    var table = $('#dataTable').DataTable({
        "ajax": {
            "url": "http://localhost:8080/users",
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
            "render": function (data, type, full) {
                return `<button id=${data.userId} class='deleteButton'>Delete</button>`;
            },
        }]
    });
});

$(document).ready('body').on( 'click', '.deleteButton', function (ev) {
    const { id, ...data} = ev.target;
    let confirmAction = confirm("Are you sure want to delete the product" + id + "?");
    if (confirmAction) {
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/users/' + id,
            xhrFields: {
                withCredentials: true
            },
        }).done(function () {
            location.reload();
            alert("Deleted user with id " + id)
        });
        alert("Product " + id + " was deleted");
    } else {
        alert("Delete canceled");
    }



} );

