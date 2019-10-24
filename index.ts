type LiteralType = 'KEY' | 'IDENT' | 'CONST';

interface GlobalLiteralTableItem {
  literal: string;
  type: LiteralType;
  position: number;
}

let finalTable: Array<GlobalLiteralTableItem> = [];

let identifierArray: Array<string> = [];
let digitArray: Array<string> = [];
let delimeterArray: Array<string> = [];
let identifier = '';
let digit = '';
let delim = '';

let keyWords: Array<string> = [];
let delimeters: Array<string> = [];

function addKeyWord(): void {
  const keyWordInput = document.querySelector(
    '.add-key-word-input'
  ) as HTMLInputElement;
  const keyWord = keyWordInput.value.trim();
  if (!keyWord) {
    console.error('No text input');
    keyWordInput.value = '';
    return;
  }
  keyWordInput.value = '';
  const newListItem = document.createElement('li') as HTMLLIElement;
  newListItem.textContent = keyWord;
  newListItem.classList.add('keyword');
  (document.querySelector('.key-word-list') as HTMLUListElement).appendChild(
    newListItem
  );
}

function anazyle(sourceCode: string) {
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
        // Created by Germans G.
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
  addToTable(finalTable);
}

function pushToArray() {
  if (identifier.length) {
    const keyWordMatch = keyWords.findIndex(
      (item: string) => item.toLowerCase() === identifier.toLowerCase()
    );
    const double = identifierArray.findIndex(
      (item: string) => item.toLowerCase() === identifier.toLowerCase()
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
    const digitDouble = digitArray.findIndex((item: string) => item === digit);
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

function getDelimeters(keyWordArray: Array<string>): Array<string> {
  return keyWordArray.filter(item => {
    return item.length === 1 && !/\w/i.test(item[0]);
  });
}

function addToGlobalTable(
  literal: string,
  type: LiteralType,
  position: number
) {
  finalTable.push({
    literal,
    type,
    position
  });
}

function getKeyWords(): Array<string> {
  const keyWordArray: Array<string> = [];
  const keyWordsLi = document.querySelectorAll('.keyword');
  keyWordsLi.forEach(li => keyWordArray.push(li.textContent.trim()));

  return keyWordArray;
}

function main() {
  keyWords = [];
  identifierArray = [];
  digitArray = [];
  delimeterArray = [];
  finalTable = [];

  const textArea = document.querySelector(
    '#source-code'
  ) as HTMLTextAreaElement;
  const sourceCodeText = textArea.value;
  anazyle(sourceCodeText);
}

function addToTable(data: Array<GlobalLiteralTableItem>) {
  const tableBody = document.querySelector('.table-body');
  tableBody.innerHTML = '';
  data.forEach(item => {
    const tr = document.createElement('tr');
    let th = document.createElement('th');
    th.setAttribute('scope', 'row');
    th.textContent = item.literal;
    tr.appendChild(th);
    let td = document.createElement('td');
    td.textContent = item.position.toString();
    tr.appendChild(td);
    td = document.createElement('td');
    td.textContent = item.type;
    tr.appendChild(td);
    tableBody.appendChild(tr);
  });
}
