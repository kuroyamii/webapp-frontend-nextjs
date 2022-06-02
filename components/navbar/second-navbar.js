import { Box, Container, Grid, Wrap, WrapItem } from "@chakra-ui/react";
import NavButtonSecond from "./nav-button-second";

const SecondNavbar = () => {
  const buttonData = [
    {
      url: "/menu",
      content: "Ramen",
    },
    {
      url: "/menu/beverages",
      content: "Beverages",
    },
    {
      url: "/menu/dessert",
      content: "Dessert",
    },
    {
      url: "/menu/sidedish",
      content: "Side Dish",
    },
    {
      url: "/menu/sushi",
      content: "Sushi",
    },
    {
      url: "/menu/search-food",
      content: "Search Food",
    },
  ];
  return (
    <Box bgColor="white.1" zIndex={"100"}>
      <Container
        maxW={"container.xl"}
        display="flex"
        justifyContent={"center"}
        alignItems="center"
      >
        <Wrap>
          {buttonData.map(({ url, content }, key) => (
            <WrapItem key={key}>
              <NavButtonSecond content={content} url={url} textCol={"grey.1"} />
            </WrapItem>
          ))}
        </Wrap>
      </Container>
    </Box>
  );
};

export default SecondNavbar;
