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
                return `<button id=${data.userId} class='editButton'>Edit</button>`;
            },
        }, {
            "targets": 8,
            "data": null,
            "render": function (data, type, full) {
                return `<button id=${data.userId} class='deleteButton'>Delete</button>`;
            },
        }]
    });
});

$(document).ready('body').on( 'click', '.deleteButton', function (ev) {
    const { id, ...data} = ev.target;
    $.ajax({
        type: 'DELETE',
        url: 'http://localhost:8080/users/' + id,
    }).done(function () {
        location.reload();
        alert("Deleted user with id " + id)
    });
} );


$(document).ready('body').on('click', '.editButton', EditUser);
function EditUser(ev) {
    const { id, ...data} = ev.target;

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/users/' + id,
    }).done(function (data) {

        $('#userId').val(data.userId);
        $('#username').val(data.username);
        $('#email').val(data.email);
        $('#firstName').val(data.firstName);
        $('#lastName').val(data.lastName);
        $('#roles').val(data.roles);
        if (data.username) {
            $('#user_active').val("1");
        } else {
            $('#user_active').val("0");
        }

    });
}

// Saving user edits
$('#EditUser').click(function (e) {

    //Check if all fields contain value
    if ($('#userId').val() && $('#username').val() &&
        $('#email').val() && $('#firstname').val() &&
        $('#lastname').val() && $('#roles').val()) {

        let userId = $('#userId').val();
        let username = $('#username').val();
        let email = $('#email').val();
        let firstname = $('#firstname').val();
        let lastname = $('#lastname').val();
        let roles = $('#roles').val();
        let userActive;

        if ($('#user_active option:selected').text() === 'Active') {
            userActive = true;
        } else {
            userActive = false;
        }

        var newUserObject = new Object();

        newUserObject.userId = userId;
        newUserObject.username = username;
        newUserObject.email = email;
        newUserObject.firstname = firstname;
        newUserObject.lastname = lastname;
        newUserObject.roles = roles;
        newUserObject.active = userActive;

        let newUserData = JSON.stringify(newUserObject);

        console.log(newUserData)

        $.ajax({
            method: 'PUT',
            url: 'http://localhost:8080/users/' + userId,
            data: newUserData,
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'no-cors'
        }).done(function () {
            location.reload();
        });


    } else {
        alert('Please set correct values first!');
    }

});

