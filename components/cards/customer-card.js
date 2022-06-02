import { Box, Button, Grid, GridItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CafeAPI from "../api/cafe-api";
import { useRouter } from "next/router";
import Link from "next/link";

const CustomerCard = ({ customerData, orderData, refresh }) => {
  const router = useRouter();

  function handleClick(e) {
    const data = CafeAPI.payBill(customerData.customerID).then((res) => {
      router.reload(window.location.pathname);
      // refresh = !refresh;
    });
  }

  return (
    <Box bgColor={"white"} rounded="xl" p="1rem">
      <Link href={"/customer/" + customerData.customerID} passHref>
        <Grid display={"flex"} justifyContent="space-between">
          <GridItem>
            <Text color="black">Customer Name: {customerData.name}</Text>
            <Text color="black">Table: {customerData.tableID}</Text>
          </GridItem>
          <GridItem>
            <Button onClick={handleClick}>Pay</Button>
          </GridItem>
        </Grid>
      </Link>
    </Box>
  );
};

export default CustomerCard;
