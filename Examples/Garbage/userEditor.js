
// Saving user edits
$('#updateProduct').click(function (e) {

    //Check if all fields contain value
    if ($('#user_edit_firstname').val() && $('#user_edit_surname').val() &&
        $('#user_edit_username').val() && $('#user_edit_email').val() &&
        $('#user_edit_address').val() && $('#user_edit_roles').val() && $('#user_edit_id').val()) {

        let userFirstname = $('#user_edit_firstname').val();
        let userSurname = $('#user_edit_surname').val();
        let username = $('#user_edit_username').val();
        let userEmail = $('#user_edit_email').val();
        let userAddress = $('#user_edit_address').val();
        let userRoles = $('#user_edit_roles').val();
        let userId = $('#user_edit_id').val();
        let userActive;

        if ($('#user_active option:selected').text() === 'Active') {
            userActive = true;
        } else {
            userActive = false;
        }

        var newUserObject = new Object();

        newUserObject.firstname = userFirstname;
        newUserObject.surname = userSurname;
        newUserObject.username = username;
        newUserObject.email = userEmail;
        newUserObject.password = "password";
        newUserObject.address = userAddress;
        newUserObject.active = userActive;
        newUserObject.roles = userRoles;

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

