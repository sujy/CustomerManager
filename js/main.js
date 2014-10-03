function getID() {
    var str = window.location.href.toString();
    var num = str.indexOf("?");
    str = str.substr(num + 1); //截取“?”后面的参数串
    var num = str.indexOf("=");
    str = str.substr(num + 1);
    return str;
}

function addListener() {
    $("#table tbody tr").click(function(event) {
        $(this, 'tr').each(function(index, tr) {
            var lines = $('td', tr).map(function(index, td) {
                return $(td).text();
            });
            //This assumes that you have a table with an id of tblPurchaseOrders and that you have two cells of data
            alert(lines[0] + ' ' + lines[1]);
        })
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