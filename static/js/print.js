function printFile() {
	var printlist = [];
	printlist.push($("#name").val());
	printlist.push($("#namePing").val().toUpperCase());
	printlist.push($("#sex").val());
	printlist.push($("#phone").val());
	printlist.push($("#homePhone").val());
	printlist.push($("#evidence").val());
	printlist.push($("#evidenceNumber").val());
	printlist.push($("#idLimit").val());
	printlist.push($("#create_postcode").val());
	printlist.push($("#address_province").val()+$("#address_city").val()+$("#address_area").val()+$("#address").val());
	$("#person_apartment :input:radio").each(function(){
		if ($(this).is(":checked")){
			printlist.push($(this).next().text());
		}
	});
	$("#person_marriage :input:radio").each(function(){
		if ($(this).is(":checked")){
			printlist.push($(this).next().text());
		}
	});
	$("#person_education :input:radio").each(function(){
		if ($(this).is(":checked")){
			printlist.push($(this).next().text());
		}
	});
	printlist.push($("#card_liveTime").val());
	printlist.push($("#card_primarySchool").val());
	printlist.push($("#unitPhone").val());
	printlist.push($("#unitPostcode").val());
	printlist.push($("#unit").val());
	$("#person_industry :input:radio").each(function(){
		if ($(this).is(":checked")){
			printlist.push($(this).next().text());
		}
	});
	printlist.push($("#card_inTime").val());
	printlist.push($("#unitProvince").val()+$("#unitCity").val()+$("#unitArea").val()+$("#unitAddress").val());
	$("#person_workplace :input:radio").each(function(){
		if ($(this).is(":checked")){
			printlist.push($(this).next().text());
		}
	});
	$("#person_job :input:radio").each(function(){
		if ($(this).is(":checked")){
			printlist.push($(this).next().text());
		}
	});
	$("#person_post :input:radio").each(function(){
		if ($(this).is(":checked")){
			printlist.push($(this).next().text());
		}
	});
	printlist.push($("#card_salary").val());
	printlist.push($("#card_person1Name").val());
	$(".card_person1Relation :input:radio").each(function(){
		if ($(this).is(":checked")){
			printlist.push($(this).next().text());
		}
	});
	printlist.push($("#card_person1Phone").val());
	printlist.push($("#card_person2Name").val());
	$(".card_person2Relation :input:radio").each(function(){
		if ($(this).is(":checked")){
			printlist.push($(this).next().text());
		}
	});
	printlist.push($("#card_person2Phone").val());

	$(".card_getMethod input").each(function(){
		if ($(this).is(":checked")){
			printlist.push($(this).next().text());
		}
	});
	printlist.push($("#card_sellCode").val());
	printlist.push($("#card_email").val());
	var id = $("#evidenceNumber").val();

	rewriteFile("打印文件", "打印", printlist);
}

$(function() {
	$("#printCard").click(function(){
		printFile();
		window.location.href("print.html");
	});
});


