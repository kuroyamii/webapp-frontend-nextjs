import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Image,
  Text,
  useEventListenerMap,
} from "@chakra-ui/react";
import Link from "next/link";
import useStore from "../../src/providers/store";
import { useEffect, useState } from "react";
import React from "react";

const BasicFoodCard = ({ id, name, path, type, description, price, stock }) => {
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
  const [stockStatus, setStockStatus] = useState(true);
  useEffect(() => {
    if (stock == 0) {
      setStockStatus(false);
    } else if (stock > 0) {
      setStockStatus(true);
    } else {
      setStockStatus(false);
    }
  }, [stock]);

  // useEffect(() => {
  //   console.log(data[getIndex(name)]);
  // }, [JSON.stringify(data)]);

  function handleIncrease(e) {
    if (amount < stock) {
      if (
        data.findIndex((item) => {
          return item.name === name;
        }) == -1
      ) {
        addOrder({ id: id, name: name, price: price, amount: 1, stock: stock });
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
      rounded="lg"
      backgroundColor={"white.1"}
      boxShadow="md"
      width={"11.5rem"}
      height="auto"
      overflow={"hidden"}
      align="center"
      _hover={{ boxShadow: "xl" }}
    >
      <Link href={"/food/" + id} passHref>
        <Box>
          <Image
            src={path}
            objectFit="cover"
            height={"9rem"}
            width="full"
            cursor={"pointer"}
          />
          <Box
            bgColor={"white"}
            h="3rem"
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            overflow="hidden"
          >
            <Text
              my="0.3rem"
              textColor={"grey.1"}
              wordBreak="break-word"
              cursor={"pointer"}
            >
              {name}
            </Text>
          </Box>
        </Box>
      </Link>
      <Grid
        mb="0.5rem"
        display={"flex"}
        gap="0.5rem"
        alignItems={"center"}
        justifyContent="center"
      ></Grid>
    </Box>
  );
};

export default BasicFoodCard;
