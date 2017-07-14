console.log('test stuff');

// ---- need to select buttons

var numButtons = document.querySelectorAll('.button_num');
var tempHold = '';
var viewer = document.querySelector('#answer');
var operator = document.querySelectorAll('.button_op');
var calculate = document.querySelector('.button_fin');
var clear = document.querySelector('.clear');
var specialMod = document.querySelector('.button_op_mod');
var specialSqrt = document.querySelector('.button_op_sqrt');
var prvCalcs = document.querySelector('.previous_calcs');

// build event listeners for number buttons
for (let i = 0; i < numButtons.length; i++) {
  let buttn = numButtons[i];
  buttn.addEventListener('click', () => {
    let content = buttn.innerText;
    tempHold += content;
    viewer.textContent = tempHold;
  });
}

//build event listeners for operators
for (let i = 0; i < operator.length; i++) {
  let buttn = operator[i];
  buttn.addEventListener('click', () => {
    let content = buttn.innerText;
    tempHold += content;
    viewer.textContent = tempHold;
  });
}

//event listener for modulo
specialMod.addEventListener('click', () => {
  let content = '%';
  tempHold += content;
  viewer.textContent = tempHold;
});

//event listener for sqrt
specialSqrt.addEventListener('click', () => {
  let content = 'sqrt';
  tempHold += content;
  viewer.textContent = tempHold;
});

calculate.addEventListener('click', () => {
  if (tempHold.includes('sqrt')) {
    //for storing the calc before I make the magic happen
    let oldCalc = tempHold;
    let sqrtSplit = tempHold.split('sqrt');
    //add two numbers then sqrt, how else do you sqrt two numbers???
    let sqrtTotal = Math.sqrt(Number(sqrtSplit[0]) + Number(sqrtSplit[1]));
    viewer.textContent = sqrtTotal;
    //add new p element and print out calculation as entered + calc value
    var newCalc = document.createElement('p');
    newCalc.textContent = `${oldCalc} = ${sqrtTotal}`;
    prvCalcs.appendChild(newCalc);
  } else {
    let oldCalc = tempHold;
    let finish = eval(tempHold);
    tempHold = finish;
    viewer.textContent = finish;
    //add new p element and print out calculation as entered + calc value
    var newCalc = document.createElement('p');
    newCalc.textContent = `${oldCalc} = ${finish}`;
    prvCalcs.appendChild(newCalc);
  }
});

clear.addEventListener('click', () => {
  tempHold = '';
  viewer.textContent = tempHold;
});
