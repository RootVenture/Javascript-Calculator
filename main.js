const entry = document.querySelector('#entry');
const history = document.querySelector('#history');
const newAC = document.querySelector('#new');
const mod = document.querySelector('#mod');
const reverse = document.querySelector('#reverse');
const divide = document.querySelector('#divide');
const multiply = document.querySelector('#multiply');
const add = document.querySelector('#plus');
const subtract = document.querySelector('#minus');
const decimal = document.querySelector('#decimal');
const equal = document.querySelector('#equal');
const buttons = document.querySelectorAll('#buttons');

// variables to keep track of state
let rev = false;
let flt = false;
const num = /\d/g;
const opList = ['+', '-', '/', '*', '%'];
let track = [];
let temp = '';

// functions for calculator
function display(e) {
  e.stopPropagation();
  if (e.target.value.match(num)) {
    if (entry.innerHTML === 0 || entry.innerHTML === '0') {
      entry.innerHTML = '';
    }
    temp = e.target.value;
    track.push(temp);
    entry.innerHTML += temp;
  }
}

function updateDisplay() {
  entry.innerHTML = '';
  history.innerHTML = track.join('');
}

function calculate(arr) {
  entry.innerHTML = eval(track.join(''));
  history.innerHTML = '';
}

function newData() {
  entry.textContent = '0';
  history.textContent = '';
  temp = '';
  track = [];
}

function operator(e) {
  const op = e.target.value;
  if (
    track[track.length - 1] == opList[0] ||
    track[track.length - 1] == opList[1] ||
    track[track.length - 1] == opList[2] ||
    track[track.length - 1] == opList[3] ||
    track[track.length - 1] == opList[4]
  ) {
    track[track.length - 1] = op;
  } else {
    track.push(op);
  }
  updateDisplay();
}

function addDecimal() {
  flt = !flt;
  if (flt && track.indexOf('.') === -1) {
    entry.textContent += '.';
    track.push('.');
  } else {
    return 0;
  }
}

function reverseData() {
  rev = !rev;
  const index = track.indexOf(entry.textContent);

  if (rev) {
    entry.textContent = `-${entry.textContent}`;
  } else {
    entry.textContent = entry.textContent.slice(1);
  }
  track[index] = entry.textContent;
}

// event listeners
buttons.forEach(button =>
  button.addEventListener('click', e => {
    display(e);
  })
);
newAC.addEventListener('click', newData);
mod.addEventListener('click', operator);
add.addEventListener('click', operator);
subtract.addEventListener('click', operator);
divide.addEventListener('click', operator);
multiply.addEventListener('click', operator);
decimal.addEventListener('click', addDecimal);
reverse.addEventListener('click', reverseData);
equal.addEventListener('click', () => calculate(track));
