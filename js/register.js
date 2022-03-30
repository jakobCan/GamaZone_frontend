$(document).ready(function() {
    $("#register").click(function(e) {
        e.preventDefault();
        const username = $("#inputUsername").val();
        const password = $("#inputPassword").val();
        const passwordb = $("#inputPasswordB").val();
        const firstName = $("#inputFirstName").val();
        const lastName = $("#inputLastName").val();
        const email = $("#inputEmail").val();

        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (username == '' || email == '' || password == '' || passwordb == '') {
            alert("Please complete all fields");
        } else if ((password.length) < 8) {
            alert("Password should be min. 8 character in length");
        } else if (!(password).match(passwordb)) {
            alert("Your passwords don't match. Try again?");
        } else if (!email.match(validRegex)) {
            alert("Please enter correct email");
        } else {
            $.ajax ({
                method: "POST",
                url: "http://localhost:8080/users/register",
                cache: false,
                data: JSON.stringify({
                    username: username,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                }),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    console.log(response);
                    alert('You have registered! Congrats!!! you can now login!!!!!!!');
                    window.location.href= '../html/login.html';
                },
                error: function () {
                    alert('Error while request.. did you fill out all the fields correctly? Please try again');
                },
            });
        }
    });
});
