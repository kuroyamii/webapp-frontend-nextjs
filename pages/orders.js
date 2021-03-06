import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  Stack,
  StackItem,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import useStore from "../src/providers/store";
import dynamic from "next/dynamic";
import CafeAPI from "../components/api/cafe-api";
import OrderDetails from "../components/cards/order-details-card";
import BasicFoodCard from "../components/cards/food-card";

const FoodCard = dynamic(() => import("../components/cards/text-food-card"), {
  ssr: false,
  loading: () => <p>...</p>,
});

const Orders = () => {
  const NameRef = useRef();
  const TableRef = useRef();
  const WaiterRef = useRef();
  const [input, setInput] = useState("");
  const data = useStore((state) => state.orders);
  const remove = useStore((state) => state.deleteOrder);
  const customerID = useStore((state) => state.customerID);
  const addCust = useStore((state) => state.addCustomerID);
  const removeCust = useStore((state) => state.removeCustomerID);
  const customerName = useStore((state) => state.customerName);
  const addCustomerName = useStore((state) => state.addCustomerName);
  const [custName, setCustName] = useState("");
  const [done, setDone] = useState(false);
  const totalBill = useStore((state) => state.price);

  const [orderDetail, setOrderDetail] = useState({});

  useEffect(() => {
    if (customerID != 0) {
      (async () => {
        const data = await CafeAPI.getOrderDetailByID(customerID)
          .then((res) => {
            setOrderDetail(res.data.data);
            console.log(res.data.data);
          })
          .catch((err) => console.log(err));
      })();
    }
  }, [customerID]);
  useEffect(() => {
    console.log(orderDetail.orderID);
  }, [orderDetail]);

  const doneStatus = useStore((state) => state.done);
  const setDoneStatus = useStore((state) => state.setDone);

  const [tables, setTables] = useState();
  const [tableID, setTableID] = useState();
  const [waiters, setWaiters] = useState([]);
  const [waiterID, setWaiterID] = useState();
  const [alert, setAlert] = useState(false);
  const totalPrice = useStore((state) => state.price);

  useEffect(() => {
    (async () => {
      const data = await CafeAPI.getWaiters()
        .then((res) => setWaiters(res.data.data))
        .catch((err) => console.log(err));
    })();
  }, [doneStatus]);

  useEffect(() => {
    if (data.length == 0) {
      setAlert(true);
    } else {
      setAlert(false);
    }
  }, [data]);

  useEffect(() => {
    (async () => {
      const data = CafeAPI.getTableData()
        .then((res) => setTables(res.data.data))
        .catch((err) => console.log(err));
    })();
  }, [doneStatus]);
  const [prices, setPrices] = useState(0);
  const handleInputChange = (e) => setInput(e.target.value);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (alert == false) {
      let foods = data.map((food) => food.id);
      let amounts = data.map((food) => food.amount);
      let waiter = waiters.map((item) => item.waiterID);
      (async () => {
        const res = await CafeAPI.placeOrder(
          custName,
          tableID,
          foods,
          waiterID,
          amounts,
          totalPrice
        )
          .then((res) => addCust(res.data.data))
          .catch((err) => console.log(err));
      })();
      addCustomerName(custName);
      setDone(true);
      setDoneStatus(true);
    }
  };

  function handleOnChangeName(e) {
    setCustName(NameRef.current.value);
    console.log(NameRef.current.value);
  }
  function handleOnChangeSelect(e) {
    let id = parseInt(e.target.value);
    setTableID(id);
  }
  function handleOnChangeWaiter(e) {
    let id = parseInt(e.target.value);
    setWaiterID(id);
  }
  function handleOnClickDone(e) {
    (async () => {
      const res = await CafeAPI.payBill(customerID);
    })();
    remove();
    removeCust();
    setDoneStatus(false);
  }
  useEffect(() => {
    if (customerID != 0) {
      (async () => {
        const data = CafeAPI.getOrderDetailByID(customerID).then((res) => {
          if (res.data.data.orderID == 0) {
            remove();
            removeCust();
            setDone(false);
            setDoneStatus(false);
          }
        });
      })();
    }
  }, []);

  return (
    <Container maxW={"container.xl"} minH={"100vh"} bgColor="white">
      <Heading p={"2rem"} fontWeight="black" textAlign="center">
        Your Orders
      </Heading>
      {doneStatus == false && (
        <Box bg={"white"} w="100%" p={"2rem"} rounded="2xl">
          <form onSubmit={handleOnSubmit}>
            <Stack>
              <StackItem>
                <FormControl isRequired>
                  <FormLabel htmlFor="customerName" fontWeight="black">
                    Your Name
                  </FormLabel>
                  <Input
                    ref={NameRef}
                    onChange={handleOnChangeName}
                    placeholder="Your Name"
                    id="customerName"
                    type="customerName"
                  />
                </FormControl>
              </StackItem>
              <StackItem>
                <FormControl isRequired>
                  <FormLabel htmlFor="table" fontWeight="black">
                    Seat
                  </FormLabel>
                  <Select
                    id="table"
                    placeholder="Select Seat"
                    ref={TableRef}
                    onChange={handleOnChangeSelect}
                  >
                    {tables &&
                      tables.map(({ tableID, status }, key) => (
                        <option value={tableID} key={key}>
                          Table {tableID}
                        </option>
                      ))}
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="waiter" fontWeight="black">
                    Waiter
                  </FormLabel>
                  <Select
                    id="waiter"
                    placeholder="Select Waiter"
                    ref={WaiterRef}
                    onChange={handleOnChangeWaiter}
                  >
                    {waiters &&
                      waiters.map(({ waiterID, name }, key) => (
                        <option value={waiterID} key={key}>
                          {name}
                        </option>
                      ))}
                  </Select>
                </FormControl>
              </StackItem>
              <StackItem>
                <Text color={"black"} fontWeight="black">
                  Orders
                </Text>
              </StackItem>
              <StackItem>
                {data.map(({ name, path, stock, price }, key) => (
                  <Grid
                    templateColumns={"repeat(1,1fr)"}
                    gap="5rem"
                    my="0.5rem"
                  >
                    <GridItem key={key}>
                      <FoodCard
                        name={name}
                        path={path}
                        stock={stock}
                        price={price}
                      />
                    </GridItem>
                  </Grid>
                ))}
              </StackItem>
              <StackItem>
                <Button type="submit">Place Order</Button>
              </StackItem>
              <StackItem>
                <Text color={"black"}>Total Price: {totalPrice}</Text>
              </StackItem>
              {alert && (
                <StackItem>
                  <Text color={"red.800"}>
                    Please Choose Your Foods on the Menu!
                  </Text>
                </StackItem>
              )}
            </Stack>
          </form>
        </Box>
      )}
      {doneStatus == true && (
        <Box px="3rem">
          {/* <Box
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            flexDir="column"
          >
            <Box>
              <OrderDetails
                customerName={customerName}
                orderID={orderDetail.orderID}
                orderDetails={orderDetail.orderDetails}
                orderedAt={orderDetail.orderedAt}
                waiterData={orderDetail.waiterData}
              />

              <Button onClick={handleOnClickDone}>Done</Button>
            </Box>
          </Box> */}
          <Divider borderColor={"grey.1"} />
          <Grid templateColumns={"repeat(3,1fr)"} mt="2rem">
            <GridItem>
              <Grid templateColumns={"repeat(1,1fr)"}>
                <GridItem py="0.5rem">
                  <Text
                    fontFamily={"Montserrat"}
                    fontWeight="bold"
                    fontSize={"1rem"}
                    color="grey.1"
                  >
                    Customer Name
                  </Text>
                  <Text
                    fontFamily={"Montserrat"}
                    fontWeight="normal"
                    fontSize={"1rem"}
                    color="grey.1"
                  >
                    {customerName}
                  </Text>
                </GridItem>
                <GridItem py="0.5rem">
                  <Text
                    fontFamily={"Montserrat"}
                    fontWeight="bold"
                    fontSize={"1rem"}
                    color="grey.1"
                  >
                    Waiter Name
                  </Text>
                  <Text
                    fontFamily={"Montserrat"}
                    fontWeight="normal"
                    fontSize={"1rem"}
                    color="grey.1"
                  >
                    {orderDetail.waiterData?.name}
                  </Text>
                </GridItem>
                <GridItem py="0.5rem">
                  <Text
                    fontFamily={"Montserrat"}
                    fontWeight="bold"
                    fontSize={"1rem"}
                    color="grey.1"
                  >
                    Order ID
                  </Text>
                  <Text
                    fontFamily={"Montserrat"}
                    fontWeight="normal"
                    fontSize={"1rem"}
                    color="grey.1"
                  >
                    {orderDetail.orderID}
                  </Text>
                </GridItem>
                <GridItem py="0.5rem">
                  <Text
                    fontFamily={"Montserrat"}
                    fontWeight="bold"
                    fontSize={"1rem"}
                    color="grey.1"
                  >
                    Total Bill
                  </Text>
                  <Text
                    fontFamily={"Montserrat"}
                    fontWeight="normal"
                    fontSize={"1rem"}
                    color="grey.1"
                  >
                    Rp {totalBill}
                  </Text>
                </GridItem>
                <GridItem mt="2rem">
                  <Text
                    fontFamily={"Montserrat"}
                    fontWeight="normal"
                    fontSize={"1rem"}
                    color="grey.1"
                  >
                    Thank you for ordering at{" "}
                    <Box as="span" color={"yellow.1"} fontWeight="bold">
                      Inugami Cafe
                    </Box>
                    !
                    <br />
                    Hope you're having a great day!
                  </Text>
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem colSpan="2" display={"flex"} justifyContent="center">
              <Divider orientation="vertical" borderColor="grey.1" />
              <Wrap spacing={"5rem"} pl="1rem">
                {orderDetail.orderDetails?.map(
                  ({ detailID, foodData }, key) => (
                    <WrapItem key={key}>
                      <BasicFoodCard
                        id={foodData.foodID}
                        name={foodData.name}
                        path={foodData.imagePath}
                        type={foodData.foodType}
                        description={foodData.description}
                        price={foodData.price}
                        stock={foodData.stock}
                      />
                    </WrapItem>
                  )
                )}
              </Wrap>
            </GridItem>
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default Orders;
