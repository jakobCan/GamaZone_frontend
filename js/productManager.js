$(document).ready(function () {
    var table = $('#dataTable').DataTable({
        "ajax": {
            "url": "http://localhost:8080/products",
            "type": "GET",
            "dataSrc": ""
        },
        "columns": [
            {"data": "id"},
            {"data": "name"},
            {"data": "price"},
            {"data": "category"},
            {"data": "description"},
            {"data": "tagline"},
            {"data": 'picture',
                "render": function (data, type, full) {
                    return `<img height="100%" width="100%" src="../images/spaceObjects/planet1.jpg"/>`;//${data.picture}
                }
            },
        ],
        "columnDefs": [
            {
                "targets": 7,
                "data": null,
                "render": function (data, type, full) {
                    return `<button id=${data.id} class='deleteButton'>Delete</button>`;
                },
            }]
    });

    $(document).ready('body').on( 'click', '.deleteButton', function (ev) {
        const { id, ...data} = ev.target;
        //console.log(data);
        //console.log(id)
        let confirmAction = confirm("Are you sure want to delete the user" + id + "?");
        if (confirmAction) {
            deleteProductById(id);
            alert("User " + id + " was deleted");
        } else {
            alert("Delete canceled");
        }
    } );

    function deleteProductById(id) {

        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/products/" + id,
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            statusCode: {
                200: function() {
                    //console.log("product deleted with " + id)
                    alert("product deleted with id=" + id)
                    location.reload()
                },
                500: function () {console.log("product not deleted")
                }
            }
        })

    }

});
