import Navbar from "../components/navbar/navbar";
import InugamiChakraProvider from "../src/providers/inugami-provider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <InugamiChakraProvider>
      <Navbar />
      <Component {...pageProps} />
    </InugamiChakraProvider>
  );
}

export default MyApp;
