import React, { useState } from 'react';
import { useEffect } from 'react';

const Car = () => {
    const [data,setData]= useState([])
    useEffect(() => {
        fetchData();
      }, []);
    const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3002/car/getallcar");
          const json = await response.json();
          console.log("data", json.data.content);
    
          setData(json.data.content);
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      };
  return (
   <div class ="bg-secondry ">
   <p class="fs-1 fw-bold my-2 text-center">Cars</p>
   <div class="col-11 m-auto row gap-5 mt-5 justify-content-center ">
        {
            data.length > 0?(data.map((e,i)=>
            <div class ="border rounded-3 bg-light p-2 col-md-3 col-11"> 
                <p class="ddd"><span class="fw-bold">Car Name:</span> {e.car_name}</p>
                <p class="ddd"><span class="fw-bold">Type:</span> {e.car_type}</p>
                <p class="ddd"><span class="fw-bold">Model Number:</span> {e.modle_no}</p>
                <p class="ddd"><span class="fw-bold">Description:</span> {e.description}</p>
              </div>
        )) : (
          <p>No data to display</p>
        )
        }
     </div>

    </div>

  )
}

export default Car
