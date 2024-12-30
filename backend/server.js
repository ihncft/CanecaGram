const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3001;

app.use(cors());

const dir = path.join(__dirname, "public/assets");
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
  console.log("Criada pasta public/assets");
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Destino da imagem:", "public/assets");
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    console.log("Nome do arquivo:", file.originalname);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("imagem"), (req, res) => {
  if (!req.file) {
    console.error("Nenhum arquivo enviado.");
    return res.status(400).send({ error: "Nenhum arquivo enviado." });
  }
  const imageUrl = `http://localhost:3001/public/assets/${req.file.originalname}`;
  res.send({ imageUrl });
});

app.use("/public/assets", express.static(path.join(__dirname, "public/assets")));

app.use((err, req, res, next) => {
  console.error("Erro no servidor:", err.stack);
  res.status(500).send("Algo deu errado!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
