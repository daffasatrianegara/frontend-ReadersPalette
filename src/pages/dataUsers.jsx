import {
  Box,
  HStack,
  VStack,
  Text,
  TableContainer,
  Table,
  TableCaption,
  Tr,
  Td,
  Thead,
  Tbody,
  Button,
  useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import checkToken from "../utils/checkToken";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../modules/fetch";
import { Helmet } from "react-helmet";
import Sidebar from "../components/sidebar";
import { deleteUsers } from "../modules/fetch";

const DataUsers = () => {
  const navigate = useNavigate();
  const toast = useToast()
  const [user, setUser] = useState(null);

  useEffect(() => {
    const check = async () => {
      const redirect = checkToken();
      if (redirect == false) {
        navigate("/");
      }
    };

    const fetchData = async () => {
      const fetch = await getAllUsers();
      setUser(fetch.data);
    };
    check();
    fetchData();
  }, [user]);

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
  }

  return (
    <>
      <Helmet>
        <title>Data pengguna</title>
      </Helmet>
      <HStack align={"top"} gap={0}>
        <Box w={"30%"} pos={"fixed"}>
          <Sidebar />
        </Box>
        <Box
          my={"1em"}
          bgColor={"#DDDDDD"}
          w={"65%"}
          borderRadius={"5px"}
          ml={"24em"}
        >
          <VStack mt={"1em"} ml={"1em"} mr={"1em"}>
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              Data pengguna
            </Text>
            <Box
              w={"100%"}
              ml={"1em"}
              mr={"1em"}
              bgColor={"white"}
              borderRadius={"5px"}
              h={"auto"}
              mb={"2em"}
              mt={"1em"}
            >
              <TableContainer mt={"2em"} mb={"2em"}>
                <Table variant={"striped"}>
                  <TableCaption>Data pengguna terdaftar</TableCaption>
                  <Thead>
                    <Tr textAlign={"center"}>
                      <Td textAlign={"center"}>No</Td>
                      <Td textAlign={"center"}>Nama</Td>
                      <Td textAlign={"center"}>Email</Td>
                      <Td textAlign={"center"}>Umur</Td>
                      <Td textAlign={"center"}>Jenis Kelamin</Td>
                      <Td textAlign={"center"}>Tanggal akun terbuat</Td>
                      <Td textAlign={"center"}>Aksi</Td>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {user?.map((data, index) => {
                      return (
                        <>
                          <Tr key={index}>
                            <Td>{index + 1}</Td>
                            <Td>{data.username}</Td>
                            <Td>{data.email}</Td>
                            <Td>{data.age}</Td>
                            <Td>{data.gender}</Td>
                            <Td>{data.createdAt}</Td>
                            <Td>
                              <Button mr={"1em"} colorScheme="blue" onClick={() => navigate(`/admin/detail/users/${data.id}`)}>
                                Detail
                              </Button>
                              <Button colorScheme="red" onClick={() => handlerDelete(data.id)}>Hapus</Button>
                            </Td>
                          </Tr>
                        </>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </VStack>
        </Box>
      </HStack>
    </>
  );
};

export default DataUsers;
