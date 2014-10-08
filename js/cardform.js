$(document).ready(function() {
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
        if (Month >= 10) {
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

    function findCard() {
        var allCard = readCard();
        var cards = [];
        var cardcode = [];
        var cardname = [];
        var result = [];
        $("#show_cards tbody tr td").each(function(index, el) {
            cards.push($(this).text());
        });

        for (var i = 0; i < cards.length; i++) {
            if (i % 2 == 0)
                cardname.push(cards[i])
            else
                cardcode.push(cards[i]);
        }

        var temp = "";
        for (var i = 0; i < cardcode.length; i++) {
            for (var j = i + 1; j < allCard.length; j++) {
                if (cardcode[i] == allCard[j][2]) {
                    if(temp == allCard[j][2]){
                    } else {
                        result.push(allCard[j]);
                        temp = allCard[j][2];
                    }                    
                }
            }
        }
        return result;
    }

    function splitID(){
        var text = $("#show-info").text().split(" ");
        var id = text[1];
        var bankArea = "0" + id.substr(5,4);
        var bankCode = "0" + id.substr(9,4);
        var getIdMessage = [];
        getIdMessage.push(bankArea);
        getIdMessage.push(bankCode);
        return getIdMessage;
    }

    function getinfo(card,i) {
        var allinfo =[];        
        
        //0编号
        var cardformid = getNowFormatDate() + $("#evidenceNumber").attr("value");
        allinfo.push(cardformid);
        //1产品编码
        allinfo.push(card[2]);
        //2产品名称
        allinfo.push(card[6]);
        //3上传地区号
        var idMassage = splitID();
        allinfo.push(idMassage[0]);
        //4上传日期
        allinfo.push(getNowFormatDate());
        //5开户地区
        allinfo.push(idMassage[0]);
        //6受理网点
        allinfo.push(idMassage[1]);
        //7申请卡序号
        var cardNumber = "0" + "0" + (i + 1);
        allinfo.push(cardNumber);
        //8申请卡种
        allinfo.push(card[8]);
        //9申请品牌
        allinfo.push(card[9]);
        //10申请卡类
        allinfo.push(card[10]);
        //11申请卡BIN
        allinfo.push(card[7]);
        //12卡片介质
        allinfo.push(card[14]);
        //13联名编号
        allinfo.push(card[11]);
        //14币种组合代码
        allinfo.push(card[13]);
        //15授权控制代码
        allinfo.push(card[19]);
        //16卡片控制代码
        allinfo.push(card[20]);
        //17电子现金标志
        allinfo.push(card[16]);
        //18电子现金余额上限
        allinfo.push(card[27]);
        //19电子现金余额
        allinfo.push(card[28]);
        //20电子现金单笔交易限额
        allinfo.push(card[29]);
        //21电子现金余额重置阀值
        allinfo.push(card[30]);
        //22圈存方式
        allinfo.push(card[31]);
        //23圈存额度
        allinfo.push(card[32]);

        //24主卡移动电话
        var telePhone = $("#phone").attr("value");
        allinfo.push(telePhone);

        //25开通email对账单
        if($("#card_email").attr('value') != ""){
            
            allinfo.push("1");
        }else {
            allinfo.push("");
        }
        //26email
        var email = $("#card_email").attr('value');
        allinfo.push(email);

        //27发送短信账单手机号
        allinfo.push(telePhone);
        return allinfo;
    }

    function writeInfo(infoArr){
        str = "";
        str += infoArr[0] + ",";
        str += infoArr[1] + ",";
        str += infoArr[2] + ",";
        str += "" + ",";
        str += infoArr[3] + ",";
        str += "00008" + ",";
        str += infoArr[4] + ",";
        str += "002" + ",";
        str += infoArr[5] + ",";
        str += infoArr[6] + ",";
        str += "0" + ",";
        str += infoArr[7] + ",";
        str += infoArr[8] + ",";
        str += infoArr[9] + ",";
        str += infoArr[10] + ",";
        str += infoArr[11] + ",";
        str += " " + ",";
        str += infoArr[12] + ",";
        str += infoArr[13] + ",";
        str += "" + ",";
        str += "" + ",";
        str += infoArr[14] + ",";
        str += "0,3,0,5,0,2,,0,0,0,,1,,,," ;
        str += infoArr[15] + ",";
        str += infoArr[16] + ",";
        str += "1,,0,,,,,,0,,,,,,";
        str += infoArr[17] + ",";
        str += infoArr[18] + ",";
        str += infoArr[19] + ",";
        str += infoArr[20] + ",";
        str += infoArr[21] + ",";
        str += infoArr[22] + ",";
        str += infoArr[23] + ",";
        str += ",,,,,,,,,,,,,,,,,,,,,,2,,,,,,,,,,,,,,,,,,,,,,,1,";
        str += infoArr[24] + ",";
        str += "0,0,4,1,,,,,,,,,,,,,";
        str += infoArr[25] + ",";
        str += infoArr[26] + ",";
        str += "1" + ",";
        str += infoArr[27] + ",";
        str += ",1,1,1,,,,,,,0,0,0,,,,,,,,,,,,,,,,1,,1,1,,,,,,,,0,,,,,,,,,,,,,,2,,,0,0,,,,,,,,,,,,,,,,,,,,,,,,";
        return str;
    }

    $("#saveAsTwo").click(function(event) {
        var cards = findCard();
        for (var i = 0; i < cards.length; i++){
            var infoArr = getinfo(cards[i],i);
            var content = writeInfo(infoArr);
            var filename = getNowFormatDate() + $("#evidenceNumber").attr("value") + "-卡";
            if(i == 0){                
                rewriteFile("用户表和卡表", filename, content);
            } else {
                CreateFile("用户表和卡表", filename, content);
            }
        }

    });
});