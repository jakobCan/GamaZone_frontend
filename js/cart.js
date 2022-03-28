$(document).ready(function () {
    var table = $('#dataTable').DataTable({
        "ajax": {
            "url": "http://localhost:8080/cart/items",
            "type": "GET",
            xhrFields: {
                withCredentials: true
            },
            "dataSrc": ""
        },
        "columns": [
            {"data": 'spaceObject.picture',
                "render": function (data, type, full) {
                    return '<img height="100%" width="100%" src="' + data + '" alt="Image of SpaceObject">';
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
        let confirmAction = confirm("Are you sure want to remove this from your cart?");
        if (confirmAction) {
            deleteCartItemById(id);
            //alert("Cart item was removed");
        } else {
            //alert("Removal of cart item canceled");
        }
    } );

    function deleteCartItemById(id) {

        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/cart/delete/" + id,
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            statusCode: {
                200: function() {
                    //console.log("product deleted with " + id)
                    //alert("product deleted with id=" + id)
                    location.reload()
                },
                500: function () {
                    //console.log("product not deleted")
                }
            }
        })

    }

});
