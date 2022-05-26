import { Box, Container, Grid, GridItem, Image } from "@chakra-ui/react";
// import FoodCard from "../../components/cards/normal-food-card";
import SecondNavbar from "../../components/navbar/second-navbar";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const FoodCard = dynamic(
  () => import("../../components/cards/normal-food-card"),
  { ssr: false, loading: () => <p>...</p> }
);

const SideDish = () => {
  const [isNavbarStick, setIsNavbarStick] = useState(false);

  useEffect(() => {
    const scrollListener = () => {
      window.pageYOffset > 272
        ? setIsNavbarStick(true)
        : setIsNavbarStick(false);
    };
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);
  const foodData = [
    {
      name: "Okonomiyaki ",
      path: "/food/ramen.jpg",
    },
    {
      name: "Okonomiyaki Okonomiyaki Okonomiyaki Okonomiyaki Okonomiyaki Okonomiyaki Okonomiyaki Okonomiyaki ",
      path: "/food/ramen.jpg",
    },
    {
      name: "Okonomiyaki ",
      path: "/food/ramen.jpg",
    },
    {
      name: "Okonomiyaki ",
      path: "/food/ramen.jpg",
    },
    {
      name: "Okonomiyaki ",
      path: "/food/ramen.jpg",
    },
    {
      name: "Okonomiyaki Okonomiyaki Okonomiyaki Okonomiyaki Okonomiyaki Okonomiyaki Okonomiyaki Okonomiyaki ",
      path: "/food/ramen.jpg",
    },
    {
      name: "Okonomiyaki ",
      path: "/food/ramen.jpg",
    },
    {
      name: "Okonomiyaki ",
      path: "/food/ramen.jpg",
    },
    {
      name: "Okonomiyaki ",
      path: "/food/ramen.jpg",
    },
    {
      name: "Okonomiyaki Okonomiyaki Okonomiyaki Okonomiyaki Okonomiyaki Okonomiyaki Okonomiyaki Okonomiyaki ",
      path: "/food/ramen.jpg",
    },
    {
      name: "Okonomiyaki ",
      path: "/food/ramen.jpg",
    },
    {
      name: "Okonomiyaki ",
      path: "/food/ramen.jpg",
    },
  ];
  return (
    <Box>
      <Image src="/food/sashimi.jpg" h="17rem" w="full" objectFit={"cover"} />
      <Box
        shadow={isNavbarStick ? "md" : "sm"}
        position="sticky"
        top={"3.5rem"}
      >
        <SecondNavbar />
      </Box>
      <Container maxW={"container.lg"}>
        <Grid templateColumns={"repeat(4,1fr)"} gap="5rem" my="2rem">
          {foodData.map(({ name, path }, key) => (
            <GridItem key={key}>
              <FoodCard name={name} path={path} />
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SideDish;
