console.log('test stuff');

// ---- need to select stuff

var numButtons = document.querySelectorAll('.button_num');
var viewer = document.querySelector('#answer');
var operator = document.querySelectorAll('.button_op');
var calculate = document.querySelector('#equal');
var clear = document.querySelector('#clear');
var multiply = document.querySelector('#x');
var specialMod = document.querySelector('#mod');
var specialSqrt = document.querySelector('#sqrt');
var prvCalcs = document.querySelector('.previous_calcs');

//empty variables for use later
var tempHold = '';
var number = '';
var wholeCalc = [];
var pemdasVal;

//convert operator strings to real operators
var operators = {
  '+': function(a, b) {
    return a + b;
  },
  '-': function(a, b) {
    return a - b;
  },
  '/': function(a, b) {
    return a / b;
  },
  '*': function(a, b) {
    return a * b;
  },
  '%': function(a, b) {
    return a % b;
  }
};

// build event listeners for number buttons
for (let i = 0; i < numButtons.length; i++) {
  let buttn = numButtons[i];
  buttn.addEventListener('click', () => {
    let content = buttn.innerText;
    tempHold += content;
    viewer.textContent = tempHold;
    number += content;
  });
}

//build event listeners for operators
for (let i = 0; i < operator.length; i++) {
  let buttn = operator[i];
  buttn.addEventListener('click', () => {
    let content = buttn.innerText;
    tempHold += content;
    viewer.textContent = tempHold;
    wholeCalc.push(Number(number), content);
    number = '';
  });
}

//event listener for modulo
specialMod.addEventListener('click', () => {
  let content = '%';
  tempHold += content;
  viewer.textContent = tempHold;
  wholeCalc.push(Number(number), content);
  number = '';
});

//event listener for sqrt
specialSqrt.addEventListener('click', () => {
  let content = 'sqrt';
  tempHold += content;
  viewer.textContent = tempHold;
  wholeCalc.push(Number(number), content);
  number = '';
});

//event listener for multiply because of the X
multiply.addEventListener('click', () => {
  let content = '*';
  tempHold += content;
  viewer.textContent = tempHold;
  wholeCalc.push(Number(number), content);
  number = '';
});

