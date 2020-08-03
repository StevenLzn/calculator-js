//Declaración de variable
let num1 = ''; //Valor del primer número ingresado
let num2 = ''; //Valor del segundo número ingresado
let currentOperation = ''; //Almacena la operación actual
let isNextValue = false; //Valor booleano que inidica: si es false, el valor a ingresa es num1, si es true, el valor a ingresar es num2
let cleared = false; //Indica si ya ha sido presionado el botón de limpiar
let limit = false; //Valor booleano que inidica: si es false, el valor limite de números no ha sido alcanzado, si es true, el límite ha sido alcanzado.

//Función que captura el evento click de los números, con un parametro 'number', que es el número presionado.
function clickNumber(number) {

    //Comprobamos si num1 es '0' y procedemos a resetear las variables 'num1' (se transforma en string) y limit (En caso de que el limite haya sido alcanzado anteriormente, se reinicia ya que el valor es 0), se pasa un string vacío al input para evitar que se escriba un 0 antes del número por ejemplo: 0123
    if (num1 == 0) {
        console.log(num1);
        num1 = '';
        document.getElementById("display-num").value = '';
        limit = false;
    //Comprobamos si num2 es '0' y 'isNextValue' es true, en ese caso se resetean las variables 'num2' y limit, le pasamos al input un valor de string vacío
    } else if (num2 == 0 && isNextValue) {
        num2 = '';
        document.getElementById("display-num").value = '';
        limit = false;
    }

    //En las líneas 21 y 25 validamos los números para saber cuando se ha alcanzado el limite, en este caso es 8
    if(num1.length == 8 && !isNextValue){
        limit = true;
    }
    if(num2.length == 8 && isNextValue){
        limit = true;
    }

    let value = document.getElementById("display-num").value;//En esta variable almacenamos el valro actual del input
    
    //Comprobamos que número es el que se está ingrensando y si no se ha alcanzado el límite
    if (isNextValue && !limit) { //En este caso 'isNextValue' es true, por lo tanto, se está ingresando 'num2'
        num2 = value + number; //Le agregamos el número ingresado al valor del input, concatenando ambos valores. Esto se almacena en la variable 'num2'
        document.getElementById("display-num").value = num2; //Le pasamos al input el valor de 'num2'
        cleared = false; //En caso de que se haya presionado el botón limpiar, devolvemos este valor a false, ya que se está ingresando de nuevo el número
    } else if(!isNextValue && !limit) { //En este caso 'isNextValue' es false, por lo tanto, estamos ingresando 'num1',
        //Este procedimiento de asginación de valores es igual al de arriba, con la diferencia que cleared no se modifica ya que se está ingresando el primer valor.
        num1 = value + number;
        document.getElementById("display-num").value = num1;
    }
};

