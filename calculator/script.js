const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operator');
const clearBtns = document.querySelectorAll('.clear-btn');
const decimalBtn = document.getElementById('decimal');
const sqrtBtn = document.getElementById('sqrt');
const minusBtn = document.getElementById('minus');
const result = document.getElementById('result');
const display = document.getElementById('display');
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';

for (var i = 0; i < numbers.length; i++) {
  var number = numbers[i];
  number.addEventListener('click', function (e) {
    numberPress(e.target.textContent);
  });
}

for (var i = 0; i < operations.length; i++) {
  var operationBtn = operations[i];
  operationBtn.addEventListener('click', function (e) {
    operationPress(e.target.textContent);
  });
}

for (var i = 0; i < clearBtns.length; i++) {
  var clearBtn = clearBtns[i];
  clearBtn.addEventListener('click', function (e) {
    clear(e.target.textContent);
  });
}

decimalBtn.addEventListener('click', decimal);
sqrtBtn.addEventListener('click', sqrt);
minusBtn.addEventListener('click', minus);

function numberPress(number) {
  if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
  } else {
    if (display.value === '0') {
      display.value = number;
    } else {
      display.value += number;
    }
  }
}

function strip(number) {
  return (parseFloat(number.toPrecision(12)));
}

function operationPress(op) {
  let localOperationMemory = display.value;

  if (MemoryNewNumber && MemoryPendingOperation !== '=') {
    display.value = MemoryCurrentNumber;
  } else {
    MemoryNewNumber = true;
    if (MemoryPendingOperation === '+') {
      MemoryCurrentNumber += +localOperationMemory;
    } else if (MemoryPendingOperation === '-') {
      MemoryCurrentNumber -= +localOperationMemory;
    } else if (MemoryPendingOperation === '*') {
      MemoryCurrentNumber *= +localOperationMemory;
    } else if (MemoryPendingOperation === '/') {
      MemoryCurrentNumber /= +localOperationMemory;
    } else if (MemoryPendingOperation === 'xˆy') {
      MemoryCurrentNumber = Math.pow(MemoryCurrentNumber, localOperationMemory)
    } else if (MemoryPendingOperation === '&#8730;') {
      if (localOperationMemory > 0) {
         MemoryCurrentNumber = Math.sqrt(localOperationMemory);
      } 
      else MemoryCurrentNumber =  'Not a number'
  } 
    else {
      MemoryCurrentNumber = +localOperationMemory;
    }
    MemoryCurrentNumber = strip(MemoryCurrentNumber)
    display.value = MemoryCurrentNumber;
    MemoryPendingOperation = op;
  }
}

function decimal(argument) {
  let localDecimalMemory = display.value;

  if (MemoryNewNumber) {
    localDecimalMemory = '0.';
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    }
  }
  display.value = localDecimalMemory;
}


function clear(id) {
  if (id === 'ce') {
    display.value = '0';
    MemoryNewNumber = true;
  } else if (id === 'c') {
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
  }
}

function sqrt(op) {
  if (display.value !== '0' )
  {
    if (display.value > 0) 
    {
    localOperationMemory = display.value;
    display.value = Math.sqrt(localOperationMemory)
    }
    else {
      display.value = 'Not a number'
    }
  }
  else {
    MemoryPendingOperation = "&#8730;";
  }
}

function minus () {
  display.value = -display.value
}