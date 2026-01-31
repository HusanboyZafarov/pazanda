import { Select } from "@chakra-ui/react";
import React from "react";

const SelectComponent = ({ value, onChange, options, placeholder = "Tanlang", setFormData, transportTypes }) => {



  const handleChange = (e)=>{
    console.log(e.target.value)
  }
  return (
    <Select.Root
      selected={(item) => item.value === formData.transport}
      onSelect={(item) => setFormData({ ...formData, transport: item.value })}
      collection={transportTypes}
    >
      <Select.HiddenSelect />
      <Select.Trigger
        flex={1}  
        bg="white"
        borderColor="gray.400"
        paddingLeft={"30px"}

        _focusWithin={{
          borderColor: "primary.light",
          boxShadow: "0 0 0 1px token(colors.primary.light)",
        }}
      >
        <Select.ValueText placeholder={placeholder} />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Positioner>
        <Select.Content>
          {options.map((item) => (
            <Select.Item key={item.value} item={item}>
              {item.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
};

export default SelectComponent;
