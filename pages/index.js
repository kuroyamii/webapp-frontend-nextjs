import { Box, Container, Grid, Text, Wrap, WrapItem } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import CafeAPI from "../components/api/cafe-api";

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
    <Box>
      <Box>
        <Text color={"black"}>Estimated People Inside Cafe: {sum}</Text>
      </Box>
    </Box>
  );
}
