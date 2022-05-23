import {
  Box,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  StackItem,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import useStore from "../src/providers/store";

const Orders = () => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => setInput(e.target.value);

  const isError = input === "";
  return (
    <Container maxW={"container.xl"}>
      <Heading m={"2rem"} fontWeight="black" textAlign="center">
        My Orders
      </Heading>
      <Box bg={"white"} w="100%" p={"2rem"} rounded="2xl">
        <Stack>
          <StackItem>
            <FormControl isRequired>
              <FormLabel htmlFor="customerName" fontWeight="black">
                Your Name
              </FormLabel>
              <Input
                placeholder="Your Name"
                id="customerName"
                type="customerName"
              />
            </FormControl>
          </StackItem>
          <StackItem>
            <FormControl>
              <FormLabel htmlFor="table" fontWeight="black">
                Seat
              </FormLabel>
              <Select id="table" placeholder="Select Seat">
                <option>United Arab Emirates</option>
                <option>Nigeria</option>
              </Select>
            </FormControl>
          </StackItem>
          <StackItem>
            <Text color={"black"} fontWeight="black">
              Orders
            </Text>
          </StackItem>
        </Stack>
      </Box>
    </Container>
  );
};

export default Orders;
