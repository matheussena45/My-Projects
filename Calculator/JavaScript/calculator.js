/**
 * ============================================================================
 * CALCULADORA MODERNA - ARQUITETURA EM ORIENTACAO A OBJETOS & ESTADO ISOLADO
 * ============================================================================
 * 
 * 1. O(1) Lookup Table:
 *    As operacoes ficam mapeadas em um dicionario de funcoes de tempo constante O(1),
 *    evitando cadeias de if/else e facilitando extensao (Open/Closed Principle).
 * 
 * 2. Estado em Memoria:
 *    Os dados da calculadora ficam no objeto JS (this.currentOperand, etc.)
 *    e so sincronizam com o DOM quando necessario (updateDisplay).
 */

const OPERATIONS = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => (b === 0 ? 'Erro' : a / b),
    '%': (a, b) => (a * b) / 100
};

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    /**
     * Remove o ultimo caractere digitado (DEL).
     * Se restar apenas 1 numero, volta para '0' (edge case).
     */
    delete() {
        if (this.currentOperand === '0') return;
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }

    /**
     * Concatena numeros e controla regras de ponto/virgula decimal.
     */
    appendNumber(number) {
        // Guard Clause: impede mais de um ponto decimal
        if (number === '.' && this.currentOperand.includes('.')) return;

        // Se o display for exatamente '0' e digitar um numero, substitui o '0'
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    /**
     * Define a operacao matematica e gerencia calculos encadeados.
     * Faz a "passagem de bastao": current sobe para previous.
     */
    chooseOperation(operation) {
        if (this.currentOperand === '') return;

        // Se ja havia uma conta pendente, resolve antes
        if (this.previousOperand !== '') {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    /**
     * Executa a operacao matematica usando o dicionario O(1).
     * Guard Clauses protegem contra valores invalidos.
     */
    compute() {
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        // Se nao houver valores numericos validos, interrompe
        if (isNaN(prev) || isNaN(current)) return;

        const fn = OPERATIONS[this.operation];
        if (!fn) return;

        const result = fn(prev, current);

        this.currentOperand = result.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        // TODO: Implementar juntos
    }
}
