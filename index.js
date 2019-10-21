function addKeyWord() {
    var keyWordInput = document.querySelector('.add-key-word-input');
    var keyWord = keyWordInput.value.trim();
    if (!keyWord) {
        console.error('No text input');
        keyWordInput.value = '';
        return;
    }
    keyWordInput.value = '';
    var newListItem = document.createElement('li');
    newListItem.textContent = keyWord;
    newListItem.classList.add('keyword');
    document.querySelector('.key-word-list').appendChild(newListItem);
}
function anazyle(sourceCode) {
    var keyWords = getKeyWords();
    var delimeters = getDelimeters(keyWords);
    var identifierArray = [];
    var digitArray = [];
    console.log(keyWords);
    console.log(delimeters);
    var identifier = '';
    var digit = '';
    for (var i = 0; i < sourceCode.length; i++) {
        var char = sourceCode[i];
        if (/[a-z]/i.test(char)) {
            identifier = identifier.concat(char);
        }
        else if (/\d/i.test(char)) {
            if (identifier.length) {
                identifier = identifier.concat(char);
            }
            else {
                digit = digit.concat(char);
            }
        }
        else {
            if (identifier.length) {
                identifierArray.push(identifier);
                identifier = '';
                // lookup goes here
            }
            if (digit.length) {
                digitArray.push(digit);
                digit = '';
            }
        }
    }
    // TODO: refactor this
    if (identifier.length) {
        identifierArray.push(identifier);
        identifier = '';
        // lookup goes here
    }
    if (digit.length) {
        digitArray.push(digit);
        digit = '';
    }
    console.log(identifierArray);
    console.log(digitArray);
}
function getDelimeters(keyWordArray) {
    return keyWordArray.filter(function (item) {
        return item.length === 1 && !/\w/i.test(item[0]);
    });
}
function getKeyWords() {
    var keyWordArray = [];
    var keyWordsLi = document.querySelectorAll('.keyword');
    keyWordsLi.forEach(function (li) { return keyWordArray.push(li.textContent.trim()); });
    return keyWordArray;
}
function main() {
    var textArea = document.querySelector('#source-code');
    var sourceCodeText = textArea.value;
    anazyle(sourceCodeText);
}
