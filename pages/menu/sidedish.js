import { Box, Container, Grid, GridItem, Image } from "@chakra-ui/react";
// import FoodCard from "../../components/cards/normal-food-card";
import SecondNavbar from "../../components/navbar/second-navbar";
import { useEffect, useState } from "react";
import useStore from "../../src/providers/store";
import dynamic from "next/dynamic";
import CafeAPI from "../../components/api/cafe-api";

const FoodCard = dynamic(
  () => import("../../components/cards/normal-food-card"),
  { ssr: false, loading: () => <p>...</p> }
);

const SideDish = () => {
  const [isNavbarStick, setIsNavbarStick] = useState(false);
  const [foodData, setData] = useState();

  const customerID = useStore((state) => state.customerID);
  const removeCust = useStore((state) => state.removeCustomerID);
  const remove = useStore((state) => state.deleteOrder);
  const setDoneStatus = useStore((state) => state.setDone);

  useEffect(() => {
    if (customerID != 0) {
      (async () => {
        const data = CafeAPI.getOrderDetailByID(customerID).then((res) => {
          if (res.data.data.orderID == 0) {
            remove();
            removeCust();
            setDoneStatus(false);
          }
        });
      })();
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const food = CafeAPI.getAllFoods(["Side Dish"])
          .then((res) => setData(res.data.data))
          .catch((e) => console.log(e));

        return;
      } catch (e) {
        console.log(e);
        return;
      }
    })();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      window.pageYOffset > 272
        ? setIsNavbarStick(true)
        : setIsNavbarStick(false);
    };
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);
  return (
    <Box>
      <Image src="/food/sashimi.jpg" h="17rem" w="full" objectFit={"cover"} />
      <Box
        shadow={isNavbarStick ? "md" : "sm"}
        position="sticky"
        top={"3.5rem"}
        zIndex="100"
      >
        <SecondNavbar />
      </Box>
      <Container maxW={"container.lg"} minH={"100vh"}>
        <Grid templateColumns={"repeat(4,1fr)"} gap="5rem" mt="4rem">
          {foodData &&
            foodData.map(
              ({ foodID, name, imagePath, price, stock, description }, key) => (
                <GridItem key={key}>
                  <FoodCard
                    name={name}
                    path={imagePath}
                    id={foodID}
                    price={price}
                    description={description}
                    stock={stock}
                  />
                </GridItem>
              )
            )}
        </Grid>
      </Container>
    </Box>
  );
};

export default SideDish;
