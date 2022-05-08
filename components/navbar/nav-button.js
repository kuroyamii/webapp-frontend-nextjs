import { Button } from "@chakra-ui/react";
import NavLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const NavButton = ({ content, url, textCol, mode }) => {
  const router = useRouter();
  return (
    <NavLink href={url} passHref>
      <Button
        _focus={{ boxShadow: "none", outline: "none" }}
        _hover={{ boxShadow: "none", outline: "none" }}
        variant="ghost"
        fontSize={"md"}
        fontWeight={
          router.pathname === url
            ? "semibold"
            : mode && router.pathname.includes("/menu")
            ? "semibold"
            : "normal"
        }
        color={textCol}
      >
        {content}
      </Button>
    </NavLink>
  );
};

export default NavButton;
