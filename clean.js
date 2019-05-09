/**
 * A method to recursively delete the distribution directory that works on Windows and Linux
 * Run from the command line with "node clean.js"
 */

var fs = require('fs');

function deleteFolderRecursive(path) {
  if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path).forEach(function(file){
      var curPath = path + "/" + file;

      if (fs.lstatSync(curPath).isDirectory()) { 
        deleteFolderRecursive(curPath);
      } 
      else { 
        fs.unlinkSync(curPath);
      }
    });

    console.log(`Deleting directory "${path}"...`);
    fs.rmdirSync(path);
  }
}

console.log("Deleting dist directory...");

deleteFolderRecursive("./dist");

console.log("Successfully removed dist directory!");