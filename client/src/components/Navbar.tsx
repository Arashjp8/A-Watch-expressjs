import {
  Button,
  HStack,
  Heading,
  Icon,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
function Switch() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      onClick={toggleColorMode}
      borderRadius={"10px"}
      width={"20px"}
      height={"40px"}
      variant={"ghost"}
    >
      <Icon fontSize={"xl"} transition={"all 0.3s ease"}>
        {colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
      </Icon>{" "}
    </Button>
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
      borderBottom={"1px solid white"}
    >
      <Heading as={"h3"} fontSize={"xl"}>
        <Link href="/">WatchList</Link>
      </Heading>
      <div>nav options or searchbar</div>
      <Switch />
    </HStack>
  );
}

export default Navbar;
