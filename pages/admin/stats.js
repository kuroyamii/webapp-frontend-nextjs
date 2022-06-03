import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import SideBar from "../../components/libs/admin-subpages/sidebar";
import { useEffect, useState } from "react";
import CafeAPI from "../../components/api/cafe-api";
import { useRouter } from "next/router";
import useStore from "../../src/providers/store";

const AdminStats = () => {
  const router = useRouter();
  const adminUsername = useStore((state) => state.username);
  const adminPassword = useStore((state) => state.password);

  useEffect(() => {
    if (adminUsername != "admin" && adminPassword != "admin1234") {
      router.push("/admin");
    }
  }, []);

  function onClick(e) {
    const data = CafeAPI.restock()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    router.reload();
  }
  const [food, setFood] = useState();
  useEffect(() => {
    (async () => {
      const data = await CafeAPI.getAllFoods([
        "Sushi",
        "Beverages",
        "Dessert",
        "Ramen",
        "Side Dish",
      ])
        .then((res) => setFood(res.data.data))
        .catch((err) => console.log(err));
    })();
  }, []);

  return (
    <Box>
      <Container maxW={"container.xl"}>
        <Grid templateColumns={"repeat(4,1fr)"} gap="5" w="100%">
          <GridItem h="100%" bgColor={"white.1"} p="1rem">
            <SideBar />
          </GridItem>
          <GridItem h="100%" bgColor={"white.1"} colSpan={3} p="1rem">
            <Heading fontSize={"1.5rem"}>
              <i>Statistics</i>
            </Heading>
            <Divider height={"0.5rem"} borderColor="grey.1" />
            <Text
              py="1rem"
              fontWeight={"normal"}
              fontFamily="Montserrat"
              color={"grey.1"}
            >
              Restock All Food's Stocks
            </Text>
            <Button
              size={"sm"}
              bgColor="red.1"
              color={"white"}
              fontWeight="normal"
              onClick={onClick}
            >
              Restock
            </Button>
            <Grid templateColumns={"repeat(2,1fr)"} mt="2rem" gap="5">
              <GridItem>
                <Heading fontSize={"1.5rem"}>
                  <i>Food Stocks</i>
                </Heading>
                <Grid>
                  {food &&
                    food.map(({ name, stock }, key) => (
                      <GridItem mb="0.5rem">
                        <Box
                          bgColor="white"
                          boxShadow={"md"}
                          display={"flex"}
                          justifyContent="space-between"
                          alignItems={"center"}
                          p="0.5rem"
                        >
                          <Text
                            fontWeight={"normal"}
                            fontFamily="Montserrat"
                            color={"grey.1"}
                          >
                            {name}
                          </Text>
                          <Text
                            fontWeight={"bold"}
                            fontFamily="Montserrat"
                            color={"grey.1"}
                          >
                            {stock}
                          </Text>
                        </Box>
                      </GridItem>
                    ))}
                </Grid>
              </GridItem>
              <GridItem display={"flex"} flexDir="row">
                <Divider orientation="vertical" borderColor={"grey.1"} />
                <Text
                  pl={"1rem"}
                  fontWeight={"normal"}
                  fontFamily="Montserrat"
                  color={"grey.1"}
                >
                  <i>
                    Food stock must be restocked everyday. You can do it by
                    clicking at the 'Restock' button above
                  </i>
                </Text>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminStats;
