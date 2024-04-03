import {
  Text,
  Button,
  Card,
  useToast,
  Box,
  CardHeader,
  Heading,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { login } from "../modules/fetch";
import checkToken from "../utils/checkToken";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = async () => {
    try {
      const token = await login(email, password);
      window.localStorage.setItem("token", token.token);
      const redirect = await checkToken()
      if(redirect == false) {
        navigate('/')
      }
      toast({
        title: "success",
        description: token.message,
        status: "success",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
      navigate("/admin");
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong",
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Login Admin</title>
      </Helmet>
      <Box color={"white"} mt={"5em"}>
        <Card w={"50%"} ml={"auto"} mr={"auto"} p={"2em"} boxShadow="dark-lg">
          <CardHeader textAlign={"center"}>
            <Heading>Login Admin</Heading>
          </CardHeader>
          <VStack align={"left"} gap={0}>
            <Text fontSize={"xl"} fontWeight={"semibold"}>
              Email
            </Text>
            <Input
              type="email"
              placeholder="masukkan email anda..."
              focusBorderColor="#1B1A55"
              onChange={(e) => {
                const Email = e.target.value;
                setEmail(Email);
              }}
              required
            />
            <Text fontSize={"xl"} fontWeight={"semibold"} mt={"1em"}>
              Password
            </Text>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                placeholder="masukkan password anda..."
                focusBorderColor="#1B1A55"
                onChange={(e) => {
                  const Password = e.target.value;
                  setPassword(Password);
                }}
                required
              />
              <InputRightElement width={"4.5rem"}>
                <Button colorScheme={"red"} size={"sm"} onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button
            type="submit"
              w={"25%"}
              ml={"auto"}
              mr={"auto"}
              mt={"2em"}
              colorScheme="whatsapp"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </VStack>
        </Card>
      </Box>
    </>
  );
};

export default Login;
