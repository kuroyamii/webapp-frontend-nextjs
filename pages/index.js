import {
  Box,
  Container,
  Grid,
  Text,
  Wrap,
  WrapItem,
  Image,
  GridItem,
  Heading,
  Button,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState, useEffect } from "react";
import CafeAPI from "../components/api/cafe-api";
import BasicFoodCard from "../components/cards/food-card";
import Link from "next/link";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [sum, setSum] = useState(0);
  useEffect(() => {
    (async () => {
      const data = await CafeAPI.getSumPeople()
        .then((res) => setSum(res.data.data.totalPeople))
        .catch((err) => console.log(err));
    })();
  }, []);
  return (
    <Box bgColor={"white.1"}>
      <Container bgColor={"white"} maxW={"container.xl"} px="4rem">
        <Grid templateColumns={"repeat(2,1fr)"} h="90vh">
          <GridItem
            data-aos="fade-right"
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
          >
            <Image src="/logo/LOGO.png" boxSize={"32rem"} />
          </GridItem>
          <GridItem
            data-aos="fade-left"
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
          >
            <Box>
              <Heading mb={"0.5rem"}>
                What is{" "}
                <Box as="span" color="yellow.1">
                  Inugami Cafe
                </Box>
              </Heading>
              <Text
                color={"grey"}
                lineHeight="2rem"
                fontSize={"1rem"}
                fontFamily="Montserrat"
              >
                Inugami cafe adalah sebuah cafe bertema jepang dimana makanan
                dan minuman yang tersedia memiliki cita rasa oriental jepang.
                Suasana ruangan mendukung untuk dijadikan story bersama teman
                teman maupun keluarga. Harga yang murah menjadi motto kami
                dimana kami memberikan yang terbaik dengan harga yang ramah di
                kantong.
              </Text>
              <Link href={"/menu"} passHref>
                <Button
                  bgColor={"red.1"}
                  color="white.1"
                  fontWeight={"normal"}
                  mt="1rem"
                  _active={{ bgColor: "none" }}
                  _hover={{ bgColor: "none" }}
                  boxShadow="md"
                >
                  Order Now!
                </Button>
              </Link>
            </Box>
          </GridItem>
        </Grid>
        <Grid templateColumns={"repeat(2,1fr)"} pb="5rem" data-aos="fade-up">
          <GridItem>
            <Box>
              <Heading mb={"0.5rem"}>
                What's Special
                <br />
                About{" "}
                <Box as="span" color="yellow.1">
                  Inugami Cafe
                </Box>
              </Heading>
              <Text
                color={"grey"}
                lineHeight="2rem"
                fontSize={"1rem"}
                fontFamily="Montserrat"
              >
                Inugami cafe adalah sebuah cafe bertema jepang dimana makanan
                dan minuman yang tersedia memiliki cita rasa oriental
                jepang.Suasana ruangan mendukung untuk dijadikan story bersama
                teman teman maupun keluarga.Harga yang murah menjadi motto kami
                dimana kami meberikan yang terbaik dengan harga yang ramah di
                kantong.Selain itu kami juga menggunakan pemesanan berbasis web
                sebagai salah satu ciri khas kami yang memberikan suasana
                seperti restoran di jepang yang sudah banyak memakai mesin
                sebagai alat pemesanan.
              </Text>
              <Button
                bgColor={"red.1"}
                color="white.1"
                fontWeight={"normal"}
                mt="1rem"
                _active={{ bgColor: "none" }}
                _hover={{ bgColor: "none" }}
                boxShadow="md"
              >
                Estimated People Inside Inugami Cafe: {sum} Peoples
              </Button>
            </Box>
          </GridItem>
          <GridItem
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
          >
            <Image src="/food/Food Card.svg" />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
