import React from 'react';
import Select from 'react-select';


export default function MySelectComponent({ options, onChange }) {
  
  return <div data-testid="my-select-component">
    <Select
      className="basic-single"
      classNamePrefix="select"
      name="myOptions"
      placeholder="Select an option"
      options={options}
      onChange={e => onChange(e)}
    />
</div>;
}