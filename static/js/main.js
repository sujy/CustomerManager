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
  $("#printCard").show();
}

function getNameList() {
  $("#name_list").children("thead").empty();
  $("#name_list").children("tbody").empty();

  thead = "<tr><th>姓名</th><th>性别</th><th>灵通卡使用期限</th><th>灵通卡消费次数</th><th>半年日均资产</th><th>审批额度</th><th>贷记卡张数</th><th>房贷金额</th></tr>"

  $("#name_list").children("thead").append(thead);

  var Existlist = readFile("存量客户", "存量客户");
  for (var i = 0; i < Existlist.length; i++) {
    if (i > 0) {
      var tbody = $("#name_list").children("tbody");
      var proper = Existlist[i].split(",");
      if (!isSell(proper[3])) {
        var name = "clint-" + proper[3];
        var tr = '<tr id="' + name + '">';
        var td = "";
        for (var j = 0; j < 8; j++) {
          if (proper[j] == 1) proper[j] = "男";
          else if (proper[j] == 2) proper[j] = "女";
          if (j >= 2) {
            if (j == 7) {
              var td = td + "<td>" + proper[21 + j] + "</td>";
            } else {
              var td = td + "<td>" + proper[19 + j] + "</td>";
            }
          } else {
            var td = td + "<td>" + proper[j] + "</td>";
          }

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
  var today = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
  return today;
}


function getInitInfo(proper) {
  $("#evidence").attr('value', '0');
  $("#create_postcode").attr('value', '510000');
  $("#nation").attr('value', '中国');
  $("#card_primarySchool").attr('value', '我的小学');
  $("#postcode").attr('value', '510000');
  $("#unitPostcode").attr('value', '510000');
  $("#card_liveTime").attr('value', '2010/01/01');
  $("#card_inTime").attr('value', '2010/01/01');

  $("#card_person1TelephoneCode").attr('value', proper[11]);
  $("#card_person2TelephoneCode").attr('value', proper[11]);
  $("#card_person1Telephone").attr('value', '0');
  $("#card_person2Telephone").attr('value', '0');
  $("#card_person1Address").attr('value', proper[6] + proper[7] + proper[8]);
  $("#card_person2Address").attr('value', proper[6] + proper[7] + proper[8]);
  $("#cardadd_hasCardsC").attr('value', '1');
  $("#cardadd_hasCardsM").attr('value', '1');
  $("#cardadd_hasCardsA").attr('value', '1');


  var sellPerson = readFile("销售员信息", "销售员信息");
  var bankNumber = sellPerson[0].split(",");
  $("#card_sellCode").attr('value', bankNumber[3]);

  $(".card_getMethod input").each(function(index, el) {
    if ($(this).next().text() == '自取') {
      $(this).attr('checked', 'checked');
    }
  });

  $(".cardadd_salary input").each(function(index, el) {
    if ($(this).next().text() == '非代发工资客户') {
      $(this).attr('checked', 'checked');
    }
  });
  $(".cardadd_buyCar input").each(function(index, el) {
    if ($(this).next().text() == '没有自购车') {
      $(this).attr('checked', 'checked');
    }
  });
  $(".cardadd_hasOtherCard input").each(function(index, el) {
    if ($(this).next().text() == '有他行信用卡') {
      $(this).attr('checked', 'checked');
    }
  });
  $(".cardadd_otherCards input").each(function(index, el) {
    if ($(this).next().text() == '其他') {
      $(this).attr('checked', 'checked');
    }
  });
}

function getPersonInfo(id) {
  $(":input").each(function() {
    $(this).removeAttr("checked");
    $(this).val("");
  });

  var Existlist = readFile("存量客户", "存量客户");
  for (var i = 0; i < Existlist.length; i++) {
    if (i > 0) {
      var proper = Existlist[i].split(",");
      if (proper[3] == id) {
        getInitInfo(proper);
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
  $inputText.each(function(index, el) {
    content.push($(this).val());
  });

  var $inputRadio = $(".right :input:radio");
  var radio_count = 0;
  $inputRadio.each(function(index, el) {
    if ($(this).is(':checked')) {
      content.push($(this).next().text());
      radio_count++;
    }
  });

  var $inputCheckbox = $(".right :input:checkbox")
  var checkbox_count = 1;
  var va = "|";
  $inputCheckbox.each(function(index, el) {
    if ($(this).is(':checked')) {
      va += $(this).next().text() + "|";      
    }
  });
  content.push(va);

  var card = [];
  $("#show_cards tbody tr td").each(function() {
    card.push($(this).text());
  });

  var value = "";
  for (var i = 0; i < card.length; i++) {
    if (i % 2 == 0) {
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
  client.push(content[2]);
  client.push(content[5]);

  var str = content[5];
  CreateFile("已营销客户", "已营销客户列表", client);
  CreateFile("已营销客户", str, content);
  alert("数据已经保存到录入确认及二次营销客户。");


  getNameList();
  $(":input").each(function() {
    $(this).removeAttr("checked");
    $(this).val("");
  });
  // window.location.href("main.html" + "?id=" + $("#show-info").text().split(" ")[1]);
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
  $("#name_list").children("thead").empty();
  $("#name_list").children("tbody").empty();

  var newHead = "<tr><td>姓名</td><td>性别</td><td>营销情况</td><td>营销备注</td><td>营销日期</td><td>柜员号</td></tr>"
  $("#name_list").children("thead").append(newHead);
  var Existlist = readFile("已营销客户", "已营销客户列表");
  for (var i = 0; i < Existlist.length; i++) {
    var tbody = $("#name_list").children("tbody");
    var proper = Existlist[i].split(",");
    var name = "clint-" + proper[2];
    var tr = '<tr id="' + name + '">';
    var td = "";
    var sellMarkLine = readFile("已营销客户", proper[2]);
    var sellMark = sellMarkLine[0].split(",");
    for (var j = 0; j < 4; j++) {
      if (j < 2) {
        var td = td + "<td>" + proper[j] + "</td>";
      } else {
        if (j == 2) {
          var showString;
          showString = sellMark[60];
          var td = td + "<td>" + showString + "</td>";
        } else {
          var td = td + "<td>" + sellMark[j + 35] + "</td>";
        }
      }
    }
    var td = td + "<td>" + sellMark[39] + "</td>";
    var readSellInfo = readFile("销售员信息", "销售员信息");
    var sellInfo = readSellInfo[0].split(",")
    var td = td + "<td>" + sellInfo[4] + "</td>";
    tbody.append(tr + td + '</tr>');
  }

  addListenerToSell();
}

function addListenerToSell() {
  $("#name_list tbody tr").on('click', function() {
    var clinet = $(this).attr("id");
    var id = clinet.split("-");
    getInfo(id[1]);
    hideSadeAsSell();
  });
}

function getInfo(id) {
  $(".right :input").each(function() {
    $(this).removeAttr("checked");
  });

  $("#show_cards tbody").empty();

  if (isSell(id)) {
    var content = readFile("已营销客户", id);
    for (var i = 0; i < content.length; i++) {
      var item = content[i].split(",");
      var len = item.length;
      var k = 0;
      $(".right :input:text").each(function() {
        $(this).attr("value", item[k]);
        k++;
      });
      // alert(k);
      $(".right :input:radio").each(function() {
        if ($(this).next().text() == item[k]) {
          $(this).attr("checked", "checked");
          k++;
        }
      });

      var j = parseInt(item[len - 2]) + parseInt(item[len - 3]);
      var banks = item[j].split("|");

      $(".cardadd_otherCards input").each(function() {
        for (var i = 0; i < banks.length; i++) {
          if ($(this).next().text() == banks[i]) {
            $(this).attr("checked", "checked");
          }
        }
      });

      var cards = item[j + 1];
      var keyvalue = cards.split("|");
      for (var i = 0; i < keyvalue.length - 1; i++) {
        var b = keyvalue[i].split("=");
        if (b) {
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
  $inputText.each(function(index, el) {
    content.push($(this).val());
  });

  var $inputRadio = $(".right :input:radio");
  var radio_count = 0;
  $inputRadio.each(function(index, el) {
    if ($(this).is(':checked')) {
      content.push($(this).next().text());
      radio_count++;
    }
  });

  var $inputCheckbox = $(".right :input:checkbox");
  var checkbox_count = 1;
  var va = "|";
  $inputCheckbox.each(function(index, el) {
    if ($(this).is(':checked')) {
      va += $(this).next().text() + "|";
    }
  });
  content.push(va);

  var card = [];
  $("#show_cards tbody tr td").each(function() {
    card.push($(this).text());
  });

  var value = "";
  for (var i = 0; i < card.length; i++) {
    if (i % 2 == 0) {
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
  client.push(content[2]);
  client.push(content[5]);
  var str = content[5];

  rewriteFile("已营销客户", str, content);
  alert("更新成功！！");
  getInfo($("#evidenceNumber").attr("value"));
  getHasSellClients();
}

//创建新用户
function getNew() {
  $("#show_cards tbody").empty();

  $("#name_list tbody").empty();

  $(":input").each(function() {
    $(this).removeAttr("checked");
    $(this).val("");
  });

  var infos = readFile("新增客户", "新增客户");
  var personInfos = infos[1].split("\t");
  // alert(personInfos);
  $("#name_list").children("thead").empty();
  $("#name_list").children("tbody").empty();

  var newHead = "<tr><td>姓名</td><td>性别</td></tr>"
  $("#name_list").children("thead").append(newHead);
  $("#name_list").children("tbody").append("<tr><td>" + personInfos[2] + "</td><td>" + personInfos[3] + "</td></tr>");

  $("#evidence").attr('value', '0');
  $("#create_postcode").attr('value', '510000');
  $("#nation").attr('value', '中国');
  $("#card_primarySchool").attr('value', '我的小学');
  $("#postcode").attr('value', '510000');
  $("#unitPostcode").attr('value', '510000');
  $("#card_liveTime").attr('value', '2010/01/01');
  $("#card_inTime").attr('value', '2010/01/01');

  $("#card_person1Telephone").attr('value', '0');
  $("#card_person2Telephone").attr('value', '0');
  $("#card_person1Address").attr('value', personInfos[6]);
  $("#card_person2Address").attr('value', personInfos[6]);
  $("#cardadd_hasCardsC").attr('value', '1');
  $("#cardadd_hasCardsM").attr('value', '1');
  $("#cardadd_hasCardsA").attr('value', '1');


  var sellPerson = readFile("销售员信息", "销售员信息");
  var bankNumber = sellPerson[0].split(",");
  $("#card_sellCode").attr('value', bankNumber[2]);

  $(".card_getMethod input").each(function(index, el) {
    if ($(this).next().text() == '自取') {
      $(this).attr('checked', 'checked');
    }
  });

  $(".cardadd_salary input").each(function(index, el) {
    if ($(this).next().text() == '否') {
      $(this).attr('checked', 'checked');
    }
  });
  $(".cardadd_buyCar input").each(function(index, el) {
    if ($(this).next().text() == '否') {
      $(this).attr('checked', 'checked');
    }
  });
  $(".cardadd_hasOtherCard input").each(function(index, el) {
    if ($(this).next().text() == '有') {
      $(this).attr('checked', 'checked');
    }
  });
  $(".cardadd_otherCards input").each(function(index, el) {
    if ($(this).next().text() == '其他') {
      $(this).attr('checked', 'checked');
    }
  });
  $("#name").val(personInfos[2]);
  $("#sex").val(personInfos[3]);
  var births = personInfos[5].split("-");
  var birth = births[0] + "/" + births[1] + "/" + births[2];
  $("#birth").val(birth);
  $("#address").val(personInfos[6]);
  $("#evidenceNumber").val(personInfos[7]);
  $("#evidence").val("0");
  var idLimitdate = personInfos[9].split("-");
  var validDate = idLimitdate[1].split(".");
  $("#idLimit").val(validDate[0] + "/" + validDate[1] + "/" + validDate[2]);

}

//搜素未营销的对应客户
function clientFilter() {
  var sex = "";
  var age = [];
  var useLimit = [];
  var useTimes = [];
  var dayMoney = [];
  var houseLoan = [];

  $(".search_sex input").each(function() {
    if ($(this).is(":checked")) {
      if($(this).next().text() == "男"){
        sex = 1;
      }
      if($(this).next().text() == "女"){
        sex = 2;
      }
    }
  });

  $(".search_age input").each(function() {
    age.push($(this).val());
  });

  $(".search_useLimit input").each(function() {
    useLimit.push($(this).val());
  });

  $(".search_useTimes input").each(function() {
    useTimes.push($(this).val());
  });

  $(".search_dayMoney input").each(function() {
    dayMoney.push($(this).val());
  });

  $(".search_houseLoan input").each(function() {
    houseLoan.push($(this).val());
  });

  var result;

  var Existlist = readFile("存量客户", "存量客户");
  var result = transfertoTwoDimension(Existlist);

  if (sex != "" && result.length > 0) {
    result = filter("性别", sex, sex, result);
  }
  if (age[0] != "" && result.length > 0) {
    result = filter("出生年月", age[0], age[1], result);
  }
  if (useLimit[0] != "" && result.length > 0) {
    result = filter("灵通卡使用期限", useLimit[0], useLimit[1], result);
  }
  if (useTimes[0] != "" && result.length > 0) {
    result = filter("灵通卡消费次数", useTimes[0], useTimes[1], result);
  }
  if (dayMoney[0] != "" && result.length > 0) {
    result = filter("半年日均资产", dayMoney[0], dayMoney[1], result);
  }
  if (houseLoan[0] != "" && result.length > 0) {
    result = filter("房贷金额", houseLoan[0], houseLoan[1], result);
  }

  if (result.length > 0) {
    getFilterList(result);
  } else {
    alert("筛选不到客户!");
  }
}

function getFilterList(result) {
  $("#name_list").children("tbody").empty();
  var Existlist = result;
  for (var i = 0; i < Existlist.length; i++) {
    var tbody = $("#name_list").children("tbody");

    if (!isSell(Existlist[i][3])) {

      var name = "clint-" + Existlist[i][3];
      var tr = '<tr id="' + name + '">';
      var td = "";
      for (var j = 0; j < 8; j++) {
        if (Existlist[i][j] == 1) Existlist[i][j] = "男";
        else if (Existlist[i][j] == 2) Existlist[i][j] = "女";
        if (j >= 2) {
          if (j == 7) {
            var td = td + "<td>" + Existlist[i][21 + j] + "</td>";
          } else {
            var td = td + "<td>" + Existlist[i][19 + j] + "</td>";
          }

        } else {
          var td = td + "<td>" + Existlist[i][j] + "</td>";
        }

      }
      tbody.append(tr + td + '</tr>');
    }
  }
  hideUpAndTwo();
  addListener();
}

function clearSexCheck() {
  $(".search_sex input").each(function(index, el) {
    if ($(this).is(':checked')) {
      $(this).removeAttr('checked');
    }
  });
}
$(function() {

  $("#forcheck").validate();

  $(":input").each(function() {
    $(this).removeAttr("checked");
    $(this).val("");
  });

  //读取销售员名字
  var list = readFile("销售员信息", "销售员信息");
  var staffInof = list[0].split(",")
  $("#show-info").text(staffInof[0] + " " + staffInof[1] + " 您好!");

  $("#printCard").hide();
  getNameList();

  //获取存量客户列表
  $("#getExisit").on("click", function() {
    $(":input").each(function() {
      $(this).removeAttr("checked");
      $(this).val("");
    });
    $("#searchArea").show();
    $("#printCard").hide();
    getNameList();


  });

  //获取已经营销的客户列表
  $("#getPast").on("click", function() {
    $(":input").each(function() {
      $(this).removeAttr("checked");
      $(this).val("");
    });
    $("#searchArea").hide();
    $("#saveAsSell").hide();
    getHasSellClients();


  });

  //保存成已营销的信息
  $("#saveAsSell").on("click", function() {
    writeClientTxt();
  });

  //更新已营销信息
  $("#update").on("click", function() {
    updateInfo();
  });

  //创建新用户
  $("#getNew").on("click", function() {
    $("#searchArea").hide();
    $("#printCard").hide();
    $("#update").hide();
    $("#saveAsTwo").hide();
    $("#saveAsSell").show();
    getNew();
  });

  //搜索
  $("#search").on("click", function() {
    clientFilter();
  });

  //不限性别
  $("#unLimitSex").on("click", function() {
    clearSexCheck();
  });
});