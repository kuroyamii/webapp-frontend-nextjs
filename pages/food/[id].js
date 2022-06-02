import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import CafeAPI from "../../components/api/cafe-api";
import { useRouter } from "next/router";

const FoodDetails = () => {
  const router = useRouter();
  const [detailData, setDetailData] = useState();
  const { id } = router.query;

  useEffect(() => {
    (async () => {
      const data = await CafeAPI.getFoodByID(id).then((res) =>
        setDetailData(res.data.data)
      );
    })();
  }, []);

  // useEffect(() => {
  //   console.log(detailData);
  // }, [detailData]);

  return (
    <Box>
      {detailData && (
        <Container
          maxW={"container.xl"}
          display="flex"
          alignItems={"center"}
          justifyContent="center"
          h="90vh"
          flexDirection={"column"}
        >
          <Box
            rounded={"2xl"}
            bgColor="white"
            p={"2rem"}
            flexDir={"horizontal"}
            justifyContent="center"
          >
            <Heading textAlign={"center"}>{detailData.name}</Heading>
            <Grid
              mt="2rem"
              display={"flex"}
              alignItems={"center"}
              templateColumns={"repeat(2,1fr)"}
              justifyContent="space-between"
              gap={20}
            >
              <GridItem>
                <Image src={detailData.imagePath} w="20rem" rounded={"3xl"} />
              </GridItem>
              <GridItem>
                <Text
                  fontFamily={"Montserrat"}
                  fontWeight="normal"
                  color={"black"}
                  fontSize="2rem"
                  wordBreak={"break-word"}
                >
                  {detailData.description}
                </Text>
                <Text
                  color={"gray.1"}
                  fontWeight="bold"
                  fontSize="1.5rem"
                  wordBreak={"break-word"}
                  fontFamily={"Montserrat"}
                >
                  Price: {detailData.price}
                </Text>
                <Text
                  color={"gray.1"}
                  fontWeight="bold"
                  fontSize="1.5rem"
                  wordBreak={"break-word"}
                  fontFamily={"Montserrat"}
                >
                  Stock: {detailData.stock}
                </Text>
              </GridItem>
            </Grid>
          </Box>
          <Button
            variant={"solid"}
            bgColor="red.1"
            color={"white"}
            mt="2rem"
            _hover={{ bgColor: "red.1" }}
            onClick={router.back}
          >
            Back to menu
          </Button>
        </Container>
      )}
    </Box>
  );
};

export default FoodDetails;
