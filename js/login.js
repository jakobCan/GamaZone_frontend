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
            //sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
            window.location.href= '../html/index.html';
        },
        error: function (data) {
            console.log("Error")
            window.location.href= '../html/login.html';
        },
    });
});
