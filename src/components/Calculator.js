import React, { useEffect, useState } from "react";
import "./styles/style.css";
const Calculator = () => {
  const [currentOperand, setCurrentOperand] = useState("");
  const [previousOperand, setPreviousOperand] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [calculation, setCalculation] = useState("");
  const [total, setTotal] = useState(false);
  function addDigits(e) {
    setInput("");
    let val = e.target.innerText;
    if (total) {
      setPreviousOperand("");
    }
    previousOperand
      ? setPreviousOperand((prev) => prev + val)
      : setPreviousOperand(val);

    setTotal(false);
    if (operator !== null) {
      setPreviousOperand(previousOperand);
      if (currentOperand) {
        setCurrentOperand((prev) => prev + val);
      } else {
        setCurrentOperand(val);
      }
    }
  }
  useEffect(() => {
    setInput("");
    setPreviousOperand(previousOperand);
  }, [previousOperand]);

  useEffect(() => {
    setCurrentOperand(currentOperand);
  }, [currentOperand]);

  useEffect(() => {
    setInput("0");
  }, []);
  function operation(e) {
    if (previousOperand !== "") {
      setInput("");
      calculate();
      setOperator(e.target.innerText);
      setPreviousOperand(previousOperand);
    }

    setTotal(false);
  }
  function deleteDigits(e) {
    setInput("");
    setPreviousOperand(previousOperand.slice(0, previousOperand.length - 1));
  }
  function clearDigits() {
    setCurrentOperand("");
    setPreviousOperand("");
    setCalculation("");
    setOperator(null);
    setInput("0");
  }

  function calculate(e) {
    if (e?.target.innerText === "=") {
      setTotal(true);
      let calc;
      switch (operator) {
        case "/":
          calc = String(
            parseFloat(previousOperand) / parseFloat(currentOperand)
          );
          break;
        case "*":
          calc = String(
            parseFloat(previousOperand) * parseFloat(currentOperand)
          );
          break;
        case "+":
          calc = String(
            parseFloat(previousOperand) + parseFloat(currentOperand)
          );
          break;
        case "-":
          calc = String(
            parseFloat(previousOperand) - parseFloat(currentOperand)
          );
          break;
        default:
          return;
      }
      setCalculation(calc);
    }
  }

  return (
    <div className="calcultor-container">
      <div className="calc-grid">
        <div className="display-output">
          <div className="operands">
            {input} {previousOperand} {operator} {currentOperand}
          </div>
          <div className="result">{calculation}</div>
        </div>
        <button onClick={clearDigits} className="span">
          AC
        </button>
        <button onClick={deleteDigits}>Del</button>
        <button onClick={operation} className="operand">
          /
        </button>
        <button onClick={addDigits} className="operand">
          1
        </button>
        <button onClick={addDigits} className="operand">
          2
        </button>
        <button onClick={addDigits} className="operand">
          3
        </button>
        <button onClick={operation} className="operand">
          *
        </button>
        <button onClick={addDigits} className="operand">
          4
        </button>
        <button onClick={addDigits} className="operand">
          5
        </button>
        <button onClick={addDigits} className="operand">
          6
        </button>
        <button onClick={operation} className="operand">
          +
        </button>
        <button onClick={addDigits} className="operand">
          7
        </button>
        <button onClick={addDigits} className="operand">
          8
        </button>
        <button onClick={addDigits} className="operand">
          9
        </button>
        <button onClick={operation} className="operand">
          -
        </button>
        <button onClick={addDigits} className="operand">
          .
        </button>
        <button onClick={addDigits} className="operand">
          0
        </button>
        <button onClick={calculate} className="operand span">
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
