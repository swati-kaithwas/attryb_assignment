import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import swal from 'sweetalert';
const Sign = () => {
  const [data,setData] = useState("");
  const navigate = useNavigate();
  

  const handleFormSubmit = () => {
 
      axios.post("http://localhost:3002/users/signup", data)
      .then((res)=>{
        if(res.data.success){
        swal(`${res.data.message}`)
        window.location.reload();
        }
        else{
            swal(`${res.data.message}`)  
        }

      
      }).catch((err)=>{
        console.log(err)
      })
   
  };
  function handleKeyPress(event) {
    const charCode = event.which ? event.which : event.keyCode;
    const char = String.fromCharCode(charCode);
    const regex = /^[A-Za-z]+$/;
    if (!regex.test(char)) {
      event.preventDefault();
    }
  }

  return (
    <div class="bg-secondry ">
      <p class="display-2 fw-bold text-center">Sign-Up</p>

      <div class="m-auto bg-light rounded-4 mt-5" style={{ maxWidth: "650px" }}>
        <div class="col-11 m-auto">
          <br />
          <input
            class="form-control mt-3"
            type="text"
            name="name"
            placeholder="Name"
            value={data?.name}
              onKeyPress={handleKeyPress}
              onChange={handleFormSubmit}
          />
          <input
            class="form-control mt-3"
            type="text"
            name="email"
            placeholder="Email"
            value={data?.email}
            onChange={handleFormSubmit}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          />

          <input
            class="form-control mt-3"
            type="password"
            name="password"
            placeholder="Password"
            value={data?.password}
              onChange={handleFormSubmit}
          />

          <div class="d-flex gap-3">
            <button class="btn btn-primary my-5"  onClick={handleFormSubmit}>Sign-up</button>
            <button class="btn btn-primary my-5" onClick={() => navigate("/")}>
              Log-in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign;
