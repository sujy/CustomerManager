/**
 *Folder的API：
 *任务 方法
 *创建文件夹。 FileSystemObject.CreateFolder
 *删除文件夹。 Folder.Delete 或 FileSystemObject.DeleteFolder
 *移动文件夹。 Folder.Move 或 FileSystemObject.MoveFolder
 *复制文件夹。 Folder.Copy 或 FileSystemObject.CopyFolder
 *检索文件夹的名字。 Folder.Name
 *如果文件夹在驱动器上存在，则找出它。 FileSystemObject.FolderExists
 *获得现有 Folder 对象的实例。 FileSystemObject.GetFolder
 *找出文件夹的父文件夹名。 FileSystemObject.GetParentFolderName
 *找出系统文件夹的路径。 FileSystemObject.GetSpecialFolder
 */


//得到当前文件夹
function getlocation() {
   var loc = window.location.pathname;
   var dir = loc.substring(0, loc.lastIndexOf('/'));
   if (dir.substr(0, 1) == '/')
      dir = dir.substr(1);
   return dir;
}

//创建文件夹
function CreateFolder(foldername) {
   var dir = getlocation();
   var fso = new ActiveXObject("Scripting.FileSystemObject");
   if (!fso.FolderExists(dir + "/" + foldername)) {
      //如果目录不存在，则创建一个目录
      fso.CreateFolder(dir + "/" + foldername);
   } else {
      alert("已经存在 " + foldername + " 目录");
   }
}

//读文件
function readFile(directory, filename) {
   var fso = new ActiveXObject("Scripting.FileSystemObject");
   var dir = getlocation();
   var result = new Array();
   if (directory != "") {
      dir = dir + "/" + directory;
   }
   if (!fso.FolderExists(dir)) {
      alert("目录 " + dir + "不存在");
   } else {
      if (!fso.FileExists(dir + "/" + filename + ".txt")) {
         alert("文件 " + dir + "/" + filename + ".txt" + "不存在");
      } else {
         var f = fso.OpenTextFile(dir + "/" + filename + ".txt", 1);
         var s = "";
         while (!f.AtEndOfStream) {
            s = f.ReadLine();
            result.push(s);
         }
         f.Close();
         return result;
      }
   }
}

//创建文件
function CreateFile(directory, filename, content) {
   var fso, tf;
   var dir = getlocation();
   fso = new ActiveXObject("Scripting.FileSystemObject");
   if (!fso.FolderExists(dir + "/" + directory)) {
      //如果目录不存在，则创建一个目录
      fso.CreateFolder(dir + "/" + directory);
   }
   if (directory != "") {
      dir = dir + "/" + directory;
   }
   tf = fso.CreateTextFile(dir + "/" + filename + ".txt", true);
   //创建一个文件夹
   // 写一行，并且带有新行字符。
   tf.WriteLine(content);
   // 向文件写三个新行字符。  
   tf.WriteBlankLines(3);
   // 写一行。
   // tf.Write("This is a test.");
   tf.Close(); //关闭
}

$("#write").click(function() {
   CreateFile("", "test", $("#in").val().toString());
});

$("#read").click(function() {
   $("#show").val(readFile("", "test"));
});

$(document).ready(function() {
   var list = readFile("员工信息", "员工列表");
   for (var i = 0; i < list.length; i++) {
      var person = list[i].split(" ");
      var li = "<option value=\"" + person[1] + "\">" + person[0] + " " + person[1] +"</option>";
      $("#staff-list").append(li);
   }
});