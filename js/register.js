$(document).ready(function() {
    $("#register").click(function(e) {
        e.preventDefault();
        const username = $("#inputUsername").val();
        const password = $("#inputPassword").val();
        const passwordb = $("#inputPasswordB").val();
        const firstName = $("#inputFirstName").val();
        const lastName = $("#inputLastName").val();
        const email = $("#inputEmail").val();

        if (username == '' || email == '' || password == '' || passwordb == '') {
            alert("Please complete fields");
        } else if ((password.length) < 8) {
            alert("Password should be min. 8 character in length");
        } else if (!(password).match(passwordb)) {
            alert("Your passwords don't match. Try again?");
        } else {
            $.ajax ({
                method: "POST",
                url: "http://localhost:8080/user/register",
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
                    //$('#result').html("../html/login.html");
                    //var obj = JSON.parse(response);
                    //$('#result').html("username:- " + obj.username +"</br>\"First Name:- \" + obj.firstName +\"</br>Last Name:- " + obj.lastName  + "</br>Email:- " + obj.email);

                    window.location.href= '../html/login.html';
                },
                error: function () {
                    console.log("Error")
                    alert('Error while request..');
                    window.location.href= '../html/register.html';
                },
            });
        }
    });
});
