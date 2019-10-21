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
  document.querySelector('.key-word-list').appendChild(newListItem);
}

function anazyle(sourceCode: string) {
  const keyWords = getKeyWords();
  const delimeters = getDelimeters(keyWords);
  const identifierArray = [];
  const digitArray = [];
  console.log(keyWords);
  console.log(delimeters);
  let identifier = '';
  let digit = '';
  for (let i = 0; i < sourceCode.length; i++) {
    const char = sourceCode[i];
    if (/[a-z]/i.test(char)) {
      identifier = identifier.concat(char);
    } else if (/\d/i.test(char)) {
      if (identifier.length) {
        identifier = identifier.concat(char);
      } else {
        digit = digit.concat(char);
      }
    } else {
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

function getDelimeters(keyWordArray: Array<string>): Array<string> {
  return keyWordArray.filter(item => {
    return item.length === 1 && !/\w/i.test(item[0]);
  });
}

function getKeyWords(): Array<string> {
  const keyWordArray = [];
  const keyWordsLi = document.querySelectorAll('.keyword');
  keyWordsLi.forEach(li => keyWordArray.push(li.textContent.trim()));

  return keyWordArray;
}

function main() {
  const textArea = document.querySelector(
    '#source-code'
  ) as HTMLTextAreaElement;
  const sourceCodeText = textArea.value;
  anazyle(sourceCodeText);
}
