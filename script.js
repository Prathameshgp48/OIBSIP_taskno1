document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll("#buttons input[type='button']");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const value = button.value;

      if (value === "AC") {
        clearAll();
      } else if (value === "C") {
        clearOne();
      } else if (value === "=") {
        calculateResult();
      } else {
        const screenInp = document.getElementById("screenInp");
        const currentVal = screenInp.value;

        if (value === "1/x") {
          if (currentVal !== "") {
            screenInp.value = `1/(${currentVal})`;
          }
        } else if (value === "x^") {
          if (currentVal !== "") {
            screenInp.value = `${currentVal}^`;
          }
        } else if (value === "n!") {
          if (currentVal !== "") {
            screenInp.value = `${currentVal}!`;
          }
        } else {
          screenInp.value += value;
        }
      }
    });
  });
});

function clearAll() {
  document.getElementById("screenInp").value = "";
}

function clearOne() {
  let currentVal = document.getElementById("screenInp").value;
  currentVal = currentVal.slice(0, -1);
  document.getElementById("screenInp").value = currentVal;
}

function calculateResult() {
  try {
    let expression = document.getElementById("screenInp").value;
    expression = expression.replace("%", "/100");
    expression = expression.replace("^", "**");

    if (expression.includes("!")) {
      const operand = parseFloat(expression.split("!")[0]);
      let result = 1;
      for (let i = 2; i <= operand; i++) {
        result *= i;
      }
      expression = result.toString();
    } else if (expression.includes("√")) {
      const operand = parseFloat(expression.split("√")[1]);
      expression = Math.sqrt(operand).toString();
    } else if (expression.includes("log")) {
      const operand = parseFloat(expression.split("log")[1]);
      expression = Math.log10(operand).toString();
    } else if (expression.includes("ln")) {
      const operand = parseFloat(expression.split("ln")[1]);
      expression = Math.log(operand).toString();
    } else if (expression.includes("1/(")) {
      const operand = parseFloat(expression.split("1/(")[1].split(")")[0]);
      if (operand !== 0) {
        expression = (1 / operand).toString();
      } else {
        document.getElementById("screenInp").value = "Error: Division by zero";
        return;
      }
    } else if (expression.includes("^")) {
      const operands = expression.split("^");
      if (operands.length === 2) {
        const base = parseFloat(operands[0]);
        const exponent = parseFloat(operands[1]);
        expression = Math.pow(base, exponent).toString();
      }
    }

    document.getElementById("screenInp").value = eval(expression);
  } catch (error) {
    document.getElementById("screenInp").value = "Error";
  }
}
