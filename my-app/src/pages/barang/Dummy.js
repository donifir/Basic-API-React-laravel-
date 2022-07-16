
import React, { useState } from "react";
import Select from 'react-select';

const option = [
    { value: "strawberry", label: "Strawberry" },
  ];


export default function Dummy() {
  const [selectedOption, setSelectedOption] = useState(option);


  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <Select
      defaultValue={selectedOption}
    //   onChange={setSelectedOption}
      options={options}
    />
  );
}
