import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const inugamiTheme = extendTheme({
  fonts: {
    heading: "Schoolbell, cursive",
    body: "Schoolbell, cursive",
  },
  colors: {
    white: {
      1: "#FFFFFF",
      2: "#EDEDED",
    },
    grey: {
      1: "#333333",
    },
    red: {
      1: "#8C2D1D",
    },
  },
  components: {
    Heading: {
      baseStyle: {
        color: "grey.1",
      },
    },
    Text: {
      baseStyle: {
        color: "white.1",
      },
    },
  },
  styles: {
    global: {
      body: {
        bgColor: "white.2",
        overflowX: "hidden",
      },
    },
  },
});

const InugamiChakraProvider = ({ children }) => {
  return <ChakraProvider theme={inugamiTheme}>{children}</ChakraProvider>;
};

export default InugamiChakraProvider;
