var colors = ["Crimson ", "Cyan ", "DarkBlue ", "DarkCyan ", "DarkGoldenRod ", "DarkGray ", "DarkGrey ", "DarkGreen ", "DarkKhaki ", "DarkMagenta ", "DarkOliveGreen ", "DarkOrange "];

$(document).ready(function () {

    var table = $('#register').DataTable({
        dom: 'fBti',
        pageLength: -1,
        buttons: [
            {
                text: '<i class="fa fa-id-badge fa-fw fa-lg" aria-hidden="true"></i>',
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
            {   /* created column to show a picture just to make this demo look better */
                orderable: false, data: 'Photo', name: 'Photo', orderable: false, defaultContent: '', title: 'Photo',
                visible: true, className: 'text-center', width: '20px',

                createdCell: function (td, cellData, rowData, row, col) {
                    var $ctl = $('<i class="fa fa-user fa-fw"></i>').css('color', colors[Math.round(Math.random() * colors.length) + 1])
                    $(td).append($ctl);
                }
            },
            /* I added a label to the column for the field name which will show up in the card display */
            {
                data: "name", name: "name",
                render: function (data, type, row, meta) { return (type === 'display' ? '<label>'+ $($('#register').DataTable().column(meta.col).header()).html() +':</label>' : null ) + (function(data, type, row) { return data +', '+ row.office })(data, type, row, meta); }
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
                render: function (data, type, row, meta) {return `<button id=${data.id} class='deleteButton'>Buy me!</button>`;
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