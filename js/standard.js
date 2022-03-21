getRole();
function getRole(){
var authority;

    $.ajax({
        type: "GET",
        //cookie
        xhrFields: {
            withCredentials: true
        },
        url: 'http://localhost:8080/users/roles',
        contentType: "application/json",
    }).done(function(data){
        authority = data[0].authority;
        if (authority === "ROLE_USER"){$(".user").show(); }
        if (authority === "ROLE_ADMIN"){$(".admin").show(); }
        if (authority === "ROLE_ANONYMOUS"){$(".anonymous").show(); }
    })
}

$(".navbar .nav-link").on("click", function(){
    $(".nav").find(".active").removeClass("active");
    $(this).addClass("active");
});

$('#logout').click(function(e) {
    e.preventDefault();

    $.ajax({
        type: "POST",
        //cookie
        xhrFields: {
            withCredentials: true
        },
        url: 'http://localhost:8080/logout',
        contentType: "application/json",
        //data: JSON.stringify(product),
        statusCode: {
            200: function() {
                sessionStorage.clear()
                console.log("Logged out")
                window.location.href= '../html/login.html'
                alert('Logout successful, goodbye');
            }
        }
    })

});

/*function redirectRoleAdmin(){
    let authority;

    $.ajax({
        type: "GET",
        //cookie
        xhrFields: {
            withCredentials: true
        },
        url: 'http://localhost:8080/users/roles',
        contentType: "application/json",
    }).done(function(data){
        //console.log(data);
        authority = data[0].authority;
        //console.log("authority working", authority)
        //console.log("out",authority)
        //if (authority === "ROLE_USER"){$(".user").show(); }
        if (authority === "ROLE_ADMIN"){location.href = "/index.html"}
        //if (authority === "ROLE_ANONYMOUS"){$(".anonymous").show(); }
        //if (authority === "ROLE_ANONYMOUS"){$(".anonymous").show(); }
    })
}*/
