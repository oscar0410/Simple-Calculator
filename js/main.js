class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }
    // 全清除
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }
    // 倒退
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    // 數字
    appendNumber(value) {
        if (value === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + value.toString();
    }
    // 運算子
    chooseOperation(operation) {
        if (this.currentOperand === "") return;

        if (this.previousOperand !== "") {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
    // 計算
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) {
            return
        }
        switch (this.operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "*":
                computation = prev * current;
                break;
            case "÷":
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = ""
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const intDigits = parseFloat(stringNumber.split(".")[0]);
        const decDigits = (stringNumber.split(".")[1]);

        let finalDisplay;

        if(isNaN(intDigits)){
            finalDisplay = "";
        }
        else{
            finalDisplay = intDigits.toLocaleString("en", {maximumFractionDigits : 0})
        }

        if( decDigits != null){
            return`${finalDisplay}.${decDigits}`
        }
        else{
            return finalDisplay
        }
    }


    // 更新顯示
    updateDisplay() {
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else{
            this.previousOperandText.innerText = ""
        }
    }
}

let numberButtons = document.querySelectorAll("[data-number]");
let operationButtons = document.querySelectorAll("[data-operation]");
let equalsButton = document.querySelector("[data-equals]");
let deleteButton = document.querySelector("[data-del]");
let allClearButton = document.querySelector("[data-all-clear]");
let previousOperandText = document.querySelector("[data-previous-operand]");
let currentOperandText = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});
operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
});


deleteButton.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
});

