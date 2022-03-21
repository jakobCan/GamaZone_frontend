//fill list with users
fetchUsers = function () {
    $.ajax({
            method: 'GET',
            url: 'http://localhost:8080/users',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    ).done(function (data) {
        for (let i=0; i<data.length; i++){
            $('<option/>').val(data[i].userId).text("ID: "+data[i].userId+" - "+data[i].username).appendTo('#userDropdown')
        }

    });
}
fetchUsers();
$("#userDropdown").change(getUser);

//get user from list and insert into form
function getUser (e) {
    e.preventDefault();
    const id = $("#userDropdown").val();
    $.ajax({
            method: 'GET',
            url: 'http://localhost:8080/users/'+ id,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    ).done(function (data) {
        $('#id').val(data.userId);
        $('#username').val(data.username);
        $('#password').val(data.password);
        $('#role').val(data.role);
        $('#firstname').val(data.firstName);
        $('#lastname').val(data.lastName);
        $('#email').val(data.email);
        $('#active').val(data.active);

    });
}

// Update product on submit
$(document).ready('body').on( 'click', '.submit', function(e){
    e.preventDefault();
    const id = $("#userDropdown").val();
    let user = {
        "userId": $("#id").val(),
        "username": $("#username").val(),
        "password": $("#password").val(),
        "role": $('#role').val(),
        "firstName": $("#firstname").val(),
        "lastName": $("#lastname").val(),
        "email": $("#email").val(),
        "isActive": $("#active").val()
    };
    $.ajax ({
        method: "PUT",
        url: "http://localhost:8080/users/" + id,
        data: JSON.stringify(user),
        contentType: "application/json; charset=utf-8",
        xhrFields: {
            withCredentials: true,
        },
        success: function () {
            alert("Success! The user was updated");
            window.location.href= '../html/userManager.html';
        },
        error: function () {
            console.log("Error during user update, try again")
        },
    });
});