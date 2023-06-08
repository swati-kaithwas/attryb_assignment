import "./App.css";
import { Route, Routes } from "react-router";
import Sign from "./components/Sign";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Car from "./components/Car";
import AddCar from "./components/AddCar";

function App() {
  return (
    <div>
      <Navbar />
      <Car/>
      <AddCar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<Sign />} />
      </Routes>
    </div>
  );
}

export default App;
