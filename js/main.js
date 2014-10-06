function getID() {
	var str = window.location.href.toString();
	var num = str.indexOf("?");
	str = str.substr(num + 1); //截取“?”后面的参数串
	var num = str.indexOf("=");
	str = str.substr(num + 1);
	return str;
}

function hideUpAndTwo() {
	$("#saveAsSell").show();
	$("#update").hide();
	$("#saveAsTwo").hide();
}

function hideSadeAsSell() {
	$("#saveAsSell").hide();
	$("#update").show();
	$("#saveAsTwo").show();
}

function getNameList(){
    $("#name_list").children("tbody").empty();
    var Existlist = readFile("存量客户", "存量客户");
    for (var i = 0; i < Existlist.length; i++) {
        if (i > 0) {
        	var tbody = $("#name_list").children("tbody");
            var proper = Existlist[i].split(",");
            if (!isSell(proper[3])) {
	            var name = "clint-" + proper[3];
	            var tr = '<tr id="' + name + '">';
	            var td = "";
	            for (var j = 0; j < 2; j++) {
	            	if (proper[j] == 1) proper[j] = "男";
	            	else if (proper[j] == 2) proper[j] = "女";
	                var td = td + "<td>" + proper[j] + "</td>";
	            }
	            tbody.append(tr + td + '</tr>');
            }
        }
    }
    hideUpAndTwo();
    addListener();
}

function addListener() {
   $("#name_list tbody tr").on('click', function() {
            var clinet = $(this).attr("id");
            var id = clinet.split("-");
            getPersonInfo(id[1]);
    });
}

function sex(se) {
	var sex;
	if (se == 1)
		sex = "男";
	else
		sex = "女";
	return sex;
}

function getDate() {
	var now = new Date();
	var today = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate() ;
	return today;
}

function getPersonInfo(id) {
	var Existlist = readFile("存量客户", "存量客户");
    for (var i = 0; i < Existlist.length; i++) {
        if (i > 0) {
            var proper = Existlist[i].split(",");
            if (proper[3] == id) {
              $("#name").attr("value", proper[0]);
              $("#sex").attr("value", sex(proper[1]));
              $("#evidence").attr("value", proper[2]);
              $("#evidenceNumber").attr("value", id);
              $("#phone").attr("value", proper[4]);
              $("#birth").attr("value", proper[5]);
              $("#address_province").attr("value", proper[6]);
              $("#address_city").attr("value", proper[7]);
              $("#address_area").attr("value", proper[8]);
              $("#address").attr("value", proper[9]);
              $("#postcode").attr("value", proper[10]);
              $("#phoneAreaCode").attr("value", proper[11]);
              $("#homePhone").attr("value", proper[12]);
              $("#unit").attr("value", proper[13]);
              $("#unitProvince").attr("value", proper[14]);
              $("#unitCity").attr("value", proper[15]);
              $("#unitArea").attr("value", proper[16]);
              $("#unitAddress").attr("value", proper[17]);
              $("#unitPostcode").attr("value", proper[18]);
              $("#unitPhoneAreaCode").attr("value", proper[19]);
              $("#unitPhone").attr("value", proper[20]);
              $("#use").attr("value", proper[21]);
              $("#useTime").attr("value", proper[22]);
              $("#dayMoney").attr("value", proper[23]);
              $("#limit").attr("value", proper[24]);
              $("#cardMany").attr("value", proper[25]);
              $("#clientLevel").attr("value", proper[26]);
              $("#want").attr("value", proper[27]);
              $("#houseLoan").attr("value", proper[28]);
              $("#today").attr("value", getDate());
            } 
        }
    }
}

//写入已营销的txt
function writeClientTxt() {
    //处理用户基本信息
	var $inputText = $(".right :input:text");
	var text_count = $inputText.length;
	var content = [];
	$inputText.each(function(index, el){
		content.push($(this).val());
	});

	var $inputRadio = $(".right :input:radio");
	var radio_count = 0;
	$inputRadio.each(function(index, el){
		if($(this).is(':checked')){
            content.push($(this).next().text());
            radio_count++;
        }
	});

	var $inputCheckbox = $(".right :input:checkbox")
    var checkbox_count = 1;
    var va = "|";
    $inputCheckbox.each(function(index, el){
    	if($(this).is(':checked')){
          va += $(this).val() + "|";
        }
	});
	content.push(va);
    
    var card = [];
    $("#show_cards tbody tr td").each(function(){
        card.push($(this).text());
    });
    
    var value = "";
    for (var i = 0; i < card.length; i++){
    	if(i % 2 == 0) {
    		value += card[i] + "=";
    	} else {
    		value += card[i] + "|";
    	}
    }
    
    content.push(value);

	content.push(text_count);
	content.push(radio_count);
	content.push(checkbox_count);

	var client = [];
	client.push(content[0]);
	client.push(content[1]);
	client.push(content[3]);

    var str = content[3];
    CreateFile("已营销客户", "已营销客户列表", client);
	CreateFile("已营销客户", str, content);
	alert("数据已经保存到已营销客户。");

	window.location.href("main.html" + "?id=" + $("#show-info").text().split(" ")[1]);
}

