import { useEffect, useState } from "react";
import "./App.css";
import Display from "./Display";
import KeyBoard from "./KeyBoard";
import { evaluate } from 'mathjs';

const calcData = [
  { id: "clear", value: "AC" },
  { id: "divide", value: "/" },
  { id: "multiply", value: "x" },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "subtract", value: "-" },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "add", value: "+" },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "equals", value: "=" },
  { id: "zero", value: 0 },
  { id: "decimal", value: "." },
];

const operators = ["AC", "/", "x", "+", "-", "="];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function App() {
  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("");
  const [calculatorData, setCalculatorData] = useState("");

  const handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((ope) => ope === value);

    switch (value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        dotOperator(value);
        break;
      case operator:
        handleOperators(value);
        break;
      default:
        break;
    }
  };
  const handleClear = () => {
    setInput("0");
    setCalculatorData("");
  };
  const dotOperator = () => {
    const lastChar = calculatorData.charAt(calculatorData.length - 1);
    if (!calculatorData || lastChar === "*" || operators.includes(lastChar)) {
      setInput("0.");
      setCalculatorData("0.");
    } else {
      if (lastChar === "." || input.includes(".")) {
        // If the last character is already a dot or the input contains a dot, do nothing
        return;
      }
      setInput(`${input}.`);
      setCalculatorData(`${calculatorData}.`);
    }
  };
  const handleOperators = (value) => {
    if (calculatorData.length > 0) {
      // Get the last and second-to-last characters
      const lastChar = calculatorData.slice(-1); // lastChar = "+"
      const beforeLastChar = calculatorData.slice(-2, -1); // beforeLastChar = "2"

      // Check if the last and second-to-last characters are operators
      const isLastCharOperator =
        operators.includes(lastChar) || lastChar === "*"; // false
      const isBeforeLastCharOperator =
        operators.includes(beforeLastChar) || beforeLastChar === "*"; // false

      const validOp = value === "x" ? "*" : value; // validOp = "-"

      if (
        (isLastCharOperator && value !== "-") ||
        (isBeforeLastCharOperator && isLastCharOperator)
      ) {
        // If either the last character is an operator and the new value is not "-",
        // or both the last and second-to-last characters are operators

        if (isBeforeLastCharOperator) {
          // Remove the last two characters and append the new value
          setCalculatorData((prevData) => prevData.slice(0, -2) + value); // setCalculatorData("1-")
        } else {
          // Remove the last character and append the valid operator
          setCalculatorData((prevData) => prevData.slice(0, -1) + validOp); // setCalculatorData("12-")
        }
      } else {
        // Append the valid operator
        setCalculatorData((prevData) => prevData + validOp); // setCalculatorData("12-")
      }
    }
  };

  const handleNumbers = (value) => {
    if (!calculatorData.length) {
      setInput(`${value}`);
      setCalculatorData(`${value}`);
    } else {
      if (value === 0 && (calculatorData === "0" || input === "0")) {
        setCalculatorData(`${calculatorData}`);
      } else {
        const lastChat = calculatorData.charAt(calculatorData.length - 1);
        const isLastChatOperator =
          lastChat === "*" || operators.includes(lastChat);

        setInput(isLastChatOperator ? `${value}` : `${input}${value}`);
        setCalculatorData(`${calculatorData}${value}`);
      }
    }
  };

  const handleSubmit = () => {
    const total = evaluate(calculatorData);
    setInput(total);
    setOutput(total);
    setCalculatorData(total);
  };
  
  useEffect(() => {
    const handleOutput = () => {
      setOutput(calculatorData);
    };
    handleOutput();
  }, [calculatorData]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-pink-500 via-pink-600 to-purple-800">
      <h1 className="font-bold md:text-2xl mb-7  md:p-4 rounded-md title p-2 border-black">CALCULATOR</h1>
      <div className="bg-black md:p-7 rounded-xl md:min-w-64 p-5 max-w-md ">
        <div className="bg-slate-200 flex flex-col justify-items-end md:p-3 rounded-md mb-3 p-1">
          <Display input={input} output={output} />
        </div>
        <div className="grid grid-cols-4 keys min-w-64">
          <KeyBoard calcData={calcData} handleInput={handleInput} />
        </div>
      </div>
    </div>
  );
}

export default App;
