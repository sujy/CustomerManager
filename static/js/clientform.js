$(document).ready(function() {

    var valueDic = {
        "夫妻": 5,
        "父子": 1,
        "母子": 2,
        "兄弟姐妹": 3,
        "同学": 6,
        "同事": 9,
        "朋友": 8,
        "未婚": 1,
        "已婚": 2,
        "其他婚姻状况": 6,
        "博士": 1,
        "硕士": 2,
        "本科": 3,
        "专科": 4,
        "高中": 5,
        "自有住房": 1,
        "贷款购房": 2,
        "租房": 3,
        "其他住宅状况": 4,
        "国有": 10,
        "集体": 20,
        "私营": 60,
        "民营": 90,
        "股份": 50,
        "其他单位": 190,
        "农牧": 14,
        "邮电": 10,
        "房产": 7,
        "教卫": 12,
        "工业": 5,
        "银行": 16,
        "证券": 1,
        "保险": 6,
        "商业": 3,
        "机关团体": 4,
        "其他行业": 9,
        "公务": 1,
        "事业": 2,
        "工人": 6,
        "农民": 7,
        "军人": 4,
        "职员": 3,
        "私人业主": 30,
        "学生": 17,
        "自由": 5,
        "其他职业": 8,
        "无": 29,
        "负责人": 3,
        "总经理": 4,
        "经理": 5,
        "职员": 6,
        "其他职务": 0,
        "代发工资客户": 1,
        "非代发工资客户": 2,
        "有自购车": 0,
        "没有自购车": 1,
        "1年内": 1,
        "1年": 2,
        "2年": 3,
        "3年": 4,
        "4年以上": 5,
        "有他行信用卡": 0,
        "没有他行信用卡": 1,
    };

    function splitID() {
        var text = $("#show-info").text().split(" ");
        var id = text[1];
        var bankArea = "0" + id.substr(5, 4);
        var bankCode = "0" + id.substr(9, 4);
        var getIdMessage = [];
        getIdMessage.push(bankArea);
        getIdMessage.push(bankCode);
        return getIdMessage;
    }

    function getNowFormatDate() {
        var day = new Date();
        var Year = 0;
        var Month = 0;
        var Day = 0;
        var CurrentDate = "";
        Year = day.getFullYear();
        Month = day.getMonth() + 1;
        Day = day.getDate();
        CurrentDate += Year;
        if (parseInt(Month) >= 10) {
            CurrentDate += Month;
        } else {
            CurrentDate += "0" + Month;
        }
        if (Day >= 10) {
            CurrentDate += Day;
        } else {
            CurrentDate += "0" + Day;
        }
        return CurrentDate;
    }

    function getValue(id) {
        var flag = false;
        var result;
        // alert($(id + " :input").next());
        // alert($(id + " :input").html());
        $(id + " :input:radio").each(function() {
            if ($(this).is(':checked')) {
                result = valueDic[$(this).next().text()];
                // alert(result + $(this).next().text());
                flag = true;
            }
        });
        if (flag == false) {
            alert("请选择" + $(id + ' .input-group-addon').text());
        } else {
            return result;
        }
        // return 0
    }

    function dealWithDate(str) {
        var arr = str.split("/");
        var month = parseInt(arr[1]);
        var day = parseInt(arr[2]);

        if (month >= 10) {} else {
            month = "0" + month;
        }
        if (day >= 10) {} else {
            day = "0" + day;
        }
        var result = arr[0] + "-" + month + "-" + day;
        return result;
    }

    function getPersoninfo() {
        var info = [];
        var id_Massage = splitID();
        //0编号
        var clientformid = getNowFormatDate() + $("#evidenceNumber").attr("value");
        info.push(clientformid);
        //1上传地区号
        info.push(id_Massage[0]);
        //2上传网点号
        info.push("00008");
        //3上传日期
        info.push(getNowFormatDate());
        //4序列号
        info.push("001");
        //5开户地区
        info.push(id_Massage[0]);
        //6受理网点
        info.push(id_Massage[1]);
        //7领卡网点
        info.push($("#card_sellCode").attr('value'));
        //8证件类型
        info.push($("#evidence").attr('value'));
        //9证件号码
        info.push($("#evidenceNumber").attr('value'));
        //10姓名
        info.push($("#name").attr('value'));
        //11姓名拼音
        info.push($("#namePing").attr('value').toUpperCase());
        //12性别
        if ($("#sex").attr('value') == "男") {
            info.push("1");
        } else {
            info.push("2");
        }
        //13营销代码1
        var text = $("#show-info").text().split(" ");
        var id = text[1];
        info.push(id.substr(0, 10).toString());
        //14营销代码2
        info.push(id.substr(10, 3).toString());
        //15营销代码3
        info.push(id.substr(13, 7).toString());
        //16出生日期
        // var birth = $("#birth").attr('value');
        info.push($("#birth").attr('value'));
        //17婚姻状况
        info.push(getValue("#person_marriage"));
        //18受教育程度
        info.push(getValue("#person_education"));
        //19住房情况
        info.push(getValue("#person_apartment"));
        //20住宅地址省份
        info.push($("#address_province").attr('value'));
        //21住宅地址市
        info.push($("#address_city").attr('value'));
        //22住宅地址县(区)
        info.push($("#address_area").attr('value'));
        //23住宅地址
        info.push($("#address").attr('value'));
        //24住宅邮编
        info.push($("#postcode").attr('value'));
        //25何时入住现址
        var livetime = $("#card_liveTime").attr('value');
        info.push(dealWithDate(livetime));
        //26住宅电话区号
        info.push($("#phoneAreaCode").attr('value'));
        //27住宅电话号码
        info.push($("#homePhone").attr('value'));
        //28手机号码
        info.push($("#phone").attr('value'));
        //29电子邮箱
        info.push($("#card_email").attr('value'));
        //30工作单位名称
        info.push($("#unit").attr('value'));
        //31职务
        info.push(getValue("#person_post"));
        //32单位电话区号
        info.push($("#unitPhoneAreaCode").attr('value'));
        //33单位电话号码
        info.push($("#unitPhone").attr('value'));
        //34单位地址省份
        info.push($("#unitProvince").attr('value'));
        //35单位地址市
        info.push($("#unitCity").attr('value'));
        //36单位地址县(区)
        info.push($("#unitArea").attr('value'));
        //37工作单位地址
        info.push($("#unitAddress").attr('value'));
        //38单位邮编
        info.push($("#unitPostcode").attr('value'));
        //39进入现单位工作时间
        var worktime = $("#card_liveTime").attr('value');
        var worktimeDeal = dealWithDate(worktime).split("-");
        info.push(worktimeDeal[0] + worktimeDeal[1]);
        //40本人年收入
        info.push($("#card_salary").attr('value'));
        //41单位性质
        info.push(getValue("#person_workplace"));
        //42职业及职级
        info.push(getValue("#person_job"));
        //43在我行代发工资
        info.push(getValue(".cardadd_salary"));
        //44是否持有他行信用卡
        info.push(getValue(".cardadd_hasOtherCard"));
        //45已持有他行信用卡
        if (getValue(".cardadd_hasOtherCard") == 0) {
            info.push("000001");
        } else {
            info.push("");
        }
        //46自购车状况
        info.push(getValue(".cardadd_buyCar"));
        //47联系人1姓名
        info.push($("#card_person1Name").attr('value'));
        //48联系人1与主卡联系人关系
        info.push(getValue(".card_person1Relation"));
        //49联系人1住址
        info.push($("#card_person1Address").attr('value'));
        //50联系人1联系电话区号
        info.push($("#card_person1TelephoneCode").attr('value'));
        //51联系人1联系电话号码
        info.push($("#card_person1Telephone").attr('value'));
        //52联系人1手机
        info.push($("#card_person1Phone").attr('value'));
        //53联系人2姓名
        info.push($("#card_person2Name").attr('value'));
        //54联系人2与主卡申请人关系
        info.push(getValue(".card_person2Relation"));
        //55联系人2手机
        info.push($("#card_person2Phone").attr('value'));
        //56联系人2联系电话区号
        info.push($("#card_person2TelephoneCode").attr('value'));
        //57联系人2联系电话号码
        info.push($("#card_person2Telephone").attr('value'));
        //58证件有效期
        var validdate = $("#idLimit").attr('value');
        info.push(dealWithDate(validdate));
        //59国籍
        info.push(156);

        return info;

    }

    function writeAllInfo(inArr) {
        var str = "";
        str += inArr[0] + ",";
        str += inArr[1] + ",";
        str += inArr[2] + ",";
        str += inArr[3] + ",";
        str += inArr[4] + ",";
        str += inArr[5] + ",";
        str += inArr[6] + ",";
        str += inArr[7] + ",";
        str += ",2,,,";
        str += inArr[8] + ",";
        str += inArr[9] + ",";
        str += inArr[10] + ",";
        str += inArr[11] + ",";
        str += inArr[12] + ",";
        str += inArr[13] + ",";
        str += inArr[14] + ",";
        str += inArr[15] + ",";
        str += ",";
        str += inArr[16] + ",";
        str += inArr[17] + ",";
        str += inArr[18] + ",";
        str += inArr[19] + ",";
        str += inArr[20] + ",";
        str += inArr[21] + ",";
        str += inArr[22] + ",";
        str += inArr[23] + ",";
        str += inArr[24] + ",";
        str += inArr[25] + ",";
        str += inArr[26] + ",";
        str += inArr[27] + ",";
        str += ",";
        str += inArr[28] + ",";
        str += inArr[29] + ",";
        str += inArr[30] + ",";
        str += "" + ",";
        str += inArr[31] + ",";
        str += inArr[32] + ",";
        str += inArr[33] + ",";
        str += ",";
        str += inArr[34] + ",";
        str += inArr[35] + ",";
        str += inArr[36] + ",";
        str += inArr[37] + ",";
        str += inArr[38] + ",";
        str += inArr[39] + ",";
        str += inArr[40] + ",";
        str += inArr[41] + ",";
        str += inArr[42] + ",";
        str += ",,,,,0000,000,,000000,";
        str += inArr[43] + ",";
        str += inArr[44] + ",";
        str += inArr[45] + ",";
        str += inArr[46] + ",";
        str += ",,,";
        str += inArr[47] + ",";
        str += ",";
        str += inArr[48] + ",";
        str += inArr[49] + ",";
        str += inArr[50] + ",";
        str += inArr[51] + ",";
        str += ",";
        str += inArr[52] + ",";
        str += inArr[53] + ",";
        str += ",";
        str += inArr[54] + ",";
        str += ",";
        str += inArr[55] + ",";
        str += inArr[56] + ",";
        str += inArr[57] + ",";
        str += ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,1,,1,,,,,,,,,,,,,,,,,";
        str += inArr[59] + ",";
        str += ",";
        str += inArr[58] + ",";
        str += ",,";
        str += inArr[59] + ",";
        str += ",,,,,,,,,,,,,,,,,,,,,,0,0,000,";


        filename = getNowFormatDate() + $("#evidenceNumber").attr("value") + "-客户";
        rewriteFile("用户表和卡表", filename, str);
        alert("保存用户表成功!");
    }

    function checkAllInfo() {
        var flag = false;
        $('.exist_clients :input:text').each(function(index, el) {
            if ($(this).attr('value') == "") {
                if($(this).attr('id') == "remark"){
                }else {
                    alert("请填写" + $(this).prev().text());
                    flag = true;
                }
                
            }
        });
        $('.cardInfomation :input:text').each(function(index, el) {
            if ($(this).attr('value') == "") {
                alert("请填写" + $(this).prev().text());
                flag = true;
            }
        });
        if (flag == true) {
            return true;
        } else {
            return false;
        }
    }

    function updateInfoBeforeSave() {
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
        // alert("保存成功!");
        getInfo($("#evidenceNumber").attr("value"));
        getHasSellClients();
    }
    $("#saveAsTwo").click(function(event) {
        updateInfoBeforeSave();
        if (checkAllInfo()) {
            alert("保存用户表失败,请完成所有必填信息再生成用户表");
        } else {
            writeAllInfo(getPersoninfo());
        }
    });
});