let gvalor;
let goper;
let gresult;

function calcNum(num) {
    if (typeof gresult == 'undefined') {
        document.calcform.result.value = '';
    }
    document.calcform.result.value = document.calcform.result.value + num;
    gresult = 1;
}

function calcLimpar() {
    document.calcform.result.value = '';
    gvalor = undefined;
    goper = undefined;
    gresult = undefined;
}

function calcVoltar() {
    var back = document.calcform.result.value;
    document.calcform.result.value = back.substring(0, back.length - 1);
}

function calcOper(oper, valor1, valor2) {
    if (oper == "somar") {
        return parseFloat(valor1) + parseFloat(valor2);
    } else if (oper == "subtrair") {
        return valor1 - valor2;
    } else if (oper == "multiplicar") {
        return valor1 * valor2;
    } else {
        return valor1 / valor2;
    }
}

function calcParse(oper) {
    var valor = document.calcform.result.value;
    gresult = undefined;

    if (typeof goper !== 'undefined' && oper === 'resultado') {
        gvalor = calcOper(goper, gvalor, valor);
        document.calcform.result.value = gvalor;
        goper = undefined;
        gvalor = undefined;
        return 0;
    }

    if (typeof gvalor !== 'undefined') {
        gvalor = calcOper(goper, gvalor, valor);
        goper = oper;
        document.calcform.result.value = gvalor;
    } else {
        gvalor = valor;
        goper = oper;
    }
}
