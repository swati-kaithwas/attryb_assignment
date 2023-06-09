import "./App.css";
import { Route, Routes } from "react-router";
import Sign from "./components/Sign";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Car from "./components/Car";
import AddCar from "./components/AddCar";
import EditCar from "./components/EditCar";
import { PrivateRoute } from "./components/Privateroute";

function App() {
  return (
    <div>
      <Navbar />
      {/* <Car/> */}
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/sign-up" element={<Sign/>} />
        <Route exact path="/add-car" element={<PrivateRoute><AddCar/></PrivateRoute>} />
        <Route exact path="/car" element={<PrivateRoute><Car/></PrivateRoute>} />
        <Route exact path="/edit-car" element={<PrivateRoute><EditCar/></PrivateRoute>} />

      </Routes>
    </div>

  );
}

export default App;
