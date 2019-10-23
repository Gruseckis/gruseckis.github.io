const finalTable = [];
const identifierArray = [];
const digitArray = [];
const delimeterArray = [];
let identifier = '';
let digit = '';
let delim = '';
let keyWords = [];
let delimeters = [];
function addKeyWord() {
  const keyWordInput = document.querySelector('.add-key-word-input');
  const keyWord = keyWordInput.value.trim();
  if (!keyWord) {
    console.error('No text input');
    keyWordInput.value = '';
    return;
  }
  keyWordInput.value = '';
  const newListItem = document.createElement('li');
  newListItem.textContent = keyWord;
  newListItem.classList.add('keyword');
  document.querySelector('.key-word-list').appendChild(newListItem);
}
function anazyle(sourceCode) {
  finalTable.length = 0;
  keyWords = getKeyWords();
  delimeters = getDelimeters(keyWords);
  console.log(keyWords);
  console.log(delimeters);
  for (let i = 0; i < sourceCode.length; i++) {
    const char = sourceCode[i];
    if (/[a-z]/i.test(char)) {
      pushToDelimArray();
      identifier = identifier.concat(char);
    } else if (/\d/i.test(char)) {
      pushToDelimArray();
      if (identifier.length) {
        identifier = identifier.concat(char);
      } else {
        digit = digit.concat(char);
      }
    } else {
      pushToArray();
      const checkDelimeter = delim.concat(char);
      let indexInArray = keyWords.indexOf(checkDelimeter);
      if (indexInArray >= 0) {
        delim = delim.concat(char);
      } else if (char !== ' ' && char.charCodeAt(0) !== 10) {
        alert(`Unknown symbol ${char} ; Char code: ${char.charCodeAt(0)}`);
        return;
      }
      if (char !== ':' && char !== '.') {
        pushToDelimArray();
      }
    }
  }
  pushToArray();
  console.log(identifierArray);
  console.log(digitArray);
  console.log(delimeterArray);
  console.log(finalTable);
}
function pushToArray() {
  if (identifier.length) {
    const keyWordMatch = keyWords.findIndex(
      item => item.toLowerCase() === identifier.toLowerCase()
    );
    const double = identifierArray.findIndex(
      item => item.toLowerCase() === identifier.toLowerCase()
    );
    if (keyWordMatch >= 0) {
      addToGlobalTable(identifier, 'KEY', keyWordMatch);
    } else if (double >= 0) {
      addToGlobalTable(identifier, 'IDENT', double);
    } else {
      identifierArray.push(identifier);
      addToGlobalTable(identifier, 'IDENT', identifierArray.length - 1);
    }
    identifier = '';
    // lookup goes here
  }
  if (digit.length) {
    const digitDouble = digitArray.findIndex(item => item === digit);
    if (digitDouble >= 0) {
      addToGlobalTable(digit, 'CONST', digitDouble);
    } else {
      digitArray.push(digit);
      addToGlobalTable(digit, 'CONST', digitArray.length - 1);
    }
    digit = '';
  }
}
function pushToDelimArray() {
  if (delim.length > 0) {
    const position = keyWords.findIndex(item => item === delim);
    const double = delimeterArray.findIndex(item => item === delim);
    if (double === -1) {
      delimeterArray.push(delim);
    }
    addToGlobalTable(delim, 'KEY', position);
    delim = '';
  }
}
function getDelimeters(keyWordArray) {
  return keyWordArray.filter(item => {
    return item.length === 1 && !/\w/i.test(item[0]);
  });
}
function addToGlobalTable(literal, type, position) {
  finalTable.push({
    literal,
    type,
    position
  });
}
function getKeyWords() {
  const keyWordArray = [];
  const keyWordsLi = document.querySelectorAll('.keyword');
  keyWordsLi.forEach(li => keyWordArray.push(li.textContent.trim()));
  return keyWordArray;
}
function main() {
  const textArea = document.querySelector('#source-code');
  const sourceCodeText = textArea.value;
  console.log(sourceCodeText);
  anazyle(sourceCodeText);
}
//# sourceMappingURL=index.js.map
