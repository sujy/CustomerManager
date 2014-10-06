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

   if (!fso.FileExists(dir + "/" + filename + ".txt")) {
      tf = fso.CreateTextFile(dir + "/" + filename + ".txt", true);
      //创建一个文件夹
      // 写一行，并且带有新行字符。
      tf.WriteLine(content);
      // 向文件写三个新行字符。  
      //tf.WriteBlankLines(3);
      // 写一行。
      // tf.Write("This is a test.");
      tf.Close(); //关闭
   } else {
      tf = fso.OpenTextFile(dir + "/" + filename + ".txt", 8);
      tf.WriteLine(content);
      tf.Close();
   }
}

//将带!!表头!!的数据转换成二维数组
function transfertoTwoDimension(list) {
   var result = new Array();
   for (var i = 1; i < list.length; i++) {
      var data = list[i].split(",");
      result[i - 1] = new Array();
      for (var j = 0; j < data.length; j++) {
         result[i - 1][j] = data[j];
      }
   }
   return result;

}

//读取卡表
function readCard(){
   var list = readFile("卡表", "卡表");
   var result = transfertoTwoDimension(list);
   // alert(result[11][6]);
   return result;
}

//按照条件筛选
//筛选值 最小值 最大值 要筛选的二维数组
function filter(key, value_small, value_big, passlist) {
   //read the user data to array
   var Existlist = readFile("存量客户", "存量客户");
   var allUser = transfertoTwoDimension(Existlist);
   var filter_list = [];
   var result = [];

   //set up the dictionary
   var dic = {
      "性别": 1,
      "出生年月": 5,
      "灵通卡使用期限": 21,
      "灵通卡消费次数": 22,
      "半年日均资产": 23,
      "房贷金额": 28
   };

   //确定筛选的数据位置
   var filter_data = null;
   for (var i in dic) {
      if (i == key)
         filter_data = dic[i];
   }
   alert(filter_data);
   if (filter_data == null)
      alert("找不到筛选条件");

   //从总数据中找到要符合要求的数据 即没有改变传入数组
   for (var i = 0; i < passlist.length; i++) {
      for (var j = 0; j < allUser.length; j++) {
         if (allUser[j][3] == passlist[i][3]) {
            filter_list.push(allUser[i])
         }
      }
   }
   alert(filter_list);

   //开始筛选
   if (filter_list.length < 1) {
      alert("搜索不到符合条件的客户");
   } else {
      //年龄筛选特别处理
      if (filter_data == 5) {
         for (var i = 0; i < filter_list.length; i++) {
            var birth = filter_list[i][filter_data].split("/");
            var filter_birth = birth[0] + birth[1] + birth[2];

            if (filter_birth >= value_small &&
               filter_birth <= value_big) {
               result.push(filter_list[i]);
               alert(filter_birth + " " + value_small + " " + value_big)
            }
         }
      } else {
         //其他情况筛选
         for (var i = 0; i < filter_list.length; i++) {
            if (filter_list[i][filter_data] >= value_small &&
               filter_list[i][filter_data] <= value_big) {
               result.push(filter_list[i]);
               alert(filter_list[i][filter_data] + " " + value_small + " " + value_big)
            }
         }
      }
      alert(result);
   }
   return result;
}

function rewriteFile(directory, filename, content){
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

   if (!fso.FileExists(dir + "/" + filename + ".txt")) {
      tf = fso.CreateTextFile(dir + "/" + filename + ".txt", true);
      tf.WriteLine(content);
      tf.Close(); //关闭
   } else {
      tf = fso.OpenTextFile(dir + "/" + filename + ".txt", 2);
      tf.WriteLine(content);
      tf.Close();
   }
}

var list = readFile("存量客户", "存量客户");
var passlist = transfertoTwoDimension(list);
// filter("半年日均资产", 0, 1285514, passlist);

readCard();