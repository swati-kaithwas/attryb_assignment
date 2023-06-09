const sendResponse = require("../helper/responseSender");
const Carservice = require("../service/car");
const createCar = async (req, res) => {
  /*
    1. create car
    2. car_name , car_type, model_no,description and car_image , is required
    */
  try {
    let { car_name,car_type, description,model_no } = req.body;
    let car_image = req.file;
    if (!car_type || !description||! car_name||!model_no )
      return sendResponse(res, 400, {
        status: false,
        message: "car name, car type model number and description is required!",
      });
    const obj = {
    car_name: car_name,
    car_type:car_type,
    description: description,
    model_no:model_no,
    };
    
    if(req.file!=undefined){
      var car_images= req.file.filename;
        obj.car_images = "http://localhost:3005/"+"carimages/"+car_images
    }
    const createcar = await Carservice.createcar(obj);
    if (!createcar)
      return sendResponse(res, 400, {
        status: false,
        message: "error!",
      });
    return sendResponse(res, 200, {
      status: true,
      data: createcar,
      message: "created successfully",
    });
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, {
      status: false,
      message: "Internal Error!",
    });
  }
};
const getAllCar = async (req, res) => {
    /*
      1. get all car
      */
  
    try {
      
      const data = await Carservice.findAll(req.query);
      console.log(data,"data")

      if (!data)
        return sendResponse(res, 400, {
          status: false,
          message: "not found car",
        });
      return sendResponse(res, 200, {
        status: true,
        data: data,img ,
        message: "success",
      });
    } catch (error) {
      console.log(error);
      return sendResponse(res, 500, {
        status: false,
        message: "Internal Error!",
      });
    }
  };
  const getCarById = async (req, res) => {
    /*
      1.id is required
      2. using id find car
      */
    try {
      const { id } = req.body;
      if (!id)
        return sendResponse(res, 400, {
          status: false,
          message: "id is required !",
        });
  
      const data = await Carservice.GetById(id);
      if (!data)
        return sendResponse(res, 400, {
          status: false,
          message: "data not found",
        });
      return sendResponse(res, 200, {
        status: true,
        data: data,
        message: "successfully",
      });
    } catch (error) {
      console.log(error);
      return sendResponse(res, 500, {
        status: false,
        message: "Internal Error!",
      });
    }
  };


  const deleteCar = async (req, res) => {
    /*
      1. delete by id
      2. id is required
      */
    try {
      const id = req.params.id;
      console.log("id", id);
      //    console.log("idff",req)
      if (!id)
        return sendResponse(res, 400, {
          status: false,
          message: "id is required !",
        });
  
      const data = await Carservice.removedata(id);
      console.log("data", data);
      if (!data)
        return sendResponse(res, 400, {
          status: false,
          message: "data not found",
        });
      return sendResponse(res, 200, {
        status: true,
  
        message: "successfully deleted !",
      });
    } catch (error) {
      console.log(error);
      return sendResponse(res, 500, {
        status: false,
        message: "Internal Error!",
      });
    }
  };
  const UpadteCar = async (req, res) => {
    try {
      /*
          1. id is required
          2. upadte car car name,car type ,model no and description
          */
      // let id = req.params.id;
      let { id, car_name,car_type, description,model_no  } = req.body;
      if (!id)
        return sendResponse(res, 400, {
          status: false,
          message: " Id is required !",
        });
      let obj = {
         car_name,
         car_type,
         description,
         model_no,
      };
      let content = await Carservice.updateCar(id, obj);
      console.log("content", content);
      if (!content)
        return sendResponse(400, res, {
          status: false,
          message: "car details not update !",
        });
      return res.send({
        status: true,
        data: content,
        message: "sucessfully update car details!",
      });
    } catch (error) {
      console.log(error);
      return sendResponse(res, 500, {
        status: false,
        message: "Internal Error!",
      });
    }
  };
module.exports = {
    createCar,
    getAllCar,
    getCarById,
    UpadteCar,
    deleteCar,
}