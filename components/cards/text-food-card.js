import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import useStore from "../../src/providers/store";
import { useEffect, useState } from "react";
import React from "react";

const TextFoodCard = ({ name, path, stock }) => {
  const getIndex = (name) => {
    let index = data.findIndex((item) => {
      return item.name === name;
    });
    return index;
  };
  const data = useStore((state) => state.orders);
  const addOrder = useStore((state) => state.addOrder);
  const done = useStore((state) => state.done);
  const decreaseOrder = useStore((state) => state.decreaseOrder);
  const increaseOrder = useStore((state) => state.increaseOrder);
  const removeOrder = useStore((state) => state.removeOrder);
  const getAmount = useStore((state) => state.getAmount);
  const [amount, setAmount] = useState(getAmount(getIndex(name)));

  useEffect(() => {
    setAmount(getAmount(getIndex(name)));
  }, [data]);
  function handleIncrease(e) {
    if (amount < stock) {
      if (
        data.findIndex((item) => {
          return item.name === name;
        }) == -1
      ) {
        addOrder({ name: name, amount: 1 });
      } else {
        increaseOrder(
          data.findIndex((item) => {
            return item.name === name;
          })
        );
      }
      setAmount(amount + 1);
      console.log(getAmount(getIndex(name)));
    }
  }

  function handleDecrease(e) {
    let index = data.findIndex((item) => {
      return item.name === name;
    });
    if (index == -1) {
    } else if (data[index].amount == 1) {
      removeOrder(index);
      setAmount(amount - 1);
    } else {
      decreaseOrder(index);
      setAmount(amount - 1);
    }
    console.log(getAmount(getIndex(name)));
  }

  return (
    <Box
      rounded={"lg"}
      backgroundColor="white.1"
      boxShadow="sm"
      width={"100%"}
      height="auto"
      overflow={"hidden"}
      align="center"
      _hover={{ boxShadow: "md" }}
      display="flex"
      flexDir={"horizontal"}
      justifyContent="space-between"
      p="1rem"
    >
      <Text color={"black"} align="left">
        {name}
      </Text>
      <Grid display={"flex"} gap="0.5rem" alignItems={"center"}>
        <GridItem>
          <Text color={"black"}>{amount}</Text>
        </GridItem>
        <GridItem>
          <Button onClick={handleDecrease} size="sm" isDisabled={done}>
            -
          </Button>
        </GridItem>
        <GridItem>
          <Button onClick={handleIncrease} size="sm" isDisabled={done}>
            +
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default TextFoodCard;
