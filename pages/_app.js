import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";
import InugamiChakraProvider from "../src/providers/inugami-provider";
import "../styles/globals.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <InugamiChakraProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </InugamiChakraProvider>
  );
}

export default MyApp;
