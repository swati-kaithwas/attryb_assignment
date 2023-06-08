import axios from 'axios';
import React, { useState } from 'react'

const AddCar = () => {

    const [car,setCar] =useState("")



    const handleUpdate = (id, car_name,car_type,model_no,description) => {
     
        setCar({
          ...car,
         car_name:car_name,
         car_type:car_type,
         model_no:model_no,
          description: description,
        });
        handleUpdatefunc(id);
      };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // console.log("todosubmit", todo);
        // console.log("idtodosubmit", id);
    
        try {
          if (id) {
            const response = await axios.put(
              `http://localhost:3002/car/updatecar/${id}`,
              car
            );
            console.log("Put", response);
          } else {
            const response = await axios.post(
              "http://localhost:3002/car/createcar",
              car
            );
            console.log("PostMethod", response);
          }
        } catch (error) {
          console.log(error);
        }
      };
  return (

       <div class='bg-secondry ' >
        <p class='display-2 fw-bold text-center'>Add Car </p>
        <img src="" alt="car images" />
        <input class="datas" type ="text" placeholder='car name' name="car_name" />
        <input class="datas"  type="text" placeholder='car type' name="car_type"/>
        <input  class ="data"  type ="text" placeholder='Description' name="description"/>
        <input  class ="data"  type ="text" placeholder='Model Number' name="model_no"/>
        <div class='d-flex gap-3'>
                <button class='btn btn-primary my-5'>ADD CAR</button>
                <button class='btn btn-primary my-5'> UPDATE CAR</button>
            </div>
    </div>
  )
}

export default AddCar