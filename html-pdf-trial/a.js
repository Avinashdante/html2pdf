const fs = require('fs');
const path = require('path')
const homedir = path.join(__dirname,'../','responsive-master') 
console.log(homedir)
var pdf = require('html-pdf');
var html = fs.readFileSync(`W:/aapp/responsive-master/testfiles/index.html`, 'utf8');
console.log(html)
// var options = { format: 'Letter' };
var options = { "format": "A3", "orientation": "landscape", base: `http://desktop-l68rhaa:3000/`};
var options = { "format": "A3", "orientation": "landscape", base: `file:///base directory`};
// "format": "Letter",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
// "orientation": "portrait",
 

pdf.create(html, options).toFile('./a.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});
