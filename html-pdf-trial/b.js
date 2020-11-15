var fs = require('fs');
var archiver = require('archiver');
const path = require('path');
const homedir = path.join(__dirname,'../','responsive-master') 
console.log('homedir',homedir)
var output = fs.createWriteStream(`${homedir}/test.zip`);
var archive = archiver('zip');

output.on('close', function() {
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

var file1 = __dirname + '/fixtures/file1.txt';

archive
  .append(fs.createReadStream(file1), { name: 'file1.txt' })
  .finalize();