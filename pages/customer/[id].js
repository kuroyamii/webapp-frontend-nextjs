import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CafeAPI from "../../components/api/cafe-api";

const CustomerDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [customerData, setCustomerData] = useState();
  useEffect(() => {
    (async () => {
      const data = await CafeAPI.getCustomerData(id)
        .then((res) => setCustomerData(res.data.data))
        .catch((err) => console.log(err));
    })();
  }, []);
  useEffect(() => {
    console.log(customerData);
  }, [customerData]);
  return (
    <Box>
      <Box></Box>
    </Box>
  );
};

export default CustomerDetail;
