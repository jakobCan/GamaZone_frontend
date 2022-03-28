
$(document).ready(function () {

    var table = $('#register').DataTable({
        dom: 'fBti',
        pageLength: -1,
        buttons: [
            {
                text: '<i class="fa fa-id-badge fa-fw fa-lg" aria-hidden="true"></i> Switch List/Cards',
                className: 'animated bounce',
                action: function () {

                    $("#register").toggleClass("cards");
                    $("#register thead").toggle();
                    $("#card-toggle .fa").toggleClass("fa-table");
                    $("#card-toggle .fa").toggleClass("fa-id-badge");

                    if($("#register").hasClass("cards")){
                        var max = 0;
                        $('#register tr').each(function() {
                            max = Math.max($(this).height(), max);
                        }).height(max);
                    } else {
                        $("#register tr").each(function(){
                            $(this).height("auto");
                        });
                    }

                },
                attr:  {
                    title: 'Change views',
                    id: 'card-toggle'
                }
            }
        ],
        select: 'single',
        "ajax": {
            "url": "http://localhost:8080/products",
            "type": "GET",
            "dataSrc": ""
        },
        columns: [
            {
                data: 'picture',
                render: function (data, type, row, meta) {
                    return '<img height="100%" width="100%" src="' + data + '" alt="'+data+'">';
                }
            },
            /* I added a label to the column for the field name which will show up in the card display */
            {
                data: "name", name: "name",
                render: function (data, type, row, meta) { return (type === 'display' ? '<label>'+ $($('#register').DataTable().column(meta.col).header()).html() +':</label>' : null ) + data;}
            },
            {
                data: "category", name: "category", class: 'text-left',
                render: function (data, type, row, meta) { return (type === 'display' ? '<label>'+ $($('#register').DataTable().column(meta.col).header()).html() +':</label>' : null ) + data; }
            },
            {
                data: "tagline", name: "tagline",
                render: function (data, type, row, meta) { return (type === 'display' ? '<label>'+ $($('#register').DataTable().column(meta.col).header()).html() +':</label>' : null ) + data; }
            },
            {
                data: "description", name: "description", class: 'text-right',
                render: function (data, type, row, meta) { return (type === 'display' ? '<label>'+ $($('#register').DataTable().column(meta.col).header()).html() +':</label>' : null ) + data; }
            },
            {
                data: "price", name: "price",
                render: function (data, type, row, meta) { return (type === 'display' ? '<label>'+ $($('#register').DataTable().column(meta.col).header()).html() +':</label>' : null ) + data; }
            },
            {
                data: null, name: null, class: 'center',
                render: function (data, type, row, meta) {return `<button id=${data.name} class='buyButton'>Buy me!</button>`;
                }
            }
        ]
    })
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray()
            $('#row-data').html(JSON.stringify(rowData))
        })
        .on('deselect', function () {
            $('#row-data').html('')
        })
});

$(document).ready('body').on( 'click', '.buyButton', function (ev) {
    const { id, ...data} = ev.target;
    //console.log(id);
    let confirmAction = confirm("You want to add " + id + " to the cart?");
    if (confirmAction) {
        $.ajax({
            type: "POST",
            url: 'http://localhost:8080/cart/add/' + id + '/' + 1,
            xhrFields: {withCredentials: true},
            success: function (data) {
                //alert("Congrats! " + id + "  was added to your cart");
                window.location.href= '../html/cart.html';
            },
            error: function (data) {
                console.log("Error, only logged in users can add cart items")
                //alert('Something went wrong?... Try again!');
                //window.location.href= '../html/shop.html';
            },
        })
    } else {
        //alert("Add to cart canceled");
    }
} );