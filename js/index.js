$(document).ready(function() {
   var list = readFile("员工信息", "员工列表");
   for (var i = 0; i < list.length; i++) {
      var person = list[i].split(" ");
      var li = "<option value=\"" + person[1] + "\">" + person[0] + " " + person[1] + "</option>";
      $("#staff-list").append(li);
   }

   $("#confirm").click(function(event) {
      var id = $("#staff-list").val();
      window.location.href("main.html"+"?id=" + id);
   });
});