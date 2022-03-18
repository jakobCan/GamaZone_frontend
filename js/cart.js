$(document).ready(function () {
    var table = $('#dataTable').DataTable({
        "ajax": {
            "url": "http://localhost:8080/cart/items",
            "type": "GET",
            "dataSrc": ""
        },
        "columns": [
            {"data": 'spaceObject.picture',
                "render": function (data, type, full) {
                    return `<img height="100%" width="100%" src="../images/spaceObjects/planet1.jpg"/>`;//${data.picture}
                }
            },
            {"data": "spaceObject.id"},
            {"data": "spaceObject.name"},
            {"data": "spaceObject.price"},
            {"data": "spaceObject.category"},
            {"data": "spaceObject.description"},
            {"data": "spaceObject.tagline"},

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
        let confirmAction = confirm("Are you sure want to remove" + id + " from your cart?");
        if (confirmAction) {
            deleteCartItemById(id);
            alert("Cart item with id-" + id + " was removed");
        } else {
            alert("Removal of cart item canceled");
        }
    } );

    function deleteCartItemById(id) {
        console.log(id)

        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/cart/delete/" + id,
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            statusCode: {
                200: function() {
                    console.log("product deleted with " + id)
                    alert("product deleted with id=" + id)
                    location.reload()
                },
                500: function () {console.log("product not deleted")
                }
            }
        })

    }

});
