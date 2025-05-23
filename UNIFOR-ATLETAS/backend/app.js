const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const usuarioRoutes = require("./routes/usuario");
const presencaRoutes = require("./routes/presenca");
const alunoRoutes = require('./routes/aluno'); 

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json()); 


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Conectado ao MongoDB");
}).catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
});


app.use("/api/usuarios", usuarioRoutes);
app.use("/api/presenca", presencaRoutes);
app.use("/api/aluno", alunoRoutes);


app.use(express.static(path.join(__dirname, "dist")));


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
