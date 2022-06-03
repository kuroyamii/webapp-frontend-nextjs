import {
  Box,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  Text,
  Button,
} from "@chakra-ui/react";
import SideBar from "../../components/libs/admin-subpages/sidebar";
import useStore from "../../src/providers/store";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

const AdminLogin = () => {
  const router = useRouter();
  const userRef = useRef();
  const passRef = useRef();
  const adminUsername = useStore((state) => state.username);
  const adminPassword = useStore((state) => state.password);
  const successLogIn = useStore((state) => state.setPassword);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    if (adminUsername === "admin" && adminPassword === "admin1234") {
      router.push("/admin/customers");
    }
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (user == "admin" && pass == "admin1234") {
      successLogIn();
      router.push("/admin/customers");
    } else {
      router.reload();
    }
  };
  function handleOnChangeUser(e) {
    setUser(userRef.current.value);
    console.log(user);
  }
  function handleOnChangePass(e) {
    setPass(passRef.current.value);
    console.log(pass);
  }

  //make prevent default for submit
  return (
    <Box>
      <Container
        maxW={"container.xl"}
        minH={"100vh"}
        display="flex"
        justifyContent={"center"}
        alignItems="center"
      >
        <Grid
          templateColumns={"repeat(10,1fr)"}
          bgColor="white"
          p="2rem"
          rounded={"xl"}
        >
          <GridItem
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            colSpan="4"
          >
            <Box py="4rem">
              <Heading mb="2rem">Administrator Login</Heading>
              <form onSubmit={handleOnSubmit}>
                <FormControl fontFamily={"Montserrat"} isRequired>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input
                    ref={userRef}
                    onChange={handleOnChangeUser}
                    placeholder="Username"
                    id="username"
                    type="username"
                  />
                </FormControl>
                <FormControl fontFamily={"Montserrat"} isRequired>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    ref={passRef}
                    onChange={handleOnChangePass}
                    placeholder="Password"
                    id="password"
                    type="password"
                  />
                </FormControl>
                <Button
                  mt="1rem"
                  fontFamily={"Montserrat"}
                  fontWeight="normal"
                  color={"white"}
                  bgColor="red.1"
                  type="submit"
                >
                  Log In
                </Button>
              </form>
            </Box>
          </GridItem>
          <GridItem>
            <Divider orientation="vertical" borderColor={"grey.1"} ml="1rem" />
          </GridItem>
          <GridItem
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            colSpan="4"
          >
            <Image src="/Multicultural Communities vector 2 1.svg" />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminLogin;
