import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import swal from "sweetalert";
const AddCar = () => {
  const [car, setCar] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState({
    car_name: "",
    car_type: "",
    description: "",
    model_no: "",
  });

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const HandleClicked = () => {
    axios
    .post("https://attryb-project.onrender.com/car/createcar", data)
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
    //please call api before this navigate and if you want to add popup or anything please add before this navigate
    // navigate("/car");
  };
  return (
    <>
      <div class="bg-secondry ">
        <p class="display-2 fw-bold text-center">Add Car </p>
        <div style={{maxWidth:'550px',margin:'auto'}}>
            <div style={{width:'200px',margin:'auto'}}> 
                <img src={require('../Car/car-logo.png')} style={{width:'100%'}} alt="car images" />
            </div>
          
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
            class="data form-control mt-3"
            type="text"
            placeholder="Description"
            name="description"
            value={data.description}
            onChange={(e) => handleChangeInput(e)}
          />
          <input
            class="data form-control mt-3"
            type="text"
            placeholder="Model Number"
            name="model_no"
            value={data.model_no}
            onChange={(e) => handleChangeInput(e)}
          />
          <div>
            <label for="formFile" class="form-label mt-3">
              car image
            </label>
            <input type="file" id="formFile" name="car_images" class='form-control' />
          </div>
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

export default AddCar;
