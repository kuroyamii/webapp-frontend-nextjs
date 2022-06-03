import {
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import SideBar from "../../components/libs/admin-subpages/sidebar";
import { useState, useEffect } from "react";
import CustomerCard from "../../components/cards/customer-card";
import CafeAPI from "../../components/api/cafe-api";
import useStore from "../../src/providers/store";
import { useRouter } from "next/router";

const AdminCustomers = () => {
  const [customer, setCustomer] = useState();
  const adminUsername = useStore((state) => state.username);
  const adminPassword = useStore((state) => state.password);
  const router = useRouter();

  useEffect(() => {
    if (adminUsername != "admin" && adminPassword != "admin1234") {
      router.push("/admin");
    }
  }, []);
  let refresh = true;

  useEffect(() => {
    (async () => {
      const data = await CafeAPI.getOrderDetails()
        .then((res) => setCustomer(res.data.data))
        .catch((err) => console.log(err));
    })();
  }, [refresh]);
  return (
    <Box>
      <Container maxW={"container.xl"}>
        <Grid templateColumns={"repeat(4,1fr)"} gap="5" w="100%">
          <GridItem h="100%" minH={"100vh"} bgColor={"white.1"} p="1rem">
            <SideBar />
          </GridItem>
          <GridItem
            h="100%"
            minH={"100vh"}
            bgColor={"white.1"}
            colSpan={3}
            p="1rem"
          >
            <Heading fontSize={"1.5rem"}>
              <i>Active Customers</i>
            </Heading>
            <Divider height={"0.5rem"} borderColor="grey.1" />
            <Grid pt="1rem">
              {customer &&
                customer.map(({ customerData, orderData }, key) => (
                  <GridItem key={key}>
                    <CustomerCard
                      customerData={customerData}
                      orderData={orderData}
                      refresh={refresh}
                    />
                  </GridItem>
                ))}
              {!customer && (
                <Text color={"grey.1"} fontFamily="Montserrat">
                  No Customer Ordered Yet
                </Text>
              )}
            </Grid>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminCustomers;
