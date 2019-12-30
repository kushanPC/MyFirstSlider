const buttonDropdown = document.querySelector('.btn-dropdown');
const dropdownList = document.querySelector('.dropdown');
const dropItems = document.getElementsByClassName('item');
const checkBox = document.getElementsByClassName('checkbox');
const itemsToFind = document.querySelectorAll('.country-name');

function generateButtonText() {
  let buttonText = '';
  const selectedItems = [];

  for (let i = 0; i < checkBox.length; i += 1) {
    if (checkBox[i].checked) {
      selectedItems.push(`${itemsToFind[i].innerText} `);
      checkBox[i].parentNode.classList.add('selected');
    } else {
      checkBox[i].parentNode.classList.remove('selected');
    }
  }

  if (selectedItems.length > 3) {
    for (let i = 0; i < 3; i += 1) {
      buttonText += selectedItems[i];
    }
    buttonText += '...';
  } else {
    for (let i = 0; i < selectedItems.length; i += 1) {
      buttonText += selectedItems[i];
    }
  }

  if (Boolean(buttonText) === false) {
    buttonText = 'Dropdown';
  }
  return buttonText;
}

function clickToItem(liTage) {
  const liTag = liTage;
  if (liTag.className === 'item') {
    liTag.classList = 'item selected';
    liTag.childNodes[3].checked = true;
    buttonDropdown.textContent = generateButtonText();
  } else {
    liTag.classList = 'item';
    liTag.childNodes[3].checked = false;
    buttonDropdown.textContent = generateButtonText();
  }
}

function clickToCheckAll(liTage) {
  const liTag = liTage;
  if (liTag.className === 'checked') {
    liTag.classList = 'checked selected';
    liTag.childNodes[3].checked = true;

    for (let i = 0; i < checkBox.length; i += 1) {
      if (checkBox[i].parentNode.className !== 'item hide') {
        checkBox[i].checked = true;
      }
    }

    buttonDropdown.textContent = generateButtonText();
  } else if (liTag.className === 'checked selected') {
    liTag.classList = 'checked';
    liTag.childNodes[3].checked = false;

    for (let i = 0; i < checkBox.length; i += 1) {
      if (checkBox[i].parentNode.className !== 'item hide') {
        checkBox[i].checked = false;
      }
    }

    buttonDropdown.textContent = generateButtonText();
  }
}

function clickToList(event) {
  const item = event.target;
  if (item.dataset.target !== 'target') {
    return;
  } if (item.className === 'item' || item.className === 'item selected') {
    clickToItem(item);
  } else if (item.className === 'country-name' || item.className === 'checkbox') {
    clickToItem(item.parentNode);
  } else if (item.className === 'checked' || item.className === 'checked selected') {
    clickToCheckAll(item);
  } else if (item.className === 'checked-all' || item.className === 'checkbox-select-all') {
    clickToCheckAll(item.parentNode);
  }
}


function clickToDropdownButton() {
  if (dropdownList.className === 'dropdown') {
    dropdownList.classList = 'dropdown show';

    for (let i = 0; i < dropItems.length; i += 1) {
      dropItems[i].classList = 'item';
    }
  } else {
    dropdownList.classList = 'dropdown';
    buttonDropdown.textContent = 'Dropdown';
  }
}

function markText(string, pos, len) {
  return `${string.slice(0, pos)}<mark>${string.slice(pos, pos + len)}</mark>${string.slice(pos + len)}`;
}
buttonDropdown.addEventListener('click', clickToDropdownButton);
dropdownList.addEventListener('click', clickToList);
document.querySelector('#text-to-find').addEventListener('input', function findItem() {
  const expression = this.value.trim();
  const val = new RegExp(expression, 'i');


  if (expression !== '') {
    itemsToFind.forEach((element) => {
      const elem = element;
      if (elem.innerText.search(val) === -1) {
        elem.parentNode.classList.add('hide');
        elem.innerHTML = elem.innerText;
      } else {
        elem.parentNode.classList.remove('hide');
        const str = elem.innerText;
        elem.innerHTML = markText(str, elem.innerText.search(val), expression.length);
      }
    });
  } else {
    itemsToFind.forEach((element) => {
      const elem = element;
      elem.parentNode.classList.remove('hide');
      elem.innerHTML = elem.innerText;
    });
  }
});
