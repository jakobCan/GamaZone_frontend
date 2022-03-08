if(sessionStorage.getItem("userRole")) {
    //user logged in
    $('.hidden-when-logged-in').hide();
}
else {
    //user logged out
    $('.hidden-when-logged-out').hide();
}

$('#logout').click(function(e) {
    e.preventDefault();
    var token = $("meta[name='_csrf']").attr("content");

    $.ajax ({
        method: "POST",
        url: "http://localhost:8080/logout",
        //data: token,
        success: function (data) {
            //sessionStorage.removeItem('username')
            sessionStorage.clear()
            window.location.href= '../html/login.html';
        },
        error: function () {
            alert('Error while logout');
        }
    });
});

/*
$('#logout').click(function(e) {
    e.preventDefault();

    const username = $('#username').val();
    const password = $('#password').val();

    $.ajax ({
        method: "POST",
        url: "http://localhost:8080/logout",
        data: JSON.stringify({
            username: username,
            password: password,
        }),
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            sessionStorage.setItem('username', null);
            window.location.href= '../html/login.html';
        },
    });
});*/
