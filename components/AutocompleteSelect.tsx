import React, { useState } from "react";
import { useCombobox, UseComboboxStateChange } from "downshift";
import { Input, List, ListItem, Flex, Avatar, HStack } from "@chakra-ui/react";


interface Props {
  items: string[],
  value: string,
  setValue: (value: string) => void
}

const AutocompleteSelect = ({ items, value, setValue }: Props): JSX.Element => {
  const [inputItems, setInputItems] = useState(items);

  const handleInputValueChange = ({ inputValue }: UseComboboxStateChange<string>) => {
    setValue(inputValue ?? '')
    setInputItems(
      inputValue ? items.filter((item) =>
        item.toLowerCase().match(inputValue.toLowerCase())
      )
        : items);
  }

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    openMenu,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: handleInputValueChange,
    inputValue: value,
  });

  const handleClick = () => {
    openMenu()
  }

  return (
    <Flex {...getComboboxProps()} direction="column" flex="1 1 auto">
      <Flex direction="row" alignItems="baseline">
        <Input
          {...getInputProps()}
          placeholder="Search..."
          flex="0 0 auto"
          width={500}
          onClick={handleClick}
        />
      </Flex>
      <List
        {...getMenuProps()}
        flex={1}
        overflowY="auto"
        mt={0}
        display={isOpen ? undefined : "none"}
        py={2}
      >
        {inputItems.map((item, index) => (
          <HStack
            {...getItemProps({ item, index })}
            key={index}
            bg={index === highlightedIndex ? 'teal.100' : undefined}
            cursor="pointer"
            transition="background-color 220ms, color 220ms"
          >
            <Avatar />
            <ListItem
              px={4}
              py={2}
            >
              {item}
            </ListItem>
          </HStack>
        ))}
      </List>
    </Flex >
  );
}

export default AutocompleteSelect;