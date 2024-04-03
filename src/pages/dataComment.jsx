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
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import checkToken from "../utils/checkToken";
import { useNavigate } from "react-router-dom";
import { deleteComment, getAllComment } from "../modules/fetch";
import { Helmet } from "react-helmet";
import Sidebar from "../components/sidebar";

const DataComment = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [comment, setComment] = useState(null);

  useEffect(() => {
    const check = async () => {
      const redirect = await checkToken();
      if (redirect == false) {
        navigate("/");
      }
    };

    const fetchComment = async () => {
      const response = await getAllComment();
      setComment(response.data);
    };

    check();
    fetchComment();
  }, [comment]);

  const handlerDelete = async (id) => {
    try {
      const response = await deleteComment(id);
      toast({
        title: "success",
        description: response.message,
        status: "success",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
      navigate("/admin/data/comments");
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
        <title>Data Komentar</title>
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
              Data Komentar
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
                  <TableCaption>Data Komentar pengguna</TableCaption>
                  <Thead>
                    <Tr textAlign={"center"}>
                      <Td textAlign={"center"}>No</Td>
                      <Td textAlign={"center"}>Komentar</Td>
                      <Td textAlign={"center"}>Tanggal komentar</Td>
                      <Td textAlign={"center"}>Aksi</Td>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {comment?.map((data, index) => {
                      return (
                        <>
                          <Tr key={index}>
                            <Td>{index + 1}</Td>
                            <Td>{data.comment}</Td>
                            <Td>{data.createdAt}</Td>
                            <Td>
                              <Button
                                colorScheme="red"
                                onClick={() => handlerDelete(data.id)}
                              >
                                Hapus
                              </Button>
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

export default DataComment;
