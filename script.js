const num1Input = document.getElementById("firstNumber");
const num2Input = document.getElementById("secondNumber");
const localeSelect = document.getElementById("locale");
const expressionEl = document.getElementById("expression");
const rawResultEl = document.getElementById("raw-result");
const formattedResultEl = document.getElementById("formatted-result");
const errorEl = document.getElementById("error");
const buttons = document.querySelectorAll(".btn-op");

function parseNumber(value) {
  const cleaned = value.replace(/\s/g, "").replace(/,/g, "");
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : null;
}

function calculate(op) {
  errorEl.textContent = "";

  const n1 = parseNumber(num1Input.value);
  const n2 = parseNumber(num2Input.value);

  if (n1 === null || n2 === null) {
    errorEl.textContent = "Please enter valid numbers.";
    expressionEl.textContent = "Expression: —";
    rawResultEl.textContent = "Raw result: —";
    formattedResultEl.textContent = "Formatted: —";
    return;
  }

  let result;
  switch (op) {
    case "+": result = n1 + n2; break;
    case "-": result = n1 - n2; break;
    case "*": result = n1 * n2; break;
    case "/":
      if (n2 === 0) {
        errorEl.textContent = "Cannot divide by zero.";
        return;
      }
      result = n1 / n2;
      break;
  }

  const locale = localeSelect.value;
  const formatter = new Intl.NumberFormat(locale, { maximumFractionDigits: 4 });

  expressionEl.textContent = `Expression: ${n1} ${op} ${n2}`;
  rawResultEl.textContent = `Raw result: ${result}`;
  formattedResultEl.textContent = `Formatted (${locale}): ${formatter.format(result)}`;
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    calculate(btn.dataset.op);
  });
});
