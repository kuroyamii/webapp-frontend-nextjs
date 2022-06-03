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
    <Box bgColor={"white"} rounded="md" p="0.5rem" boxShadow={"md"} mb="0.5rem">
      <Link href={"/customer/" + customerData.customerID} passHref>
        <Grid display={"flex"} justifyContent="space-between">
          <GridItem>
            <Grid templateColumns={"repeat(2,1fr)"}>
              <GridItem>
                <Text color="black">Customer Name</Text>
              </GridItem>
              <GridItem>: {customerData.name}</GridItem>
              <GridItem>
                <Text color="black">Table</Text>
              </GridItem>
              <GridItem>: {customerData.tableID}</GridItem>
            </Grid>
          </GridItem>
          <GridItem>
            <Button
              onClick={handleClick}
              bgColor="red.1"
              color={"white"}
              fontWeight="normal"
            >
              Pay
            </Button>
          </GridItem>
        </Grid>
      </Link>
    </Box>
  );
};

export default CustomerCard;
