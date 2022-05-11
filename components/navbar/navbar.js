import { Box, Container, Grid, GridItem, Image, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NavButton from "./nav-button";

const Navbar = () => {
  const [isNavbarStick, setIsNavbarStick] = useState(false);

  useEffect(() => {
    const scrollListener = () => {
      window.pageYOffset > 30
        ? setIsNavbarStick(true)
        : setIsNavbarStick(false);
    };
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);
  const buttonData = [
    {
      url: "/",
      content: "Home",
      mode: false,
    },
    {
      url: "/menu",
      content: "Menu",

      mode: true,
    },
    {
      url: "/orders",
      content: "Orders",
      mode: false,
    },
    {
      url: "/about",
      content: "About Us",
      mode: false,
    },
  ];
  return (
    <Box
      bgColor={"red.1"}
      position="sticky"
      top="0"
      zIndex={"100"}
      boxShadow={isNavbarStick ? "sm" : "none"}
    >
      <Container
        maxW={"container.xl"}
        display="flex"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Link
          href="/"
          _focus={{ boxShadow: "none", outline: "none" }}
          _hover={{ boxShadow: "none", outline: "none" }}
        >
          <Image w="10rem" h="auto" src="./logo/logo inugami.png" />
        </Link>

        <Grid templateColumns={"repeat(4, 1fr)"} gap="1">
          {buttonData.map(({ content, url, mode }, key) => (
            <GridItem key={key}>
              <NavButton
                content={content}
                url={url}
                textCol={"white.1"}
                mode={mode}
              />
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Navbar;
