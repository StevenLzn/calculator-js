var num1 = '';
var num2 = '';
var currentOperation = '';
var isNextValue = false;
var cleared = false;

function clickNumber(number) {
    if (isNextValue) {
        num2 = num2.toString() + number
        document.getElementById("display-num").value = num2;
        cleared = false;
    } else {
        value = document.getElementById("display-num").value;
        num1 = num1.toString() + number;
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
            result = parseInt(num1) + parseInt(num2)
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
        default:
            break;
    }
    return result;
}

function result(operation) {
    //alert(num1)
    //alert(num2)
    //alert(currentOperation)
    if (num1 != 0 && num2 != 0 && operation != '=' && operation != '=' && operation != '^') {
        //alert("1")
        num2 = document.getElementById("display-num").value;
        num1 = document.getElementById("display-num").value = this.operations(currentOperation);
        currentOperation = operation;
        num2 = '';
    } else if (num1 != 0 && num2 == 0 && operation != '=' && operation != '^' && operation != '√') {
        //alert("2")
        num1 = document.getElementById("display-num").value;
        currentOperation = operation;
        isNextValue = true;
    } else if (num1 != 0 &&  currentOperation == '' && operation == '^' || operation == '√' ) {
        //alert("3")
        currentOperation = operation;
        num1 = document.getElementById("display-num").value = this.operations(currentOperation);
        currentOperation = '';
        isNextValue = false;
    } else if (num1 != 0 && currentOperation != '' && operation == '^' || operation == '√' ) {
        //alert("4")
        num1 =  this.operations(currentOperation);
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
        default:
            break;
    }
};

function changeSign(){
    document.getElementById("display-num").value *= -1;
}

function clearDisplay(){
    if(cleared){
        currentOperation = '';
        document.getElementById("display-op").value = '';
        document.getElementById("display-num").value = '';
        num1 = '';
        num2 = '';
        isNextValue = false;
        cleared = false;
    }else if(!cleared && currentOperation == ''){
        document.getElementById("display-num").value = '';
        document.getElementById("display-op").value = '';
        num1 = '';  
    }else if (!cleared && num2 > 0){
        document.getElementById("display-num").value = '';
        num2 = '';
        cleared = true;
    }
}
