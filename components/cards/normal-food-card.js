import { Box, Container, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

const FoodCard = ({ name, path }) => {
  return (
    <Link href={"/"} passHref>
      <Box
        rounded="lg"
        backgroundColor={"white.1"}
        boxShadow="md"
        width={"11.5rem"}
        height="auto"
        overflow={"hidden"}
        align="center"
        _hover={{ boxShadow: "xl" }}
      >
        <Image src={path} objectFit="cover" height={"9rem"} width="full" />
        <Box
          bgColor={"white"}
          h="3rem"
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          overflow="hidden"
        >
          <Text my="0.3rem" textColor={"grey.1"} wordBreak="break-word">
            {name}
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

export default FoodCard;
