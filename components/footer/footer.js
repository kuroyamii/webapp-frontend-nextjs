import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      w="100%"
      h="5rem"
      bgColor={"#D9D9D9"}
      display="flex"
      justifyContent={"center"}
      alignItems="center"
    >
      <Text color={"grey.1"}>
        Copyright All Rights Reserved Inugami Cafe 2022
      </Text>
    </Box>
  );
};

export default Footer;
