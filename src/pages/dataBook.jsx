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
import { useNavigate } from "react-router-dom";
import checkToken from "../utils/checkToken";
import { getAllBooks } from "../modules/fetch";
import { Helmet } from "react-helmet";
import Sidebar from "../components/sidebar";

const DataBook = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const check = async () => {
      const redirect = await checkToken();
      if (redirect == false) {
        navigate("/");
      }
    };

    const fetchBook = async () => {
      const response = await getAllBooks({ page: 1, limit: 25 });
      setBook(response.data);
    };

    check();
    fetchBook();
  }, [book]);

  return (
    <>
      <Helmet>
        <title>Data Buku</title>
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
              Data Buku
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
                  <TableCaption>Data Buku</TableCaption>
                  <Thead>
                    <Tr textAlign={"center"}>
                      <Td textAlign={"center"}>No</Td>
                      <Td textAlign={"center"}>Judul</Td>
                      <Td textAlign={"center"}>Penulis</Td>
                      <Td textAlign={"center"}>Kategori</Td>
                      <Td textAlign={"center"}>Penerbit</Td>
                      <Td textAlign={"center"}>Aksi</Td>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {book?.map((data, index) => {
                      return (
                        <>
                          <Tr key={index}>
                            <Td>{index + 1}</Td>
                            <Td>{data.title}</Td>
                            <Td>{data.author}</Td>
                            <Td>
                              {data.category == null ? "N/A" : data.category}
                            </Td>
                            <Td>{data.publisher}</Td>
                            <Td>
                              <Button
                                mr={"1em"}
                                colorScheme="blue"
                                onClick={() =>
                                  navigate(``)
                                }
                              >
                                Detail
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

export default DataBook;
