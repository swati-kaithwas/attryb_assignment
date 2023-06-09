import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import swal from "sweetalert";
const EditCar = () => {
  const [car, setCar] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state.isEdit);
  const [data, setData] = useState({
    car_name: state.data.car_name,
    car_type: state.data.car_type,
    description: state.data.description,
    model_no: state.data.model_no,
    id: state.data._id,
    car_images:state.car_images,
  });
  

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const HandleClicked = () => {
    axios
    .post("https://attryb-project.onrender.com/car/updatecar", data)
    .then((res) => {
      if (res.status == 200) {
       console.log("res",res)
        swal(`${res.data.message}`);
        navigate("/car");
      } else {
        swal(`${res.data.message}`);
       
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };
  return (
    <>
      <div class="bg-secondry ">
        <p class="display-2 fw-bold text-center">Update Car </p>
        <div style={{maxWidth:'550px',margin:'auto'}}>
            <div style={{width:'200px',margin:'auto'}}> 
                <img src={require('../Car/car-logo.png')} style={{width:'100%'}} alt="car images" />
            </div>
        {/* <img src={data.car_images} alt="car_images" /> */}
        <input
          class="datas form-control mt-3"
          type="text"
          placeholder="car name"
          name="car_name"
          value={data.car_name}
          onChange={(e) => handleChangeInput(e)}
        />
        <input
          class="datas form-control mt-3"
          type="text"
          placeholder="car type"
          name="car_type"
          value={data.car_type}
          onChange={(e) => handleChangeInput(e)}
        />
        <input
          class="datas form-control mt-3"
          type="text"
          placeholder="Description"
          name="description"
          value={data.description}
          onChange={(e) => handleChangeInput(e)}
        />
        <input
          class="datas form-control mt-3"
          type="text"
          placeholder="Model Number"
          name="model_no"
          value={data.model_no}
          onChange={(e) => handleChangeInput(e)}
        />
       
        <div class="d-flex gap-3">
          <button class="btn btn-primary my-5" onClick={HandleClicked}>
            ADD CAR
          </button>
          {/* <button class="btn btn-primary my-5"> UPDATE CAR</button> */}
        </div>
      </div>
      </div>
    </>
  );
};

export default EditCar;
