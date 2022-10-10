import React, { useEffect, useState } from "react";
import "./styles/style.css";
import sound from "./styles/vibration.mp3";
import sound2 from "./styles/vibration2.mp3";
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
  //adding sounds
  let audio = new Audio(sound);
  let audio2 = new Audio(sound2);
  const operandsVibration = () => {
    audio.play();
  };
  const operatorsVibration = () => {
    audio2.play();
  };
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
    operandsVibration();
  }
  // function for getting operators
  function operation(e) {
    if (previousOperand !== "") {
      setOperator(e.target.innerText);
    }
    operatorsVibration();
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
    operatorsVibration();
  }
  //function for clearing the states
  function clearDigits() {
    setCurrentOperand("");
    setPreviousOperand("");
    setCalculation("");
    setOperator(null);
    setDisable(false);
    operatorsVibration();
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
    operatorsVibration();
  }

  return (
    <div className="calcultor-container">
      <div className="calc-grid">
        <div className="display-output">
          <div className="inner-display">
            <div className="operands">
              {input} {previousOperand} {operator} {currentOperand}
            </div>
            <div className="result">{calculation} </div>
          </div>
        </div>
        <button onClick={clearDigits} className="span">
          AC
        </button>
        <button disabled={disable} onClick={deleteDigits}>
          Del
        </button>
        <button disabled={disable} onClick={operation}>
          /
        </button>
        <button disabled={disable} onClick={addDigits}>
          1
        </button>
        <button disabled={disable} onClick={addDigits}>
          2
        </button>
        <button disabled={disable} onClick={addDigits}>
          3
        </button>
        <button disabled={disable} onClick={operation}>
          *
        </button>
        <button disabled={disable} onClick={addDigits}>
          4
        </button>
        <button disabled={disable} onClick={addDigits}>
          5
        </button>
        <button disabled={disable} onClick={addDigits}>
          6
        </button>
        <button disabled={disable} onClick={operation}>
          +
        </button>
        <button disabled={disable} onClick={addDigits}>
          7
        </button>
        <button disabled={disable} onClick={addDigits}>
          8
        </button>
        <button disabled={disable} onClick={addDigits}>
          9
        </button>
        <button disabled={disable} onClick={operation}>
          -
        </button>
        <button disabled={dot} onClick={addDigits}>
          .
        </button>
        <button disabled={disable} onClick={addDigits}>
          0
        </button>
        <button disabled={disable} onClick={operation}>
          %
        </button>
        <button onClick={calculate}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
