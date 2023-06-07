const express = require("express");
const cors = require("cors");
const db = require("./db");

const adminController = require("./controllers/admin.controller");
const userController = require("./controllers/user.controller");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/admin", adminController);
app.use("/api/user", userController);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

db();
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
