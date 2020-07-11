var num1 = '';
var num2 = '';
var currentOperation = '';
var isNextValue = false;

function clickNumber(number) {
    if (isNextValue) {
        num2 = num2.toString() + number
        document.getElementById("display").value = num2;
    } else {
        value = document.getElementById("display").value;
        num1 = num1.toString() + number;
        document.getElementById("display").value = num1;
    }
};

function operations(operation) {
    var result = 0;
    switch (operation) {
        case 'x':
            result = num1 * num2
            break;
        case '÷':
            result = num1 / num2
            break;
        case '+':
            result = parseInt(num1) + parseInt(num2)
            break;
        case '-':
            result = num1 - num2
            break;
        default:
            break;
    }
    return result;
}

function result(operation) {
    if (num1 != 0 && num2 != 0 && operation != '=') {
        num2 = document.getElementById("display").value;
        num1 = document.getElementById("display").value = this.operations(currentOperation);
        currentOperation = operation;        
        num2 = '';
        
    } else if(num1 != 0 && num2 == 0 && operation != '='){
        num1 = document.getElementById("display").value;
        currentOperation = operation;
        isNextValue = true;
    }
    if (operation == '=') {
        num2 = document.getElementById("display").value;
        num1 = document.getElementById("display").value = this.operations(currentOperation);  
        num2 = '';
    }

}

function clickOperation(operation) {
    switch (operation) {
        case 'x':
            this.result('x')
            break;
        case '÷':
            this.result('÷')
            break;
        case '+':
            this.result('+')
            break;
        case '-':
            this.result('-')
            break;
        case '=':
            this.result('=')
            break;
        default:
            break;
    }
};

