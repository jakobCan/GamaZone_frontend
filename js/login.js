$('#login').click(function(e){
    e.preventDefault();
    const username = $('#username').val();
    const password = $('#password').val();
    let userRole = "";

   /* $.ajax ({
        method: "GET",
        url: `http://localhost:8080/user/username/` + username,
        data:

    })*/

    //$.get("http://localhost:8080/user/username/" + username, role, success);


    $.ajax({
        method:"get",
        async: false,
        url: 'http://localhost:8080/user/username/' + username,
        success: function(data) {
            userRole = data.role;
        }
    });

    let data = {
        username: username,
        password: password,
    }

    $.ajax ({
        method: "POST",
        url: "http://localhost:8080/login",
        data: JSON.stringify({
            username: username,
            password: password,
        }),
        header: {
            'Content-Type': 'application/json',
        },
        // Cookies
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            sessionStorage.setItem('username',username);
            sessionStorage.setItem('userRole', userRole);
            //sessionStorage.setItem('token', data.token);
            window.location.href= '../html/index.html';
        },
        error: function (data) {
            console.log("Error")
            alert('Perhaps you got the wrong password... Please try again!');
            window.location.href= '../html/login.html';
        },
    });
});
