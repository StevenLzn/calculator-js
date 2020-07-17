var num1 = '';
var num2 = '';
var currentOperation = '';
var isNextValue = false;
var cleared = false;
var limit = false;

function clickNumber(number) {
    if (num1 == 0) {
        num1 = '';
        limit = false;
    } else if (num2 == 0 && isNextValue) {
        num2 = '';
        document.getElementById("display-num").value = '';
        limit = false;
    }
    if(num1.length == 8 && !isNextValue){
        limit = true;
    }
    if(num2.length == 8 && isNextValue){
        limit = true;
    }
    var value = document.getElementById("display-num").value;
    if (isNextValue && !limit) {
        num2 = value + number;
        document.getElementById("display-num").value = num2;
        cleared = false;
    } else if(!isNextValue && !limit) {
        num1 = value + number;
        document.getElementById("display-num").value = num1;
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
            result = parseFloat(num1) + parseFloat(num2)
            break;
        case '-':
            result = num1 - num2
            break;
        case '^':
            result = num1 * num1
            break;
        case '√':
            result = Math.sqrt(num1)
            break;
        case '%':
            result = (num1 * num2)/100
            break;
        default:
            break;
    }
    return Math.round(result * 10000) / 10000;
}

function result(operation) {
    if (num1 != '' && num2 != '' && operation != '=' && operation != '√' && operation != '^') {
        num2 = document.getElementById("display-num").value;
        num1 = document.getElementById("display-num").value = this.operations(currentOperation);
        currentOperation = operation;
        num2 = '';
    } else if (num1 != '' && num2 == '' && operation != '=' && operation != '^' && operation != '√') {
        num1 = document.getElementById("display-num").value;
        currentOperation = operation;
        isNextValue = true;
    } else if (num1 != '' && currentOperation == '' && (operation == '^' || operation == '√')) {
        currentOperation = operation;
        num1 = document.getElementById("display-num").value = this.operations(currentOperation);
        currentOperation = '';
        isNextValue = false;
    } else if (num1 != '' && currentOperation != '' && (operation == '^' || operation == '√')) {
        num1 = this.operations(currentOperation);
        currentOperation = operation;
        num1 = document.getElementById("display-num").value = this.operations(currentOperation);
        currentOperation = '';
        num2 = ''
        isNextValue = false;
    }
    if (operation == '=' && currentOperation != '' && num2 > 0) {
        num2 = document.getElementById("display-num").value;
        num1 = document.getElementById("display-num").value = this.operations(currentOperation);
        currentOperation = '';
        num2 = '';
        isNextValue = false;
    }

    document.getElementById("display-op").value = num1 + ' ' + currentOperation + ' ' + num2
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
        case '^':
            this.result('^')
            break;
        case '√':
            this.result('√')
            break;
        case '%':
            this.result('%')
            break;
        default:
            break;
    }
};

function clickTrigo(value) {
    if (num1 != '') {
        switch (value) {
            case 'cos':
                num1 = document.getElementById("display-num").value = Math.round(Math.cos(num1) * 10000) / 10000;
                break;
            case 'sin':
                num1 = document.getElementById("display-num").value = Math.round(Math.sin(num1) * 10000) / 10000;
                break;
            case 'tan':
                num1 = document.getElementById("display-num").value = Math.round(Math.tan(num1) * 10000) / 10000;
                break;

            default:
                break;
        }
    }
};

function changeSign() {
    if (num1 != 0) {
        var display = document.getElementById("display-num").value *= -1;
        document.getElementById("display-op").value = display;

    }
}

function clearDisplay() {
    if (cleared) {
        currentOperation = '';
        document.getElementById("display-op").value = '';
        document.getElementById("display-num").value = '';
        num1 = '';
        num2 = '';
        isNextValue = false;
        cleared = false;
    } else if (!cleared && currentOperation == '') {
        document.getElementById("display-num").value = '';
        document.getElementById("display-op").value = '';
        num1 = '';
    } else if (!cleared && num2 > 0) {
        document.getElementById("display-num").value = '';
        num2 = '';
        cleared = true;
    }
}

function clickDot(){
    var number = document.getElementById("display-num").value;
    var isDotted = number.includes('.');
    if(!isDotted){
        document.getElementById("display-num").value += '.' 
    }
}