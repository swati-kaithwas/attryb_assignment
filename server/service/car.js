const Car = require("../model/car");
const filter = require("../helper/filter");
const createcar = async (obj) => {
  try {
    let data = new Car(obj);
    await data.save();
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
const findAll = async (query) => {
  try {
    var page = parseInt(query.page);
    var limit = parseInt(query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = {};
    var searchFiled = query.search || false;
    const total = await Car.countDocuments().exec();
 
    result.total = total;
    if (endIndex < total) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    var aggregateQuery = [];
    aggregateQuery.push(filter.sortHelper(query.columnName, query.orderBy));
    if (limit) {
      aggregateQuery.push(filter.faceHelper(startIndex, limit));
    } else {
      aggregateQuery.push(filter.faceHelper(startIndex, limit));
    }
    if (searchFiled) {
      // console.log("searchFiled",searchFiled)
      aggregateQuery.push(
        filter.searchHelper(searchFiled, ["title", "createdAt", "_id"])
      );
    }
    var allList = await Car.aggregate(aggregateQuery).collation({
      locale: "en",
    });
    result.content = allList[0].list;
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const GetById = async (id) => {
  try {
    const data = await Car.findById({ _id: id });
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
const updateCar = async (id, obj) => {
  try {
    // const Id = id.replace(":", "");
    const data = await Car.findByIdAndUpdate(
      { _id: id },
      { $set: obj },
      { new: true }
    );
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
const removedata = async (id) => {
  try {

    const Id = id.replace(":", "");
   
    const data = await Car.findByIdAndDelete(Id);

    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports = {
  createcar,
  findAll,
  GetById,
  removedata,
  updateCar,
};
