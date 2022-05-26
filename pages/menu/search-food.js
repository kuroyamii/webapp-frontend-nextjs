import { Box, Container, Image } from "@chakra-ui/react";
import SecondNavbar from "../../components/navbar/second-navbar";
import { useEffect, useState } from "react";

const SearchFood = () => {
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
      <Container maxW={"container.xl"}></Container>
    </Box>
  );
};

export default SearchFood;
