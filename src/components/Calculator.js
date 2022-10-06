import React, { useEffect, useState } from "react";
import "./styles/style.css";
const Calculator = () => {
  const [currentOperand, setCurrentOperand] = useState("");
  const [previousOperand, setPreviousOperand] = useState("");
  const [allOperands, setAllOperands] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [calculation, setCalculation] = useState("");
  const [disable, setDisable] = useState(false);
  const [dot, setDot] = useState(false);
  function addDigits(e) {
    setInput("");
    let val = e.target.innerText;
    if (previousOperand) {
      setInput("");
      setPreviousOperand((prev) => prev + val);
    } else {
      setPreviousOperand(val);
    }

    if (operator !== null) {
      setInput("");
      setPreviousOperand(previousOperand);
      if (currentOperand) {
        setInput("");
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
    setInput("");
    setCurrentOperand(currentOperand);
  }, [currentOperand]);

  useEffect(() => {
    if (currentOperand === "" && operator === null && previousOperand === "") {
      setInput("0");
    } else {
      setInput("");
    }
  });
  function operation(e) {
    if (previousOperand !== "") {
      setInput("");
      calculate();
      setOperator(e.target.innerText);
      setPreviousOperand(previousOperand);
    }
  }
  function deleteDigits() {
    if (currentOperand !== "") {
      setCurrentOperand(currentOperand.slice(0, currentOperand.length - 1));
    } else if (operator !== null && currentOperand === "") {
      setOperator(operator.slice(0, operator.length - 1));
    } else {
      setPreviousOperand(previousOperand.slice(0, previousOperand.length - 1));
    }
  }
  function clearDigits() {
    setCurrentOperand("");
    setPreviousOperand("");
    setCalculation("");
    setOperator(null);
    setDisable(false);
    setInput("0");
  }

  function calculate(e) {
    setInput("");
    if (e?.target.innerText === "=") {
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
      setDisable(true);
      setAllOperands(previousOperand + operator + currentOperand);
      console.log(allOperands);
    }
  }

  return (
    <div className="calcultor-container">
      <div className="calc-grid">
        <div className="display-output">
          <div className="operands">
            {input} {previousOperand} {operator} {currentOperand}
          </div>
          <div className="result">{calculation} </div>
        </div>
        <button onClick={clearDigits} className="span">
          AC
        </button>
        <button disabled={disable} onClick={deleteDigits}>
          Del
        </button>
        <button disabled={disable} onClick={operation} className="operand">
          /
        </button>
        <button disabled={disable} onClick={addDigits} className="operand">
          1
        </button>
        <button disabled={disable} onClick={addDigits} className="operand">
          2
        </button>
        <button disabled={disable} onClick={addDigits} className="operand">
          3
        </button>
        <button disabled={disable} onClick={operation} className="operand">
          *
        </button>
        <button disabled={disable} onClick={addDigits} className="operand">
          4
        </button>
        <button disabled={disable} onClick={addDigits} className="operand">
          5
        </button>
        <button disabled={disable} onClick={addDigits} className="operand">
          6
        </button>
        <button disabled={disable} onClick={operation} className="operand">
          +
        </button>
        <button disabled={disable} onClick={addDigits} className="operand">
          7
        </button>
        <button disabled={disable} onClick={addDigits} className="operand">
          8
        </button>
        <button disabled={disable} onClick={addDigits} className="operand">
          9
        </button>
        <button disabled={disable} onClick={operation} className="operand">
          -
        </button>
        <button disabled={disable} onClick={addDigits} className="operand">
          .
        </button>
        <button disabled={disable} onClick={addDigits} className="operand">
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
