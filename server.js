const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "index.html"));
});

app.get("/random", (req, res) => {
  res.send(Math.floor(Math.random() * 7));
});

app.get("/echo/:text", (req, res) => {
  res.set("Content-Type", "text/plain");
  res.send(req.params.text);
});

app.get("/fetch", (req, res) => {
  fetch(req.query.url)
  .then(res => res.text())
  .then(data => {
    res.set("Content-Type", "text/plain");
    res.send(data);
  })
  .catch(err => res.status(503).send(err));
});

app.get("/time", (req, res) => {
  res.set("Content-Type", "text/plain");
  res.send(new Date());
});

app.get("/domain", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "domain.txt"));
});

app.all("*", (req, res) => {
  res.status(404).send("ERROR 404");
});

app.listen(process.env.PORT, () => {
  console.log("NeuralNexusLab (NXLab) core online!");
});
