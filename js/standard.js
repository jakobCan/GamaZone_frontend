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
        //console.log(data);
        authority = data[0].authority;
        //console.log("authority working", authority)
        //console.log("out",authority)
        if (authority === "ROLE_USER"){$(".user").show(); }
        if (authority === "ROLE_ADMIN"){$(".admin").show(); }
        if (authority === "ROLE_ANONYMOUS"){$(".anonymous").show(); }
        //if (authority === "ROLE_ANONYMOUS"){$(".anonymous").show(); }
    })
}

$(".navbar .nav-link").on("click", function(){
    $(".nav").find(".active").removeClass("active");
    $(this).addClass("active");
});

function redirectRoleAdmin(){
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
}

/*$( document ).ready(function() { // Important: wait for the document dom to be ready

    // get the value of the server access variable - simulated by the radio buttons in this case
    // var access = <you would put your server value here !>
    var access = ".usrNormal";
    setAccess(access);

    // next part is just to let you play.
    $('.serverVal').on('change', function(e){
        setAccess($(this).val());
    })

    // key function - this will show pr hide based on classes.
    function setAccess(accessVal) {

        // next line finds all elements with class including 'usrAccess' and shows if they have the request class or otherwise hides.
        $(".usrAccess").each( function() {
            var ele = $(this); // readability

            showHide(ele, accessVal);
        })
    }

    // show or hide the element based on class
    function showHide(ele, cls){

        if ( ele.is(cls) ){ // pay attention - this uses the jquery 'is' feature.
            ele.show();
        }
        else {
            ele.hide();
        }

    }


});*/

/*
if(sessionStorage.getItem("userRole")) {
    //user logged in
    $('.hidden-when-logged-in').hide();
}
else {
    //user logged out
    $('.hidden-when-logged-out').hide();
}*/

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
               // sessionStorage.setItem("token",null);
                sessionStorage.clear()
                console.log("Logged out")
                window.location.href= '../html/login.html'
                alert('Logout successful, goodbye');
            }
        }
    })

/*    $.ajax ({
        method: "POST",
        url: "http://localhost:8080/logout",
        //data: token,
        success: function (data) {
            //sessionStorage.removeItem('username')
            sessionStorage.clear()
            window.location.href= '../html/login.html'
            alert('Logout successful, goodbye');
        },
        error: function () {
            alert('Error while logout');
        }
    });*/
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
