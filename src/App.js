import React, { useState } from "react";
import MySelectComponent from "./MySelectComponent";

export default function App() {
  const [data, setData] = useState(null);
  const options = [
    {label: 'Option 1', value: 'option-1'},
    {label: 'Option 2', value: 'option-2'},
    {label: 'Option 3', value: 'option-3'},
    {label: 'Option 4', value: 'option-4'},
    {label: 'Option 5', value: 'option-5'},
    {label: 'Option 6', value: 'option-6'},
    {label: 'Option 7', value: 'option-7'},
    {label: 'Option 8', value: 'option-8'},
    {label: 'Option 9', value: 'option-9'},
    {label: 'Option 10', value: 'option-10'},
  ];
  const onChange = value => {
    setData(value.label);
  };

  return (
    <div className="App">
      <h1>{data ? `You select ${data}` : `No selected option`}</h1>
      <MySelectComponent options={options} onChange={onChange} />
    </div>
  );
}
