import {
  Box,
  Text,
  Image,
  Skeleton,
  HStack,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import checkToken from "../../utils/checkToken";
import { getDetailUsers, deleteUsers } from "../../modules/fetch";
import { Helmet } from "react-helmet";

const DetailUsers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const check = () => {
      const redirect = checkToken();
      if (redirect == false) {
        navigate("/");
      }
    };

    const fetchUser = async () => {
      const fetch = await getDetailUsers(id);
      setUser(fetch.data);
      setLoading(false);
    };

    check();
    fetchUser();
  }, [id]);

  const handlerDelete = async (id) => {
    try {
      const response = await deleteUsers(id);
      toast({
        title: "success",
        description: response.message,
        status: "success",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
      navigate('/admin/data/users')
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
        <title>detail pengguna</title>
      </Helmet>
      <Box pos={"absolute"}>
        <Text
          fontSize={"3xl"}
          fontWeight={"bold"}
          cursor={"pointer"}
          color={"#E53E3E"}
          ml={"1em"}
          mt={"0.5em"}
          _hover={{
            color: "#FF204E",
          }}
          onClick={() => navigate("/admin/data/users")}
        >
          Kembali
        </Text>
      </Box>
      <Box
        bgColor={"#DDDDDD"}
        w={"50%"}
        ml={"auto"}
        mr={"auto"}
        mt={"2em"}
        mb={"2em"}
        h={"auto"}
        p={"1em"}
        borderRadius={"5px"}
      >
        {isLoading ? (
          <Skeleton height="80vh" my="6" />
        ) : (
          <>
            <HStack align={"top"} gap={0}>
              <Box w={"25%"} ml={"2em"} pt={"2em"} borderRadius={"360px"}>
                <Image src={`${user.photo}`} borderRadius={"360px"} />
              </Box>
              <VStack gap={0} mt={"3em"} ml={"1em"} align={"left"} w={"auto"}>
                <Text fontSize={"3xl"} fontWeight={"bold"}>
                  {user.username} ({user.gender})
                </Text>
                <Text fontSize={"xl"} fontWeight={"semibold"}>
                  {user.email}
                </Text>
                <Text fontSize={"xl"} fontWeight={"semibold"}>
                  {user.phone_number}
                </Text>
              </VStack>
            </HStack>
            <Box ml={"2em"} mt={"1em"}>
              <Text fontSize={"2xl"} fontWeight={"bold"}>
                BIO
              </Text>
              <Text>{user.bio != null ? user.bio : "N/A"}</Text>
            </Box>
            <Box ml={"2em"} mt={"1em"}>
              <Text fontSize={"xl"} fontWeight={"semibold"}>
                Akun dibuat pada : {user.createdAt}
              </Text>
              <Text fontSize={"xl"} fontWeight={"semibold"}>
                Akun diupdate pada : {user.updatedAt}
              </Text>
            </Box>
            <Button ml={"2em"} mt={"1em"} colorScheme="red" onClick={() => handlerDelete(user.id)}>
              Delete Akun
            </Button>
          </>
        )}
      </Box>
    </>
  );
};

export default DetailUsers;
