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

//do math stuff

for (let i = 0; i < numButtons.length; i++) {
  let buttn = numButtons[i];
  buttn.addEventListener('click', () => {
    let content = buttn.innerText;
    tempHold += content;
    viewer.textContent = tempHold;
  });
}

for (let i = 0; i < operator.length; i++) {
  let buttn = operator[i];
  buttn.addEventListener('click', () => {
    let content = buttn.innerText;
    tempHold += content;
    viewer.textContent = tempHold;
  });
}

specialMod.addEventListener('click', () => {
  let content = '%';
  tempHold += content;
  viewer.textContent = tempHold;
});

specialSqrt.addEventListener('click', () => {
  let content = 'sqrt';
  tempHold += content;
  viewer.textContent = tempHold;
});

calculate.addEventListener('click', () => {
  if (tempHold.includes('sqrt')) {
    let oldCalc = tempHold;
    let sqrtSplit = tempHold.split('sqrt');
    let sqrtTotal = Math.sqrt(Number(sqrtSplit[0]) + Number(sqrtSplit[1]));
    viewer.textContent = sqrtTotal;
    var newCalc = document.createElement('p');
    newCalc.textContent = `${oldCalc} = ${sqrtTotal}`;
    prvCalcs.appendChild(newCalc);
  } else {
    let oldCalc = tempHold;
    let finish = eval(tempHold);
    tempHold = finish;
    viewer.textContent = finish;
    var newCalc = document.createElement('p');
    newCalc.textContent = `${oldCalc} = ${finish}`;
    prvCalcs.appendChild(newCalc);
  }
});

clear.addEventListener('click', () => {
  tempHold = '';
  viewer.textContent = tempHold;
});
