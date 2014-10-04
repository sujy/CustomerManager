function getID() {
    var str = window.location.href.toString();
    var num = str.indexOf("?");
    str = str.substr(num + 1); //截取“?”后面的参数串
    var num = str.indexOf("=");
    str = str.substr(num + 1);
    return str;
}
//get the table content
function addListener() {
    var cols = [
        "name", "sex", "identifi_type",
        "identification", "cellphone", "birth", 
        "addr_province", "addr_city", "addr_block",
        "addr_detail", "postcode", "phonecode",
        "telephone", "company", "company_province",
        "company_city", "company_block", "company_detail",
        "company_postcode", "company_phonecode", "company_telephone",
        "LingTongCardDate","LingTongCardTime", "HalfYearproperty",
        "approve_limit", "debit_card", "start",
        "important_mark", "debit_money"
    ];
    var data = [];
    //get the row data 
    $("#table tbody tr").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        $(this).find("td").each(function(index, el) {
            data[index] = $(this).text();
        });

        //add info to client head
        var now = new Date();
        var time = now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        var address = data[6] + data[7] + data[8] + data[9];
        var tbody = $("#client-head tbody tr");
        alert(tbody.html());
        tbody.append("<td>" + time + "</td>");
        tbody.append("<td>" + data[0] + "</td>");
        tbody.append("<td>" + " " + "</td>");
        tbody.append("<td>" + data[5] + "</td>");
        tbody.append("<td>" + address + "</td>");

        $("#identifi_type").val(data[2]);
        $("#cellphone").val(data[4]);
        $("#telephone").val(data[11] + data[12]);
        $("#postcode").val(data[4]);
        $("#workplace").val(data[14] + data[15] + data[16] + data[17]);
    });
}

$(document).ready(function() {
    //读取销售员名字
    var list = readFile("员工信息", "员工列表");
    for (var i = 0; i < list.length; i++) {
        var person = list[i].split(" ");
        if (person[1] == getID()) {
            $("#show-info").text(person[0] + " 您好!");
        }
    }

    //获取存量客户
    $("#getExisit").click(function(event) {
        $("#table").children("thead").empty();
        $("#table").children("tbody ").empty();
        var Existlist = readFile("存量客户", "存量客户");
        for (var i = 0; i < Existlist.length; i++) {
            if (i == 0) {
                var thead = $("#table").children('thead');
                var tr = "<tr id=\"formhead\"></tr>";
                thead.append(tr);
                var proper = Existlist[i].split(",");
                for (var j = 0; j < proper.length; j++) {
                    var th = "<th>" + proper[j] + "</th>";
                    thead.children('tr').append(th);
                }
            } else {
                var tbody = $("#table").children('tbody');
                var tr = "<tr id=\"client" + i + "\"" + "class=\"client\"></tr>";
                tbody.append(tr);
                var info = Existlist[i].split(",");
                for (var j = 0; j < info.length; j++) {
                    var td = "<td>" + info[j] + "</td>";
                    var id = "#client" + i;
                    $(id).append(td);
                }
            }
        }
        addListener();
    });

    //获取存量客户
    $("#getPast").click(function(event) {
        $("#table").children("thead").empty();
        $("#table").children("tbody ").empty();
        var Existlist = readFile("已营销客户", "已营销客户");
        for (var i = 0; i < Existlist.length; i++) {
            if (i == 0) {
                var thead = $("#table").children('thead');
                var tr = "<tr id=\"formhead\"></tr>";
                thead.append(tr);
                var proper = Existlist[i].split(",");
                for (var j = 0; j < proper.length; j++) {
                    var th = "<th>" + proper[j] + "</th>";
                    thead.children('tr').append(th);
                }
            } else {
                var tbody = $("#table").children('tbody');
                var tr = "<tr id=\"client" + i + "\"" + "class=\"client\"></tr>";
                tbody.append(tr);
                var info = Existlist[i].split(",");
                for (var j = 0; j < info.length; j++) {
                    var td = "<td>" + info[j] + "</td>";
                    var id = "#client" + i;
                    $(id).append(td);
                }
            }
        }
    });

    //添加新客户
    $("#getNew").click(function(event) {

    });
});