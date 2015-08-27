var fs = require('fs');
var huffman = require('./huffman.js');

console.log('Reading file...');
var text = fs.readFileSync("C:\\Users\\jmbri\\Documents\\GitHub\\js-huffman-compression\\test\\test.exe").toString();
console.log('Creating compressor...');
var tree = huffman.createCompressor({ content: text });
tree.saveFile('C:\\Users\\jmbri\\Documents\\compressor.jmb');
console.log('Ellapsed time: %dms', tree.time);
console.log('Compressing...');
var c = huffman.compress(tree);
var old_size = tree.content.length;
var new_size = c.output.length / 8;
console.log('Ellapsed time: %dms', c.time);
console.log('Old size: %d bytes', old_size);
console.log('New size: %d bytes', new_size);
console.log('Compression ratio: %d%', 100-((new_size/old_size)*100));
console.log('Compression rate: %d bytes/s', old_size*1000/c.time);

console.log('Now uncompressing...');
var d = huffman.uncompress(tree, c.output);
console.log('Ellapsed time: %dms', d.time);