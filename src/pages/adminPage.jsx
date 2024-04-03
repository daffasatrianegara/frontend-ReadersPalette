import { Text, HStack, Box, VStack } from "@chakra-ui/react";
import Sidebar from "../components/sidebar";
import { useEffect, useState } from "react";
import checkToken from "../utils/checkToken";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getAllUsers, getAllComment, getAllBooks } from "../modules/fetch";
import Chart from "chart.js/auto";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(0);
  const [comment, setComment] = useState(0);
  const [book, setBook] = useState(0);

  useEffect(() => {
    const check = async () => {
      const redirect = checkToken();
      if (redirect == false) {
        navigate("/");
      }
    };

    const getData = async () => {
      const resUsers = await getAllUsers();
      const resComment = await getAllComment();
      const resBooks = await getAllBooks({ page: 1, limit: 100 });
      setUser(resUsers.data.length);
      setComment(resComment.data.length);
      setBook(resBooks.data.length);
    };

    const chartSumUsers = () => {
      const canvas = document.getElementById("chartUser");
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      const total = user;

      if (canvas.chart) {
        canvas.chart.destroy();
      }
      canvas.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Total Users"],
          datasets: [
            {
              label: "Jumlah Data Users",
              data: [total],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              type: "linear",
              ticks: {
                stepSize: 1,
                precision: 0,
              },
            },
          },
        },
      });
    };

    const chartSumComment = () => {
      const canvas = document.getElementById("chartComment");
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      const total = comment;

      if (canvas.chart) {
        canvas.chart.destroy();
      }
      canvas.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Total Komentar"],
          datasets: [
            {
              label: "Jumlah Data Komentar",
              data: [total],
              backgroundColor: "rgb(231, 41, 41, 0.2)",
              borderColor: "rgb(231, 41, 41, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              type: "linear",
              ticks: {
                stepSize: 1,
                precision: 0,
              },
            },
          },
        },
      });
    };

    const chartSumBook = () => {
      const canvas = document.getElementById("chartBook");
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      const total = book;

      if (canvas.chart) {
        canvas.chart.destroy();
      }
      canvas.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Total Data Buku"],
          datasets: [
            {
              label: "Jumlah Data Buku",
              data: [total],
              backgroundColor: "rgb(98, 114, 84, 0.2)",
              borderColor: "rgb(98, 114, 84, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              type: "linear",
              ticks: {
                stepSize: 1,
                precision: 0,
              },
            },
          },
        },
      });
    };

    check();
    getData();
    chartSumUsers();
    chartSumComment();
    chartSumBook();
  }, [user, comment, book]);

  return (
    <>
      <Helmet>
        <title>Dashboard Admin</title>
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
              Dashboard Admin
            </Text>
            <HStack gap={5} w={"100%"} align={"center"} mt={"1em"}>
              <Box w={"30%"} bgColor={"white"} borderRadius={"5px"} p={"1em"}>
                <Text fontSize={"xl"} fontWeight={"semibold"}>
                  Data Pengguna
                </Text>
                <Text fontWeight={"semibold"} fontSize={"lg"}>
                  {user} orang
                </Text>
              </Box>
              <Box w={"30%"} bgColor={"white"} borderRadius={"5px"} p={"1em"}>
                <Text fontSize={"xl"} fontWeight={"semibold"}>
                  Data Komentar
                </Text>
                <Text fontWeight={"semibold"} fontSize={"lg"}>
                  {comment} komentar
                </Text>
              </Box>
              <Box w={"30%"} bgColor={"white"} borderRadius={"5px"} p={"1em"}>
                <Text fontSize={"xl"} fontWeight={"semibold"}>
                  Data Buku
                </Text>
                <Text fontWeight={"semibold"} fontSize={"lg"}>
                  {book} buku
                </Text>
              </Box>
            </HStack>
            <Box w={"85%"} bgColor={"#FFFFFF"} p={"1em"} mt={"2em"}>
              <canvas id="chartUser"></canvas>
            </Box>
            <Box w={"85%"} bgColor={"#FFFFFF"} p={"1em"} mt={"2em"}>
              <canvas id="chartComment"></canvas>
            </Box>
            <Box w={"85%"} bgColor={"#FFFFFF"} p={"1em"} mt={"2em"} mb={"2em"}>
              <canvas id="chartBook"></canvas>
            </Box>
          </VStack>
        </Box>
      </HStack>
    </>
  );
};

export default Home;
