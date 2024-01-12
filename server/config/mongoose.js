const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/miniApp")
  .then(() => {
    console.log(`Database connected successfully`);
  })
  .catch(()=>{
    console.log(`Failled to connected Database`);
  })
