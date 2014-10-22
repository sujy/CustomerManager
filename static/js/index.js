$(document).ready(function() {

   $("#firstIn").hide();
   $("#hasBefore").hide();

   var fso = new ActiveXObject("Scripting.FileSystemObject");
   var dir = getlocation() + "/" + "销售员信息" + "/" + "销售员信息.txt";
   var staff = new Array();
   if (!fso.FileExists(dir)) {
      $("#firstIn").show();
   } else {
      var f = fso.OpenTextFile(dir, 1);
      var s = "";
      while (!f.AtEndOfStream) {
         s = f.ReadLine();
         staff.push(s);
      }
      f.Close();

      var staffMesaage = staff[0].split(",");

      $("#hasBefore h1").text(staffMesaage[0] + " 欢迎您!");
      $("#hasBefore").show();
   }

   // var list = readFile("员工信息", "员工列表");
   // for (var i = 0; i < list.length; i++) {
   //    var person = list[i].split(" ");
   //    var li = "<option value=\"" + person[1] + "\">" + person[0] + " " + person[1] + "</option>";
   //    $("#staff-list").append(li);
   // }

   $("#confirm").click(function(event) {
      var infomation = [];
      $("#firstIn input").each(function(index, el) {
         infomation.push($(this).val());
      });
      rewriteFile("销售员信息", "销售员信息", infomation);
      var staffInfo = readFile("销售员信息", "销售员信息");
      var staffMesaage = staffInfo[0].split(",");
      window.location.href("main.html" + "?id=" + staffMesaage[1]);
   });

   $("#login").click(function(event) {
      /* Act on the event */
      var staffInfo = readFile("销售员信息", "销售员信息");
      var staffMesaage = staffInfo[0].split(",");
      window.location.href("main.html" + "?id=" + staffMesaage[1]);
   });
});