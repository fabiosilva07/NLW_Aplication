//Imports Servidor/ Template Engine
const express = require("express");
const server = express();
const nunjucks = require("nunjucks");
const { pageIndex, pageEstudar, pageCadastro, pageSaveCadastro} = require("./pages");

nunjucks.configure("src/pages",{
    express: server,
    noCache: true,
});

//Configuração e Atribução de Rotas
server.use(express.urlencoded({ extended: true }))
.use(express.static("public"))
.get("/", pageIndex)
.get("/estudar", pageEstudar)
.get("/cadastro", pageCadastro)
.post("/saveCadastro", pageSaveCadastro)
.listen(5500);