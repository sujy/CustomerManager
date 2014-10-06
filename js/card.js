$(document).ready(function() {
    var allcard = readCard();
    var list = readFile("卡表", "卡组");
    var linkcard = transfertoTwoDimension(list);

    var cardName = [];
    var showCardNum = [];
    var showCard = [];
    for (var i = 0; i < allcard.length; i++) {
        cardName.push(allcard[i][6]);
    }

    function selectCard(name) {
        //每次先清0
        showCardNum = [];
        showCard = [];
        for (var i = 0; i < linkcard.length; i++) {
            if (name == linkcard[i][0]) {
                for (var j = 1; j < linkcard[i].length; j++) {
                    showCardNum.push(linkcard[i][j]);
                }
            }
        }
        if (showCardNum.length == 0) {
            for (var i = 0; i < allcard.length; i++) {
                if (allcard[i][6] == name) {
                    showCard.push(allcard[i]);
                    return showCard;
                }
            }
        } else {
            for (var i = 0; i < showCardNum.length; i++) {
                for (var j = 0; j < allcard.length; j++) {
                    if (showCardNum[i] == allcard[j][1]) {
                        showCard.push(allcard[j]);
                    }
                }
            }
            return showCard;
        }
    }

    function addoption(object, option) {
        var str = "<option value=\"" + option + "\">" + option + "</option>";
        object.append(str);
    }

    function addtr(object, key, value) {
        var str = "<tr><td>" + key + "</td>" + "<td>" + value + "</td>" + "</tr>"
        object.append(str);
    }

    var card_list = [];
    function getAllCard() {        
        var hasAdd = false;
        for (var i = 0; i < allcard.length; i++) {
            for (var j = 0; j < card_list.length; j++) {
                if (card_list[j] == allcard[i][6]) {
                    hasAdd = true;
                }
            }
            if (hasAdd == false) {
                card_list.push(allcard[i][6]);
            } else {
                hasAdd = false;
            }
        }
        for (var i = 0; i < card_list.length; i++) {
            addoption($("#card_info"), card_list[i]);
        }
    }

    getAllCard();
    $("#free_card").click(function(event) {
        var freeCard_list = [];
        var isLinked = false;
        $("#show_cards tbody").empty();
        if ($(this).text() == "选择自由宝") {
            $("#card_info").empty();
            $("#card_info").append('<option disabled selected>请选择卡种</option>');
            for (var i = 0; i < card_list.length; i++) {
                for (var j = 0; j < linkcard.length; j++) {
                    if (card_list[i] == linkcard[j][0]) {
                        isLinked = true;
                    }
                }
                if (isLinked) {
                    isLinked = false;
                } else {
                    freeCard_list.push(card_list[i]);
                }
            }
            for (var i = 0; i < freeCard_list.length; i++) {
                addoption($("#card_info"), freeCard_list[i]);
            }
            $(this).text('取消自由宝');
        } else {
            $(this).text("选择自由宝");
            $("#card_info").empty();
            $("#card_info").append('<option disabled selected>请选择卡种</option>');
            getAllCard();
        }
    });

    $("#add_card").click(function(event) {
        if ($("#free_card").text() == "选择自由宝") {
            $("#show_cards tbody").empty();
        }
        var chosenCard = new Array();
        if ($("#card_info").val() == null) {
            alert("请选择你要添加的卡");
        } else {
            chosenCard = selectCard($("#card_info").val());
            for (var i = 0; i < chosenCard.length; i++) {
                addtr($("#show_cards tbody"), chosenCard[i][6], chosenCard[i][2]);
            }
        }
        if ($("#free_card" == "取消自由宝")) {
            if ($('#show_cards tbody tr').length > 3) {
                $("#show_cards tbody tr:eq(0)").remove();
            }
        }
        // alert($("#show_cards tbody").html());
    });
});