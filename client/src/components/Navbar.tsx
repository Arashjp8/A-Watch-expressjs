import { Button, HStack, Heading, Icon, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function Switch() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Button
        onClick={toggleColorMode}
        borderRadius={"10px"}
        width={"20px"}
        height={"40px"}
        variant={"ghost"}
      //transition={"transform 0.5s ease-in-out"}
      >
        <Icon fontSize={"xl"}>
          {colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
        </Icon>{" "}
      </Button>
    </>
  );
}

function Navbar() {
  return (
    <HStack
      as={"nav"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"100%"}
      height={"80px"}
      paddingX={"1rem"}
      backgroundColor={"tomato"}
    >
      <Heading as={"h3"} fontSize={"xl"}>
        WatchList
      </Heading>
      <div>nav options or searchbar</div>
      <Switch />
    </HStack>
  );
}

export default Navbar;
