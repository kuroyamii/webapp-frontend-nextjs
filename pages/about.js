import {
  Avatar,
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CafeAPI from "../components/api/cafe-api";

const AboutUs = () => {
  const [waiter, setWaiter] = useState();
  useEffect(() => {
    (async () => {
      const data = await CafeAPI.getWaiters()
        .then((res) => setWaiter(res.data.data))
        .catch((err) => console.log(err));
    })();
  }, []);

  useEffect(() => {
    console.log(waiter);
  }, [waiter]);
  return (
    <Box
      bgColor={"white.2"}
      minH={"90vh"}
      data-aos="fade-up"
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
    >
      <Container maxW={"container.xl"}>
        <Heading align="center" pt="2rem" mb="2rem" fontWeight="black">
          Meet Out Waiters
        </Heading>
        <Wrap justify={"center"} spacing={{ base: "5rem" }} px="5rem" py="2rem">
          {waiter &&
            waiter.map(({ name }, key) => (
              <WrapItem
                display={"flex"}
                flexDir="column"
                justifyContent={"center"}
                alignItems="center"
                p="1rem"
              >
                <Avatar h="6rem" w="auto" mb="1rem" />
                <Text
                  color={"grey.1"}
                  fontFamily="Montserrat"
                  fontWeight={"bold"}
                >
                  {name}
                </Text>
              </WrapItem>
            ))}
        </Wrap>
        {/* <Grid templateColumns={"repeat(3,1fr)"}>
        {waiter.map(({ name }, key) => (
          <GridItem
          display={"flex"}
          flexDir="column"
          justifyContent={"center"}
          alignItems="center"
          >
          <Avatar h="5rem" w="auto" />
          <Text color={"grey.1"} fontFamily="Montserrat" fontWeight={"bold"}>
          {name}
          </Text>
          </GridItem>
          ))}
        </Grid> */}
      </Container>
    </Box>
  );
};

export default AboutUs;
