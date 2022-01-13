let numbers = document.querySelectorAll('.number');
let operations = document.querySelectorAll('.operator');
let decimalBtn = document.getElementById('decimal');
let clearBtns = document.querySelectorAll('.clear-btn')


const display = document.getElementById('display');
const displayOper = document.getElementById('display-oper');

let MemoryCurrentnumber = '0';
let MemorySecondNumber = '';
let MemoryNewNumber = false;
let MemoryPendingOperation = '';
let Minus = false;


numbers.forEach(number => {
    number.addEventListener('click', e => numberPress(e.target.textContent))
})
operations.forEach(operationBtn => {
    operationBtn.addEventListener('click', e => operation(e.target.textContent))
})
clearBtns.forEach(clearBtn => {
    clearBtn.addEventListener('click', e => clear(e.srcElement.id))
})

decimalBtn.addEventListener('click',  decimal);


function numberPress(num){
    if (MemoryNewNumber){
        display.value = num;
        MemoryNewNumber = false;
        console.log(num)
    }else{
        if (display.value === '0'){
            display.value = num;
            console.log(num ^ 2)
        }else {
            display.value += num;
            console.log(display.value + " else")
        }
    }

}

function operation(oper) {
    let localOperationMemory = display.value;

    if (oper === '-'){
        if (display.value === '0'  ||  MemoryPendingOperation !== '' && MemoryNewNumber === true){
            display.value = '-';
            MemoryNewNumber = false;
            return;
        }
    }

    if (oper === '√'){
        console.log(oper + '1');
        if (display.value === '0' ){
            displayOper.value = '√';
            MemoryPendingOperation = '√';
            console.log(oper + '1');
            MemoryNewNumber = false;
            return;
        }
        else if (MemoryPendingOperation !== '' && MemoryNewNumber === true){
            MemorySecondNumber = '√';
            displayOper.value = displayOper.value + "√";
            console.log( displayOper.value + 'con2');
            return;
        }
    }

    if (MemorySecondNumber !== '' && MemoryNewNumber === false){
        localOperationMemory = Math.sqrt(localOperationMemory)
        MemorySecondNumber = '';
    }
    MemoryNewNumber = true;
    if (MemoryPendingOperation !== '' ) {
        console.log(MemoryPendingOperation + '11');
        switch (MemoryPendingOperation) {
            case "+":
                MemoryCurrentnumber += parseFloat(localOperationMemory);
                break;
            case "-":
                MemoryCurrentnumber -= parseFloat(localOperationMemory);
                break;
            case "*":
                MemoryCurrentnumber *= parseFloat(localOperationMemory);
                break;
            case "/":
                MemoryCurrentnumber /= parseFloat(localOperationMemory);
                break;
            case "√":
                MemoryCurrentnumber = Math.sqrt(parseFloat(localOperationMemory)); console.log(MemoryPendingOperation + '111');
                break;
            case "^":
                MemoryCurrentnumber = Math.pow(MemoryCurrentnumber, parseFloat(localOperationMemory)) ;
                console.log(MemoryCurrentnumber + ' ^op');
                break;
        }
        if (oper === '=') {
            MemoryPendingOperation = '';
            console.log(MemoryCurrentnumber + ' oper');
        } else {
            MemoryPendingOperation = oper;
        }
    }else {
        MemoryCurrentnumber = parseFloat(localOperationMemory);
        MemoryPendingOperation = oper;
    }

display.value = MemoryCurrentnumber;
displayOper.value = oper;
}


function decimal(arg) {
    let localDecimalMemory = display.value;

    if (MemoryNewNumber){
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1){
            localDecimalMemory += '.';
        }
    }
    display.value = localDecimalMemory;
    console.log('Клик по кнопке с десятичной');
}

function clear(id) {
    if (id === 'ce'){
        display.value = 0;

        MemoryNewNumber = true;
    } else if (id === 'c'){
        display.value = 0;
        displayOper.value = '.';
        MemoryNewNumber = false;
        MemoryCurrentnumber = 0;
        MemoryPendingOperation = ''
    }
    console.log('Клик по кнопке ' + id);
}