//判断是不是已经营销过了
function isSell(id) {
   var fso;
   var dir = getlocation();
   dir = dir + "/已营销客户";
   fso = new ActiveXObject("Scripting.FileSystemObject");
   if (fso.FileExists(dir + "/" + id + ".txt"))
   	  return true;
   else
   	  return false;
}

//查看已经推销的客户
function getHasSellClients() {
    $("#name_list").children("tbody").empty();
    var Existlist = readFile("已营销客户", "已营销客户列表");
    for (var i = 0; i < Existlist.length; i++) {
    	var tbody = $("#name_list").children("tbody");
        var proper = Existlist[i].split(",");
        var name = "clint-" + proper[2];
        var tr = '<tr id="' + name + '">';
        var td = "";
        for (var j = 0; j < 2; j++) {
            var td = td + "<td>" + proper[j] + "</td>";
        }
        tbody.append(tr + td + '</tr>');
    }
    hideSadeAsSell();
    addListenerToSell();
}

function addListenerToSell() {
	$("#name_list tbody tr").on('click', function() {
            var clinet = $(this).attr("id");
            var id = clinet.split("-");
            getInfo(id[1]);
    });
}

function getInfo(id) {
	$(".right :input").each(function(){
		$(this).removeAttr("checked");
	});

	$("#show_cards tbody").empty();

	if(isSell(id)) {
		var content = readFile("已营销客户", id);
		for (var i = 0; i < content.length; i++) {
			var item = content[i].split(",");
			var len = item.length;
			var k = 0;
			$(".right :input:text").each(function(){
				$(this).attr("value", item[k]);
				k++;
			});

			$(".right :input:radio").each(function(){
				if($(this).next().text() == item[k]) {
					$(this).attr("checked", "checked");
					k++;
				}
			});
            
             var j = parseInt(item[len - 2]) + parseInt(item[len - 3]);
             var banks = item[j].split("|");
			$(".right :input:checkbox").each(function() {
				for (var i = 0; i < banks.length; i++) {
					if($(this).val() == banks[i]) {
						$(this).attr("checked", "checked");
					}
			   }
			});

			var cards = item[j+1];
			var keyvalue = cards.split("|");
			for (var i = 0; i < keyvalue.length - 1; i++) {
				var b =  keyvalue[i].split("=");
				if(b) {
					var str = "<tr><td>" + b[0] + "</td>" + "<td>" + b[1] + "</td>" + "</tr>"
		            $("#show_cards tbody").append(str);
                }
			}
		}
	}
}

function updateInfo() {
	//处理用户基本信息
	var $inputText = $(".right :input:text");
	var text_count = $inputText.length;
	var content = [];
	$inputText.each(function(index, el){
		content.push($(this).val());
	});

	var $inputRadio = $(".right :input:radio");
	var radio_count = 0;
	$inputRadio.each(function(index, el){
		if($(this).is(':checked')){
            content.push($(this).next().text());
            radio_count++;
        }
	});

	var $inputCheckbox = $(".right :input:checkbox")
    var checkbox_count = 1;
    var va = "|";
    $inputCheckbox.each(function(index, el){
    	if($(this).is(':checked')){
          va += $(this).val() + "|";
        }
	});
	content.push(va);

    var card = [];
    $("#show_cards tbody tr td").each(function(){
        card.push($(this).text());
    });
    
    var value = "";
    for (var i = 0; i < card.length; i++){
    	if(i % 2 == 0) {
    		value += card[i] + "=";
    	} else {
    		value += card[i] + "|";
    	}
    }
    
    content.push(value);

	content.push(text_count);
	content.push(radio_count);
	content.push(checkbox_count);

	var client = [];
	client.push(content[0]);
	client.push(content[1]);
	client.push(content[3]);
    var str = content[3];

	rewriteFile("已营销客户", str, content);
	alert("更新成功！！");
	getInfo($("#evidenceNumber").attr("value"));
}

function getNew(){
	$("#show_cards tbody").empty();

	$("#name_list tbody").empty();

	$(":input").each(function(){
		$(this).removeAttr("checked");
		$(this).val("");
	});
}

$(function() {
    //读取销售员名字
    var list = readFile("员工信息", "员工列表");
    for (var i = 0; i < list.length; i++) {
        var person = list[i].split(" ");
        if (person[1] == getID()) {
            $("#show-info").text(person[0] + " " + person[1] + " 您好!");
        }
    }

    getNameList();
    
    //获取存量客户列表
    $("#getExisit").on("click", function(){getNameList();});
    
    //获取已经营销的客户列表
    $("#getPast").on("click", function(){getHasSellClients();});
    
    //保存成已营销的信息
    $("#saveAsSell").on("click", function(){writeClientTxt();});

    //更新已营销信息
    $("#update").on("click", function(){updateInfo();});

    //
    $("#getNew").on("click", function(){getNew();});
});