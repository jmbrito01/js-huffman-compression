var fs = require('fs');
var huffman = require('./huffman.js');

var text = fs.readFileSync('FILE_PATH').toString();
var tree = huffman.createCompressor({ content: text });
console.log('Compressing...');
var c = huffman.compress(tree);
var old_size = tree.content.length;
var new_size = c.output.length / 8;
console.log('Ellapsed time: %dms', c.time);
console.log('Old size: %d bytes', old_size);
console.log('New size: %d bytes', new_size);
console.log('Compression ratio: %d%', (new_size/old_size)*100);

console.log('Now uncompressing...');
var d = huffman.uncompress(tree, c.output);
console.log('Ellapsed time: %dms', d.time);

console.log('Hello world');