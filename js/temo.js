$(document).ready(function() {


    $("#getNew").click(function(event) {
        $("#show_cards tbody tr td").each(function(index, el) {
            alert($(this).html());
        });
        /* Act on the event */
        $("#name_list tbody").empty()

        $(":input").each(function() {
            $(this).removeAttr('checked');
            $(this).val("");
        });

        $("#show_cards tbody tr td").each(function(index, el) {

        });
    });
});