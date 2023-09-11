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
        // Append the button's value to the screen input
        document.getElementById("screenInp").value += value;
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
    }

    document.getElementById("screenInp").value = eval(expression);
  } catch (error) {
    document.getElementById("screenInp").value = "Error";
  }
}
