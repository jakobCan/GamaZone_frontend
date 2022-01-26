$('#login').click(function(e){
    e.preventDefault();
    const username = $('#username').val();
    const password = $('#password').val();

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
            sessionStorage.setItem('username', data.username);
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
