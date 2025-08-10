import React from 'react';
import Select, { components, type StylesConfig, type DropdownIndicatorProps } from 'react-select';

// Define the type for your select options
interface OptionType {
  value: string;
  label: string;
}

// Custom dropdown indicator component
const DropdownIndicator = (props: DropdownIndicatorProps<OptionType, false>) => (
  <components.DropdownIndicator {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="10" viewBox="0 0 17 10" fill="none">
      <path d="M1 1.5L8.5 8.5L16 1.5" stroke="#686868" strokeWidth="2" />
    </svg>
  </components.DropdownIndicator>
);

// Custom styles for the select component
const customStyles: StylesConfig<OptionType, false> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#EBEBEB',
    height: '3.875rem',
    borderRadius: '3.125rem',
    border: state.isFocused ? '1px solid #686868' : 'none',
    boxShadow: 'none',
    padding: '0 1rem',
    '&:hover': {
      border: state.isFocused ? '1px solid #686868' : 'none',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: '1.25rem',
    color: '#686868',
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: '1.25rem',
    color: '#686868',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
};

// Reusable CustomSelect component
interface CustomSelectProps {
  options: OptionType[];
  placeholder?: string;
  value: OptionType | null;
  onChange: (option: OptionType | null) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, placeholder, value, onChange }) => {
  return (
    <Select
      options={options}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      styles={customStyles}
      components={{ DropdownIndicator }}
      isSearchable={true} // For the editable part, we enable search
    />
  );
};

export default CustomSelect;