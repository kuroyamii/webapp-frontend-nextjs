import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";
import SecondNavbar from "../../components/navbar/second-navbar";
import { useEffect, useState } from "react";
import SearchBar from "../../components/search-bar";
import DropdownMenu from "../../components/dropdown-button";
import CafeAPI from "../../components/api/cafe-api";
import FoodCard from "../../components/cards/normal-food-card";
import useStore from "../../src/providers/store";

const SearchFood = () => {
  const [isNavbarStick, setIsNavbarStick] = useState(false);
  const [foodTypes, setFoodTypes] = useState();
  const [searchString, setSearchString] = useState("");
  const [foodType, setFoodType] = useState([]);
  const [foods, setFoods] = useState([]);

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

  const onChangeStringSearch = (e) => {
    setSearchString(e.target.value);
  };

  useEffect(() => {
    (async () => {
      const res = await CafeAPI.getTypes()
        .then((res) => setFoodTypes(res.data.data))
        .catch((e) => console.log(e));
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
  useEffect(() => {
    (async () => {
      const data = await CafeAPI.getFoodByTypeAndName(foodType, searchString)
        .then((res) => setFoods(res.data.data))
        .catch((res) => console.log(res));
    })();
  }, [searchString, foodType]);
  const onChangeCheckbox = (e) => {
    setFoodType(e);
  };
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
      <Container
        backgroundColor={"white"}
        maxW={"container.xl"}
        minH={"100vh"}
        pb="2rem"
      >
        <Box
          display={"flex"}
          justifyContent="center"
          pt="1rem"
          alignItems={"center"}
          flexDir={"column"}
        >
          <SearchBar onChangeStringSearch={onChangeStringSearch} />
          <Box mt="1rem">
            <CheckboxGroup onChange={onChangeCheckbox}>
              {foodTypes &&
                foodTypes.map(({ typeName }, key) => (
                  <Checkbox key={key} value={typeName} mx="0.5rem">
                    {typeName}
                  </Checkbox>
                ))}
            </CheckboxGroup>
          </Box>
        </Box>
        <Grid templateColumns={"repeat(4,1fr)"} gap="5rem" mt="4rem">
          {foods &&
            foods.map(
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

export default SearchFood;
