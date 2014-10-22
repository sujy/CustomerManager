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

function toprint() {
	var info = readFile("打印文件", "打印");
	var item = info[0].split(",");
	var i = 0;
	$("#name").text(item[0]);
	$("#namePing").text(item[1]);
	$("#sex").text(item[2]);
	$("#telephone").text(item[3]);
	$("#phoneCode").text(item[4]);
	$("#evidence").text(item[5]);
	$("#evidenceNum").text(item[6]);
	$("#timeLimit").text(item[7]);
	$("#postcode").text(item[8]);
	$("#address").text(item[9]);
	$("#liveCondition").text(item[10]);
	$("#marriage").text(item[11]);
	$("#education").text(item[12]);
	$("#liveTime").text(item[13]);
	$("#primarySchool").text(item[14]);
	$("#unitPhone").text(item[15]);
	$("#unitPostcode").text(item[16]);
	$("#unitName").text(item[17]);
	$("#industry").text(item[18]);
	$("#inWorkTime").text(item[19]);
	$("#workAddress").text(item[20]);
	$("#unitAttr").text(item[21]);
	$("#job").text(item[22]);
	$("#position").text(item[23]);
	$("#salary").text(item[24]);
	$("#p1name").text(item[25]);
	$("#p1relation").text(item[26]);
	$("#p1phone").text(item[27]);
	$("#p2name").text(item[28]);
	$("#p2relation").text(item[29]);
	$("#p2phone").text(item[30]);

	$("#getCardMethod").text(item[31]);
	$("#cardSellCode").text(item[32]);
	$("#email").text(item[33]);
}

function printHeader() {
	var info = readFile("销售员信息", "销售员信息");
	var item = info[0].split(",");
	$("#AreaId").text(item[2]);
	$("#AreaBankId").text(item[3]);
	$("#AccountId").text(item[4]);

	$("#tableId").text(getNowFormatDate() + $("#evidenceNum").text());
}


function transToHtml(item) {
	var string = '<tr><td height="19" class="xl66" style="height: 14.25pt; border-top-color: currentColor; border-top-width: medium; border-top-style: none;">产品名称:</td>'+
                '<td class="xl82" style="border-right-color: black; border-left-color: currentColor; border-right-width: 0.5pt; border-left-width: medium; border-right-style: solid; border-left-style: none;" colspan="4">'+item[0]+'</td>'+
                '<td class="xl66" style="border-top-color: currentColor; border-left-color: currentColor; border-top-width: medium; border-left-width: medium; border-top-style: none; border-left-style: none;">联名编号</td>'+
                '<td class="xl66" class="xl67" style="border-top-color: currentColor; border-left-color: currentColor; border-top-width: medium; border-left-width: medium; border-top-style: none; border-left-style: none;">'+item[1]+'</td>'+
                
            '</tr>'+            
            '<tr height="19" style="height: 14.25pt;">'+            	
                '<td height="19" class="xl71" style="height: 14.25pt; border-top-color: currentColor; border-top-width: medium; border-top-style: none;">品牌</td>'+
                '<td class="xl65" style="border-top-color: currentColor; border-left-color: currentColor; border-top-width: medium; border-left-width: medium; border-top-style: none; border-left-style: none;">'+item[2]+'</td>'+
                '<td class="xl71" style="border-top-color: currentColor; border-left-color: currentColor; border-top-width: medium; border-left-width: medium; border-top-style: none; border-left-style: none;">卡类</td>'+
                '<td class="xl88" style="border-right-color: black; border-left-color: currentColor; border-right-width: 0.5pt; border-left-width: medium; border-right-style: solid; border-left-style: none;" colspan="2">'+item[3]+'</td>'+
                '<td class="xl71" style="border-top-color: currentColor; border-left-color: currentColor; border-top-width: medium; border-left-width: medium; border-top-style: none; border-left-style: none;">币种</td>'+
                '<td class="xl65" style="border-top-color: currentColor; border-left-color: currentColor; border-top-width: medium; border-left-width: medium; border-top-style: none; border-left-style: none;">'+item[4]+'</td>'+
            '</tr>'+
            '<tr height="19" style="height: 14.25pt;">'+
                '<td height="19" class="xl71" style="height: 14.25pt; border-top-color: currentColor; border-top-width: medium; border-top-style: none;">电子现金标志</td>'+
                '<td class="xl65" style="border-top-color: currentColor; border-left-color: currentColor; border-top-width: medium; border-left-width: medium; border-top-style: none; border-left-style: none;">'+item[5]+'</td>'+
                '<td class="xl71" style="border-top-color: currentColor; border-left-color: currentColor; border-top-width: medium; border-left-width: medium; border-top-style: none; border-left-style: none;">介质</td>'+
                '<td class="xl88" style="border-right-color: black; border-left-color: currentColor; border-right-width: 0.5pt; border-left-width: medium; border-right-style: solid; border-left-style: none;" colspan="2">'+item[6]+'</td>'+
                '<td class="xl71" style="border-top-color: currentColor; border-left-color: currentColor; border-top-width: medium; border-left-width: medium; border-top-style: none; border-left-style: none;"></td>'+
                '<td class="xl65" style="border-top-color: currentColor; border-left-color: currentColor; border-top-width: medium; border-left-width: medium; border-top-style: none; border-left-style: none;"></td>'+
            '</tr>';
    return string;

}

function printCardInfo() {
	var readCardInfo = readFile("打印文件","卡信息");
	var cardsInfo = readCardInfo[0].split("|");
	for(var i = 0; i < cardsInfo.length - 1; i++){
		var cardDetail = cardsInfo[i].split(",");
		var infoToTrans = [];
		if(i == 0){
			//名称
			infoToTrans.push(cardDetail[6]);
			//联名编号
			infoToTrans.push(cardDetail[11]);
			//品牌
			infoToTrans.push(cardDetail[9]);
			//卡类
			infoToTrans.push(cardDetail[10]);
			//币种
			infoToTrans.push(cardDetail[13]);
			//电子现金标志
			infoToTrans.push(cardDetail[16]);
			//介质
			infoToTrans.push(cardDetail[14]);
		} else {
			//名称
			infoToTrans.push(cardDetail[6 + 1]);
			//联名编号
			infoToTrans.push(cardDetail[11+ 1]);
			//品牌
			infoToTrans.push(cardDetail[9+ 1]);
			//卡类
			infoToTrans.push(cardDetail[10+ 1]);
			//币种
			infoToTrans.push(cardDetail[13+ 1]);
			//电子现金标志
			infoToTrans.push(cardDetail[16+ 1]);
			//介质
			infoToTrans.push(cardDetail[14+ 1]);
		}
		$("#beforeCardInfo").after(transToHtml(infoToTrans));
	}

}

$(function() {
	toprint();
	printCardInfo();
	printHeader();
});