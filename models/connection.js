const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://LionelCapsule:pEN7CPRQkLdzIQ4T@cluster0.fbzmro8.mongodb.net/blackboard";

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));
