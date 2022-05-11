import { Button } from "@chakra-ui/react";
import NavLink from "next/link";
import { useRouter } from "next/router";

const NavButtonSecond = ({ url, content, textCol }) => {
  const router = useRouter();
  return (
    <NavLink href={url} passHref>
      <Button
        _focus={{ boxShadow: "none", outline: "none" }}
        _hover={{ boxShadow: "none", outline: "none" }}
        variant="ghost"
        fontSize={"md"}
        fontWeight={router.pathname === url ? "semibold" : "normal"}
        color={router.pathname === url ? "red.1" : textCol}
      >
        {content}
      </Button>
    </NavLink>
  );
};

export default NavButtonSecond;
