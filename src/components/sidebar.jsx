import { Box, Text, VStack, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const handleLogout = async () => {
    await window.localStorage.removeItem("token");
    toast({
      title: "success",
      description: "logout berhasil...",
      status: "success",
      duration: 5000,
      position: "top",
      isClosable: true,
    });
    navigate("/");
  };
  return (
    <>
      <Box
        width={"90%"}
        bgColor={"#1B1A55"}
        margin={"1em"}
        borderRadius={"5px"}
        h={"93vh"}
      >
        <VStack w={"100%"} gap={0}>
          <Box
            color={"white"}
            padding={"0.7em"}
            cursor={"pointer"}
            w={"100%"}
            _hover={{
              bgColor: "#535C91",
              borderRadius: "5px",
            }}
            onClick={() => navigate('/admin')}
          >
            <Text fontSize={"xl"} fontWeight={"semibold"} pl={"1em"}>
              Beranda
            </Text>
          </Box>
          <Box
            color={"white"}
            padding={"0.7em"}
            cursor={"pointer"}
            w={"100%"}
            _hover={{
              bgColor: "#535C91",
              borderRadius: "5px",
            }}
            onClick={() => navigate('/admin/data/users')}
          >
            <Text fontSize={"xl"} fontWeight={"semibold"} pl={"1em"}>
              Data Pengguna
            </Text>
          </Box>
          <Box
            color={"white"}
            padding={"0.7em"}
            cursor={"pointer"}
            w={"100%"}
            _hover={{
              bgColor: "#535C91",
              borderRadius: "5px",
            }}
            onClick={() => navigate('/admin/data/comments')}
          >
            <Text fontSize={"xl"} fontWeight={"semibold"} pl={"1em"}>
              Data Komentar
            </Text>
          </Box>
          <Box
            color={"white"}
            padding={"0.7em"}
            cursor={"pointer"}
            w={"100%"}
            _hover={{
              bgColor: "#535C91",
              borderRadius: "5px",
            }}
            onClick={() => navigate('/admin/data/books')}
          >
            <Text fontSize={"xl"} fontWeight={"semibold"} pl={"1em"}>
              Data Buku
            </Text>
          </Box>
          <Box
            color={"white"}
            padding={"0.7em"}
            cursor={"pointer"}
            w={"100%"}
            _hover={{
              bgColor: "#535C91",
              borderRadius: "5px",
            }}
          >
            <Text fontSize={"xl"} fontWeight={"semibold"} pl={"1em"}>
              Data Request
            </Text>
          </Box>
          <Box
            color={"white"}
            padding={"0.7em"}
            cursor={"pointer"}
            w={"100%"}
            _hover={{
              bgColor: "#535C91",
              borderRadius: "5px",
            }}
          >
            <Text fontSize={"xl"} fontWeight={"semibold"} pl={"1em"}>
              Data Laporan
            </Text>
          </Box>
          <Box
            color={"white"}
            padding={"0.7em"}
            cursor={"pointer"}
            w={"100%"}
            _hover={{
              bgColor: "#535C91",
              borderRadius: "5px",
            }}
          >
            <Text fontSize={"xl"} fontWeight={"semibold"} pl={"1em"}>
              Data Pertanyaan
            </Text>
          </Box>
          <Box
            color={"white"}
            padding={"0.7em"}
            cursor={"pointer"}
            w={"100%"}
            _hover={{
              bgColor: "#535C91",
              borderRadius: "5px",
            }}
            onClick={() => navigate("/register")}
          >
            <Text fontSize={"xl"} fontWeight={"semibold"} pl={"1em"}>
              Tambah Admin
            </Text>
          </Box>
          <Box
            mt={"5em"}
            color={"white"}
            padding={"0.7em"}
            cursor={"pointer"}
            w={"100%"}
            _hover={{
              bgColor: "#E72929",
              borderRadius: "5px",
            }}
            onClick={handleLogout}
          >
            <Text fontSize={"xl"} fontWeight={"semibold"} pl={"1em"}>
              Logout
            </Text>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default Sidebar;