calculate.addEventListener('click', () => {
  wholeCalc.push(Number(number));
  //sqrt first since it is ()
  while (wholeCalc.includes('sqrt')) {
    var sqrtIndex = wholeCalc.indexOf('sqrt');
    pemdasVal = Math.sqrt(Number(wholeCalc[sqrtIndex - 1]) * Number(wholeCalc[sqrtIndex + 1]));
    wholeCalc.splice(sqrtIndex - 1, 3, pemdasVal);
  }

  //next is multiply, divide, remainder operators
  while (wholeCalc.includes('*') || wholeCalc.includes('/') || wholeCalc.includes('%')) {
    var multIndex = wholeCalc.indexOf('*');
    var divIndex = wholeCalc.indexOf('/');
    var modIndex = wholeCalc.indexOf('%');

    // if there is only one: remainder, multiplication or division operator
    if (multIndex != -1 && divIndex === -1 && modIndex === -1 ) {
      pemdasVal = operators['*'](wholeCalc[multIndex - 1], wholeCalc[multIndex + 1]);
      wholeCalc.splice(multIndex - 1, 3, pemdasVal);
    } else if (divIndex != -1 && multIndex === -1 && modIndex === -1) {
      pemdasVal = operators['/'](wholeCalc[divIndex - 1], wholeCalc[divIndex + 1]);
      wholeCalc.splice(divIndex - 1, 3, pemdasVal);
    } else if (modIndex != -1 && divIndex === -1 && multIndex === -1) {
      pemdasVal = operators['%'](wholeCalc[modIndex - 1], wholeCalc[modIndex + 1]);
      wholeCalc.splice(modIndex - 1, 3, pemdasVal);
    }

    //if there are two of the following: remainder, multiplication or division operators
    if (divIndex < multIndex && modIndex === -1 && divIndex != -1 && multIndex != -1) {
      pemdasVal = operators['/'](wholeCalc[divIndex - 1], wholeCalc[divIndex + 1]);
      wholeCalc.splice(divIndex - 1, 3, pemdasVal);
    } else if (multIndex < divIndex && modIndex === -1 && divIndex != -1 && multIndex != -1 ) {
      pemdasVal = operators['*'](wholeCalc[multIndex - 1], wholeCalc[multIndex + 1]);
      wholeCalc.splice(multIndex - 1, 3, pemdasVal);
    }

    else if (modIndex < divIndex && multIndex === -1 && divIndex != -1 && modIndex != -1 ) {
      pemdasVal = operators['%'](wholeCalc[modIndex - 1], wholeCalc[modIndex + 1]);
      wholeCalc.splice(modIndex - 1, 3, pemdasVal);
    } else if (divIndex < modIndex && multIndex === -1 && divIndex != -1 && modIndex != -1 ) {
      pemdasVal = operators['/'](wholeCalc[divIndex - 1], wholeCalc[divIndex + 1]);
      wholeCalc.splice(divIndex - 1, 3, pemdasVal);
    }

    else if (modIndex < multIndex && divIndex === -1 && multIndex != -1 && modIndex != -1 ) {
      pemdasVal = operators['%'](wholeCalc[modIndex - 1], wholeCalc[modIndex + 1]);
      wholeCalc.splice(modIndex - 1, 3, pemdasVal);
    } else if (multIndex < modIndex && divIndex === -1 && multIndex != -1 && modIndex != -1 ) {
      pemdasVal = operators['*'](wholeCalc[multIndex - 1], wholeCalc[multIndex + 1]);
      wholeCalc.splice(multIndex - 1, 3, pemdasVal);
    }

    //if there are all three types: remainder, multiplication and division operators
    if (multIndex < divIndex && multIndex < modIndex && multIndex != -1 && divIndex != -1 && modIndex != -1){
      pemdasVal = operators['*'](wholeCalc[multIndex - 1], wholeCalc[multIndex + 1]);
      wholeCalc.splice(multIndex - 1, 3, pemdasVal);
    } else if (divIndex < multIndex && divIndex < modIndex && multIndex != -1 && divIndex != -1 && modIndex != -1){
      pemdasVal = operators['/'](wholeCalc[divIndex - 1], wholeCalc[divIndex + 1]);
      wholeCalc.splice(divIndex - 1, 3, pemdasVal);
    } else if (modIndex < multIndex && modIndex < divIndex && multIndex != -1 && divIndex != -1 && modIndex != -1){
      pemdasVal = operators['%'](wholeCalc[modIndex - 1], wholeCalc[modIndex + 1]);
      wholeCalc.splice(modIndex - 1, 3, pemdasVal);
    }


  }
  while (wholeCalc.includes('+') || wholeCalc.includes('-')) {
    var addIndex = wholeCalc.indexOf('+');
    var minusIndex = wholeCalc.indexOf('-');
    if (addIndex > minusIndex && minusIndex != -1) {
      pemdasVal = operators['-'](wholeCalc[minusIndex - 1], wholeCalc[minusIndex + 1]);
      wholeCalc.splice(minusIndex - 1, 3, pemdasVal);
    } else if (addIndex < minusIndex && minusIndex != -1) {
      pemdasVal = operators['-'](wholeCalc[minusIndex - 1], wholeCalc[minusIndex + 1]);
      wholeCalc.splice(minusIndex - 1, 3, pemdasVal);
    } else if (minusIndex > addIndex && addIndex != -1) {
      pemdasVal = operators['+'](wholeCalc[addIndex - 1], wholeCalc[addIndex + 1]);
      wholeCalc.splice(addIndex - 1, 3, pemdasVal);
    } else if (minusIndex < addIndex && addIndex != -1) {
      pemdasVal = operators['+'](wholeCalc[addIndex - 1], wholeCalc[addIndex + 1]);
      wholeCalc.splice(addIndex - 1, 3, pemdasVal);
    }
  }
  console.log(wholeCalc);
  viewer.textContent = pemdasVal;
  //add new p element and print out calculation as entered + calc value
  let oldCalc = tempHold;
  var newCalc = document.createElement('p');
  newCalc.textContent = `${oldCalc} = ${pemdasVal}`;
  prvCalcs.appendChild(newCalc);
  number = pemdasVal;
});
//******Eval solution******
// calculate.addEventListener('click', () => {
//   wholeCalc.push(Number(number));
//   if (wholeCalc.includes('*')) {
//     var indices = [];
//     var element = '*';
//     var idx = wholeCalc.indexOf('*');
//     while (idx != -1) {
//       indices.push(idx);
//       idx = wholeCalc.indexOf('*', idx + 1);
//     }
//     for (var i = 0; i < indices.length; i++) {
//       //start multiplying values on index to left and right of the indexes found in idices
//       pemdasVals.push(operators['*'](wholeCalc[indices[i] - 1], wholeCalc[indices[i] + 1]));
//     }
//     for (var j = 0; j < pemdasVals.length; j++) {
//       wholeCalc.splice(indices[j] + 1, 3, pemdasVals[j]);
//       console.log(indices[j]);
//       console.log(wholeCalc);
//     }
//   }
// });
// console.log(wholeCalc);
// calculate.addEventListener('click', () => {
//   if (tempHold.includes('sqrt')) {
//     //for storing the calc before I make the magic happen
//     let oldCalc = tempHold;
//     let sqrtSplit = tempHold.split('sqrt');
//     //add two numbers then sqrt, how else do you sqrt two numbers???
//     let sqrtTotal = Math.sqrt(Number(sqrtSplit[0]) + Number(sqrtSplit[1]));
//     viewer.textContent = sqrtTotal;
//     //add new p element and print out calculation as entered + calc value
//     var newCalc = document.createElement('p');
//     newCalc.textContent = `${oldCalc} = ${sqrtTotal}`;
//     prvCalcs.appendChild(newCalc);
//   } else {
//     let oldCalc = tempHold;
//     let finish = eval(tempHold);
//     tempHold = finish;
//     viewer.textContent = finish;
//     //add new p element and print out calculation as entered + calc value
//     var newCalc = document.createElement('p');
//     newCalc.textContent = `${oldCalc} = ${finish}`;
//     prvCalcs.appendChild(newCalc);
//   }
// });

clear.addEventListener('click', () => {
  tempHold = '';
  viewer.textContent = tempHold;
  wholeCalc = [];
  number = 0;
});
