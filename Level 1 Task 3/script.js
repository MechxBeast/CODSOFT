document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = '';
    let firstOperand = '';
    let isNewCalculation = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            // Clear button
            if (value === 'C') {
                clearCalculator();
                return;
            }

            // Equal button
            if (value === '=') {
                if (operator && firstOperand !== '' && currentInput !== '') {
                    currentInput = calculate(firstOperand, operator, currentInput);
                    operator = '';
                    firstOperand = '';
                    display.textContent = currentInput;
                    isNewCalculation = true;
                }
                return;
            }

            // Operator buttons
            if (['+', '-', '*', '/'].includes(value)) {
                if (firstOperand === '' && currentInput !== '') {
                    firstOperand = currentInput;
                    operator = value;
                    currentInput = '';
                } else if (currentInput !== '' && operator !== '') {
                    currentInput = calculate(firstOperand, operator, currentInput);
                    operator = value;
                    firstOperand = currentInput;
                    display.textContent = currentInput;
                    currentInput = '';
                }
                return;
            }

            // Decimal button - prevent multiple decimals
            if (value === '.' && currentInput.includes('.')) {
                return;
            }

            // Handle new calculation start
            if (isNewCalculation) {
                currentInput = '';
                isNewCalculation = false;
            }

            // Append value to current input
            currentInput += value;
            display.textContent = currentInput;
        });
    });

    function calculate(operand1, operator, operand2) {
        const a = parseFloat(operand1);
        const b = parseFloat(operand2);
        let result = 0;

        switch (operator) {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '/':
                result = a / b;
                break;
            default:
                return operand2;
        }

        // Check for floating-point precision issues and fix them
        return parseFloat(result.toFixed(10)).toString();
    }

    function clearCalculator() {
        currentInput = '';
        operator = '';
        firstOperand = '';
        display.textContent = '0';
    }
});
