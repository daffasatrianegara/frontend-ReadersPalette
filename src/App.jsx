import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/addAdmin";
import Home from "./pages/adminPage";
import DataUsers from "./pages/dataUsers";
import DetailUsers from "./pages/detail/detailUsers";
import DataComment from "./pages/dataComment";
import DataBook from "./pages/dataBook";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/admin"} element={<Home />} />
          <Route path={"/admin/data/users"} element={<DataUsers />} />
          <Route path={"/admin/detail/users/:id"} element={<DetailUsers />} />
          <Route path={"/admin/data/comments"} element={<DataComment />} />
          <Route path={"/admin/data/books"} element={<DataBook />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
