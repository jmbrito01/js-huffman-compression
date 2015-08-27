var TreeModel = require('tree-model');

function getLetterOccurance(text) {
    var letters = [];
    for (var i = 0; i < text.length; i++) {
        var idx = -1;
        for (var j = 0; j < letters.length; j++) {
            if (letters[j].name == text[i])
                idx = j;
        }
        if (idx == -1) letters.push({ name: text[i], count: 1 });
        else letters[idx].count++;
    }
    return letters;
}

function mergeTree(tree) {
    if (tree.length <= 2) return false;
    tree.sort(function (a, b) { return a.count - b.count; });
    var temp = [tree[0], tree[1]];
    tree[0] = {
        children: [temp[0], temp[1]],
        count: temp[0].count+temp[1].count
    };
    tree.splice(1, 1);
    return true;
}

function initTree(obj) {
    obj.tree.children = obj.letters;
    obj.tree.deepness = 0;
    while (mergeTree(obj.tree.children)) { obj.tree.deepness++; };
    console.log('Deepness: ', obj.tree.deepness);
}

function getAddressByName(element, name, address) {
    if (address === undefined) address = "";
    if (element.name == name) return address;
    else if (element.children !== undefined) {
        return getAddressByName(element.children[0], name, address + '0') || getAddressByName(element.children[1], name, address + '1');
    } else return null;
}

function getNameByAddress(tree, address) {
    var current = tree;
    for (var i = 0; i < address.length; i++) {
        if (current.children !== undefined) {
            current = current.children[parseInt(address[i])];
        }
    }
    if (current.name !== undefined) return current.name;
    else return null;
}

function isPath(tree, address) {
    return getNameByAddress(tree, address) == null;
}

exports.createCompressor = function (compressor) {
    compressor.letters = getLetterOccurance(compressor.content);
    compressor.tree = [];
    initTree(compressor);
    return compressor;
}

exports.compress = function (compressor) {
    var started = (new Date()).getTime();
    var output = "";
    for (var i = 0; i < compressor.content.length; i++) {
        output += getAddressByName(compressor.tree, compressor.content[i]);
    }
    return {
        output: output,
        time: (new Date()).getTime() - started
    };
}

exports.uncompress = function (compressor, input) {
    var started = (new Date()).getTime();
    var output = "";
    for (var i = 0; i < input.length; i++) {
        var j = 1;
        while (isPath(compressor.tree, input.substr(i, j))) j++;
        output += getNameByAddress(compressor.tree, input.substr(i, j));
        i += j - 1;
        continue;
        
    }
    return {
        output: output,
        time: (new Date()).getTime() - started
    };
}