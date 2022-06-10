import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  Divider,
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
    <Container maxW={"container.xl"} minH="86vh">
      {detailData && (
        <Grid templateColumns={"repeat(2,1fr)"} pt="5rem">
          <GridItem display={"flex"} justifyContent="center">
            <Box w="30rem" h="25rem" rounded={"xl"} overflow="hidden">
              <Image
                src={detailData.imagePath}
                objectFit="cover"
                h="25rem"
                w="full"
              />
            </Box>
          </GridItem>
          <GridItem>
            <Grid fontFamily={"Montserrat"} color="grey.1" h="full">
              <GridItem>
                <Text color={"grey.1"} fontSize="2.25rem" fontWeight="bold">
                  {detailData.name}
                </Text>
                <Divider borderColor={"black"} />
                <Text pt="2rem" color={"grey.1"}>
                  {detailData.description}
                </Text>
              </GridItem>
              <GridItem>
                <Grid
                  templateColumns={"repeat(2,1fr)"}
                  h="full"
                  pos={"relative"}
                >
                  <GridItem pos={"absolute"} bottom="0" left="0">
                    <Text fontWeight={"bold"} color="grey.1">
                      Price: {detailData.price}
                    </Text>
                  </GridItem>
                  <GridItem pos={"absolute"} bottom="0" right="0">
                    <Text fontWeight={"bold"} color="grey.1">
                      Stock Left Today: {detailData.stock}
                    </Text>
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      )}
      <Box w="full" display={"flex"} justifyContent="center" pt="5rem">
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
      </Box>
    </Container>
  );
};

export default FoodDetails;
