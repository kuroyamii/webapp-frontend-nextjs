import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = ({ onChangeStringSearch, value }) => {
  return (
    <InputGroup w={{ base: "100%", md: "22rem" }} display="inline-block">
      <InputLeftElement
        h={{ base: "1.875rem", md: "2.5rem" }}
        children={
          <Icon as={AiOutlineSearch} w={{ base: "0.8rem", md: "1rem" }} />
        }
      />
      <Input
        placeholder="Search Food"
        aria-label="Search Food"
        onChange={onChangeStringSearch}
        value={value}
        fontSize={{ base: "0.8rem", md: "1rem" }}
        h={{ base: "30px", md: "40px" }}
      />
    </InputGroup>
  );
};

export default SearchBar;
