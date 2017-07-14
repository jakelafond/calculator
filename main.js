console.log('test stuff');

// ---- need to select buttons

var numButtons = document.querySelectorAll('.button_num');
var tempHold = '';
var viewer = document.querySelector('#answer');
var operator = document.querySelectorAll('.button_op');
var calculate = document.querySelectorAll('.button_fin');
var clear = document.querySelectorAll('.clear');
var specialMod = document.querySelectorAll('.button_op_mod');
var specialSqrt = document.querySelectorAll('.button_op_sqrt');

//do math stuff,

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

for (let i = 0; i < specialMod.length; i++) {
  let buttn = specialMod[i];
  buttn.addEventListener('click', () => {
    let content = '%';
    tempHold += content;
    viewer.textContent = tempHold;
  });
}
for (let i = 0; i < specialSqrt.length; i++) {
  let buttn = specialSqrt[i];
  buttn.addEventListener('click', () => {
    let content = 'sqrt';
    tempHold += content;
    viewer.textContent = tempHold;
  });
}

for (let i = 0; i < calculate.length; i++) {
  let buttn = calculate[i];
  buttn.addEventListener('click', () => {
    if (tempHold.includes('sqrt')) {
      let sqrtSplit = tempHold.split('sqrt');
      let sqrtTotal = Math.sqrt(Number(sqrtSplit[0]) + Number(sqrtSplit[1]));
      viewer.textContent = sqrtTotal;
    } else {
      let finish = eval(tempHold);
      tempHold = finish;
      viewer.textContent = finish;
    }
  });
}

for (let i = 0; i < clear.length; i++) {
  let buttn = clear[i];
  buttn.addEventListener('click', () => {
    tempHold = '';
    viewer.textContent = tempHold;
  });
}
