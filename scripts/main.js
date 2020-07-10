function clickNumber(number) {
    var value = document.getElementById("display").value;
    value = value + number;
    document.getElementById("display").value = value;
};

function clickOperation(operation) {
    switch (operation) {
        case 'x':
            alert("Es una multiplicación")
            break;
        case '÷':
            alert("Es una división")
            break;
        case '+':
            alert("Es una suma")
            break;
        case '-':
            alert("Es una resta")
            break;
        default:
            break;
    }
};