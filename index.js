const fs = require("fs");
const express = require("express");
const cors = require("cors");
//ver console logs
const csbInspector = require("csb-inspector");
const morganBody = require("morgan-body");
const app = express();

const PORT = 3000;

//Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + `/index.html`);
});

morganBody(app);

//POST-CREATE
app.post("/canciones", (req, res) => {
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  canciones.push(cancion);
  fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
  res.send("Canción agregado con éxito!");
});

//GET-READ
app.get("/canciones", (req, res) => {
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
    res.json(canciones);
  });

//PUT-EDIT
app.put("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  const index = canciones.findIndex((p) => p.id == id);
  canciones[index] = cancion;
  fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
  res.send("Canción modificado con éxito");
});

//DELETE
app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  const index = canciones.findIndex((p) => p.id == id);
  canciones.splice(index, 1);
  fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
  res.send("Canción eliminada con éxito");
});

app.listen(PORT, () => {
  console.log(`¡Servidor encendido!, escuchando en el puerto ${PORT}`);
});
