const BtnAdd = document.querySelector('button');
const inputTitleTODO = document.querySelector('input');
const divListItemTODO = document.querySelector('div.listTODO');

let numItemTODO = 0;

function createFirstToDoImComing() {
  const listTODO = Object.values(window.localStorage);
  if (!listTODO.includes("I'm Coming...")) {
    createItemTODO("I'm Coming...");
  }
}

function createMyElement(tagName, tagId = '', innerTag = '') {
  const element = document.createElement(tagName);
  element.id = tagId;
  element.innerText = innerTag;
  return element;
}

function createItemTODO(titleTODO) {
  const divItemTODO = createMyElement('div', numItemTODO);
  const parTitleTODO = createMyElement('p', '', titleTODO);
  const itaTrash = createMyElement('i');

  divItemTODO.appendChild(parTitleTODO);
  divItemTODO.appendChild(itaTrash);
  divListItemTODO.appendChild(divItemTODO);
  divItemTODO.classList.add('itemTODO');
  parTitleTODO.classList.add('titleTODO');
  itaTrash.className = 'far fa-trash-alt';

  window.localStorage.setItem(String(numItemTODO), titleTODO);
  numItemTODO++;

  divItemTODO.addEventListener('click', (e) => {
    const tagId = divItemTODO.id;
    const key = divItemTODO.classList.contains('itemTODO-Done') ? tagId.concat('done') : tagId;
    window.localStorage.removeItem(key);

    const { nodeName } = e.target;
    if (nodeName == 'I') {
      divListItemTODO.removeChild(divItemTODO);
      return;
    }

    if (nodeName != 'I') {
      const result = divItemTODO.classList.toggle('itemTODO-Done');
      if (result) {
        window.localStorage.setItem(tagId.concat('done'), titleTODO);
      } else {
        window.localStorage.setItem(tagId, titleTODO);
      }
    }
  });

  return divItemTODO;
}

function eventHandlerBtn() {
  const titleTODO = inputTitleTODO.value.trim();
  if (!titleTODO) {
    window.alert('Enter Title TODO!');
    inputTitleTODO.focus();
    return;
  }
  inputTitleTODO.value = '';

  createItemTODO(titleTODO);
}

BtnAdd.addEventListener('click', eventHandlerBtn);

window.addEventListener('keydown', (e) => {
  const { key } = e;
  if (key == 'Enter') {
    eventHandlerBtn();
  }
});

function reloadItemsTODO() {
  if (!window.localStorage.length) {
    return;
  }

  const itemsTODO = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    const valueKey = window.localStorage.getItem(key);
    const tagId = key.includes('done') ? key.slice(0, key.indexOf('done')) : key;

    itemsTODO[Number(tagId)] = { [key]: valueKey };
  }

  numItemTODO = 0;
  const { length } = window.localStorage;
  window.localStorage.clear();
  for (let i = 0; numItemTODO < length; i++) {
    if (itemsTODO[i]) {
      const key = Object.keys(itemsTODO[i]);
      const valueKey = itemsTODO[i][key];

      const divItemTODO = createItemTODO(valueKey);
      if (key[0].includes('done')) {
        divItemTODO.classList.add('itemTODO-Done');
        window.localStorage.removeItem(String(numItemTODO - 1));
        window.localStorage.setItem(String(numItemTODO - 1).concat('done'), valueKey);
      }
    }
  }
}

reloadItemsTODO();
createFirstToDoImComing();
