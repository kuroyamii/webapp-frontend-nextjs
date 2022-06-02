import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CafeAPI from "../components/api/cafe-api";
import CustomerCard from "../components/cards/customer-card";

const AdminPage = () => {
  const [customer, setCustomer] = useState();
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
        <Heading>Admin Page</Heading>
        <Text color={"black"}>Restock All Food</Text>
        <Button>Restock</Button>
        <Text color={"black"}>Active Customers</Text>
        <Grid>
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
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminPage;
