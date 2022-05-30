import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const DropdownMenu = ({ onChangeFilter }) => {
  const [value, setValue] = useState("All");

  const onChangeValue = (newValue) => (e) => {
    setValue(newValue);
    onChangeFilter(newValue);
  };

  return (
    <Menu>
      <MenuButton
        _focus={"none"}
        _selected={"none"}
        as={Button}
        colorScheme="brand"
        textColor="black"
        rightIcon={<FaChevronDown />}
        fontSize={{ base: "0.8rem", md: "1rem" }}
        h={{ base: "30px", md: "40px" }}
      >
        {value}
      </MenuButton>
      <MenuList fontSize={{ base: "0.8rem", md: "1rem" }} p="0.5rem">
        <MenuItem onClick={onChangeValue("All")}>All</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default DropdownMenu;
