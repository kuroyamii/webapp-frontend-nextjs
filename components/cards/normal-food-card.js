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

const FoodCard = ({ name, path }) => {

  const getIndex = (name) => {
    let index = data.findIndex((item) => {
      return item.name === name;
    })
    return index
  };

  const data = useStore((state) => state.orders);
  const addOrder = useStore((state) => state.addOrder);
  const decreaseOrder = useStore((state) => state.decreaseOrder);
  const increaseOrder = useStore((state) => state.increaseOrder);
  const removeOrder = useStore((state) => state.removeOrder);
  const getAmount = useStore((state) => state.getAmount);
  const [amount, setAmount] = useState(getAmount(getIndex(name)));
  
  function handleIncrease(e) {
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

  function handleDecrease(e) {
    let index = data.findIndex((item) => {
      return item.name === name;
    });
    if (index == -1) {
    } else if (data[index].amount == 1) {
      removeOrder(index);
    } else {
      decreaseOrder(index);
    }
    setAmount(amount - 1);
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
      <Link href={"/"} passHref>
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
      <Grid mb={"0.5rem"} gridGap={1} display="flex" justifyContent={"center"}>
        <GridItem>
          <Text color={"black"}>
            { amount }
          </Text>
        </GridItem>
        <GridItem>
          <Button size={"sm"} onClick={handleIncrease}>
            +
          </Button>
        </GridItem>
        <GridItem>
          <Button size={"sm"} onClick={handleDecrease}>
            -
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default FoodCard;
