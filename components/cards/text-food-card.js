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

const TextFoodCard = ({ name, path, stock, price }) => {
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
  const addPrice = useStore((state) => state.addPrice);
  const decreasePrice = useStore((state) => state.decreasePrice);

  useEffect(() => {
    setAmount(getAmount(getIndex(name)));
  }, [data]);
  // function handleIncrease(e) {
  //   if (amount < stock) {
  //     if (
  //       data.findIndex((item) => {
  //         return item.name === name;
  //       }) == -1
  //     ) {
  //       addOrder({ name: name, amount: 1 });
  //       addPrice(price);
  //     } else {
  //       increaseOrder(
  //         data.findIndex((item) => {
  //           return item.name === name;
  //         })
  //       );
  //     }
  //     if (data[getIndex(name)]) {
  //       console.log(data[getIndex(name)].price);
  //       addPrice(data[getIndex(name)].price);
  //     }
  //     setAmount(amount + 1);
  //     console.log(getAmount(getIndex(name)));
  //   }
  // }
  function handleIncrease(e) {
    console.log(amount + " " + stock);
    if (amount < stock) {
      if (
        data.findIndex((item) => {
          return item.name === name;
        }) == -1
      ) {
        addOrder({ id: id, name: name, price: price, amount: 1 });
        addPrice(price);
      } else {
        increaseOrder(
          data.findIndex((item) => {
            return item.name === name;
          })
        );
      }
      if (data[getIndex(name)]) {
        console.log(data[getIndex(name)].price);
        addPrice(data[getIndex(name)].price);
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
      if (data[getIndex(name)]) {
        console.log(data[getIndex(name)].price);
        decreasePrice(data[getIndex(name)].price);
      }
      removeOrder(index);
      setAmount(amount - 1);
    } else {
      if (data[getIndex(name)]) {
        console.log(data[getIndex(name)].price);
        decreasePrice(data[getIndex(name)].price);
      }
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
