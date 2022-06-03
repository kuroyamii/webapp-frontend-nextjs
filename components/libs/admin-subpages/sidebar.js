import { Box, Divider, Grid, GridItem, Text, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

const SideBar = () => {
  const router = useRouter();
  return (
    <Box>
      <Heading fontSize={"1.5rem"} fontWeight="bold">
        <i>Administrator</i>
      </Heading>
      <Divider height={"0.5rem"} borderColor="black" />
      <Grid pt="1rem" gap="2">
        <GridItem>
          <Link href={"/admin/customers"} passHref>
            <Text
              cursor={"pointer"}
              color={"grey.1"}
              fontWeight={
                router.pathname.includes("customers") ? "bold" : "normal"
              }
              fontFamily="Montserrat"
            >
              Customers
            </Text>
          </Link>
        </GridItem>
        <GridItem>
          <Link href={"/admin/stats"} passHref>
            <Text
              cursor={"pointer"}
              color={"grey.1"}
              fontWeight={router.pathname.includes("stats") ? "bold" : "normal"}
              fontFamily="Montserrat"
            >
              Stats
            </Text>
          </Link>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default SideBar;
