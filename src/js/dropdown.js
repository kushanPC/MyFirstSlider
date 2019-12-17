"use strict";

const buttonDropdown = document.querySelector('.btn-dropdown');
const dropdownList = document.querySelector('.dropdown');
const dropItems = document.getElementsByClassName('item');
const checkBox = document.getElementsByClassName('checkbox');
const itemsToFind = document.querySelectorAll('.country-name');

function generateButtonText() {
  let buttonText = '';
  let selectedItems = [];

  for (let i = 0; i < checkBox.length; i++) {
    if (checkBox[i].checked){
      selectedItems.push(itemsToFind[i].innerText + ' ');
      checkBox[i].parentNode.classList.add('selected');
    } else {
      checkBox[i].parentNode.classList.remove('selected');
    }
  }

  if (selectedItems.length > 3) {
    for (let i = 0; i < 3; i++) {
      buttonText += selectedItems[i];
    }
    buttonText += '...';
  } else {
    for (let i = 0; i < selectedItems.length; i++) {
      buttonText += selectedItems[i];
    }
  }

  if (Boolean(buttonText) === false) {
    buttonText = 'Dropdown'
  }
  return buttonText;
}

function clickToItem(liTag) {
  if (liTag.className === 'item') {
    liTag.className = 'item selected';
    liTag.childNodes[3].checked = true;
    buttonDropdown.textContent = generateButtonText();
  } else {
    liTag.className = 'item';
    liTag.childNodes[3].checked = false;
    buttonDropdown.textContent = generateButtonText();
  }
}

function clickToCheckAll(liTag) {
  if (liTag.className === 'checked') {
    liTag.className = 'checked selected';
    liTag.childNodes[3].checked = true;

    for (var i = 0; i < checkBox.length; i++) {
      if (checkBox[i].parentNode.className == 'item hide') {
        continue;
      }
      checkBox[i].checked = true;
    }

    buttonDropdown.textContent = generateButtonText();
  } else if (liTag.className === 'checked selected') {
    liTag.className = 'checked';
    liTag.childNodes[3].checked = false;

    for (var i = 0; i < checkBox.length; i++) {
      if (checkBox[i].parentNode.className === 'item hide') {
        continue;
      }
      checkBox[i].checked = false;
    }

    buttonDropdown.textContent = generateButtonText();
  }
}

function clickToList() {
  let item = event.target;

  if (item.dataset.target != 'target') {
    return;
  } else if (item.className === 'item' || item.className === 'item selected') {
    clickToItem(item);
  } else if (item.className === 'country-name' || item.className === 'checkbox') {
    clickToItem(item.parentNode);
  }  else if (item.className === 'checked' || item.className === 'checked selected') {
    clickToCheckAll(item);
  } else if (item.className === 'checked-all' || item.className === 'checkbox-select-all') {
    clickToCheckAll(item.parentNode);
  }
}


function clickToDropdownButton() {
  if (dropdownList.className === 'dropdown') {
    dropdownList.className = 'dropdown show';

    for (var i = 0; i < dropItems.length; i++) {
      dropItems[i].className = 'item';
    }
  } else {
    dropdownList.className = 'dropdown';
    buttonDropdown.textContent = `Dropdown`;
  }
}

function markText(string, pos, len) {
  return string.slice(0, pos) + '<mark>' + string.slice(pos, pos + len) + '</mark>' + string.slice(pos + len);
}

buttonDropdown.addEventListener('click', clickToDropdownButton);

dropdownList.addEventListener('click', clickToList);

document.querySelector('#text-to-find').oninput = function () {
  let expression = this.value.trim();
  let val = new RegExp(expression, 'i');

  if (expression != '') {
    itemsToFind.forEach(function (elem) {
      if (elem.innerText.search(val) === -1) {
        elem.parentNode.classList.add('hide');
        elem.innerHTML = elem.innerText;
      } else {
        elem.parentNode.classList.remove('hide');
        let str = elem.innerText;
        elem.innerHTML = markText(str, elem.innerText.search(val), expression.length);
      }
    });
  }  else {
    itemsToFind.forEach(function (elem) {
      elem.parentNode.classList.remove('hide');
      elem.innerHTML = elem.innerText;
    });
  }
}