//Está función realiza la tarea de hacer las operaciones, pasando como parametro una operación
function operations(operation) {
    
    let result = 0;//Variable que guarda el resultado de la operación

    //Comprobamos la operación que nos llega mediante el parametro de la función, esta comprobación se realiza mediante un switch
    switch (operation) {
        case 'x':
            result = num1 * num2
            break;
        case '÷':
            result = num1 / num2
            break;
        case '+':
            result = parseFloat(num1) + parseFloat(num2) //En el caso de la suma, se transforman ambos números a punto flotante, ya que si se mantiene en string, lo que va hacer es concatenar ambos números
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
    return Math.round(result * 10000) / 10000; //Al final devolvemos el resultado, redondeado a 4 dígitos decimales
}

//Esta función realiza la tarea de validar y comprobar las distintas operaciones y lo que se debe realizar en cada caso. Llega como parametro una operación.
function result(operation) {

    if (num1 != '' && num2 != '' && operation != '=' && operation != '√' && operation != '^') { //Aquí comprobamos que ambos números tengan un valor y que la operación se diferente de '=', '√', '^', esto se debe a que es una funcionalidad diferente
        num2 = document.getElementById("display-num").value; //Se almacena en 'num2', el valor actual del input
        num1 = document.getElementById("display-num").value = this.operations(currentOperation); //Se almacena en 'num1' el resultado de la operación, ejecutamos la función 'operations' para obtener el resultado. 'num1' pasaría a tener el valor de resultado
        currentOperation = operation; //Establecemos a 'currentOperation' con la operación que nos llegó por parametro
        num2 = ''; //Limpiamos la variable 'num2'
    } else if (num1 != '' && num2 == '' && operation != '=' && operation != '^' && operation != '√') { //Comprobamos que 'num1' tenga un valor y 'num2' no tenga valor, y que sea una operación diferente a '=', '√', '^'.
        num1 = document.getElementById("display-num").value; //'num1' pasa a tener el valor del input
        currentOperation = operation; //Establecemos a 'currentOperation' con la operación que nos llegó por parametro
        isNextValue = true; // 'isNextValue' pasa a true e indica que el siguiente valor a ingresar es 'num2'
    } else if (num1 != '' && currentOperation == '' && (operation == '^' || operation == '√')) { //Comprobamos que 'num1' tenga valor, que 'currentOperation' esté vacío y que la operación que llega sea '√' o '^'.
        currentOperation = operation; 
        num1 = document.getElementById("display-num").value = this.operations(currentOperation);
        currentOperation = ''; //Se limpia el 'currentOperation', esto para que no se muestre en el display, ya que la operación está resuelta
        isNextValue = false; //'isNextValue' pasa a false, lo que inidica que el siguiente valor que se va a ingresar es 'num1'
    } else if (num1 != '' && currentOperation != '' && (operation == '^' || operation == '√')) { //A diferencia del caso anterior, 'currentOperation' tiene un valor que antecede a la raíz y potencia, resolvemos esta operación antes.
        num1 = this.operations(currentOperation); //Aquí resolvemos la operación que ingresó primero el usuario, que se va a guardar en la variable 'num1'
        currentOperation = operation; //Aqui establecemos a 'currentOperation' con el valor que nos llega por parametro, que puede ser '√' o '^'.
        num1 = document.getElementById("display-num").value = this.operations(currentOperation); //Ahora aquí si resolvemos la raíz o potencia del valor que nos dejó la operación anterior, 'num1' queda con el valor del resultado
        currentOperation = '';
        num2 = '' //Se limpia 'num2', para que no quede con el valor de la primera operación
        isNextValue = false;
    }
    if (operation == '=' && currentOperation != '' && num2 > 0) { //Cuando la operación que selecciona el usuario es '=', 'currentOperation' tiene un valor y 'num2' es mayor que 0, realiza lo siguiente:
        num2 = document.getElementById("display-num").value; //Toma el valor actual del input y lo guarda en 'num2'
        num1 = document.getElementById("display-num").value = this.operations(currentOperation); // 'num1' toma el valor que deja el resultado de la función 'operations'
        currentOperation = ''; //Limpia 'currentOperation'
        num2 = ''; //Limpia 'num2'
        isNextValue = false; //El siguiente valor a ingresa es 'num1'
    }

    //Este es el display de la izquierda que lleva el registro de la operación que se está llevando a cabo
    document.getElementById("display-op").value = num1 + ' ' + currentOperation + ' ' + num2
}

//Esta función cumple la tarea de obtener el evento click, obtener el parametro que llega, y pasarlo a la función 'result'
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

//Esta funcion toma los clicks de los botones de 'cos', 'sin', 'tan', ya que solo se necesita 'num1', el valor del display pasa a ser el resultado de la operación, se usa la función de javascript 'Math'
function clickTrigo(value) {
    if (num1 != '') {//Comprobamos que 'num1 no llegue vacío'
        //Este switch comprueba el valor que llega, para así mismo hacer la operación correspondiente
        switch (value) {
            case 'cos':
                num1 = document.getElementById("display-num").value = Math.round(Math.cos(num1) * 10000) / 10000;//Se cambia el valor del input al resultado de la operacipon y se redondea a 4 decimales. 'num1' también queda con este valor
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

//Función encargada del cambio de signo
function changeSign() {
    if (num1 != 0) { //Se comprueba que 'num1' tenga un valor
        let display = document.getElementById("display-num").value *= -1; //Se multiplica el valor del display por -1 para obtener el signo contrario
        document.getElementById("display-op").value = display; //Se pasa el valor operado anteriormente en la línea 174
    }
}

//Esta función se encarga de limpiar el display
function clearDisplay() {
    if (cleared) { //Comprueba si cleared es true, lo que significa que ha sido limpiado el num2, en caso de que ya haya sido clickeado anteriormente, se limpiarán todos los valores y todo quedara desde 0 como en el inicio
        currentOperation = '';
        document.getElementById("display-op").value = '';
        document.getElementById("display-num").value = '';
        num1 = '';
        num2 = '';
        isNextValue = false;
        cleared = false;
    } else if (!cleared && currentOperation == '') { //Comprueba si cleared es false(osea que no ha sido limpiado antes), y que 'currentOperation' no tenga valor, en esete caso, limpia ambos display y la variable 'num1'
        document.getElementById("display-num").value = '';
        document.getElementById("display-op").value = '';
        num1 = '';
    } else if (!cleared && num2 > 0) { //Comprueba si cleared es false, y si 'num2' es mayor que 0, en este caso solo se limpiaría el display y 'num2', por si el usuario quiere corregir el segundo número
        document.getElementById("display-num").value = '';
        num2 = '';
        cleared = true;  //cleared queda con valor true, en caso de que el usuario quiera limpiar todo y vuelve a clickear el botón para limpiar, entraría en la primera condición siempre y cuando no haya escrito un nuevo número, si escribe un nuevo número, cleared pasa a ser false
    }
}

//Función encargada de agregar el punto decimal
function clickDot(){
    let number = document.getElementById("display-num").value; //Tomar el valor del display y lo guarda en una variable 'number'
    let isDotted = number.includes('.'); //Creamos otra variable que se llama 'isDotted' en la cual se guarda un valor booleano, que nos entrega 'includes'. 'includes' comprueba si el número tiene un punto, si tiene un punto devuelve true, si no devuelve false.
    if(!isDotted){// Si se obtiene un valor false entonces se agrega al numero en pantalla un '.' al final.
        document.getElementById("display-num").value += '.' 
    }
}