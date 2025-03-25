import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("server is ready");
});
app.listen(3000, () => {
  console.log("hhhhhhh");
});
