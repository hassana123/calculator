import React, { useEffect, useState } from "react";
import "./styles/style.css";
const Calculator = () => {
  //setting all the states
  const [currentOperand, setCurrentOperand] = useState("");
  const [previousOperand, setPreviousOperand] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [calculation, setCalculation] = useState("");
  const [disable, setDisable] = useState(false);
  const [dot, setDot] = useState(false);
  //useEffect runs Each time the dependency(previousOperand) changes
  useEffect(() => {
    setPreviousOperand(previousOperand);
  }, [previousOperand]);
  //useEffect runs Each time the dependency(cuurentOperand) changes
  useEffect(() => {
    setCurrentOperand(currentOperand);
  }, [currentOperand]);
  // runs on reload
  useEffect(() => {
    if (currentOperand === "" && operator === null && previousOperand === "") {
      setInput("0");
    } else {
      setInput("");
    }
  }, [currentOperand, operator, previousOperand]);
  useEffect(() => {
    if (previousOperand.includes(".")) {
      setDot(true);
    } else {
      setDot(false);
    }
  }, [previousOperand]);
  useEffect(() => {
    if (!currentOperand.includes(".")) {
      setDot(false);
    } else {
      setDot(true);
    }
  }, [currentOperand]);

  // function for getting operands
  function addDigits(e) {
    let val = e.target.innerText;

    if (previousOperand) {
      setPreviousOperand((prev) => prev + val);
    } else {
      setPreviousOperand(val);
    }
    if (operator !== null) {
      setPreviousOperand(previousOperand);
      if (currentOperand) {
        setCurrentOperand((prev) => prev + val);
      } else {
        setCurrentOperand(val);
      }
    }
  }
  // function for getting operators
  function operation(e) {
    if (previousOperand !== "") {
      setOperator(e.target.innerText);
    }
  }
  //function for deleting states // still having bugs //will figure it out
  function deleteDigits() {
    if (previousOperand !== "" && currentOperand === "" && operator === null) {
      setPreviousOperand(previousOperand.slice(0, previousOperand.length - 1));
    }
    if (currentOperand !== "") {
      setCurrentOperand(currentOperand.slice(0, currentOperand.length - 1));
    }
    if (operator !== null && currentOperand === "") {
      setOperator(operator.slice(0, operator.length - 1));
    }
  }
  //function for clearing the states
  function clearDigits() {
    setCurrentOperand("");
    setPreviousOperand("");
    setCalculation("");
    setOperator(null);
    setDisable(false);
  }
  ///function to do the calculations
  function calculate(e) {
    if (e.target.innerText === "=") {
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
       case "%":
          calc = String(
            parseFloat(previousOperand) % parseFloat(currentOperand)
          );
          break; 
        default:
          return;
      }
      setCalculation(calc);
      setDisable(true);
      setDot(true);
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
        <button disabled={dot} onClick={addDigits} className="operand">
          .
        </button>
        <button disabled={disable} onClick={addDigits} className="operand">
          0
        </button>
        <button disabled={disable} onClick={operation} className="operand">
          %
        </button>
        <button onClick={calculate} className="operand">
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
