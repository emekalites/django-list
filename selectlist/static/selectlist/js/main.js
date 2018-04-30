$(function () {
    $("#left-search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#left-pane li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#right-search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#right-pane li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("li[id^=e-drug]").on('click', function (e) {
        var id = $(this).data('id');
        var name = $(this).data('name');
        var company = $(this).data('company');
        var amount = $(this).data('amount');
        var stock = $(this).data('stock');

        if(stock <= 0){
            alert(name + " has stock quantity 0");
            return false;
        }

        $(this).hide();
        $("#d-drug-"+ id).show();

        $("#select-list option[value='" + id + "']").attr("selected", true);
        $("#drugs-listed").append('<div id="d-list-'+id+'">\n' +
            '                            <div>Name: '+ name +'</div>\n' +
            '                            <div>Company: '+ company +'</div>\n' +
            '                            <div>price: '+ amount +'</div>\n' +
            '                            <div>Current Stock: <span id="current-stock-'+id+'">'+ stock +'</span></div>\n' +
            '                            <div>Remaining Stock: <span id="remaining-stock-'+id+'">'+ stock +'</span></div>\n' +
            '                            <div>quantity: <input class="form-control" type="number" name="drug_quantity[]" value="0"></div>\n' +
            '                            <input class="hide" name="drug_id[]" value="'+ id +'">\n' +
            '                        </div>');
    });

    $("li[id^=d-drug]").on('click', function (e) {
        var id = $(this).data('id');
        var amount = $(this).data('amount');

        $(this).hide();
        $("#e-drug-"+ id).show();

        $("#select-list option[value='" + id + "']").attr("selected", false);

        var quantity = $("#current-stock-"+ id);
        var sub_total = parseFloat($('#subtotal').val()) - (parseFloat(amount) * quantity);
        sub_total = isNaN(sub_total) ? 0 : sub_total;
        var discount = $('#discount').val();

        var total = sub_total - parseFloat(discount);
        total = isNaN(total) ? 0 : total;

        $('#subtotal').val(sub_total);
        $('#grosstotal').val(total);

        $("#d-list-"+id).remove();
    });

    $("#discount").on("keyup", function() {
        var discount = $(this).val();
        var sub_total = parseFloat($('#subtotal').val());
        var total = sub_total - parseFloat(discount);
        $('#grosstotal').val(total);
    });

    $(document).on("keyup", "input[name^=drug_quantity]", function() {
        var sub_total = 0;
        $("input[name^=drug_quantity]").each(function () {
            var id = $(this).parent().parent().children("input[name^=drug_id]").val();

            var qty = $(this).val();
            var quantity = 0;
            var amount = 0;

            if(qty === ""){
                $("#remaining-stock-"+ id).text("0");
            }
            else {
                quantity = parseInt(qty);
                var stock = parseInt($("#d-drug-"+ id).data('stock'));

                if(quantity <= stock && quantity >= 0){
                    amount = parseFloat($("#d-drug-"+ id).data('amount'));
                    $("#remaining-stock-"+ id).text(stock - parseInt(qty));
                }
                else {
                    $("#remaining-stock-"+ id).text("0");
                }
            }

            sub_total += amount * quantity;
        });

        var discount = parseFloat($('#discount').val());
        var grosstotal = sub_total - discount;

        $('#subtotal').val(sub_total);
        $('#grosstotal').val(grosstotal);
    });

    $(document).on("blur", "input[name^=drug_quantity]", function() {
        var sub_total = 0;
        $("input[name^=drug_quantity]").each(function () {
            var id = $(this).parent().parent().children("input[name^=drug_id]").val();

            var qty = $(this).val();
            var quantity = 0;
            var amount = 0;

            if(qty === ""){
                $("#remaining-stock-"+ id).text("0");
            }
            else {
                quantity = parseInt(qty);
                var stock = parseInt($("#d-drug-"+ id).data('stock'));

                if(quantity <= stock && quantity >= 0){
                    amount = parseFloat($("#d-drug-"+ id).data('amount'));
                    $("#remaining-stock-"+ id).text(stock - parseInt(qty));
                }
                else {
                    $("#remaining-stock-"+ id).text("0");
                }
            }

            sub_total += amount * quantity;
        });

        var discount = parseFloat($('#discount').val());
        var grosstotal = sub_total - discount;

        $('#subtotal').val(sub_total);
        $('#grosstotal').val(grosstotal);
    });
});