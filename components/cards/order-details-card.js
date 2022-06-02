import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import BasicFoodCard from "./food-card";
import useStore from "../../src/providers/store";

const OrderDetails = ({
  customerName,
  orderID,
  orderDetails,
  orderedAt,
  waiterData,
}) => {
  const totalBill = useStore((state) => state.price);
  return (
    <Box display={"flex"} justifyContent="center" flexDir={"column"}>
      <Text color={"black"}>Customer Name: {customerName}</Text>
      <Text color={"black"}>Waiter Name: {waiterData?.name}</Text>
      <Text color={"black"}>Order ID: {orderID}</Text>
      <Grid templateColumns={"repeat(4,1fr)"} gridGap="5">
        {orderDetails?.map(({ detailID, foodData }, key) => (
          <GridItem key={key}>
            <BasicFoodCard
              id={foodData.foodID}
              name={foodData.name}
              path={foodData.imagePath}
              type={foodData.foodType}
              description={foodData.description}
              price={foodData.price}
              stock={foodData.stock}
            />
          </GridItem>
        ))}
      </Grid>
      <Text color={"black"}>Total Bill: Rp {totalBill}</Text>
    </Box>
  );
};

export default OrderDetails;
