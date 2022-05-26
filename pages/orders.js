import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  Stack,
  StackItem,
  Text,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import useStore from "../src/providers/store";
import dynamic from "next/dynamic";

const FoodCard = dynamic(() => import("../components/cards/text-food-card"), {
  ssr: false,
  loading: () => <p>...</p>,
});

const Orders = () => {
  const NameRef = useRef();
  const [input, setInput] = useState("");
  const data = useStore((state) => state.orders);
  const [custName, setCustName] = useState("");
  const [done, setDone] = useState(false);

  const handleInputChange = (e) => setInput(e.target.value);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    alert(custName);
    setDone(true);
  };

  function handleOnChangeName(e) {
    setCustName(NameRef.current.value);
    console.log(NameRef.current.value);
  }
  function handleOnClickDone(e) {
    console.log(done);
    setDone(false);
  }

  const isError = input === "";
  return (
    <Container maxW={"container.xl"}>
      <Heading m={"2rem"} fontWeight="black" textAlign="center">
        My Orders
      </Heading>
      {done == false && (
        <Box bg={"white"} w="100%" p={"2rem"} rounded="2xl">
          <form onSubmit={handleOnSubmit}>
            <Stack>
              <StackItem>
                <FormControl isRequired>
                  <FormLabel htmlFor="customerName" fontWeight="black">
                    Your Name
                  </FormLabel>
                  <Input
                    ref={NameRef}
                    onChange={handleOnChangeName}
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
              {}
              <StackItem>
                {data.map(({ name, path }, key) => (
                  <Grid
                    templateColumns={"repeat(1,1fr)"}
                    gap="5rem"
                    my="0.5rem"
                  >
                    <GridItem key={key}>
                      <FoodCard name={name} path={path} />
                    </GridItem>
                  </Grid>
                ))}
              </StackItem>
              <StackItem>
                <Button type="submit">Place Order</Button>
              </StackItem>
            </Stack>
          </form>
        </Box>
      )}
      {done == true && (
        <Box>
          <Button onClick={handleOnClickDone}>Done</Button>
        </Box>
      )}
    </Container>
  );
};

export default Orders;
